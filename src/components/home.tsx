import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import BudgetPlanner from "./budget/BudgetPlanner";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const defaultUserData = {
  name: "John Doe",
  email: "john@example.com",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

export default function Home() {
  const { user } = useAuth();
  const userData = user
    ? {
        name: user.user_metadata?.name || defaultUserData.name,
        email: user.email || defaultUserData.email,
        avatarUrl: user.user_metadata?.avatar_url || defaultUserData.avatarUrl,
      }
    : defaultUserData;

  const handleMenuClick = () => {
    console.log("Menu clicked");
  };

  const handleNotificationsClick = () => {
    console.log("Notifications clicked");
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
  };

  const handleLogoutClick = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userData.name}
        userEmail={userData.email}
        avatarUrl={userData.avatarUrl}
        onMenuClick={handleMenuClick}
        onNotificationsClick={handleNotificationsClick}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogoutClick}
      />

      <main className="container mx-auto px-4 py-8">
        <BudgetPlanner />
      </main>
    </div>
  );
}
