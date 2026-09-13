import { InstagramIcon as Instagram } from '../ui/icons'
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  instagramPosts,
} from '../../data/instagram'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'

export default function InstagramGrid() {
  return (
    <section
      aria-label="اینستاگرام اکازیون"
      className="mx-auto max-w-[1320px] px-4 py-12 md:px-6 md:py-16 lg:px-8"
    >
      <Reveal className="flex flex-col items-center text-center">
        <h2 className="text-[1.3rem] font-black tracking-tight text-ink md:text-[1.7rem]">
          اکازیون را دنبال کن
        </h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13.5px] font-black text-orange transition-opacity hover:opacity-85"
        >
          <Instagram size={16} strokeWidth={2} />
          {INSTAGRAM_HANDLE}
        </a>
        <p className="mt-2.5 max-w-md text-[13px] leading-7 text-mute">
          پشت‌صحنهٔ استودیو، محصولات تازه و گوشه‌های دنجِ خانهٔ اکازیون
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-7 grid grid-cols-3 gap-2 md:mt-9 md:grid-cols-6 md:gap-3.5">
          {instagramPosts.map((post) => (
            <a
              key={post.image}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={post.caption}
              className="group relative aspect-square overflow-hidden rounded-xl bg-mist md:rounded-2xl"
            >
              <SmartImage
                src={post.image}
                alt={post.caption}
                className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-forest/0 opacity-0 transition-all duration-300 group-hover:bg-forest/45 group-hover:opacity-100">
                <Instagram size={22} strokeWidth={1.8} className="text-white" />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
