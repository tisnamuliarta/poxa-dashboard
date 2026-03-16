// components/ui/Card.tsx
import styles from './Card.module.css';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'glass' | 'bordered';
};

export function Card({
    variant = 'default',
    className = '',
    ...props
}: CardProps) {
    return (
        <div
            className={`${styles.card} ${styles[variant]} ${className}`}
            {...props}
        />
    );
}

export function CardHeader({
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`${styles.header} ${className}`} {...props} />;
}

export function CardContent({
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`${styles.content} ${className}`} {...props} />;
}

export function CardFooter({
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`${styles.footer} ${className}`} {...props} />;
}
