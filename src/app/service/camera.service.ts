import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private camera: Camera) { }

  async takePicture(){
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      correctOrientation:true,
      targetWidth: 400,
      targetHeight: 400,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      
    }
    
    const imageData = await this.camera.getPicture(options);
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    return base64Image;
  }

  async pickFromGallery(){
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    
    const imageData = await this.camera.getPicture(options);
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    return base64Image;
  }
  
}
