import * as yup from 'yup';

export const formSchema = yup.object().shape({
    nombre: yup
      .string()
      .required('El nombre es obligatorio')
      .min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: yup
      .string()
      .email('Ingrese un correo electrónico válido')
      .required('El correo electrónico es obligatorio'),
    password: yup
      .string()
      .required('La contraseña es obligatoria')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
      .required('Por favor confirme su contraseña')
});

export type FormData = yup.InferType<typeof formSchema>;