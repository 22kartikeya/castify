import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Banner } from "../components/Banner";
import { useAuthStore } from "../store/useAuthStore";
import type { BroadcastMessage } from "../types";
import { DashboardHeader } from "../components/DashboardHeader";
import { base_backend_url, user_api_url } from "../config";
export const EmployeeDashboard = () => {
  const { email } = useAuthStore();
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>([]);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get<{ allBroadcast: BroadcastMessage[] }>(
        `${user_api_url}/broadcast`,
        {
          withCredentials: true,
          validateStatus: (s) => s === 200 || s === 204,
        }
      );

      if (res.status === 204) {
        setBroadcasts([]);
      } else {
        setBroadcasts(res.data.allBroadcast ?? []);
      }
    } catch (e) {
      console.error("Broadcast fetch error:", e);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const dismissMessage = async (broadcastId: string) => {
    await axios.post(
      `${user_api_url}/seen-broadcast`,
      {
        broadcastId,
      },
      { withCredentials: true }
    );
    setBroadcasts((prev) => prev.filter((b) => b.id !== broadcastId));
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
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#6a0572,_#1f1c2c,_#000428)] px-6 py-12">
      <DashboardHeader email={email} handlelogout={handlelogout}/>
      <div className="pt-24 text-white max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-5">
          Welcome to the Employee Dashboard
        </h1>
        <Banner messages={broadcasts} onDismiss={dismissMessage} />
      </div>
    </div>
  );
};
