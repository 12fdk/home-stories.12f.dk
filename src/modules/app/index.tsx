import { useEffect } from "react";
import { getMobileOperatingSystem } from "utils/common";
import { trackAppStoreClick } from "utils/tracking";
import type { TemplateConfig } from "utils/configType";

interface Props {
  config: TemplateConfig;
}

function AppRedirectionPage({ config }: Props) {
  const { googlePlayLink, appStoreLink } = config;

  useEffect(() => {
    const platform = getMobileOperatingSystem();

    // Only the iOS branch is an App Store click. The Android and desktop
    // branches go elsewhere and would inflate the count if tracked here.
    if (platform === "ios" && appStoreLink) {
      // Fire-and-redirect: trackAppStoreClick resolves as soon as the beacon
      // is away and self-caps at 300ms, so a blocked or slow Umami can't
      // strand anyone on a page whose only job is to forward them.
      void trackAppStoreClick("app-redirect").then(() => {
        window.location.href = appStoreLink;
      });
      return;
    }

    if (platform === "android" && googlePlayLink)
      window.location.href = googlePlayLink;
    else window.location.href = "/";
  }, [googlePlayLink, appStoreLink]);

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <span className="loading loading-dots w-16"></span>
      <h1 className="text-center max-w-xs md:max-w-md text-xl">
        We're sending you to our app. If nothing happens, you'll be redirected
        shortly.
      </h1>
    </main>
  );
}

export default AppRedirectionPage;
