import { MotionConfig } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AppBanner from "../../components/appBanner";
import { ConfigContext } from "../../utils/configContext";
import type { TemplateConfig } from "../../utils/configType";
import Header from "./_components/header";
import Stakes from "./_components/stakes";
import Features from "./_components/features";
import Capabilities from "./_components/capabilities";
import Comparison from "./_components/comparison";
import Pricing from "./_components/pricing";
import Faq from "./_components/faq";
import HowItWorks from "./_components/howItWorks";
import Testimonials from "./_components/testimonials";
import VideoDemo from "./_components/videoDemo";
import FromTheBlog, { type BlogTeaser } from "./_components/fromTheBlog";
import StickyDownload from "../../components/stickyDownload";

interface Props {
  config: TemplateConfig;
  posts?: BlogTeaser[];
}

function Home({ config, posts = [] }: Props) {
  return (
    // The homepage paints its own fields, so a light/dark switch would do
    // nothing here; the blog and the other pages keep it.
    <ConfigContext.Provider value={{ ...config, showThemeSwitch: false }}>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main>
          <Header />
          <Stakes />
          <Features />
          <VideoDemo />
          <HowItWorks />
          <Comparison />
          <Capabilities />
          <Testimonials />
          <Pricing />
          <FromTheBlog posts={posts} />
          <Faq />
          <AppBanner />
        </main>
        <Footer />
        <StickyDownload />
      </MotionConfig>
    </ConfigContext.Provider>
  );
}

export default Home;
