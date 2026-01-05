import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
    showUserMenu = false;

    constructor(private router: Router, private auth: AuthService, private toastr: ToastrService) { }

    toggleUserMenu() {
        this.showUserMenu = !this.showUserMenu;
    }

    logout() {
        // Clear token/session here
        this.auth.logout();
        this.showUserMenu = false;
        this.toastr.success('Logged out successfully', 'Success');
        this.router.navigate(['/login']);
    }
}
