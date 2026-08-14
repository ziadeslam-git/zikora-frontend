import { useState, useEffect } from "react";
import { AdminOverviewStats, AdminGrowthPoint, PendingTeacher, AdminAlert } from "../lib/types";
import { fetchAdminStats, fetchGrowthAnalytics, fetchPendingTeachers, fetchAdminAlerts } from "../lib/mockAdapter";

export function useAdminOverview() {
  const [stats, setStats] = useState<AdminOverviewStats | null>(null);
  const [growthData, setGrowthData] = useState<AdminGrowthPoint[] | null>(null);
  const [pendingTeachers, setPendingTeachers] = useState<PendingTeacher[] | null>(null);
  const [alerts, setAlerts] = useState<AdminAlert[] | null>(null);
  
  const [loading, setLoading] = useState({
    stats: true,
    growth: true,
    teachers: true,
    alerts: true,
  });

  const [error, setError] = useState({
    stats: false,
    growth: false,
    teachers: false,
    alerts: false,
  });

  useEffect(() => {
    // Fetch stats
    fetchAdminStats()
      .then(setStats)
      .catch(() => setError(prev => ({ ...prev, stats: true })))
      .finally(() => setLoading(prev => ({ ...prev, stats: false })));

    // Fetch growth analytics
    fetchGrowthAnalytics()
      .then(setGrowthData)
      .catch(() => setError(prev => ({ ...prev, growth: true })))
      .finally(() => setLoading(prev => ({ ...prev, growth: false })));

    // Fetch pending teachers
    fetchPendingTeachers()
      .then(setPendingTeachers)
      .catch(() => setError(prev => ({ ...prev, teachers: true })))
      .finally(() => setLoading(prev => ({ ...prev, teachers: false })));

    // Fetch alerts
    fetchAdminAlerts()
      .then(setAlerts)
      .catch(() => setError(prev => ({ ...prev, alerts: true })))
      .finally(() => setLoading(prev => ({ ...prev, alerts: false })));

  }, []);

  // Expose mutation placeholders that only update local state until real API is connected
  const approveTeacher = (id: string) => {
    setPendingTeachers(prev => prev ? prev.filter(t => t.id !== id) : null);
  };

  const rejectTeacher = (id: string) => {
    setPendingTeachers(prev => prev ? prev.filter(t => t.id !== id) : null);
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev ? prev.filter(a => a.id !== id) : null);
  };

  return {
    data: {
      stats,
      growthData,
      pendingTeachers,
      alerts,
    },
    loading,
    error,
    actions: {
      approveTeacher,
      rejectTeacher,
      dismissAlert,
    }
  };
}
