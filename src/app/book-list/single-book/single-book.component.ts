import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Book } from '../../classes/Book';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  
  
    onBack(){
      this.router.navigate(['/books']);
    }

    book: Book;

    constructor(private route: ActivatedRoute, private booksService: BooksService,
                private router: Router) {}
  
    ngOnInit() {
      this.book = new Book('', '');
      const id = this.route.snapshot.params['id'];
      this.booksService.getSingleBook(+id).then(
        (book: Book) => {
          this.book = book;
        }
      );
    }
  

}
