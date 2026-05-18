import { ConfigContext } from "../../utils/configContext";
import type { TemplateConfig } from "../../utils/configType";
import Navbar from "../navbar";
import Footer from "../footer";
import AppBanner from "../appBanner";
import StickyDownload from "../stickyDownload";

interface Props {
  config: TemplateConfig;
}

export function BlogNavbar({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <Navbar />
    </ConfigContext.Provider>
  );
}

export function BlogFooter({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <Footer />
    </ConfigContext.Provider>
  );
}

export function BlogAppBanner({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <AppBanner />
    </ConfigContext.Provider>
  );
}

export function BlogStickyDownload({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <StickyDownload />
    </ConfigContext.Provider>
  );
}
