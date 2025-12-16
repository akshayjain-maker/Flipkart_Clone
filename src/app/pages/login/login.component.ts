import { Component } from '@angular/core';
import { loginFormSchema } from './form.schema';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  _loginFormSchema = loginFormSchema;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

    onSubmit(formData: any) {
    this.authService.login(formData).subscribe({
        next: (res) => {
            console.log(res, "Login Response");
        this.toastr.success("Login Successful!", "Success");

        this.authService.saveToken(res.token);
        this.router.navigate(['/screen-view']);
        },
        error: (err) => {
        this.toastr.error(err.error?.message || "Invalid credentials", "Error");
        }
    });
    }
}
