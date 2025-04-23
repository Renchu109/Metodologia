import { useState, FormEvent, ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { formSchema, FormData } from '../../schemas/formSchema';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Form.module.css';

const initialValues: FormData = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const Form = () => {
    const [formData, setFormData] = useState<FormData>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    //Validamos los datos ingresados del usuario
    const validateField = async (name: keyof FormData, value: string) => {
        try {
            await formSchema.validateAt(name, { ...formData, [name]: value });
            
            //En caso de que la validación sea exitosa, se elimina el error para ese campo
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors[name];
              return newErrors;
            });
        } catch (error) {

          //Si hay error de validación, se lo agrega al estado de errores
            if (error instanceof yup.ValidationError) {
                setErrors(prev => ({
                ...prev,
                [name]: error.message
                }));
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        //Se actualiza el estado del formulario
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        //Se valida el campo que se acaba de modificar
        validateField(name as keyof FormData, value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        //Validamos todo el formulario antes de enviarlo
        try {
            await formSchema.validate(formData, { abortEarly: false });
            
            //En caso de ser exitosa, mostramos la alerta de éxito y posteriormente se resetea el formulario
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Formulario enviado correctamente',
              confirmButtonColor: '#4a90e2'
            });
            
            setFormData(initialValues);
            setErrors({});

        } catch (error) {
            //En caso de que la validación haya fallado, creamos un objeto con todos los errores
            if (error instanceof yup.ValidationError) {
                const newErrors: Partial<Record<keyof FormData, string>> = {};
                error.inner.forEach(err => {
                    if (err.path) {
                        newErrors[err.path as keyof FormData] = err.message;
                    }
                });
                setErrors(newErrors);
            }
        }
    };

    //Verificamos si hay errores para deshabilitar el botón
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Registro de Usuario</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label="Nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    handleChange={handleChange}
                    error={errors.nombre}
                />
                <Input
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    handleChange={handleChange}
                    error={errors.email}
                />
                <Input
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={formData.password}
                    handleChange={handleChange}
                    error={errors.password}
                />
                <Input
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    handleChange={handleChange}
                    error={errors.confirmPassword}
                />
                <div className={styles.buttonContainer}>
                    <Button type="submit" disabled={hasErrors}>
                        Registrarse
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Form;