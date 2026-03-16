import * as React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'light';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
    ({ className, size = 'md', variant = 'default', ...props }, ref) => {
        const sizeClasses = {
            sm: 'h-4 w-4 border-2',
            md: 'h-8 w-8 border-2',
            lg: 'h-12 w-12 border-3',
        };

        const variantClasses = {
            default: 'border-primary border-r-transparent',
            light: 'border-gray-200 border-r-gray-400',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'inline-block animate-spin rounded-full',
                    sizeClasses[size],
                    variantClasses[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Spinner.displayName = 'Spinner';

export { Spinner };
