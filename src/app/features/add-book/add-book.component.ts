import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../core/model/book';
import { BookService } from '../../core/services/book.service';
import { IsbnService } from '../../core/services/isbn/isbn.service';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent implements OnInit {
  fileToUpload: File | undefined;

  onFileUpload(event: Event) {
    if (
      (event.target as HTMLInputElement).files &&
      (event.target as HTMLInputElement).files?.length
    ) {
      this.fileToUpload = (event.target as HTMLInputElement).files![0];
    }
  }

  async onSubmit() {
    try {
      const book: Book = {
        title: this.book.value.title!,
        userId: this.auth.currentUser!.uid,
        comments: this.book.value.comments!,
        date: this.book.value.date!.getTime(),
        isbn: this.book.value.isbn!,
        url: this.book.value.url!,
      };

      const docRef = await this.bookService.addBook(book);

      const storage = getStorage();
      const storageRef = ref(storage, docRef.id);

      const uploadedFile = await uploadBytes(storageRef, this.fileToUpload!);
      const downloadUrl = await getDownloadURL(uploadedFile.ref);
      await this.bookService.addUrl(docRef.id, downloadUrl);

      this.book.reset();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  private fb = inject(FormBuilder);
  private isbnService = inject(IsbnService);
  private auth = inject(Auth);
  private bookService = inject(BookService);

  isbn = this.fb.group({
    isbnSearch: ['9781408855652', Validators.required],
  });

  book = this.fb.group({
    title: ['title', [Validators.required]],
    isbn: 'isbn',
    preview: ['', Validators.required],
    date: [new Date(), Validators.required],
    comments: 'comments',
    url: [''],
  });

  protected initialValues = this.book.value;

  async ngOnInit(): Promise<void> {
    console.log('date value:', this.book.value.date);
    this.book.reset(this.initialValues);
  }

  onISBNSearch() {
    if (this.isbn.value.isbnSearch) {
      this.isbnService
        .search(this.isbn.value.isbnSearch)
        .subscribe((res: any) => {
          this.book.patchValue({
            title: res.items[0].volumeInfo.title,
            isbn: this.isbn.value.isbnSearch,
            comments: res.items[0].volumeInfo.description,
            url: res.items[0].volumeInfo.infoLink,
          });
        });
    }
  }
}
