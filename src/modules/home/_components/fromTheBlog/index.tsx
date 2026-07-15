import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import SectionHeading from "../../../../components/sectionHeading";

export interface BlogTeaser {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: number;
}

interface Props {
  posts: BlogTeaser[];
}

/**
 * The homepage links straight into the blog cluster. Without this every post
 * hangs off a single index page, which is a thin path for both readers and
 * crawlers.
 */
function FromTheBlog({ posts }: Props) {
  const { ui } = useContext(ConfigContext)!;
  if (!posts.length) return null;

  return (
    <section
      id="writing"
      className="mx-auto max-w-screen-lg px-4 py-20 md:py-28"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          label={ui.sectionLabels.writing}
          title={ui.blog.title}
          subtitle={ui.blog.subtitle}
        />
        <a
          href="/blog/"
          className="tick-label shrink-0 border-b-2 border-accent pb-1 text-base-content transition-colors hover:text-primary"
        >
          {ui.blog.allPosts}
        </a>
      </div>

      <ul className="mt-12 list-none divide-y divide-base-300 border-y border-base-300 p-0">
        {posts.map((post, index) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="m-0 p-0"
          >
            <a
              href={`/blog/${post.slug}/`}
              className="group flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8"
            >
              <span className="tick-label shrink-0 text-base-content/40 md:w-40">
                {post.date} · {post.minutes} min
              </span>
              <span className="flex-1">
                <span className="block font-display text-xl font-bold tracking-tight text-base-content transition-colors group-hover:text-primary md:text-2xl">
                  {post.title}
                </span>
                <span className="mt-1 block text-base-content/70">
                  {post.description}
                </span>
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default FromTheBlog;
