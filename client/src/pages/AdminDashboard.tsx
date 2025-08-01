import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { DashboardHeader } from "../components/DashboardHeader";
import type { TableData } from "../types";
import { MessageTable } from "../components/MessageTable";
import { admin_api_url, base_backend_url } from "../config";

export const AdminDashboard = () => {
  const { email } = useAuthStore();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ broadcasts: TableData[] }>(
        `${admin_api_url}/all-broadcast`,
        { withCredentials: true }
      );
      setData(res.data.broadcasts || []);
      setError(null);
    } catch (e) {
      console.error("Fetch failed:", e);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(
        `${admin_api_url}/broadcast/${id}`,
        {
          withCredentials: true,
        }
      );
      setData((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error("Delete failed:", e);
    } finally {
      setDeletingId(null);
    }
  };


  async function handlelogout() {
    try {
      await axios.post(
        `${base_backend_url}/logout`,
        {},
        { withCredentials: true }
      );
      clearAuth();
    } catch (e) {
      console.log("Logout failed: ", e);
    }
  }

  async function handleCreateMessage(){

  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#6a0572,_#1f1c2c,_#000428)] px-6 py-12">
      <DashboardHeader
        email={email}
        handlelogout={handlelogout}
        handleCreateMessage={handleCreateMessage}
      />
      <div className="pt-24 text-white max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-5">
          Welcome to the Admin Dashboard
        </h1>

        {loading && <div className="mb-4">Loading...</div>}
        {error && <div className="mb-4 text-red-400">{error}</div>}

        <MessageTable
          data={data}
          onDelete={handleDelete}
          isDeletingId={deletingId}
        />
      </div>
    </div>
  );
};
