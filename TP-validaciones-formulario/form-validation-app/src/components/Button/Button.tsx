import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    children: ReactNode;
    onClick?: () => void;
}

const Button = ({ 
    type = 'button', 
    disabled = false, 
    children, 
    onClick 
}: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`${styles.button} ${disabled ? styles.disabled : ''}`}
            onClick={onClick}
          >
            {children}
        </button>
    );
};

export default Button;