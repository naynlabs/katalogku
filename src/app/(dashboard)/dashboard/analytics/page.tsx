import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">Ringkasan Performa</h1>
          <p className="text-on-surface-variant text-sm mt-1 font-medium">
            Pantau pertumbuhan toko Anda secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest p-1 rounded-full shadow-sm border border-outline-variant/10">
          <button className="px-4 py-2 text-xs font-bold rounded-full bg-secondary-fixed text-on-secondary-fixed-variant">
            7 Hari
          </button>
          <button className="px-4 py-2 text-xs font-bold rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
            30 Hari
          </button>
          <button className="px-4 py-2 text-xs font-bold rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
            Kustom
          </button>
          <span className="material-symbols-outlined text-sm px-2 text-on-surface-variant">
            calendar_today
          </span>
        </div>
      </div>

      {/* Scoreboard Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Kunjungan */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="flex items-center text-[10px] font-black text-secondary-fixed-variant bg-secondary-fixed/50 px-2 py-1 rounded-full gap-1">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              12%
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">
              Total Kunjungan
            </p>
            <h3 className="text-4xl font-black mt-1 text-on-surface">1,284</h3>
          </div>
        </div>

        {/* Card 2: Dilihat */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <span className="flex items-center text-[10px] font-black text-secondary-fixed-variant bg-secondary-fixed/50 px-2 py-1 rounded-full gap-1">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              8.4%
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">
              Produk Dilihat
            </p>
            <h3 className="text-4xl font-black mt-1 text-on-surface">5,432</h3>
          </div>
        </div>

        {/* Card 3: Klik WA */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl transition-all border-l-4 border-l-error">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <span className="material-symbols-outlined text-secondary-container-variant">chat</span>
            </div>
            <span className="flex items-center text-[10px] font-black text-error gap-1 bg-error-container/50 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
              2.1%
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">
              Klik WhatsApp
            </p>
            <h3 className="text-4xl font-black mt-1 text-on-surface">158</h3>
          </div>
        </div>
      </div>

      {/* Asymmetric Layout: Trend & Popular Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Trend Chart (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-black tracking-tight text-on-surface">Tren Pengunjung</h3>
            <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant px-3 py-1.5 bg-surface-container rounded-full">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Minggu Ini
              </div>
            </div>
          </div>

          {/* Simplified Visual Representation of a Chart */}
          <div className="relative h-64 w-full flex items-end justify-between gap-2 mt-auto">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-outline-variant/20 w-full h-px"></div>
              <div className="border-t border-outline-variant/20 w-full h-px"></div>
              <div className="border-t border-outline-variant/20 w-full h-px"></div>
              <div className="border-t border-outline-variant/20 w-full h-px border-dashed"></div>
            </div>

            {/* Bars */}
            {[
              { day: 'Sen', height: '40%' },
              { day: 'Sel', height: '60%' },
              { day: 'Rab', height: '55%' },
              { day: 'Kam', height: '85%' },
              { day: 'Jum', height: '70%' },
              { day: 'Sab', height: '95%' },
            ].map((stat, idx) => (
              <div key={idx} className="relative group flex-1 flex flex-col items-center gap-3">
                <div
                  className="w-full bg-primary/20 rounded-t-xl transition-all duration-300 group-hover:bg-primary/40 group-hover:-translate-y-1"
                  style={{ height: stat.height }}
                ></div>
                <span className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant">
                  {stat.day}
                </span>
              </div>
            ))}
            
            {/* Highlighted Today */}
            <div className="relative group flex-1 flex flex-col items-center gap-3">
              <div
                className="w-full bg-gradient-to-t from-primary to-primary-container rounded-t-xl transition-all duration-300 ring-4 ring-primary/20 hover:ring-primary/40 group-hover:-translate-y-1 shadow-lg shadow-primary/30"
                style={{ height: '45%' }}
              ></div>
              <span className="text-[10px] uppercase font-black tracking-widest text-primary">
                Min
              </span>
            </div>
          </div>
        </div>

        {/* Right: Popular Products */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black tracking-tight text-on-surface">Produk Populer</h3>
            <button className="text-primary text-xs font-bold hover:underline px-3 py-1 bg-primary/10 rounded-full">
              Lihat Semua
            </button>
          </div>
          
          <div className="space-y-6">
            {[
              {
                title: "Jam Tangan Minimalis",
                category: "Fashion & Aksesoris",
                views: "1.2k",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBw7g27iBPWTJoFDqvjMJ9t8-uYIU0bNpPtHmh-75e3nJ8Jzmn5EBhNtvXlfpUF3KMUSVOgfFGkwC_Wr0abRbScKbmQM2jk5nwuS3zGeCXJDm3pE8g9QyJNCoeZweXmy0cX2Gq5IJrNlz7f5-nUNTNLTXpTgWOIHAZbF_HuO7S2lv9d7NP087LbbqQNrFxefXKOSs4gdaZi_0JL1ya-4pa9p_7Ki_8hF--R6OBRhDOcqg3ObyamPn4Ubh1E59CHgevpqHAZxSEbnXn"
              },
              {
                title: "Sepatu Lari Pro X",
                category: "Olahraga",
                views: "856",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcVmXeeYqHuyvY-9nBbQAVq7zd35YitdrThGaL4aEve_Cabjm3FeBz3eG1Lg_jOO62jLT_hCaVC4wNVtoZzfdVCcSaIwB5hAHvvpCoCoaFuwumtpryjeMVGa6w02fXnR1Pg1PFMHThCfUkdOJckibCZQvHCephsgDy17KC3Chf3EiWJN8ObX1joRJQmZ5TWvIjDptt4evhjL0QFHrMYRHTBLpJj3_v5nvzDto-1Byy__qeZuCP8eqq861bpVUKzklbMdnFH3EIEFBE"
              },
              {
                title: "Headset Bluetooth",
                category: "Elektronik",
                views: "742",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZWGCOe2JnNd262clbvov3QO77VSPP4VrFLQi8NDW43PvJva_Nieg6DAg37tJRcekDQQFEaEk5qXxfDBQM4l0yeIkt-g4jrNdjy3cxY5lt6p3bfPZEPYP2JeFhZZypdaKuTwsXVLn1E0Dj5eKAEkyERxMXg399PsHEeiMHqzu8t2VoSrXLhppB_tFep8bzdr9LJ6911R0xPj_0ySf61b0B12CV2zN7QYAtJFkAr18cbeorqAdT7ESseRVRpxZB0jSBUeb-2Cz3sPOB"
              },
              {
                title: "Kacamata Retro",
                category: "Fashion",
                views: "611",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQnhxiUXbi5vte3LWQd3RlFbsA8LwWpe_am7zoJjK9I_ppxcRzkb5tGdqRKeNjrRj2TT4tHFTg8lRrNdlIoGfNvHd_B2SB_lvsNfexVnc3mgrclpsqHxR_Jm3OLk6v90O4UUK16Wf_HJ0s2Mbx3VdhsHqLCbM48l0tM1oKdIl4N0ksPR_Z8jJM72jDBoP8ueXZoScg7kSbV-MDQ8mBwhjzCbNA_pvoOTklLknBQfE9jHSYw6MqLwhmDZS4Tx7ihUWVivsJccL1xMSe"
              }
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-surface-container/50 p-2 -mx-2 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shadow-sm group-hover:shadow-md transition-shadow">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface line-clamp-1 mb-0.5">{p.title}</p>
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">{p.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-primary">{p.views}</p>
                  <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-black">Views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
