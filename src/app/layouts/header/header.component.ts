import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CartProduct } from 'src/app/store/cart/cart.model';
import { CartState } from 'src/app/store/cart/cart.reducer';
import { selectCartProducts } from 'src/app/store/cart/cart.selector';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    toggleNav = false;
    showUserMenu = false;
    isLoggedIn = false;
    showLogoutPopup = false;

    quantity$ = this.store
        .select(selectCartProducts)
        .pipe(
            map((cartProducts: CartProduct[]) =>
                cartProducts.reduce((acc, curr) => acc + curr.quantity, 0)
            )
        );

    constructor(
        private store: Store<{ cart: CartState }>,
        public auth: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.isLoggedIn = this.auth.isLoggedIn();

        // live update after login/logout
        this.auth.getAuthStatus().subscribe(status => {
            this.isLoggedIn = status;
        });
    }

    toggleUserMenu() {
        this.showUserMenu = !this.showUserMenu;
    }

    logout() {
        this.auth.logout();
        this.showUserMenu = false;
        this.toastr.success('Logged out successfully', 'Success');
        this.router.navigate(['/login']);
    }

    // click outside → close dropdown
    @HostListener('document:click', ['$event'])
    clickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.user-menu')) {
            this.showUserMenu = false;
        }
    }


    openLogoutPopup() {
        this.showLogoutPopup = true;
        this.showUserMenu = false; // dropdown close
    }

    closeLogoutPopup() {
        this.showLogoutPopup = false;
    }

    confirmLogout() {
        this.showLogoutPopup = false;
        this.logout(); // existing logout method
    }

}
