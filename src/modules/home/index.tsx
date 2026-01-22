import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AppBanner from "../../components/appBanner";
import { ConfigContext } from "../../utils/configContext";
import type { TemplateConfig } from "../../utils/configType";
import Header from "./_components/header";
import Features from "./_components/features";
import Partners from "./_components/partners";
import Faq from "./_components/faq";
import HowItWorks from "./_components/howItWorks";
import Testimonials from "./_components/testimonials";
import VideoDemo from "./_components/videoDemo";
import StickyDownload from "../../components/stickyDownload";
import SectionCta from "../../components/sectionCta";

interface Props {
  config: TemplateConfig;
}

function Home({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <main>
        <Navbar />
        <Header />
        <Partners />
        <Features />
        <SectionCta text="Ready to organize your renovation?" variant="minimal" />
        <VideoDemo />
        <HowItWorks />
        <SectionCta text="Join thousands of homeowners" variant="minimal" />
        <Testimonials />
        <Faq />
        <AppBanner />
        <Footer />
        <StickyDownload />
      </main>
    </ConfigContext.Provider>
  );
}

export default Home;
