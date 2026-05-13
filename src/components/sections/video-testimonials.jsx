import { motion } from "motion/react";
import { Play } from "lucide-react";
import { SectionDivider } from "@/components/ui/section-divider";
import { TESTIMONIAL_VIDEOS } from "@/lib/tour-data";

export function VideoTestimonials() {
  return (
    <section className="py-20 md:py-28 px-6 bg-ink text-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionDivider title="Відгуки" className="mb-6" />
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Туристи розповідають <em className="text-yellow">самі</em>
          </h2>
          <p className="text-paper/60 text-lg max-w-2xl mx-auto">
            Без скриптів і реклами — клікніть на відео і слухайте.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TESTIMONIAL_VIDEOS.map((video, idx) => (
            <motion.div
              key={`${video.name}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
              aria-label={`Відео-відгук від ${video.name} (демо)`}
              role="figure"
            >
              <img
                src={video.thumbnail}
                alt={video.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-pink/95 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                <Play className="w-6 h-6 md:w-7 md:h-7 ml-1" fill="currentColor" />
              </div>

              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-yellow text-ink text-[10px] font-bold uppercase tracking-wider">
                Демо
              </div>

              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-ink/70 text-paper text-xs font-medium">
                {video.duration}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-semibold text-base text-paper">{video.name}</div>
                <div className="text-xs text-paper/70">{video.city}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
