import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { EmailValidator } from '../../../node_modules/@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(){
  }
  createNewUser(email : string , password : string){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
  signOutUser() {
    firebase.auth().signOut();
}
  signIn(email : string,password:string){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    );
}
}
