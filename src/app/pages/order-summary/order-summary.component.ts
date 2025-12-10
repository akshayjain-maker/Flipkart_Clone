import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;
  shippingCharge: number = 40;   // custom change
  discount: number = 0;
  grandTotal: number = 0;
  address: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // checkout page se data localStorage/service se fetch karke show karna
    const storedItems = localStorage.getItem('checkoutItems');
    const storedAddress = localStorage.getItem('checkoutAddress');

    if (storedItems) this.cartItems = JSON.parse(storedItems);
    if (storedAddress) this.address = JSON.parse(storedAddress);

    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.discount = this.totalAmount > 1000 ? 100 : 0;  // example logic
    this.grandTotal = this.totalAmount + this.shippingCharge - this.discount;
  }

  placeOrder() {
    // API call / order save logic here
    alert("Order placed successfully!");
    localStorage.removeItem('checkoutItems');
    localStorage.removeItem('checkoutAddress');
    this.router.navigate(['/screen-view']);
  }
  goBack() {
    this.router.navigate(['/checkout']);
  }
}
