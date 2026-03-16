// components/dashboard/StatsCard.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import styles from './StatsCard.module.css';

interface StatsCardProps {
    title: string;
    value: string | number;
    unit?: string;
    change?: number;
    icon?: React.ReactNode;
    status?: 'active' | 'warning' | 'error';
}

export function StatsCard({
    title,
    value,
    unit,
    change,
    icon,
    status = 'active',
}: StatsCardProps) {
    return (
        <Card className={styles.statsCard}>
            <CardContent>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    {status === 'active' && <div className={styles.indicator} />}
                </div>
                <div className={styles.content}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <div className={styles.value}>
                        <span className={styles.number}>{value}</span>
                        {unit && <span className={styles.unit}>{unit}</span>}
                    </div>
                </div>
                {change !== undefined && (
                    <div className={styles.change}>
                        <Badge variant={change >= 0 ? 'success' : 'danger'} size="sm">
                            {change >= 0 ? '+' : ''}{change}%
                        </Badge>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
