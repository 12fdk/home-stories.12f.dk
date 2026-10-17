import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";

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

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The homepage links straight into the blog cluster. Without this every post
 * hangs off a single index page, which is a thin path for both readers and
 * crawlers. Set as a reading list: the title large, what it answers beside it.
 */
function FromTheBlog({ posts }: Props) {
  const { ui } = useContext(ConfigContext)!;
  if (!posts.length) return null;

  return (
    <section id="writing" data-field="light" className="hs-light hs-section">
      <div className="hs-wrap">
        <div className="hs-grid items-end gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="hs-head m-0 max-w-[20ch]" data-reveal>
              {ui.blog.title}
            </h2>
            <p className="hs-lead m-0 mt-5 max-w-[36ch]" data-reveal style={d(80)}>
              {ui.blog.subtitle}
            </p>
          </div>
          <p className="col-span-12 m-0 md:col-span-4 md:justify-self-end" data-reveal style={d(120)}>
            <a href="/blog/" className="hs-link">
              {ui.blog.allPosts}
            </a>
          </p>
        </div>

        <ul className="m-0 mt-16 list-none space-y-4 p-0 md:mt-24">
          {posts.map((post, index) => (
            <li key={post.slug} className="m-0 p-0" data-reveal style={d(index * 80)}>
              <a href={`/blog/${post.slug}/`} className="hs-post hs-grid gap-y-2 px-0 py-6 md:py-8">
                <span className="hs-lead col-span-12 font-semibold md:col-span-6">
                  {post.title}
                </span>
                <span className="col-span-12 md:col-span-5 md:col-start-8">
                  {post.description}
                  <span className="hs-soft mt-2 block">
                    {post.date} · {post.minutes} min
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FromTheBlog;
