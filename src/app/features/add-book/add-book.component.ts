import { AsyncPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Book } from '../../core/model/book';
import { IsbnService } from '../../core/services/isbn/isbn.service';
import { State as AppState } from '../../reducers/index';
import { addBook } from '../../store/book/book.actions';
import { isLoading } from '../../store/book/book.selectors';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule, AsyncPipe],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent implements OnInit, OnDestroy {
  protected isPreviewSet = false;

  @ViewChild('preview', { static: false })
  private preview!: ElementRef;

  private fileToUpload: File | undefined;

  private fb = inject(FormBuilder);
  private isbnService = inject(IsbnService);
  private auth = inject(Auth);
  private store = inject(Store<AppState>);

  protected isLoading$ = this.store.select(isLoading);
  private isLoadingSub?: Subscription;

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

      this.store.dispatch(
        addBook({
          payload: {
            book: book,
            file: this.fileToUpload
              ? this.fileToUpload
              : (this.preview.nativeElement.src as string),
          },
        })
      );

      this.resetBookForm();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  ngOnInit() {
    console.log('env', environment.production);
    this.isLoadingSub = this.isLoading$.subscribe((isLoading) => {
      isLoading
        ? this.isbn.controls.isbnSearch.disable()
        : this.isbn.controls.isbnSearch.enable();
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSub?.unsubscribe();
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
    this.fileToUpload = undefined;
  }
}
