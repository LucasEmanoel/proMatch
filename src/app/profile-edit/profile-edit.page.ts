import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { DbService } from '../service/db.service';
import { ToastController, ModalController, ActionSheetController } from '@ionic/angular';
import { Game } from '../model/Game';
import { CameraService } from '../service/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  providers: [CameraService, Camera, File]
})
export class ProfileEditPage implements OnInit {


  @Input()
  perfil: User;
  games: Game[];

  constructor(private router: Router, private dbService: DbService, 
    private auth: AuthenticationService, public toastController: ToastController,
    private modalCtrl: ModalController, private cameraService: CameraService, 
    private actionSheetController: ActionSheetController, private camera: Camera) {
    
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.games = await this.dbService.listWithUIDs<Game>('games');
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
              this.perfil.photo = foto;
            }    
            );
          }
        },
        {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.cameraService.pickFromGallery().then((foto) => {
              this.perfil.photo = foto;
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
    await this.dbService.update('usuarios', this.perfil.uid,
      {
        name: this.perfil.name,
        description: this.perfil.description,
        gameUID: this.perfil.gameUID,
        photo: this.perfil.photo || null
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
    this.auth.logout();
    this.dismiss();
    this.router.navigate(['login']);
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
