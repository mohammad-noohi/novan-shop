import React from "react";

export default function DashboardCardStat({
  title,
  stat,
  icon: Icon, // آیکون اصلی
  trendIcon: TrendIcon, // آیکون صعود/نزول
  trendValue,
  trendColor = "text-emerald-500", // رنگ پیشفرض سبز برای صعود
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 border border-slate-200 dark:border-slate-800 transition-all dark:bg-suface-dark ">
      <div className="inline-flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 p-3">{Icon && <Icon className="size-6" />}</div>
      <div>
        <h6 className="text-lg font-semibold text-slate-600 dark:text-slate-300">{title}</h6>
        <p className="text-2xl font-semibold leading-4">{stat}</p>
        {trendValue && TrendIcon && (
          <p className={`mt-2 flex items-center gap-1 text-xs ${trendColor}`}>
            <TrendIcon className="size-4" />
            <span>{trendValue}</span>
          </p>
        )}
      </div>
    </div>
  );
}
