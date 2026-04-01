"use client";

import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { puckConfig } from "../../lib/puck-config";
import { usePuckStorage } from "../../lib/use-puck-storage";

/**
 * @page /edit
 * @description Full Puck visual editor. Saves data to /api/save.
 * Protect this route with auth middleware in production.
 */
export default function EditPage() {
  const { data, loading, save } = usePuckStorage({ path: "/" });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "1rem",
          color: "#6b7280",
        }}
      >
        Loading editor…
      </div>
    );
  }

  return (
    <Puck
      config={puckConfig}
      data={(data as Parameters<typeof Puck>[0]["data"]) ?? {}}
      onPublish={save}
    />
  );
}
