// UI Components Index - Export all components from here
// Usage: import { Button, Card, Dialog } from '@/components/ui'

// Core components
export { Button, buttonVariants, type ButtonProps } from './Button';
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardAction } from './Card';
export { Input } from './input';
export { Label } from './label';
export { Textarea } from './textarea';
export { Checkbox } from './checkbox';

// Dialogs & Overlays
export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from './dialog';
export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent } from './popover';

// Menus & Selection
export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
} from './dropdown-menu';

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
} from './select';

// Tabs & Tables
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './table';

// Status & Feedback
export { Badge, badgeVariants, type BadgeProps } from './Badge';
export { Alert, AlertTitle, AlertDescription, alertVariants } from './alert';
export { Spinner } from './spinner';

// Charts
export {
    ChartContainer,
    ChartTooltip,
    ChartLegend,
    SimpleAreaChart,
    SimpleBarChart,
    SimpleLineChart,
    SimplePieChart,
    // Re-exports from recharts
    RechartsAreaChart,
    RechartsBarChart,
    RechartsLineChart,
    RechartsPieChart,
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
} from './chart';

// Pagination
export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './pagination';

// Utilities
export { cn } from '@/lib/utils';
