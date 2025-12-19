import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { ScreenViewComponent } from './pages/screen-view/screen-view.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { OrderCheckoutComponent } from './pages/order-checkout/order-checkout.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountLayoutComponent } from './pages/account-layout/account-layout.component';
import { AddressesComponent } from './pages/account/addresses/addresses.component';
import { PanComponent } from './pages/account/pan/pan.component';
import { WishlistComponent } from './pages/account/wishlist/wishlist.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
const routes: Routes = [

  // ================= USER SITE =================
  {
    path: '',
    component: MainLayoutComponent,
    children: [

      { path: '', component: ScreenViewComponent },

      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.module').then(m => m.ProductsModule)
      },

      {
        path: 'product/:productId',
        loadChildren: () =>
          import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule)
      },

      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login/login.module').then(m => m.LoginModule)
      },

      {
        path: 'signup',
        loadChildren: () =>
          import('./pages/signup/signup.module').then(m => m.SignupModule)
      },

      {
        path: 'about',
        loadChildren: () =>
          import('./pages/about/about.module').then(m => m.AboutModule)
      },

      {
        path: 'contact',
        loadChildren: () =>
          import('./pages/contact/contact.module').then(m => m.ContactModule)
      },

      {
        path: 'cart',
        loadChildren: () =>
          import('./pages/cart/cart.module').then(m => m.CartModule)
      },

      {
        path: 'order',
        loadChildren: () =>
          import('./pages/order/order.module').then(m => m.OrderModule)
      },

      {
        path: 'products/:category',
        component: CategoryProductsComponent
      },

      {
        path: 'checkout',
        component: OrderCheckoutComponent
      },

      {
        path: 'order-summary',
        component: OrderSummaryComponent
      },

      {
        path: 'account',
        component: AccountLayoutComponent,
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'addresses', component: AddressesComponent },
          { path: 'pan', component: PanComponent },
          { path: 'wishlist', component: WishlistComponent }
        ]
      }
    ]
  },

  // ================= ADMIN PANEL =================
  {
    path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)

    // component: AdminLayoutComponent,
    // // canActivate: [AdminGuard], // baad me add karenge
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'dashboard',
    //     pathMatch: 'full'
    //   },
  
    // ]
  },

  // ================= 404 =================
  {
    path: '**',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
