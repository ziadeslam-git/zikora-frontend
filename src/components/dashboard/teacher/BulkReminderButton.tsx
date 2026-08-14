"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function BulkReminderButton() {
  const [status, setStatus] = useState<"idle" | "confirm" | "sending" | "sent">("idle");

  const handleClick = () => {
    if (status === "idle") {
      setStatus("confirm");
    } else if (status === "confirm") {
      setStatus("sending");
      setTimeout(() => {
        setStatus("sent");
        setTimeout(() => setStatus("idle"), 3000);
      }, 1000);
    }
  };

  return (
    <Button
      variant={status === "confirm" ? "danger" : "gradient"}
      size="sm"
      className="shrink-0"
      onClick={handleClick}
      disabled={status === "sending" || status === "sent"}
    >
      {status === "idle" && "ابعت تذكير جماعي"}
      {status === "confirm" && "تأكيد الإرسال؟"}
      {status === "sending" && "جاري الإرسال..."}
      {status === "sent" && "تم الإرسال ✓"}
    </Button>
  );
}
