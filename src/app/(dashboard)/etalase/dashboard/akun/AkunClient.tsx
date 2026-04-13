"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { 
  changeEmailSchema, ChangeEmailFormData,
  changePasswordSchema, ChangePasswordFormData 
} from "@/lib/validations";

export default function AkunClient({ initialEmail }: { initialEmail: string }) {
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Email Form
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: initialEmail || ""
    }
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
    setError: setPasswordError
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSaveEmail = async (data: ChangeEmailFormData) => {
    if (data.email === initialEmail) return;
    setIsUpdatingEmail(true);
    
    try {
      const { data: resData, error } = await authClient.changeEmail({
        newEmail: data.email,
        callbackURL: "/etalase/dashboard/akun" // in case verification needed later
      });

      if (error) {
        alert(error.message || "Gagal mengubah email");
      } else {
        alert("Email berhasil diperbarui ke " + data.email);
        // Better Auth will update the session in the background
      }
    } catch (err: any) {
      alert("Terjadi kesalahan server");
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const onUpdatePassword = async (data: ChangePasswordFormData) => {
    setIsUpdatingPassword(true);
    
    try {
      const { data: resData, error } = await authClient.changePassword({
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
        revokeOtherSessions: true
      });

      if (error) {
        // Typically error.status or error.code
        if (error?.message?.includes("Incorrect") || error?.message?.includes("password")) {
           setPasswordError("currentPassword", { message: "Kata sandi saat ini salah" });
        } else {
           alert(error?.message || "Gagal mengubah kata sandi");
        }
      } else {
        alert("Kata sandi berhasil diperbarui!");
        resetPasswordForm();
      }
    } catch (err: any) {
       alert("Terjadi kesalahan sistem saat mengubah sandi");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("PERINGATAN: Tindakan ini tidak dapat dibatalkan. Semua data toko Anda akan dihapus!");
    if (!confirm) return;

    // Optional double check
    const confirm2 = window.prompt("Ketik 'HAPUS' untuk melanjutkan penghapusan akun:");
    if (confirm2 !== "HAPUS") return;

    setIsDeleting(true);
    try {
      const { data, error } = await authClient.deleteUser();
      if (error) {
        alert("Gagal menghapus akun: " + error.message);
        setIsDeleting(false);
      } else {
        // Berhasil, otomatis redirect or signout (if needed, usually handled)
        window.location.href = "/";
      }
    } catch (err) {
      alert("Terjadi masalah pada server.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Keamanan Akun
          </h2>
          <p className="text-on-surface-variant text-sm">
            Atur kredensial login dan privasi akun Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 max-w-5xl">
        
        {/* Update Email */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/20 tonal-depth flex flex-col">
          <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">mail</span>
            Alamat Email
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">Gunakan alamat email aktif untuk menerima notifikasi tagihan dan perizinan akses akun.</p>
          
          <form onSubmit={handleSubmitEmail(onSaveEmail)} className="mt-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Email Saat Ini</label>
              <input 
                type="email" 
                {...registerEmail("email")}
                className={`w-full bg-surface-container-low border-2 ${emailErrors.email ? 'border-error' : 'border-transparent'} focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface font-medium outline-none transition-colors`}
                disabled={isUpdatingEmail}
              />
              {emailErrors.email && <p className="text-error text-xs font-bold mt-1 ml-1">{emailErrors.email.message}</p>}
            </div>
            <button 
              type="submit" 
              disabled={isUpdatingEmail}
              className="px-6 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
            >
              {isUpdatingEmail && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
              Simpan Perubahan
            </button>
          </form>
        </div>

        {/* Update Password */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/20 tonal-depth flex flex-col">
          <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">key</span>
            Ubah Kata Sandi
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">Buat kata sandi yang kuat dengan kombinasi huruf dan angka.</p>
          
          <form onSubmit={handleSubmitPassword(onUpdatePassword)} className="space-y-4">
            <div>
              <input 
                type="password" 
                placeholder="Kata sandi saat ini"
                {...registerPassword("currentPassword")}
                className={`w-full bg-surface-container-low border-2 ${passwordErrors.currentPassword ? 'border-error' : 'border-transparent'} focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface font-medium outline-none transition-colors`}
                disabled={isUpdatingPassword}
              />
              {passwordErrors.currentPassword && <p className="text-error text-xs font-bold mt-1 ml-1">{passwordErrors.currentPassword.message}</p>}
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Kata sandi baru"
                {...registerPassword("newPassword")}
                className={`w-full bg-surface-container-low border-2 ${passwordErrors.newPassword ? 'border-error' : 'border-transparent'} focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface font-medium outline-none transition-colors`}
                disabled={isUpdatingPassword}
              />
              {passwordErrors.newPassword && <p className="text-error text-xs font-bold mt-1 ml-1">{passwordErrors.newPassword.message}</p>}
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Konfirmasi sandi baru"
                {...registerPassword("confirmPassword")}
                className={`w-full bg-surface-container-low border-2 ${passwordErrors.confirmPassword ? 'border-error' : 'border-transparent'} focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface font-medium outline-none transition-colors`}
                disabled={isUpdatingPassword}
              />
              {passwordErrors.confirmPassword && <p className="text-error text-xs font-bold mt-1 ml-1">{passwordErrors.confirmPassword.message}</p>}
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isUpdatingPassword}
                className="px-6 py-3 bg-surface-container-high text-on-surface-variant hover:text-on-surface rounded-full font-bold hover:bg-outline-variant/20 transition-all text-sm disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
              >
                {isUpdatingPassword && <span className="w-4 h-4 border-2 border-on-surface-variant/30 border-t-on-surface-variant rounded-full animate-spin"></span>}
                Perbarui Kata Sandi
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="md:col-span-2 bg-error-container/30 border border-error/20 p-8 rounded-3xl tonal-depth mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-error mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span>
                Hapus Akun Permanen
              </h3>
              <p className="text-sm text-on-surface-variant">Tindakan ini tidak dapat dibatalkan. Semua data toko, katalog, dan tautan bio Anda akan dihapus dari server.</p>
            </div>
            <button 
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="px-6 py-3 bg-error text-white rounded-full font-bold shadow-lg shadow-error/20 hover:scale-[1.02] active:scale-95 transition-all text-sm shrink-0 whitespace-nowrap flex items-center gap-2 disabled:opacity-50"
            >
              {isDeleting && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
              Hapus Akun Saya
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
