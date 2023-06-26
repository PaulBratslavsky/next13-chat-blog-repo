"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import StartNewChatButton from "./StartNewChatButton";
import { apiRequest } from "../utils/api-functions";


export default function SideNav() {
  const [data, setData] = useState<any[]>([]);

  const getSession = useCallback(async () => {
    const data = await apiRequest('/api/get-sessions', {});
    setData(data.data);
  }, []);

  const deleteSession = useCallback(async (sessionId: string) => {
    await apiRequest(`/api/delete-session?sessionId=${sessionId}`, { method: "POST" });
    alert("Session deleted");
    await getSession();
  }, []);

  useEffect(() => {
    getSession();
  }, []);

  return (
    <aside className="col-span-1 bg-slate-900 overflow-scroll flex flex-col p-4">
      <StartNewChatButton callback={getSession} />
      <div className="mt-4">
        <h2 className="text-slate-100 font-bold mb-2">Chat Sessions</h2>
        <ul className="text-slate-300">
          {data &&
            data.map((session: any, index: any) => {
              return (
                <li key={session} className="flex justify-between items-center mb-2">
                  <Link href={`${session}`}>Session {session.slice(0,8)}</Link>
                  <button
                    className="border border-slate-300 text-slate-300 text-xs rounded-md py-1 px-2"
                    onClick={() => deleteSession(session)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </aside>
  );
}
