import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent {
  user ? = {
    firstName: 'John',
    lastName: 'Doe'
  };

  constructor(private router: Router) {}

  logout() {
    // Add your logout logic
    console.log('Logged out');
    this.router.navigate(['/login']);
  }
}
