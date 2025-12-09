import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-screen-view',
    templateUrl: './screen-view.component.html',
    styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent {
    constructor(private router: Router) { }
    selectedImage: string | null = null;
    @ViewChild('owlCarousel', { static: false }) owlCarousel: any;
    progress = 0;

    categories = [
        "Mobiles",
        "TVs & Appliances",
        "Electronics",
        "Home & Kitchen",
        "Beauty & Toys",
        "Furniture",
        "Grocery"
    ];


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

    ngOnInit() {
        this.animateProgress();
    }

    animateProgress() {
        this.progress = 0;
        let speed = 30;  // smooth speed
        const interval = setInterval(() => {
            this.progress += 1;
            if (this.progress >= 100) {
                clearInterval(interval);
            }
        }, 30);  // 30ms → 3 seconds total
    }

    onSlideChange() {
        this.animateProgress();   // loader restart every slide 
    }

    prev() {
        this.owlCarousel.previous();
        this.onSlideChange();
    }

    next() {
        this.owlCarousel.next();
        this.onSlideChange();
    }



    bestProducts = [
        { name: "iPhone 13", price: 52999, offer: 20, image: "assets/images/mobile/mob1.jpg" },
        { name: "Samsung S22", price: 34999, offer: 30, image: "assets/images/mobile/mob2.jpg" },
        { name: "Google Pixel", price: 1499, offer: 40, image: "assets/images/mobile/mob3.jpg" },
        { name: "Realme 13", price: 2399, offer: 45, image: "assets/images/mobile/mob4.jpg" },
        { name: "Redmi Note 15", price: 4999, offer: 35, image: "assets/images/mobile/mob5.jpg" }
    ];


    openImage(img: string) {
        this.selectedImage = img;
    }

    closeImage() {
        this.selectedImage = null;
    }

    goToCategory(cat: string) {
        this.router.navigate(['/products', cat]);
    }

}
