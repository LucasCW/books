import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbCollapseModule, NgbDropdownModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuCollapsed = true;

  constructor(private auth: Auth, private router: Router) {}

  onAddABook() {
    this.router.navigate(['addbook']);
  }

  onLogout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['auth']);
    });
  }
}
