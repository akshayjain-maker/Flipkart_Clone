import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { ScreenViewComponent } from './pages/screen-view/screen-view.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { OrderCheckoutComponent } from './pages/order-checkout/order-checkout.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
const routes: Routes = [
    {
        path: '',
        component: ScreenViewComponent
    },
    {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
    },
    {
        path: 'product/:productId',
        loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
    },
    {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
    },
    {
        path: 'contact',
        loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)
    },
    {
        path: 'order',
        loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
    },
    //     {
    //     path: 'screen-view',
    //     loadChildren: () => import('./pages/screen-view/screen-view.module').then(m => m.ScreenViewModule)
    // },
    { path: 'products/:category', 
        component: CategoryProductsComponent
    }
     ,
    {
        path: 'screen-view',
        component: ScreenViewComponent
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
        path: '**',
        loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
