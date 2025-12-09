import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScreenViewComponent } from './screen-view.component';

const routes: Routes = [
  { path: '', component: ScreenViewComponent }
];

@NgModule({
  declarations: [ScreenViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ScreenViewModule {}
