"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Props = {
  fullName?: string | null;
  address?: string | null;
  email?: string | null;
};

export default function AccountPanel({ fullName, address, email }: Props) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } finally {
      // simple redirect after sign out
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Information</h2>
      

      <div className="mb-4">
        <p className="text-xs text-gray-400">登録名</p>
        <p className="text-lg font-medium">{fullName ?? "未登録"}</p>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-400">住所</p>
        <p className="text-lg">{address ?? "未登録の住所"}</p>
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-400">メール</p>
        <p className="text-lg">{email ?? "未登録"}</p>
      </div>

      <button
        onClick={handleSignOut}
        className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-black text-white hover:bg-white hover:text-gray-600 hover:border-2 hover:border-black rounded-md transition duration-400"
        disabled={loading}
      >
        {loading ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
}
