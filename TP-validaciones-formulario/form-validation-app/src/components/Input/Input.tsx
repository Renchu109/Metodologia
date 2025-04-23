import { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
    label: string;
    name: string;
    value: string;
    type: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const Input = ({ label, name, value, type, handleChange, error }: InputProps) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
          <input
              id={name}
              name={name}
              type={type}
              value={value}
              onChange={handleChange}
              className={`${styles.input} ${error ? styles.inputError : ''}`}
          />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Input;