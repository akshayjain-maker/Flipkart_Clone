import { isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ProductCarousalModule } from './components/product-carousal/product-carousal.module'
import { FooterComponent } from './layouts/footer/footer.component'
import { HeaderComponent } from './layouts/header/header.component'
import { HomeComponent } from './pages/home/home.component'
import { AppDirectiveModule } from './reusable/directives/directive.module'
import { UtilsModule } from './services/utils.module'
import { rootEffects } from './store/effect'
import { metaReducers, reducers } from './store/reducer';
import { ScreenViewComponent } from './pages/screen-view/screen-view.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { OrderCheckoutComponent } from './pages/order-checkout/order-checkout.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component'
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountLayoutComponent } from './pages/account-layout/account-layout.component';
import { AddressesComponent } from './pages/account/addresses/addresses.component';
import { PanComponent } from './pages/account/pan/pan.component';
import { WishlistComponent } from './pages/account/wishlist/wishlist.component';


const storeDevtoolsModule = !environment.production
    ? [
          StoreDevtoolsModule.instrument({
              maxAge: 25,
              logOnly: !isDevMode()
          })
      ]
    : []

@NgModule({
    declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent,ScreenViewComponent, CategoryProductsComponent, OrderCheckoutComponent, OrderSummaryComponent, ProfileComponent, AccountLayoutComponent, AddressesComponent, PanComponent, WishlistComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(rootEffects),
        storeDevtoolsModule,
        BrowserAnimationsModule,
        CarouselModule,
        ProductCarousalModule,
        UtilsModule,
        AppDirectiveModule,
        ToastrModule.forRoot({
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right'
        }),
        ReactiveFormsModule
    ],
    providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
    bootstrap: [AppComponent]
})
export class AppModule {}
