import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../classes/Book';
import { Subscription } from '../../../node_modules/rxjs';
import { Router } from '../../../node_modules/@angular/router';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  booksSubscription: Subscription;
  private boook : Book

  constructor(private bookservice : BooksService, private router : Router) {
   }
   onDeleteBook(book : Book){
     this.bookservice.removeBook(book);
   }
   onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  onNewBook(){
    this.router.navigate(['/books/new']);
  }
  ngOnInit() {
    this.booksSubscription = this.bookservice.BooksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    
     this.bookservice.emitBooks
  }

  ngOnDestroy(){
    this.booksSubscription.unsubscribe();
  }

}
