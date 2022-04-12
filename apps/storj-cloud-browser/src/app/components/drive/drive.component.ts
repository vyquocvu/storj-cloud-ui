import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { firstValueFrom, Observable } from 'rxjs';
import { FilesOptionsListComponent } from '../files-options-list/files-options-list.component';
import { MediaFileInterface } from '../../mediafile.interrface';
import { DStorageService } from '../../storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAuthServiceInterface } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'storj-cloud-ui-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent  implements OnInit {

  public readonly items$: Observable<MediaFileInterface[]> = this._storage.items$;
  public readonly currentPath$:  Observable<string> = this._storage.currentPath$;
  public readonly bucketName$: Observable<string> = this._storage.bucketName$;
  public readonly buckets$: Observable<{Name: string}[]> = this._storage.buckets$;
  public maxBreadcrumbs: number|undefined = 4;

  constructor(
    private readonly _storage: DStorageService,
    private readonly _popCtrl: PopoverController,
    private readonly _toastCtrl: ToastController,
    private readonly _alertCtrl: AlertController,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _loader: LoaderService,
    @Inject('APP_AUTH_SERVICE') private readonly _authService: AppAuthServiceInterface,
  ) {}

  async ngOnInit() {
    const bucketName = this._route.snapshot.data['bucketName'];
    console.log('init', bucketName);
  }

  async onFileChange(event: any) {
    // display loader
    this._loader.setStatus(true);
    // upload file
    const files = event?.target?.files;
    if (!files) {
      return;
    }
    await this._storage.uploads(files);  
    // display toast  
    const ionToast = await this._toastCtrl.create({
      message: `🎉 Uploaded ${files.length} files successfully`,
      duration: 2618,
      position: 'bottom',
      color: 'success',
      buttons: ['ok']
    });
    // hide loader
    this._loader.setStatus(false);
    // present toast
    await ionToast.present();
    event?.target?.classList?.remove('filedrop');
  }

  async newFolder() {
    // ask for folder name
    const ionAlert = await this._alertCtrl.create({
      header: 'New Folder',
      inputs: [
        {
          name: 'folderName',
          type: 'text',
          placeholder: 'Folder Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Create',
          role: 'ok',
        }
      ]
    });
    await ionAlert.present();
    const { data, role } = await ionAlert.onDidDismiss();    
    if (role !== 'ok' || !data.values.folderName) {
      return;
    }
    // display loader
    this._loader.setStatus(true);
    await this._storage.newFolder(data.values.folderName);
    // hide loader
    this._loader.setStatus(false);
  }

  trackByfn(index: number, item: MediaFileInterface) {
    return item._id;
  }

  openItem(item: MediaFileInterface) {
    if (item.url && !item.isFolder) {
      window.open(item.url, '_blank');
    }
  }

  navTo(path: string) {
    this._storage.filterBy(path);
  }

  navBack() {
    this._storage.filterByParentFolder();
  }

  async openOptions($event: MouseEvent, item: MediaFileInterface) {
    const ionPopover = await this._popCtrl.create({
      component: FilesOptionsListComponent,
      componentProps: {isFolder: item.isFolder},
      event: $event,
      translucent: true
    });
    await ionPopover.present();
    // handle close event
    const { data, role } = await ionPopover.onDidDismiss();
    if (role === 'close') {
      return;
    }
    switch (true) {
      case data === 'delete': {
        // display loader
        this._loader.setStatus(true);
        await this._storage.delete(item.name);
        //  display toast
        const ionToast = await this._toastCtrl.create({
          message: `🎉 Delete successfully`,
          duration: 2000,
          position: 'bottom',
          color: 'success',
          buttons: ['ok']
        });
        await ionToast.present();
        // hide loader
        this._loader.setStatus(false);
        break;
      }
      case data === 'share': {
        if (item.url) {
          // copy url to clipboard
          await navigator.clipboard.writeText(item.url);
          // display confirm toast
          const ionToast = await this._toastCtrl.create({
            message: 'Public URL copied to clipboard',
            duration: 2000,
            position: 'bottom',
            color: 'success',
            buttons: ['ok']
          });
          await ionToast.present();
        }
        break;
      }
      case data === 'download': {
        // download file from url
        if (item.url) {
          // display loader
          this._loader.setStatus(true);
          // TODO: Try to find why this opens in a new tab without download 
          const link = document.createElement('a');
          link.href = item.url;
          link.target = '_blank';
          link.download = item.name;
          link.click();
          // hide loader
          this._loader.setStatus(false);
        }
        break;
      }
      case data === 'open': {
        this.navTo(item.name);
        break;
      }
      default:
        break;
    } 
  }

  async openSettings() {
    const credentials = await this._authService.getCredentials();
    if (!credentials) {
      throw new Error('No credentials found');
    }
    const ionAlert = await this._alertCtrl.create({
      header: 'STORJ settings',
      inputs: [
        {
          name: 'bucketName',
          type: 'text',
          placeholder: 'Default bucket Name',
          value: credentials.bucketName
        },
        {
          name: 'accessKeyId',
          type: 'password',
          placeholder: 'Access Key Id',
          value: credentials.accessKeyId
        },
        {
          name: 'secretAccessKey',
          type: 'password',
          placeholder: 'Secret Access Key',
          value: credentials.secretAccessKey
        },
        {
          name: 'endpoint',
          type: 'url',
          placeholder: 'Endpoint',
          value: credentials.endpoint
        },
        // {
        //   name: 'darkmode',
        //   type: 'checkbox',
        //   label: 'Dark Mode',
        //   value: false
        // }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          role: 'ok',
        }
      ]
    });
    await ionAlert.present();
    const { data, role } = await ionAlert.onDidDismiss();
    console.log(data, role);
    
    if (role !== 'ok') {
      return;
    }
    console.log(data.values);
    // set default bucket name if value have changed
    // if (data.values.bucketName !== bucketName) {
    //   this._storage.setDefaultBucketName(data.values.bucketName);
    // }
    // save data
    await this._authService.setCredentials(data.values);
    // this._storage.setConfig(data.values.bucketName);
    //  display toast
    const ionToast = await this._toastCtrl.create({
      message: `🎉 Settings saved successfully`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      buttons: ['ok']
    });
    await ionToast.present();
  }

  async createBucket() {
    const ionAlert = await this._alertCtrl.create({
      header: 'New Bucket',
      inputs: [
        {
          name: 'bucketName',
          type: 'text',
          placeholder: 'Bucket Name',
          value: ``
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          role: 'ok',
        }
      ]
    });
    await ionAlert.present();
    const { data, role } = await ionAlert.onDidDismiss();    
    if (role !== 'ok') {
      return;
    }
    // display loader
    this._loader.setStatus(true);
    await this._storage.createBucket(data.values.bucketName);
    //  display toast
    const ionToast = await this._toastCtrl.create({
      message: `🎉 Settings saved successfully`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      buttons: ['ok']
    });
    await ionToast.present();
    // preload bucket data
    await this._storage.getFrom(data.values.bucketName);
    // hide loader
    this._loader.setStatus(false);
  }

  async loadBucket(bucketName: string) {
    // display loader
    this._loader.setStatus(true);
    // load bucket data
    await this._storage.getFrom(bucketName);
    // hide loader
    this._loader.setStatus(false);
  }

  async disconnect() {
    // display loader
    this._loader.setStatus(true);
    await this._authService.signout();
    await this._router.navigate(['/auth']);
    // hide loader
    this._loader.setStatus(false);
  }

  async reload() {
    const bucketName = await firstValueFrom(this.bucketName$);
    if (!bucketName) {
      throw 'No bucket name found';
    }
    // display loader
    this._loader.setStatus(true);
    // load bucket data
    await this._storage.getFrom(bucketName);
    // hide loader
    const t = setTimeout(() => {
      this._loader.setStatus(false);
      clearTimeout(t);
    },250);
  }

}