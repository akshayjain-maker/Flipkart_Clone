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
    ) { }

    onSubmit(formData: any) {
        if (!(formData.email)) {
            this.toastr.error('Invalid email domain', 'Error');
            return;
        }

        this.authService.login(formData).subscribe({
            next: (res) => {
                this.toastr.success("Login Successful!", "Success");
                this.authService.saveToken(res.token);
                this.authService.saveUser(res.user);
                this.router.navigate([res.user.role === 'ADMIN' ? '/admin' : '/']);
            },
            error: (err) => {
                this.toastr.error(err.error?.message || "Invalid credentials", "Error");
            }
        });
    }



    testNav() {
        console.log('clicked');
        this.router.navigate(['/signup']);
    }
}
