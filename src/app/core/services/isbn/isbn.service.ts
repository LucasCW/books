import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IsbnService {
  private url = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {
    console.log(http);
  }

  search(term: string) {
    term = term.trim();

    const options = term
      ? {
          params: new HttpParams()
            .set('q', 'isbn:' + term)
            .set('key', 'AIzaSyBzroOtNn649DPt4TfEZsZzafLm4ktkddQ'),
        }
      : {};

    return this.http.get(this.url, options);
  }
}
