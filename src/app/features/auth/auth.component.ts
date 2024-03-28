import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: new FormControl('test', [Validators.required]),
  });

  isAuthenticated = false;

  constructor(
    private fb: FormBuilder,
    protected auth: Auth,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      console.log(user);
      console.log('current user:', this.auth.currentUser);
    });
  }

  onSubmit() {
    signInWithEmailAndPassword(
      this.auth,
      this.form.value.email!,
      this.form.value.password!
    ).then((user) => {
      !!user && this.router.navigate(['books']);
    });
  }
}
