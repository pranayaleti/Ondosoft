import { memo } from "react";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  LifeBuoy,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We deep-dive into your business goals, users, and market to define a clear technical roadmap.",
    icon: Search,
    duration: "1-2 weeks",
  },
  {
    num: "02",
    title: "Design & Architecture",
    desc: "Interactive prototypes and system architecture designed for scalability and stellar UX.",
    icon: PenTool,
    duration: "1-2 weeks",
  },
  {
    num: "03",
    title: "Agile Development",
    desc: "Iterative sprints with weekly demos. You see progress and give feedback in real-time.",
    icon: Code2,
    duration: "4-12 weeks",
  },
  {
    num: "04",
    title: "QA & Launch",
    desc: "Rigorous testing, performance optimization, and a smooth production deployment.",
    icon: Rocket,
    duration: "1-2 weeks",
  },
  {
    num: "05",
    title: "Support & Scale",
    desc: "Ongoing maintenance, monitoring, and feature iteration to grow with your business.",
    icon: LifeBuoy,
    duration: "Ongoing",
  },
];

const ProcessTimeline = () => {
  return (
    <section data-testid="process-timeline-section" className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How We <span className="text-orange-500">Deliver</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A battle-tested process refined over 10+ years and hundreds of successful launches.
          </p>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/40 via-orange-500/20 to-transparent -translate-x-1/2" />

          <div className="space-y-16 md:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.num}
                  data-testid={`process-step-${step.num}`}
                  className={`relative md:flex items-center ${
                    i > 0 ? "md:mt-20" : ""
                  } ${isLeft ? "" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div
                    className={`md:w-5/12 ${
                      isLeft ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                    }`}
                  >
                    <div
                      className={`bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-500 group`}
                    >
                      <div className={`flex items-center gap-4 mb-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                          <Icon className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{step.title}</h3>
                          <span className="text-xs font-medium text-orange-400/80 tracking-wider uppercase">{step.duration}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-orange-500 items-center justify-center z-10">
                    <span className="text-xs font-bold text-orange-400">{step.num}</span>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ProcessTimeline);
