import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentReference } from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../core/model/book';
import { BookService } from '../../core/services/book.service';
import { IsbnService } from '../../core/services/isbn/isbn.service';
import { environment } from '../../../environments/environment';
import { eventListeners } from '@popperjs/core';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent implements OnInit {
  protected isPreviewSet = false;

  @ViewChild('preview', { static: false })
  private preview!: ElementRef;

  private fileToUpload: File | undefined;

  private fb = inject(FormBuilder);
  private isbnService = inject(IsbnService);
  private auth = inject(Auth);
  private bookService = inject(BookService);

  protected isbn = this.fb.group({
    isbnSearch: ['9781408855652', Validators.required],
  });

  protected book = this.fb.group({
    title: ['title', [Validators.required]],
    isbn: 'isbn',
    preview: [''],
    date: [new Date(), Validators.required],
    comments: 'comments',
    url: ['', Validators.required],
  });

  protected initialValues = this.book.value;

  onFileUpload(event: Event) {
    if (
      (event.target as HTMLInputElement).files &&
      (event.target as HTMLInputElement).files?.length
    ) {
      this.fileToUpload = (event.target as HTMLInputElement).files![0];
      this.updatePreview(this.fileToUpload);
    }
  }

  protected async onSubmit() {
    try {
      const book: Partial<Book> = {
        title: this.book.value.title!,
        userId: this.auth.currentUser!.uid,
        comments: this.book.value.comments!,
        date: this.book.value.date!.getTime(),
        isbn: this.book.value.isbn!,
      };

      const docRef = await this.bookService.addBook(book);

      const downloadUrl = !!this.fileToUpload
        ? await this.uploadToFireStorage(docRef)
        : this.preview.nativeElement.src;

      await this.bookService.addUrl(docRef.id, downloadUrl);

      this.resetBookForm();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  private async uploadToFireStorage(docRef: DocumentReference) {
    const storage = getStorage();
    const storageRef = ref(storage, environment.booksFolder + docRef.id);
    const fileUploaded = await uploadBytes(storageRef, this.fileToUpload!);
    return await getDownloadURL(fileUploaded.ref);
  }

  ngOnInit() {
    console.log('env', environment.production);
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
          });

          res.items[0].volumeInfo.imageLinks.thumbnail &&
            this.updatePreview(res.items[0].volumeInfo.imageLinks.thumbnail);
        });
    }
  }

  private updatePreview(source: File | string) {
    if (typeof source === 'string') {
      this.preview.nativeElement.src = source;
      this.isPreviewSet = true;
      this.book.controls.url.setValue(source);
    } else {
      const url = URL.createObjectURL(source);
      this.preview.nativeElement.src = url;
      this.isPreviewSet = true;
      this.book.controls.url.setValue(url);
    }
  }

  private resetBookForm() {
    this.book.reset(this.initialValues);
    this.preview.nativeElement.src = '';
    this.isPreviewSet = false;
  }
}
