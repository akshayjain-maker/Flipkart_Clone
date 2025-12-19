import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showUserMenu = false;

  products = [
    { id: 1, name: 'iPhone 14', category: 'Mobiles', price: 69999, stock: 12 },
    { id: 2, name: 'Samsung Galaxy', category: 'Mobiles', price: 59999, stock: 8 },
    { id: 3, name: 'LG Smart TV', category: 'TVs', price: 35999, stock: 5 },
    { id: 4, name: 'Dell Laptop', category: 'Electronics', price: 79999, stock: 0 },
    { id: 5, name: 'KitchenAid Mixer', category: 'Home & Kitchen', price: 24999, stock: 20 },
  ];

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    // Add your logout logic
    console.log('Logout clicked');
  }
}
