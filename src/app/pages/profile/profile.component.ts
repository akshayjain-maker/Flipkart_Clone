import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editMode = false;
  profileForm!: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProfile();
  }

  /** FORM INIT */
  initForm() {
    this.profileForm = this.fb.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
    //   lastName: [{ value: '', disabled: true }, Validators.required],
      gender: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }, Validators.required]
    });
  }

  /** GET PROFILE */
    loadProfile() {
    this.userService.getProfile().subscribe({
        next: (res: any) => {
        this.user = res.user;

        this.profileForm.patchValue({
            firstName: this.user.name || '',
            // lastName: this.user.lastName || '',
            gender: this.user.gender || '',
            email: this.user.email || '',
            phone: this.user.phone || ''
        });
        },
        error: () => {
        this.toastr.error('Failed to load profile');
        }
    });
    }


  /** ENABLE EDIT */
  enableEdit() {
    this.editMode = true;
    this.profileForm.enable();
    this.profileForm.get('email')?.disable(); // email locked
  }

  /** CANCEL EDIT */
  cancelEdit() {
    this.editMode = false;
    this.profileForm.reset(this.user);
    this.profileForm.disable();
  }

  /** SAVE PROFILE */
  saveProfile() {
    if (this.profileForm.invalid) {
      this.toastr.warning('Please fill required fields');
      return;
    }

    const payload = {
      firstName: this.profileForm.value.firstName,
    //   lastName: this.profileForm.value.lastName,
      gender: this.profileForm.value.gender,
      phone: this.profileForm.value.phone
    };

    this.userService.updateProfile(payload).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully');
        this.editMode = false;
        this.profileForm.disable();
        this.loadProfile();
      },
      error: () => {
        this.toastr.error('Update failed');
      }
    });
  }

  /** LOGOUT */
  logout() {
    // clear token + redirect
  }
}
