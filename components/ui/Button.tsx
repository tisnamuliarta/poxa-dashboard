// components/ui/Button.tsx
import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
};

export function Button({
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            {...props}
        />
    );
}
