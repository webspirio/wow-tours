import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { INCLUDED, NOT_INCLUDED } from "@/lib/tour-data";

function List({ items, icon: Icon, iconClass, title }) {
  return (
    <div>
      <h3 className="font-display text-3xl md:text-4xl mb-6">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <motion.li
            key={item.text}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="flex items-start gap-3 py-3 border-b border-border last:border-0"
          >
            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconClass}`}>
              <Icon className="w-4 h-4" strokeWidth={3} />
            </span>
            <div className="flex-1">
              <span className="text-2xl mr-2">{item.icon}</span>
              <span className="text-base">{item.text}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function Included() {
  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-violet/[0.03] via-pink/[0.02] to-yellow/[0.03]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <List
          items={INCLUDED}
          icon={Check}
          iconClass="bg-success/15 text-success"
          title="У вартість входить"
        />
        <List
          items={NOT_INCLUDED}
          icon={X}
          iconClass="bg-danger/15 text-danger"
          title="Окремо оплачуєте"
        />
      </div>
    </section>
  );
}
