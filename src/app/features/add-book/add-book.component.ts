import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsbnService } from '../../core/services/isbn/isbn.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent implements OnInit {
  private fb = inject(FormBuilder);
  private isbnService = inject(IsbnService);

  isbn = this.fb.group({
    isbn: ['', Validators.required],
  });

  constructor() {}
  ngOnInit(): void {
    this.isbnService.test();
  }

  onSubmit() {
    this.isbn;
    console.log('on submit triggered');
  }

  onISBNSearch() {
    console.log(this.isbn.value);
  }
}
