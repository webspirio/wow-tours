import { Wallet, FileSignature, GitCompareArrows, Workflow as WorkflowIcon } from "lucide-react";
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { TERMS } from "@/lib/proposal-data";

export function Terms() {
  return (
    <section id="section-7" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <FadeIn>
        <SectionHeader
          number="7"
          title="Умови співпраці"
          subtitle="Прозоро, без сюрпризів. Все, що зазвичай питають перед підписанням договору."
        />
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FadeIn delay={0.05}>
          <TermCard icon={Wallet} title="Графік платежів">
            <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-border">
              <span className="bg-violet" style={{ width: "50%" }} />
              <span className="bg-pink" style={{ width: "30%" }} />
              <span className="bg-yellow" style={{ width: "20%" }} />
            </div>
            <ul className="space-y-2 text-sm">
              {TERMS.paymentSchedule.map((p) => (
                <li key={p.percent} className="flex gap-2">
                  <span className="font-display w-10 shrink-0 text-lg font-semibold text-ink">{p.percent}%</span>
                  <span className="text-mute">
                    <span className="text-ink">{p.when}</span> — {p.detail}
                  </span>
                </li>
              ))}
            </ul>
          </TermCard>
        </FadeIn>

        <FadeIn delay={0.1}>
          <TermCard icon={FileSignature} title="Договір">
            <p className="mb-2 text-sm text-mute">Український, із посиланням на чітко прописаний обсяг робіт. Включає:</p>
            <ul className="space-y-1.5 text-sm">
              {TERMS.contract.map((c) => (
                <li key={c} className="flex gap-2 text-ink">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-mute-soft" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </TermCard>
        </FadeIn>

        <FadeIn delay={0.15}>
          <TermCard icon={GitCompareArrows} title="Зміни в обсязі (change requests)">
            <p className="text-sm leading-relaxed text-ink">{TERMS.changeRequests}</p>
          </TermCard>
        </FadeIn>

        <FadeIn delay={0.2}>
          <TermCard icon={WorkflowIcon} title="Робочий процес">
            <ol className="space-y-2 text-sm">
              {TERMS.workflow.map((w, i) => (
                <li key={w} className="flex gap-3">
                  <span className="font-display flex size-6 shrink-0 items-center justify-center rounded-full bg-violet/10 text-xs font-semibold text-violet">
                    {i + 1}
                  </span>
                  <span className="text-ink">{w}</span>
                </li>
              ))}
            </ol>
          </TermCard>
        </FadeIn>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-mute">
        <span className="font-semibold text-ink">Гарантійний період:</span> {TERMS.warranty}
      </p>
    </section>
  );
}

function TermCard({ icon: Icon, title, children }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-white p-6 ring-1 ring-ink/5">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-lg bg-violet/10 p-2 text-violet">
          <Icon className="size-4" />
        </span>
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      </div>
      {children}
    </div>
  );
}
