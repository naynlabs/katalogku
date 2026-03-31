import Link from "next/link";

export default function DashboardOverview() {
  return (
    <>
      {/* Welcome Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 mt-4">
        <div className="lg:col-span-8 bg-gradient-to-br from-primary to-primary-container rounded-xl p-8 text-on-primary relative overflow-hidden flex flex-col justify-center min-h-[220px]">
          <div className="relative z-10">
            <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Etalase Aktif
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
              Performa tokomu naik 12% minggu ini!
            </h2>
            <p className="text-on-primary-container/90 max-w-md">
              Terus tingkatkan promosi link etalasemu ke pelanggan setia.
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 p-8 hidden md:block">
            <span className="material-symbols-outlined text-white/20 text-9xl">trending_up</span>
          </div>
        </div>
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 tonal-depth flex flex-col justify-between">
          <div>
            <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">Link Etalase</h3>
            <div className="flex flex-col gap-3">
              <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between">
                <span className="font-medium text-primary truncate text-sm">katalogku.id/butik-clarissa</span>
                <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[20px]">content_copy</span>
                </button>
              </div>
              <Link href="/butik-clarissa" className="w-full py-3 bg-secondary-container text-on-secondary-fixed-variant font-bold rounded-full text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform text-center block">
                Bagikan Link
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { icon: "ads_click", label: "Klik Katalog", value: "1,284", change: "+24%", color: "primary", width: "70%" },
          { icon: "shopping_bag", label: "Total Pesanan", value: "356", change: "+8%", color: "secondary", width: "45%" },
          { icon: "forum", label: "Klik WhatsApp", value: "89", change: "-2%", color: "tertiary", width: "30%", negative: true },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 tonal-depth group hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-fixed flex items-center justify-center rounded-full`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${stat.negative ? "text-on-error-container bg-error-container/30" : "text-on-secondary-container bg-secondary-container/30"}`}>
                {stat.change}
              </span>
            </div>
            <h4 className="text-on-surface-variant text-sm font-medium">{stat.label}</h4>
            <p className="text-3xl font-black text-on-surface mt-1">{stat.value}</p>
            <div className="mt-4 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className={`h-full bg-${stat.color} rounded-full`} style={{ width: stat.width }} />
            </div>
          </div>
        ))}
      </section>

      {/* Recent Orders & Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-on-surface">Pesanan Terbaru</h3>
            <button className="text-primary font-bold text-sm hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {[
              { name: "Yellow Summer Dress", buyer: "Sarah Wijaya", price: "Rp 245.000", status: "Lunas", statusColor: "bg-secondary-container/20 text-on-secondary-container" },
              { name: "Beige Blazer Pro", buyer: "Ahmad Dani", price: "Rp 512.000", status: "Proses", statusColor: "bg-primary-container/20 text-on-primary-container" },
              { name: "Skincare Set Radiant", buyer: "Lina Marlina", price: "Rp 890.000", status: "Menunggu", statusColor: "bg-surface-container-high text-on-surface-variant" },
            ].map((order) => (
              <div key={order.name} className="bg-surface-container-lowest p-4 rounded-lg flex items-center justify-between border border-outline-variant/5 hover:scale-[1.01] transition-transform cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">shopping_bag</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-on-surface">{order.name}</h5>
                    <p className="text-xs text-on-surface-variant">Oleh: {order.buyer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-on-surface">{order.price}</p>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <h3 className="text-xl font-bold text-on-surface mb-6">Analitik Mingguan</h3>
          <div className="bg-surface-container-low rounded-xl p-6 h-[280px] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-end px-4 gap-2">
              {[40, 60, 30, 80, 50, 95, 65].map((h, i) => (
                <div key={i} className="flex-1 bg-primary rounded-t-lg" style={{ height: `${h}%`, opacity: 0.2 + (h / 100) * 0.8 }} />
              ))}
            </div>
            <div className="z-10 text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">bar_chart</span>
              <p className="text-on-surface-variant text-sm font-medium">
                Grafik pengunjung meningkat pesat pada hari Jumat &amp; Sabtu.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
