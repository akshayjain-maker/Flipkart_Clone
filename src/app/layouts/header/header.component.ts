import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { CartProduct } from 'src/app/store/cart/cart.model'
import { CartState } from 'src/app/store/cart/cart.reducer'
import { selectCartProducts } from 'src/app/store/cart/cart.selector'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  toggleNav: boolean = false;

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
    private router: Router    ,
    private toastr: ToastrService    
  ) {}

  logout() {
    this.auth.logout();
    this.toastr.success('Logged out successfully', 'Success');
    this.router.navigate(['/login']);   
  }
}
