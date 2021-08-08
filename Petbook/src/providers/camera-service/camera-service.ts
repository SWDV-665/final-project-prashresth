import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Camera} from "@ionic-native/camera";

/*
  Generated class for the CameraServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraServiceProvider {

  imgUrl;
  constructor(public http: HttpClient,
              private camera: Camera) {
  }

  // // regular base64 image data
  // async getCamera() {
  //   return this.camera.getPicture({
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }).then(res => {
  //     return 'data:image/jpeg;base64,' + res;
  //   }).catch(err => {
  //     console.log(err)
  //   });
  // }

  // // file_uri example
  // async getCamera() {
  //   return this.camera.getPicture({
  //     quality: 100,
  //     // destinationType: this.camera.DestinationType.FILE_URI,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }).then(res => {
  //     let filename = res.substring(res.lastIndexOf('/') + 1);
  //     let path =  res.substring(0, res.lastIndexOf('/') + 1);
  //     return this.file.readAsDataURL(path, filename).then(res => {
  //       return res
  //     });
  //     // return 'data:image/jpeg;base64,' + res;
  //     // return res;
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  async getCamera() {
    try {
      return 'data:image/jpeg;base64,' + await this.camera.getPicture({
        quality: 40,
        targetHeight: 400,
        targetWidth: 400,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      });
    }
    catch (e) {
      console.log(e)
    }
  }

  async getGallery() {
    return this.camera.getPicture({
      quality: 40,
      targetHeight: 400,
      targetWidth: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then(res => {
      return 'data:image/jpeg;base64,' + res;
    }).catch(err => {
      console.log(err)
    })
  }

}
