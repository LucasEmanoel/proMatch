import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { DbService } from '../service/db.service';
import { ToastController, ModalController, ActionSheetController } from '@ionic/angular';
import { Game } from '../model/Game';
import { CameraService } from '../service/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  providers: [CameraService, Camera, File]
})
export class ProfileEditPage implements OnInit {


  @Input()
  userAuth: User;
  games: Game[];

  constructor(private router: Router, private dbService: DbService,
    public toastController: ToastController, private modalCtrl: ModalController,
    private cameraService: CameraService, private actionSheetController: ActionSheetController,
    private camera: Camera) {
    this.initialize();
  }

  ngOnInit() {
  }

  async initialize() {
    this.games = await this.dbService.listWithUIDs<Game>('games');
  }

  async presentActionSheet() {
    
  }

  async changePhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.cameraService.takePicture().then((foto) => {
              this.userAuth.photo = foto;
            }    
            );
          }
        },
        {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.cameraService.pickFromGallery().then((foto) => {
              this.userAuth.photo = foto;
            }
            );
          }
        }, 
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async updateUser() {
    await this.dbService.update('usuarios', this.userAuth.uid,
      {
        name: this.userAuth.name,
        description: this.userAuth.description,
        gameUID: this.userAuth.gameUID,
        photo: this.userAuth.photo || null
      })
      .then(() => {
        this.presentToast("editado com sucesso.")
        this.router.navigate(['tabs/profile']);
        this.dismiss();
      })
      .catch(error => {
        console.log(error);
        this.presentToast("falha ao editar.")
      });
  }

  Disconnect(){
    
  }
  
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
