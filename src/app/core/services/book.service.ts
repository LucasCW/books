import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { Book } from '../model/book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private bookCollection = environment.booksCollection;
  private auth = inject(Auth);

  uploadToFireStorage(docRefId: string, file: File) {
    return (async () => {
      const storage = getStorage();
      const storageRef = ref(storage, environment.booksFolder + docRefId);
      const fileUploaded = await uploadBytes(storageRef, file);
      return await getDownloadURL(fileUploaded.ref);
    })();
  }

  fetchBooks(userId: string) {
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

  removeBook(book: Book) {
    return deleteDoc(
      doc(getFirestore(), environment.booksCollection, book.id!)
    );
  }
}
