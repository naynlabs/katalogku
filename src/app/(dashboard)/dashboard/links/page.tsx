import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons";

export default function LinksPage() {
  const links = [
    { icon: "storefront", title: "Etalase Utama", url: "katalogku.id/butik-clarissa", active: true },
    { icon: "campaign", title: "Promo Ramadhan", url: "katalogku.id/butik-clarissa/promo", active: true },
    { icon: "local_shipping", title: "Info Pengiriman", url: "katalogku.id/butik-clarissa/shipping", active: false },
  ];

  const socialLinks = [
    { icon: <InstagramIcon className="w-6 h-6" />, platform: "Instagram", handle: "@butikclarissa", connected: true },
    { icon: <TikTokIcon className="w-6 h-6" />, platform: "TikTok", handle: "@butikclarissa", connected: true },
    { icon: <WhatsAppIcon className="w-6 h-6" />, platform: "WhatsApp", handle: "+62 812 3456 7890", connected: true },
  ];

  return (
    <>
      <section className="mt-4 mb-8">
        <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Kelola Link</h2>
        <p className="text-on-surface-variant">Atur tautan bio dan social untuk etalase kamu.</p>
      </section>

      {/* Link Bio Preview */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-on-surface">Link Bio</h3>
          <button className="px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span> Tambah Link
          </button>
        </div>
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.title} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 tonal-depth flex items-center justify-between hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">{link.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{link.title}</h4>
                  <p className="text-sm text-primary font-medium">{link.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${link.active ? "bg-primary" : "bg-surface-container-high"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-transform ${link.active ? "right-1" : "left-1"}`} />
                </div>
                <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
                  <span className="material-symbols-outlined text-xl">more_vert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Links */}
      <section>
        <h3 className="text-xl font-bold text-on-surface mb-6">Social Media</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map((s) => (
            <div key={s.platform} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 tonal-depth">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
                  {typeof s.icon === "string" ? <span className="material-symbols-outlined">{s.icon}</span> : s.icon}
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{s.platform}</h4>
                  <p className="text-sm text-on-surface-variant">{s.handle}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.connected ? "bg-secondary-container/30 text-on-secondary-container" : "bg-surface-container-high text-on-surface-variant"}`}>
                  {s.connected ? "Terhubung" : "Belum terhubung"}
                </span>
                <button className="text-sm font-bold text-primary hover:underline">
                  {s.connected ? "Edit" : "Hubungkan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
