// components/ui/Badge.tsx
import styles from './Badge.module.css';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md' | 'lg';
};

export function Badge({
    variant = 'default',
    size = 'md',
    className = '',
    ...props
}: BadgeProps) {
    return (
        <span
            className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}
            {...props}
        />
    );
}
