"use client";

type HubSpotQueue = Array<["showBanner"]>;

export function CookieSettingsButton() {
  function showCookieBanner() {
    const hubSpotWindow = window as typeof window & { _hsp?: HubSpotQueue };
    const queue = (hubSpotWindow._hsp ??= []);

    queue.push(["showBanner"]);
  }

  return (
    <button
      type="button"
      id="hs_show_banner_button"
      className="cursor-pointer bg-transparent p-0 font-inherit text-inherit transition duration-150 hover:text-indigo-600"
      onClick={showCookieBanner}
    >
      Cookie Settings
    </button>
  );
}
