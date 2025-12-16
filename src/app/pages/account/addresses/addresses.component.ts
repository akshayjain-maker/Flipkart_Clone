import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  showForm = false;
  editId: number | null = null;

  addressForm!: FormGroup;
  addresses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      locality: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      landmark: [''],
      alternatePhone: [''],
      addressType: ['HOME', Validators.required]
    });

    this.loadAddresses();
  }

  

  loadAddresses() {
    this.addressService.getAll().subscribe((res: any) => {
      this.addresses = res;
    });
  }

  addNewAddress() {
    this.showForm = true;
    this.editId = null;
    this.addressForm.reset({ addressType: 'HOME' });
  }

  editAddress(address: any) {
    this.showForm = true;
    this.editId = address.id;
    this.addressForm.patchValue(address);
  }

saveAddress() {
  console.log('Form Valid:', this.addressForm.valid);
  console.log('Payload:', this.addressForm.value);

  if (this.addressForm.invalid) {
    this.toastr.warning('Please fill all required fields correctly');
    return;
  }

  const apiCall = this.editId
    ? this.addressService.update(this.editId, this.addressForm.value)
    : this.addressService.add(this.addressForm.value);

  apiCall.subscribe({
    next: (res:any) => {
      this.toastr.success(res.message || 'Address saved successfully');
      this.showForm = false;
      this.loadAddresses();
    },
    error: (err) => {
      console.error(err);
      this.toastr.error('Failed to save address');
    }
  });
}




  deleteAddress(id: number) {
    if (!confirm('Delete this address?')) return;

    this.addressService.delete(id).subscribe(() => {
      this.loadAddresses();
    });
  }

  cancel() {
    this.showForm = false;
  }
}
