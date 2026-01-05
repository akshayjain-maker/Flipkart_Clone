import { FormField } from 'src/app/reusable/dynamic-form/dynamic-form.interface';

export const signupFormSchema: FormField[] = [
  {
    key: 'name',
    type: 'text',
    label: 'Full Name',
    required: true,
    minLength: 2,
    maxLength: 30,
    matIcon: 'person',
    wrapperClass: 'col-span-12'
  },

  {
    key: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    minLength: 8,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$',
    errorMessage: {
      required: 'Email is required',
      pattern: 'Enter a valid email address'
    },
    wrapperClass: 'col-span-12'
  },

  {
    key: 'password',
    type: 'password',
    label: 'Password',
    required: true,
    minLength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$',
    errorMessage: {
      required: 'Password is required',
      minLength: 'Password must be at least 8 characters',
      pattern:
        'Password must contain uppercase, lowercase, number & special character'
    },
    wrapperClass: 'col-span-12'
  }
];
