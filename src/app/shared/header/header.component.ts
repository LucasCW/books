import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbCollapseModule, NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuCollapsed = true;

  constructor(private auth: Auth, private router: Router) {}

  onAddABook() {
    console.log('Add a book clicked');
  }

  onLogout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['auth']);
    });
  }
}
