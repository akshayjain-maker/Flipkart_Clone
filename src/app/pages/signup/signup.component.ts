import { Component, OnInit } from '@angular/core';
import { signupFormSchema } from './form.schema';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  _signupFormSchema = signupFormSchema;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Already logged in → redirect to Home
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(formData: any) {
    this.auth.register(formData).subscribe({
      next: (res) => {
        this.toastr.success('Account created successfully!', 'Success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error?.message || 'Signup failed', 'Error');
      }
    });
  }
}
