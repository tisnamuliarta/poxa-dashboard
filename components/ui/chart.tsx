'use client';

import * as React from 'react';
import {
    AreaChart as RechartsAreaChart,
    BarChart as RechartsBarChart,
    LineChart as RechartsLineChart,
    PieChart as RechartsPieChart,
    Area,
    Bar,
    Line,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import { cn } from '@/lib/utils';

// Re-export common Recharts components for convenience
export {
    AreaChart as RechartsAreaChart,
    BarChart as RechartsBarChart,
    LineChart as RechartsLineChart,
    PieChart as RechartsPieChart,
    Area,
    Bar,
    Line,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

// Custom Chart Container with responsive sizing
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('h-[350px] w-full', className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
            {children}
        </ResponsiveContainer>
    </div>
));
ChartContainer.displayName = 'ChartContainer';

// Custom Tooltip Component
interface TooltipPayload {
    color?: string;
    name?: string;
    value?: any;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
    className?: string;
}

const ChartTooltip = React.forwardRef<HTMLDivElement, CustomTooltipProps>(
    ({ active, payload, label, className }, ref) => {
        if (!active || !payload || !payload.length) return null;

        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-lg border border-input bg-background p-2 shadow-md',
                    className
                )}
            >
                {label && <p className="text-sm font-medium">{label}</p>}
                {payload.map((entry: TooltipPayload, index: number) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
);
ChartTooltip.displayName = 'ChartTooltip';

// Custom Legend Component with styling
const ChartLegend = React.forwardRef<HTMLDivElement, any>(
    ({ wrapperClassName, ...props }, ref) => (
        <div ref={ref} className={cn('flex justify-center gap-4', wrapperClassName)}>
            <Legend {...props} />
        </div>
    )
);
ChartLegend.displayName = 'ChartLegend';

// Convenience component for Area Charts
interface AreaChartProps {
    data: any[];
    dataKey?: string;
    stroke?: string;
    fill?: string;
    className?: string;
}

const SimpleAreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
    ({ data, dataKey = 'value', stroke = '#3b82f6', fill = '#3b82f6', className }, ref) => (
        <ChartContainer ref={ref} className={className}>
            <RechartsAreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey={dataKey} stroke={stroke} fill={fill} />
            </RechartsAreaChart>
        </ChartContainer>
    )
);
SimpleAreaChart.displayName = 'SimpleAreaChart';

// Convenience component for Bar Charts
interface BarChartProps {
    data: any[];
    dataKey?: string;
    fill?: string;
    className?: string;
}

const SimpleBarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
    ({ data, dataKey = 'value', fill = '#3b82f6', className }, ref) => (
        <ChartContainer ref={ref} className={className}>
            <RechartsBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey={dataKey} fill={fill} />
            </RechartsBarChart>
        </ChartContainer>
    )
);
SimpleBarChart.displayName = 'SimpleBarChart';

// Convenience component for Line Charts
interface LineChartProps {
    data: any[];
    dataKey?: string;
    stroke?: string;
    className?: string;
}

const SimpleLineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
    ({ data, dataKey = 'value', stroke = '#3b82f6', className }, ref) => (
        <ChartContainer ref={ref} className={className}>
            <RechartsLineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={dataKey} stroke={stroke} />
            </RechartsLineChart>
        </ChartContainer>
    )
);
SimpleLineChart.displayName = 'SimpleLineChart';

// Convenience component for Pie Charts
interface PieChartProps {
    data: any[];
    dataKey?: string;
    nameKey?: string;
    className?: string;
    colors?: string[];
}

const SimplePieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
    ({ data, dataKey = 'value', nameKey = 'name', colors, className }, ref) => {
        const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        const chartColors = colors || defaultColors;

        return (
            <ChartContainer ref={ref} className={className}>
                <RechartsPieChart>
                    <Pie
                        data={data}
                        dataKey={dataKey}
                        nameKey={nameKey}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </RechartsPieChart>
            </ChartContainer>
        );
    }
);
SimplePieChart.displayName = 'SimplePieChart';

export {
    ChartContainer,
    ChartTooltip,
    ChartLegend,
    SimpleAreaChart,
    SimpleBarChart,
    SimpleLineChart,
    SimplePieChart,
};
