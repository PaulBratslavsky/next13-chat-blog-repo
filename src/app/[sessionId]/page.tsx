"use client";
import { useState, useCallback, useEffect } from "react";
import { apiRequest } from "../utils/api-functions";
import { url } from "inspector";

export default function ChatRoute({
  params,
}: {
  params: { sessionId: string };
}) {
  const [data, setData] = useState<any>({});
  const [input, setInput] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleFormSubmit(event: any) {
    setLoading(true);
    event.preventDefault();
    const formData = {
      data: {
        input: input,
        sessionId: params.sessionId,
      },
    };
    await apiRequest('/api/send-message', { method: "POST", body: JSON.stringify(formData) });
    await getSession();
    setInput("");
    setLoading(false);
  }

  const getSession = useCallback(async () => {
    const data = await apiRequest(`/api/get-session?sessionId=${params.sessionId}`, {});
    setData(data.data);
  }, []);

  useEffect(() => { 
    getSession();
  }, []);

  if (!data) return <div>No chat data!</div>;

  return (
    <div className="relative h-screen flex flex-col p-4">
      <h1 className="text-slate-300">
        Chat Session: <span className="text-slate-400">{data.sessionId}</span>
      </h1>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          <h2 className="text-slate-300">Chat Messages</h2>
          {data.history?.map((message: any, index: any) => {
            if (index === 0) return null;
            return (
              <div key={index} className="shadow-lg my-4">
                <header className="text-slate-300 font-bold bg-slate-800 py-2 px-4 mb-2 rounded-md">
                  {message.type}
                </header>
                <p className="text-slate-400 px-4">{message.data.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-auto">
        <form
          className="flex justify-between items-center gap-2"
          onSubmit={handleFormSubmit}
        >
          <label className="text-slate-300 hidden">Message</label>
          <input
            className="bg-slate-800 rounded-md p-2 flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-800 text-slate-300 rounded-md p-2 w-24"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
