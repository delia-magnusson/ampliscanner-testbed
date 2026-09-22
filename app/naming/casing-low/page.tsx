"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingCasingLowPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });

    // 6 events using snake_case (dominant style).
    instance.track("checkout_started", { order_id: "ord_1001", cart_total_usd: 82 });
    instance.track("payment_method_added", { payment_type: "card", card_brand: "visa" });
    instance.track("coupon_applied", { coupon_code: "SAVE10", discount_percent: 10 });
    instance.track("shipping_address_saved", { shipping_country: "US", shipping_method: "standard" });
    instance.track("order_confirmed", { order_id: "ord_1001", order_total_usd: 74 });
    instance.track("receipt_emailed", { receipt_id: "rcpt_5521", email_domain: "example.test" });

    // 4 events using camelCase (under 50% - below the deviation threshold).
    instance.track("wishlistItemAdded", { itemId: "sku_4471", wishlistName: "holiday" });
    instance.track("productReviewSubmitted", { reviewRating: 5, productId: "sku_4471" });
    instance.track("giftCardRedeemed", { cardCode: "GC-88213", redeemedAmount: 25 });
    instance.track("referralLinkShared", { referralCode: "REF-JD", shareChannel: "email" });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/casing-low" />
      <main className="page">
        <h1>Naming — Casing (Low)</h1>
        <p>
          Fires 10 custom events on load; 4 of them (under 50%) use camelCase property keys
          against a snake_case majority, to exercise the key-casing signal at MEDIUM severity.
        </p>
      </main>
    </>
  );
}
