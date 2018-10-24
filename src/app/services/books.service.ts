import { Injectable } from '@angular/core';
import { Book } from '../classes/Book';
import { Subject } from '../../../node_modules/rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { DataSnapshot } from '../../../node_modules/@angular/fire/database/interfaces';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private listBooks : Book[] = [];
  
  public BooksSubject = new Subject<Book[]>()
  constructor(){
    this.getBooksFromServer();
  }

  emitBooks(){
    this.BooksSubject.next(this.listBooks.slice());
  } 
 getBooksFromServer(){
  
    firebase.database().ref('/books')
      .on('value', (data: DataSnapshot) => {
          this.listBooks = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  
 }
 
 addBook(newBook : Book ){
   this.listBooks.push(newBook)
   this.saveBooksToserver();
   this.emitBooks();
   this.saveBooksToserver();

 }

 getSingleBook(id: number) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/books/' + id).once('value').then(
        (data: DataSnapshot) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        }
      );
    }
  );
}

 removeBook(book: Book) {
  if(book.photo) {
    const storageRef = firebase.storage().refFromURL(book.photo);
    storageRef.delete().then(
      () => {
        console.log('Photo removed!');
      },
      (error) => {
        console.log('Could not remove photo! : ' + error);
      }
    );
  }
  const bookIndexToRemove = this.listBooks.findIndex(
    (bookEl) => {
      if(bookEl === book) {
        return true;
      }
    }
  );
  this.listBooks.splice(bookIndexToRemove, 1);
  this.saveBooksToserver();
  this.emitBooks();
}

 saveBooksToserver(){
   firebase.database().ref('/books').set(this.listBooks);
   
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
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    }
  );
}
  
}
