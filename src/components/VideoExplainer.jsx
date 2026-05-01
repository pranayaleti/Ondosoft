import { memo, useState, useEffect, useRef } from "react";
import { Play, MessageSquare, Code2, Rocket, ChevronRight } from "lucide-react";

const scenes = [
  {
    id: 1,
    title: "Tell us your vision",
    subtitle: "Free strategy call",
    icon: MessageSquare,
    color: "from-orange-500 to-amber-500",
    desc: "Share your idea. We listen, ask smart questions, and map out the fastest path to launch.",
    visual: "chat",
  },
  {
    id: 2,
    title: "We design & build",
    subtitle: "Agile sprints",
    icon: Code2,
    color: "from-cyan-500 to-blue-500",
    desc: "Our senior engineers turn your vision into production-grade code with weekly demos.",
    visual: "code",
  },
  {
    id: 3,
    title: "You launch & grow",
    subtitle: "Ongoing support",
    icon: Rocket,
    color: "from-emerald-500 to-green-500",
    desc: "Go live with confidence. We handle maintenance, scaling, and new features as you grow.",
    visual: "rocket",
  },
];

const ChatAnimation = () => (
  <div className="space-y-3 p-4">
    <div className="flex gap-2 items-end">
      <div className="w-7 h-7 rounded-full bg-orange-500/30 flex-shrink-0" />
      <div className="bg-gray-800/80 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[75%]">
        <p className="text-sm text-gray-300 animate-pulse">I need a SaaS platform for...</p>
      </div>
    </div>
    <div className="flex gap-2 items-end justify-end">
      <div className="bg-orange-500/20 border border-orange-500/30 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[75%]">
        <p className="text-sm text-orange-200">Great! Here's our recommended approach...</p>
      </div>
      <div className="w-7 h-7 rounded-full bg-orange-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white">O</div>
    </div>
    <div className="flex gap-2 items-end justify-end">
      <div className="bg-orange-500/20 border border-orange-500/30 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
        <p className="text-sm text-orange-200">We can have your MVP ready in 6 weeks</p>
      </div>
      <div className="w-7 h-7 rounded-full bg-orange-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white">O</div>
    </div>
  </div>
);

const CodeAnimation = () => (
  <div className="p-4 font-mono text-xs space-y-1">
    <div className="flex gap-2 mb-3">
      <div className="w-3 h-3 rounded-full bg-red-500/60" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
      <div className="w-3 h-3 rounded-full bg-green-500/60" />
    </div>
    <p><span className="text-violet-400">import</span> <span className="text-cyan-300">{'{ Dashboard }'}</span> <span className="text-violet-400">from</span> <span className="text-amber-300">'./components'</span></p>
    <p><span className="text-violet-400">import</span> <span className="text-cyan-300">{'{ useAuth }'}</span> <span className="text-violet-400">from</span> <span className="text-amber-300">'./hooks'</span></p>
    <p className="text-gray-600">// Sprint 3: Multi-tenant dashboard</p>
    <p><span className="text-violet-400">export const</span> <span className="text-blue-300">App</span> = () =&gt; {'{'}</p>
    <p className="pl-4"><span className="text-violet-400">const</span> {'{ user } ='} <span className="text-blue-300">useAuth</span>()</p>
    <p className="pl-4"><span className="text-violet-400">return</span> &lt;<span className="text-emerald-400">Dashboard</span> <span className="text-cyan-300">user</span>={'{user}'} /&gt;</p>
    <p>{'}'}</p>
    <div className="mt-2 flex items-center gap-2">
      <div className="w-2 h-4 bg-orange-500 animate-pulse" />
      <span className="text-gray-500 animate-pulse">Building your product...</span>
    </div>
  </div>
);

const RocketAnimation = () => (
  <div className="p-4 space-y-3">
    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2">
      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-sm text-emerald-300">All systems operational</span>
    </div>
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-gray-800/60 rounded-lg p-3 text-center">
        <p className="text-lg font-bold text-white">99.9%</p>
        <p className="text-[10px] text-gray-500">Uptime</p>
      </div>
      <div className="bg-gray-800/60 rounded-lg p-3 text-center">
        <p className="text-lg font-bold text-emerald-400">+284%</p>
        <p className="text-[10px] text-gray-500">Growth</p>
      </div>
      <div className="bg-gray-800/60 rounded-lg p-3 text-center">
        <p className="text-lg font-bold text-white">10K+</p>
        <p className="text-[10px] text-gray-500">Users</p>
      </div>
    </div>
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full w-[92%]" />
      </div>
      <span className="text-emerald-400">92% target</span>
    </div>
  </div>
);

const visuals = { chat: ChatAnimation, code: CodeAnimation, rocket: RocketAnimation };

const VideoExplainer = () => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % scenes.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = (i) => {
    setActive(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % scenes.length);
    }, 4000);
  };

  const scene = scenes[active];
  const Visual = visuals[scene.visual];

  return (
    <section data-testid="video-explainer-section" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From Idea to <span className="text-orange-500">Launch</span> in 3 Steps
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            No fluff, no layers of account managers. Just a senior team shipping great software.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Steps */}
          <div className="space-y-4">
            {scenes.map((s, i) => {
              const Icon = s.icon;
              const isActive = active === i;
              return (
                <button
                  key={s.id}
                  data-testid={`explainer-step-${s.id}`}
                  onClick={() => handleClick(i)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? "bg-gray-900/80 border-orange-500/30 shadow-lg shadow-orange-500/5"
                      : "bg-transparent border-gray-800/60 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? `bg-gradient-to-br ${s.color} shadow-lg`
                          : "bg-gray-800"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Step {s.id}
                        </span>
                        {isActive && (
                          <span className="text-[10px] px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded-full">
                            {s.subtitle}
                          </span>
                        )}
                      </div>
                      <h3 className={`text-lg font-bold mb-1 ${isActive ? "text-white" : "text-gray-400"}`}>
                        {s.title}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 flex-shrink-0 mt-1 transition-all duration-300 ${
                        isActive ? "text-orange-400 rotate-90" : "text-gray-700"
                      }`}
                    />
                  </div>
                  {/* Progress bar */}
                  {isActive && (
                    <div className="mt-3 ml-15 h-0.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full animate-progress"
                        style={{ animation: "progress 4s linear" }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden min-h-[280px]">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800/80 bg-gray-900/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-[10px] text-gray-600 bg-gray-800/60 px-3 py-0.5 rounded-full">
                    ondosoft.com
                  </span>
                </div>
              </div>
              {/* Animated content */}
              <div className="transition-all duration-500 animate-fade-in" key={active}>
                <Visual />
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-3 -right-3 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 shadow-xl">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-400">Live preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for progress animation */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 4s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default memo(VideoExplainer);
