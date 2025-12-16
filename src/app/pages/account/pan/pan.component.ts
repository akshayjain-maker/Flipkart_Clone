import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PanService } from 'src/app/services/pan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pan',
  templateUrl: './pan.component.html',
  styleUrls: ['./pan.component.scss']
})
export class PanComponent implements OnInit {
  panForm!: FormGroup;
  editMode: boolean = true;

  constructor(
    private fb: FormBuilder,
    private panService: PanService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.panForm = this.fb.group({
      panNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      fullName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]]
    });

    // Force uppercase for PAN
    this.panForm.get('panNumber')?.valueChanges.subscribe(value => {
      if (value) {
        const upper = value.toUpperCase();
        if (value !== upper) this.panForm.get('panNumber')?.setValue(upper, { emitEvent: false });
      }
    });

    this.loadPan();
  }

  loadPan() {
    this.panService.getPan().subscribe({
      next: (res: any) => {
        if (res) {
          this.panForm.patchValue(res);
          this.disableForm(); // disable if already saved
        } else {
          this.enableForm(); // new PAN, editable
        }
      },
      error: (err) => console.error(err)
    });
  }

  enableForm() {
    this.editMode = true;
    this.panForm.enable();
  }

  disableForm() {
    this.editMode = false;
    this.panForm.disable();
  }

  savePan() {
    if (this.panForm.invalid) {
      this.toastr.error('Please fill all required fields correctly');
      return;
    }

    this.panService.savePan(this.panForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'PAN info saved');
        this.disableForm(); // disable after save
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to save PAN info');
      }
    });
  }

  cancel() {
    this.loadPan();
  }

  enableEdit() {
    this.enableForm();
  }
}


