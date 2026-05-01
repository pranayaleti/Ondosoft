import { memo } from "react";

const categories = [
  {
    name: "Frontend",
    color: "from-cyan-500/20 to-cyan-600/20",
    border: "border-cyan-500/20",
    textColor: "text-cyan-400",
    techs: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "React Native"],
  },
  {
    name: "Backend",
    color: "from-emerald-500/20 to-emerald-600/20",
    border: "border-emerald-500/20",
    textColor: "text-emerald-400",
    techs: ["Node.js", "Python", "Express", "FastAPI", "GraphQL", "REST APIs"],
  },
  {
    name: "Database",
    color: "from-violet-500/20 to-violet-600/20",
    border: "border-violet-500/20",
    textColor: "text-violet-400",
    techs: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Firebase", "DynamoDB"],
  },
  {
    name: "Cloud & DevOps",
    color: "from-orange-500/20 to-orange-600/20",
    border: "border-orange-500/20",
    textColor: "text-orange-400",
    techs: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Terraform"],
  },
  {
    name: "AI & Data",
    color: "from-pink-500/20 to-pink-600/20",
    border: "border-pink-500/20",
    textColor: "text-pink-400",
    techs: ["OpenAI", "LangChain", "TensorFlow", "Data Pipelines", "NLP", "Computer Vision"],
  },
];

const TechStack = () => {
  return (
    <section data-testid="tech-stack-section" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-orange-500">Tech Stack</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We pick the right tool for every job. Here's what our engineers work with daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              data-testid={`tech-category-${cat.name.toLowerCase().replace(/[\s&]/g, '-')}`}
              className={`bg-gradient-to-br ${cat.color} rounded-2xl border ${cat.border} p-6 hover:scale-[1.02] transition-transform duration-300`}
            >
              <h3 className={`text-lg font-bold ${cat.textColor} mb-4`}>{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm text-gray-300 bg-black/30 rounded-lg border border-gray-700/40 hover:border-gray-600 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TechStack);
