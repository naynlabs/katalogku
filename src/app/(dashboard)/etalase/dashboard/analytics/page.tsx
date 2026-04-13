import { requireSession } from "@/lib/session";
import { getStoreByUserId, getStoreAnalytics } from "@/lib/queries";
import { redirect } from "next/navigation";
import AnalyticsClient from "./AnalyticsClient";

export default async function AnalyticsPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  // Fetch true analytics data efficiently!
  const [weeklyAnalytics, monthlyAnalytics] = await Promise.all([
    getStoreAnalytics(store.id, 7),
    getStoreAnalytics(store.id, 30),
  ]);

  // Transform raw SQL grouping into chart format
  const formatData = (analyticsOptions: { viewsDaily: any[]; clicksDaily: any[] }, daysBack: number) => {
    const dataObj: Record<string, { views: number; clicks: number; label: string }> = {};
    const dateList: string[] = [];
    
    for (let i = daysBack - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const isoStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
      const formatLabel = new Intl.DateTimeFormat("id-ID", {
        weekday: daysBack === 7 ? "short" : undefined,
        day: daysBack > 7 ? "2-digit" : undefined,
        month: daysBack > 7 ? "short" : undefined
      }).format(d);
      
      dataObj[isoStr] = { views: 0, clicks: 0, label: formatLabel };
      dateList.push(isoStr);
    }

    analyticsOptions.viewsDaily.forEach((v) => {
      if (dataObj[v.dateStr]) dataObj[v.dateStr].views = Number(v.count);
    });
    analyticsOptions.clicksDaily.forEach((c) => {
      if (dataObj[c.dateStr]) dataObj[c.dateStr].clicks = Number(c.count);
    });

    return dateList.map((iso) => ({
      day: (dataObj[iso] as any).label,
      views: dataObj[iso].views,
      clicks: dataObj[iso].clicks,
    }));
  };

  const serializedWeekly = formatData(weeklyAnalytics, 7);
  const serializedMonthly = formatData(monthlyAnalytics, 30);

  return (
    <AnalyticsClient
      weeklyData={serializedWeekly}
      monthlyData={serializedMonthly}
    />
  );
}
