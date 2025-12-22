"use client";

export function UpgradeButton() {
  const handleUpgrade = async () => {
    const response = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await response.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <button 
      onClick={handleUpgrade}
      className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm hover:underline transition-all"
    >
      Upgrade to Pro &rarr;
    </button>
  );
}