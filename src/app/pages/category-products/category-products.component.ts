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

products = [
  { name: "iPhone 14", price: 69999, offer: 10, category: "Mobiles", image: "assets/images/mobile/mob5.jpg" },
  { name: "Samsung Galaxy", price: 59999, offer: 12, category: "Mobiles", image: "assets/images/mobile/mob3.jpg" },
  { name: "LG Smart TV", price: 35999, offer: 15, category: "TVs & Appliances", image: "assets/images/mobile/tv1.jpg" },
  { name: "Sony LED TV", price: 45999, offer: 10, category: "TVs & Appliances", image: "assets/images/mobile/tv2.jpg" },
  { name: "Dell Laptop", price: 79999, offer: 8, category: "Electronics", image: "assets/images/mobile/el1.jpg" },
  { name: "HP Laptop", price: 69999, offer: 10, category: "Electronics", image: "assets/images/mobile/el2.jpg" },
  { name: "KitchenAid Mixer", price: 24999, offer: 20, category: "Home & Kitchen", image: "assets/images/mobile/home1.jpg" },
  { name: "Instant Pot", price: 9999, offer: 18, category: "Home & Kitchen", image: "assets/images/mobile/home2.jpg" },
  { name: "L'Oreal Shampoo", price: 499, offer: 5, category: "Beauty & Toys", image: "assets/images/mobile/t1.jpg" },
  { name: "Dove Soap", price: 199, offer: 7, category: "Beauty & Toys", image: "assets/images/mobile/t2.jpg" },
  { name: "Wooden Dining Table", price: 45999, offer: 12, category: "Furniture", image: "assets/images/mobile/f1.jpg" },
  { name: "Office Chair", price: 8999, offer: 15, category: "Furniture", image: "assets/images/mobile/f2.jpg" },
  { name: "Organic Almonds", price: 1299, offer: 10, category: "Grocery", image: "assets/images/mobile/g1.jpg" },
  { name: "Brown Rice", price: 599, offer: 8, category: "Grocery", image: "assets/images/mobile/g2.jpg" }
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


openImage(img: string) {
  this.selectedImage = img;
}

closeImage() {
  this.selectedImage = null;
}


}
