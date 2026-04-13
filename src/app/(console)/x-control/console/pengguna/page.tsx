import { getAdminUsers } from "@/lib/queries";
import PenggunaClient from "./PenggunaClient";

export default async function ConsoleUsersPage() {
  const users = await getAdminUsers();

  // Serialize dates for client component
  const serializedUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
    storeId: u.storeId,
    storeName: u.storeName,
    storeSlug: u.storeSlug,
    storeIsActive: u.storeIsActive ?? true,
    storeCategory: u.storeCategory,
    productCount: u.productCount,
    viewCount: u.viewCount,
    orderCount: u.orderCount,
  }));

  return <PenggunaClient users={serializedUsers} />;
}
