import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent {

  product: any;
  finalPrice: number = 0;
  expectedDate: string = '';

  cartItems: any[] = [];          // <-- Added
  deliveryAddress: any = {        // <-- Dummy address OR form value later bind kar sakte हो
    name: 'Akshay',
    house: 'B-21',
    street: 'MG Road',
    city: 'Mumbai',
    state: 'MH',
    pincode: '400001',
    phone: '9876543210'
  };

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras.state?.['product'];   // product receive from product details/page

    if (this.product) {
      const discount = this.product.discount || 0;
      this.finalPrice = this.product.price - (this.product.price * discount / 100);

      const date = new Date();
      date.setDate(date.getDate() + 4);
      this.expectedDate = date.toDateString();

      // product ko cartItems me convert krke add karo
      this.cartItems.push({
        title: this.product.title,
        price: this.finalPrice,
        quantity: 1,
        image: this.product.image || '',
      });
    }
  }

  placeOrder() {
    alert("🎉 Order Placed Successfully!");

    // Summary page ke liye cart + address store
    localStorage.setItem("checkoutItems", JSON.stringify(this.cartItems));
    localStorage.setItem("checkoutAddress", JSON.stringify(this.deliveryAddress));

    this.router.navigate(['/order-summary']);
  }

  goBack() {
    this.router.navigate(['/screen-view']);
  }

}
