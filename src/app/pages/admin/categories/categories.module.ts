import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,              // ✅ NGMODEL FIX
    CategoriesRoutingModule
  ]
})
export class CategoriesModule {}
