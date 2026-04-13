import Link from "next/link";
import { requireSession } from "@/lib/session";
import { getStoreByUserId, getProductById } from "@/lib/queries";
import { redirect, notFound } from "next/navigation";
import { formatRupiah } from "@/lib/utils";

export default async function AdminProductViewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const productId = parseInt(params.id, 10);
  if (isNaN(productId)) notFound();

  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  const product = await getProductById(productId);
  if (!product || product.storeId !== store.id) notFound();

  const isActive = product.isActive && product.stockStatus !== "SOLD_OUT";

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant font-medium mb-4">
        <Link href="/etalase/dashboard/katalog" className="hover:text-primary transition-colors">
          Produk Saya
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface">Detail Produk</span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-on-surface">
              {product.name}
            </h1>
            <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
              isActive
                ? "bg-secondary-container text-on-secondary-container"
                : "bg-error-container text-on-error-container"
            }`}>
              {isActive ? "Aktif" : "Nonaktif"}
            </span>
          </div>
          <p className="text-on-surface-variant font-medium">
            ID: {product.id} • Terakhir diupdate {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${store.slug}`}
            target="_blank"
            className="flex-1 md:flex-none px-6 py-3 rounded-full border-2 border-outline-variant text-primary font-bold hover:bg-surface-container-low hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">visibility</span>
            Lihat Sebagai Pembeli
          </Link>
          <Link
            href={`/etalase/dashboard/katalog/${params.id}/edit`}
            className="flex-1 md:flex-none px-8 py-3 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">edit</span>
            Edit Produk
          </Link>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Product Image */}
        <div className="lg:col-span-7 space-y-8">
          {/* Image Card */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] group ghost-border">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low relative">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline/30 text-8xl">image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Price & Category Card */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border space-y-8">
            <div>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-2">Harga Jual</p>
              <span className="text-4xl font-black text-primary">{formatRupiah(Number(product.price))}</span>
            </div>
            <div className="h-px bg-outline-variant/20 w-full"></div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Kategori</p>
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-4 py-1 rounded-full text-xs font-extrabold">
                  {product.category?.name ?? "Tanpa Kategori"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Status Stok</p>
                <span className="text-on-surface font-black">
                  {product.stockStatus === "AVAILABLE" ? "Tersedia" : product.stockStatus === "SOLD_OUT" ? "Habis" : "Pre-Order"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Aksi Tambahan</p>
                <Link href={`/etalase/dashboard/katalog/${params.id}/edit`} className="text-primary hover:underline font-bold text-sm">
                  Edit Produk
                </Link>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border">
            <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">description</span>
              Deskripsi Produk
            </h3>
            <div className="text-on-surface-variant leading-relaxed font-medium">
              {product.description ? (
                <p className="whitespace-pre-wrap">{product.description}</p>
              ) : (
                <p className="italic text-outline">Belum ada deskripsi produk.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
