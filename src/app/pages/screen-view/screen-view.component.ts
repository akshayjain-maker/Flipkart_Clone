import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent implements OnInit {
  selectedImage: string | null = null;
  selectedProduct: any = null;
  @ViewChild('owlCarousel', { static: false }) owlCarousel: any;
  progress = 0;

  // Dynamic categories + pagination
  categories: any[] = [];
  page: number = 1;
  limit: number = 10;
  totalPages: number = 1;

  banners: string[] = [
    'assets/images/banners/banner5.jpg',
    'assets/images/banners/banner2.jpg',
    'assets/images/banners/banner3.jpg',
    'assets/images/banners/banner4.jpg',
    'assets/images/banners/banner1.jpg',
  ];

  bannerOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    items: 1,
    dots: false,
    nav: false
  };

    bestProducts = [
        { name: "iPhone 13", price: 52999, offer: 20, image: "assets/images/mobile/mob1.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
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
      ]
     },
        { name: "Samsung S22", price: 34999, offer: 30, image: "assets/images/mobile/mob2.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
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
      ]
     },
        { name: "Google Pixel", price: 14999, offer: 40, image: "assets/images/mobile/mob3.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
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
      ]
     },
        { name: "Realme 13", price: 23999, offer: 45, image: "assets/images/mobile/mob4.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
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
      ]
     },
        { name: "Redmi Note 15", price: 49999, offer: 35, image: "assets/images/mobile/mob5.jpg",description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
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
      ]
     }
    ];

  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    this.animateProgress();
    this.loadCategories(this.page);
  }

  animateProgress() {
    this.progress = 0;
    const interval = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) clearInterval(interval);
    }, 30);
  }

  onSlideChange() {
    this.animateProgress();
  }

  prev() {
    this.owlCarousel.previous();
    this.onSlideChange();
  }

  next() {
    this.owlCarousel.next();
    this.onSlideChange();
  }

  openImage(img: string) {
    const product = this.bestProducts.find(p => p.image === img);
    this.selectedProduct = product || null;
    this.selectedImage = img;
  }

  closeImage() {
    this.selectedImage = null;
  }

  goToCategory(cat: string) {
    this.router.navigate(['/products', cat]);
  }

  buyNow() {
    this.router.navigate(['/checkout'], { state: { product: this.selectedProduct } });
  }

  /** 🔹 Load categories dynamically with limit and page */
  loadCategories(page: number) {
    this.categoryService.getCategories(page, this.limit).subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.page = res.pagination.page;
        this.totalPages = res.pagination.totalPages;
      },
      error: (err) => console.error(err)
    });
  }

  /** Pagination controls */
  nextPage() {
    if (this.page < this.totalPages) {
      this.loadCategories(this.page + 1);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.loadCategories(this.page - 1);
    }
  }
}
