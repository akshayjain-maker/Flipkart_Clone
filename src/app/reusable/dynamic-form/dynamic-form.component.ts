import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormFactory } from './dynamic-form.factory';
import { FormField } from './dynamic-form.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() formFields: FormField[] = [];
  @Input() actionTemplate?: TemplateRef<any>;
  @Input() hasResetBtn = false;

  @ViewChild('formContainer', { read: ViewContainerRef, static: true })
  formContainer!: ViewContainerRef;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formGroupEvent = new EventEmitter<FormGroup>();

  constructor(private readonly dynamicFormFactory: DynamicFormFactory) {}

  ngOnInit(): void {
    this.buildForm(this.formFields);
  }

  buildForm(formFields: FormField[]): void {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }

    this.formContainer.clear();

    formFields.forEach(field => {
      const validators = this.createValidators(field);
      const componentClass = this.dynamicFormFactory.getComponent(field.type);

      if (!componentClass) return;

      const componentRef: ComponentRef<any> =
        this.formContainer.createComponent(componentClass);

      const control = new FormControl('', validators);
      this.formGroup.addControl(field.key, control);

      componentRef.instance.control = control;
      componentRef.instance.label = field.label;
      componentRef.instance.matIcon = field.matIcon;
      componentRef.instance.placeholder = field.placeholder;

      const wrapperDiv = document.createElement('div');
      wrapperDiv.className = `w-full ${field.wrapperClass ?? 'col-span-6'}`;
      wrapperDiv.appendChild(componentRef.location.nativeElement);

      /** ✅ ERROR MESSAGE DIV */
      const errorDiv = document.createElement('div');
      errorDiv.className = 'text-red-500 text-sm mt-1 hidden';

      control.statusChanges.subscribe(() => {
        if (control.invalid && (control.touched || control.dirty)) {
          if (control.errors?.['required']) {
            errorDiv.innerText = field.errorMessage?.required || 'Required';
          } else if (control.errors?.['minlength']) {
            errorDiv.innerText = field.errorMessage?.minLength || 'Invalid format';
          } else if (control.errors?.['pattern']) {
            errorDiv.innerText = field.errorMessage?.pattern || 'Invalid format';
          }
          errorDiv.classList.remove('hidden');
        } else {
          errorDiv.classList.add('hidden');
        }
      });

      wrapperDiv.appendChild(errorDiv);
      this.formContainer.element.nativeElement.appendChild(wrapperDiv);
    });
  }

  createValidators(field: FormField): any[] {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }
    if (field.min) {
      validators.push(Validators.min(field.min));
    }
    if (field.max) {
      validators.push(Validators.max(field.max));
    }

    return validators;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // ✅ VERY IMPORTANT
      return;
    }

    this.formSubmit.emit(this.formGroup.value);
    this.formGroupEvent.emit(this.formGroup);
  }

  onReset(): void {
    this.formGroup.reset();
  }
}
