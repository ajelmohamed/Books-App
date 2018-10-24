import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router } from '../../../../node_modules/@angular/router';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Book } from '../../classes/Book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
fileIsUploading = true;
fileUrl: string;
fileUploaded = false;
  newBook : Book;
  constructor(private formBuilder: FormBuilder,private bookService : BooksService, private router: Router) { }
  onSaveBook(){
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    this.newBook = new Book(title, author);
    this.newBook.synopsis = synopsis;
     
      this.newBook.photo = this.fileUrl;
    
    this.bookService.addBook(this.newBook);
    this.router.navigate(['/books']);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
}

  
    onUploadFile(file: File) {
      this.fileIsUploading = true;
      this.bookService.uploadFile(file).then(
      
        (url : any) => {
          console.log(url);
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
      );
  
}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }

}
