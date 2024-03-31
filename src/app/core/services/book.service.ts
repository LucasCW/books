import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Book } from '../model/book';
import { Auth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class BookService {
  private bookCollection = 'books';
  private auth = inject(Auth);

  fetchBooks(userId: string) {
    return getDocs(
      query(
        collection(getFirestore(), this.bookCollection),
        where('userId', '==', userId)
      )
    );
  }

  addBook(book: Book) {
    return addDoc(collection(getFirestore(), this.bookCollection), {
      ...book,
      userId: this.auth.currentUser?.uid,
    });
  }
}
