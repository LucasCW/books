import { Component } from '@angular/core';
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [NgbCollapseModule, NgbDropdownModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  onAddABook() {
    console.log('Add a book clicked');
  }
  isMenuCollapsed = true;
}
