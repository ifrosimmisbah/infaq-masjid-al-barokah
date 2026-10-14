"use client";

import React, { useState } from "react";
import {
  UserCheck,
  UserPlus,
  Shield,
  Mail,
  Phone,
  CheckCircle2,
  Edit3,
} from "lucide-react";
import { MOCK_PENGGUNA, Pengguna } from "@/data/mockData";
import { DemoBadge, DemoNoticeBanner } from "@/components/ui/DemoBadge";
import { Modal } from "@/components/ui/Modal";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

export default function PenggunaPage() {
  const [userList, setUserList] = useState<Pengguna[]>(MOCK_PENGGUNA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Pengguna | null>(null);

  // Simulator
  const [simulatedState, setSimulatedState] = useState<"normal" | "loading" | "empty" | "error">("normal");

  // Form State
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    role: "Amil Penerimaan" as Pengguna["role"],
    noHp: "",
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: Pengguna = {
      id: `USR-${String(userList.length + 1).padStart(3, "0")}`,
      nama: formData.nama,
      email: formData.email,
      role: formData.role,
      noHp: formData.noHp || "-",
      terakhirMasuk: "Baru ditambahkan",
      status: "Aktif",
    };

    setUserList([...userList, newUser]);
    setIsAddModalOpen(false);
    setFormData({
      nama: "",
      email: "",
      role: "Amil Penerimaan",
      noHp: "",
    });
  };

  const getRoleBadge = (role: Pengguna["role"]) => {
    switch (role) {
      case "Ketua DKM":
        return "bg-emerald-900 text-amber-300 border-emerald-700";
      case "Bendahara Utama":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "Amil Penerimaan":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Amil Penyaluran":
        return "bg-teal-50 text-teal-800 border-teal-200";
      default:
        return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  return (
    <div className="space-y-6">
      <DemoNoticeBanner />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-serif">
            Manajemen Pengguna & Amil
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Kelola hak akses pengurus DKM, bendahara kas, dan amil operasional infaq.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Simulator switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-[11px]">
            <span className="text-stone-400 px-2 font-medium">Uji Tampilan:</span>
            <button
              onClick={() => setSimulatedState("normal")}
              className={`px-2 py-1 rounded-lg font-semibold ${
                simulatedState === "normal"
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setSimulatedState("loading")}
              className={`px-2 py-1 rounded-lg font-semibold ${
                simulatedState === "loading"
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              Loading
            </button>
            <button
              onClick={() => setSimulatedState("empty")}
              className={`px-2 py-1 rounded-lg font-semibold ${
                simulatedState === "empty"
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              Empty
            </button>
            <button
              onClick={() => setSimulatedState("error")}
              className={`px-2 py-1 rounded-lg font-semibold ${
                simulatedState === "error"
                  ? "bg-white text-rose-800 shadow-2xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              Error
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-all hover:scale-[1.01]"
          >
            <UserPlus className="w-4 h-4 text-amber-300" />
            + Tambah Pengguna
          </button>
        </div>
      </div>

      {simulatedState === "loading" && (
        <LoadingState message="Memeriksa otoritas dan daftar amil..." rows={4} />
      )}

      {simulatedState === "error" && (
        <ErrorState
          title="Gagal Memuat Daftar Pengguna"
          message="Tidak dapat memverifikasi tabel hak akses amil pada server simulasi."
          onRetry={() => setSimulatedState("normal")}
        />
      )}

      {simulatedState === "empty" && (
        <EmptyState
          title="Belum Ada Pengguna Terdaftar"
          description="Sistem belum memiliki akun pengurus amil lain selain administrator utama."
          icon={UserCheck}
          actionText="Tambah Amil Pertama"
          onAction={() => {
            setSimulatedState("normal");
            setIsAddModalOpen(true);
          }}
        />
      )}

      {simulatedState === "normal" && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-stone-200">
                  <th className="py-3.5 px-4 md:px-6">Nama Pengguna</th>
                  <th className="py-3.5 px-4">Email & WhatsApp</th>
                  <th className="py-3.5 px-4">Hak Akses / Peran</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Aktivitas Terakhir</th>
                  <th className="py-3.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {userList.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-amber-50/20 transition-colors"
                  >
                    {/* Nama */}
                    <td className="py-3.5 px-4 md:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 font-bold flex items-center justify-center text-xs">
                          {user.nama.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">
                              {user.nama}
                            </span>
                            <DemoBadge size="sm" />
                          </div>
                          <span className="text-[11px] text-stone-400">
                            ID: {user.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email & Phone */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-[11px]">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Mail className="w-3 h-3 text-stone-400" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-400">
                          <Phone className="w-3 h-3" />
                          <span>{user.noHp}</span>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${getRoleBadge(
                          user.role
                        )}`}
                      >
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {user.status}
                      </span>
                    </td>

                    {/* Terakhir Masuk */}
                    <td className="py-3.5 px-4 text-stone-500">
                      {user.terakhirMasuk}
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-800 hover:text-white text-slate-600 text-xs font-semibold transition-all shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-stone-50/70 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Total: {userList.length} Akun Amil Pengelola</span>
            <span className="text-[11px] text-stone-400">
              Autentikasi role-based siap dihubungkan
            </span>
          </div>
        </div>
      )}

      {/* Modal Tambah Pengguna */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Akun Amil / Pengurus"
        description="Buat akun pengguna baru dengan hak akses yang disesuaikan"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Lengkap & Gelar *
            </label>
            <input
              type="text"
              required
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              placeholder="Contoh: Ustadz M. Ridwan, S.Ag."
              className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Resmi Akun *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="nama@albarokah.id"
              className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Peran / Hak Akses *
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as Pengguna["role"],
                  })
                }
                className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              >
                <option value="Ketua DKM">Ketua DKM (Super Admin)</option>
                <option value="Bendahara Utama">Bendahara Utama</option>
                <option value="Amil Penerimaan">Amil Penerimaan Infaq</option>
                <option value="Amil Penyaluran">Amil Penyaluran Infaq</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                No WhatsApp
              </label>
              <input
                type="text"
                value={formData.noHp}
                onChange={(e) =>
                  setFormData({ ...formData, noHp: e.target.value })
                }
                placeholder="0812-xxxx-xxxx"
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Daftarkan Pengguna
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      {selectedUser && (
        <Modal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          title={`Edit Hak Akses: ${selectedUser.nama}`}
          description={`ID Pengguna: ${selectedUser.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-stone-400 block mb-1">Email Akun</span>
              <span className="font-semibold text-slate-800">
                {selectedUser.email}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ubah Peran / Jabatan
              </label>
              <select
                defaultValue={selectedUser.role}
                className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              >
                <option value="Ketua DKM">Ketua DKM (Super Admin)</option>
                <option value="Bendahara Utama">Bendahara Utama</option>
                <option value="Amil Penerimaan">Amil Penerimaan Infaq</option>
                <option value="Amil Penyaluran">Amil Penyaluran Infaq</option>
              </select>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-stone-100 rounded-lg"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="px-3 py-1.5 text-xs bg-emerald-800 text-white font-semibold rounded-lg"
              >
                Perbarui Peran
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
