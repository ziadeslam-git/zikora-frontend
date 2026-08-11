"use client";

import { useState } from "react";
import { PricingToggle, type PricingMode } from "@/components/pricing/PricingToggle";
import { PricingCards } from "@/components/pricing/PricingCards";

/**
 * PricingSection — Client Component managing mode toggle state
 * and passing it down to PricingCards.
 */
export function PricingSection() {
  const [mode, setMode] = useState<PricingMode>("subscription");

  return (
    <div className="space-y-10">
      <PricingToggle mode={mode} onChange={setMode} />
      <PricingCards mode={mode} />
    </div>
  );
}
