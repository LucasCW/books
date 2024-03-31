import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'books-5da30',
          appId: '1:201734349635:web:7e1a5f57e2a26f872f05f6',
          storageBucket: 'books-5da30.appspot.com',
          apiKey: 'AIzaSyC4CtWOi6qKe85HpR19xiC_5YL_iQBh23g',
          authDomain: 'books-5da30.firebaseapp.com',
          messagingSenderId: '201734349635',
          measurementId: 'G-NGCM4R6PCC',
        })
      )
    ),
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
