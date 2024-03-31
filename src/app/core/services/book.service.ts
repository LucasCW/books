import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Book } from '../model/book';
import { Auth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookService {
  private bookCollection = environment.booksCollection;
  private auth = inject(Auth);

  fetchBooks(userId: string) {
    console.log('evn', environment.production);
    return getDocs(
      query(
        collection(getFirestore(), this.bookCollection),
        where('userId', '==', userId)
      )
    );
  }

  addBook(book: Partial<Book>) {
    return addDoc(collection(getFirestore(), this.bookCollection), {
      ...book,
      userId: this.auth.currentUser?.uid,
    });
  }

  addUrl(bookId: string, url: string) {
    const bookRef = doc(getFirestore(), this.bookCollection, bookId);

    return updateDoc(bookRef, { url: url });
  }
}
