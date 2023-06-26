"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewChat, apiRequest } from "../utils/api-functions";

export default function StartNewChatButton({ callback } : { callback: () => void }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleStartNewChat() {
    setLoading(true);
    const response = await apiRequest("/api/create-session", { method: "POST" });

    if (response.data) {
      const sessionId = response.data.sessionId;
      callback();
      router.push(`/${sessionId}`);
    }

    setLoading(false);
  }

  return (
    <button className="border border-slate-100 text-slate-100 rounded-md py-1 px-2" onClick={handleStartNewChat}>
      {loading ? "Initializing Chat..." : "Start a new chat 🚀"}
    </button>
  );
};
