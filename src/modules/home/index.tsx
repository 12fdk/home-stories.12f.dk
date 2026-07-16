import { MotionConfig } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AppBanner from "../../components/appBanner";
import { ConfigContext } from "../../utils/configContext";
import type { TemplateConfig } from "../../utils/configType";
import Header from "./_components/header";
import Facts from "./_components/facts";
import Features from "./_components/features";
import Capabilities from "./_components/capabilities";
import Comparison from "./_components/comparison";
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
    <ConfigContext.Provider value={config}>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main>
          <Header />
          <Facts />
          <Features />
          <Capabilities />
          <VideoDemo />
          <HowItWorks />
          <Comparison />
          <Testimonials />
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
