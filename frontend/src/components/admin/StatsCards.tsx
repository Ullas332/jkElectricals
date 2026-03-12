import { Inbox, Clock, CheckCircle2, BarChart3 } from "lucide-react";

interface Stats {
    total: number;
    unread: number;
    inProgress: number;
    resolved: number;
}

interface StatsCardsProps {
    stats: Stats | null;
    loading: boolean;
}

const cards = [
    {
        key: "total",
        label: "Total Enquiries",
        icon: BarChart3,
        bg: "bg-slate-100",
        iconColor: "text-slate-600",
        valueColor: "text-slate-800",
    },
    {
        key: "unread",
        label: "Unread",
        icon: Inbox,
        bg: "bg-sky-50",
        iconColor: "text-sky-600",
        valueColor: "text-sky-700",
    },
    {
        key: "inProgress",
        label: "In Progress",
        icon: Clock,
        bg: "bg-amber-50",
        iconColor: "text-amber-600",
        valueColor: "text-amber-700",
    },
    {
        key: "resolved",
        label: "Resolved",
        icon: CheckCircle2,
        bg: "bg-green-50",
        iconColor: "text-green-600",
        valueColor: "text-green-700",
    },
];

const StatsCards = ({ stats, loading }: StatsCardsProps) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => {
                const Icon = card.icon;
                const value = stats ? (stats as any)[card.key] : null;

                return (
                    <div key={card.key} className={`${card.bg} rounded-2xl p-5 flex flex-col gap-3`}>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">{card.label}</p>
                            <Icon className={`h-5 w-5 ${card.iconColor}`} />
                        </div>
                        {loading ? (
                            <div className="h-8 w-16 bg-slate-200 animate-pulse rounded-lg" />
                        ) : (
                            <p className={`text-3xl font-extrabold ${card.valueColor}`}>{value ?? "—"}</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCards;