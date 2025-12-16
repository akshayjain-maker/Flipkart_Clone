import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DynamicFormModule } from 'src/app/reusable/dynamic-form/dynamic-form.module'
import { SignupComponent } from './signup.component'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
const routes: Routes = [
    {
        path: '',
        component: SignupComponent
    }
]

@NgModule({
    declarations: [SignupComponent],
    imports: [CommonModule,
    ReactiveFormsModule,DynamicFormModule, RouterModule.forChild(routes)],
    exports: []
})
export class SignupModule {}
