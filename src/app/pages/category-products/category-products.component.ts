import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent {
constructor(private route: ActivatedRoute, private router: Router) {}
category!: string;
filteredProducts: any[] = [];
selectedImage: string | null = null;
selectedProduct: any = null;   

products = [
  { name: "iPhone 14", price: 69999, offer: 10, category: "Mobiles", image: "assets/images/mobile/mob5.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "Samsung Galaxy", price: 59999, offer: 12, category: "Mobiles", image: "assets/images/mobile/mob3.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "LG Smart TV", price: 35999, offer: 15, category: "TVs & Appliances", image: "assets/images/mobile/tv1.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "Sony LED TV", price: 45999, offer: 10, category: "TVs & Appliances", image: "assets/images/mobile/tv2.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "Dell Laptop", price: 79999, offer: 8, category: "Electronics", image: "assets/images/mobile/el1.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "HP Laptop", price: 69999, offer: 10, category: "Electronics", image: "assets/images/mobile/el2.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "KitchenAid Mixer", price: 24999, offer: 20, category: "Home & Kitchen", image: "assets/images/mobile/home1.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "Instant Pot", price: 9999, offer: 18, category: "Home & Kitchen", image: "assets/images/mobile/home2.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "L'Oreal Shampoo", price: 499, offer: 5, category: "Beauty & Toys", image: "assets/images/mobile/t1.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "Dove Soap", price: 199, offer: 7, category: "Beauty & Toys", image: "assets/images/mobile/t2.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "Wooden Dining Table", price: 45999, offer: 12, category: "Furniture", image: "assets/images/mobile/f1.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "Office Chair", price: 8999, offer: 15, category: "Furniture", image: "assets/images/mobile/f2.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "Organic Almonds", price: 1299, offer: 10, category: "Grocery", image: "assets/images/mobile/g1.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] },
  { name: "Brown Rice", price: 599, offer: 8, category: "Grocery", image: "assets/images/mobile/g2.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
      offers: [
        "Bank Offer: 5% Cashback on ICICI Cards",
        "No Cost EMI Available",
        "Exchange offer upto ₹15,000"
      ],
      specifications: [
        "6.1-inch Display",
        "128GB Storage",
        "12MP Dual Camera",
        "A15 Bionic Chip"
      ] }
];

ngOnInit() {
  this.category = this.route.snapshot.paramMap.get('category')!;
  this.filterProducts();
}

filterProducts(){
  this.filteredProducts =
    this.products.filter(p => p.category === this.category);
}

goBack(){
  this.router.navigate(['/screen-view']);
}


openImage(item: any) {
  this.selectedProduct = item;
  this.selectedImage = item.image;
}

closeImage() {
  this.selectedImage = null;
  this.selectedProduct = null;
}

buyNow() {
  this.router.navigate(['/checkout'], { state: { product: this.selectedProduct } });
}




}
