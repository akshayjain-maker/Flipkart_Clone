import { FormField } from 'src/app/reusable/dynamic-form/dynamic-form.interface'

export const loginFormSchema: FormField[] = [
    {
        key: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        wrapperClass: 'col-span-12',
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+$',
        errorMessage: {
            required: 'Email is required',
            pattern: 'Invalid email format'
        }
    },
    {
        key: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        wrapperClass: 'col-span-12',
        minLength: 8,
        errorMessage: {
            required: 'Password is required',
            minLength: 'Password must be at least 8 characters'
        }
    }
];

