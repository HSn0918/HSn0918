import type { Skills } from "../types/resume";
import { isUrl } from "../utils";

type SkillsSectionProps = {
  skills?: Skills;
  labels: {
    tools: string;
    toolsBadge: string;
  };
};

const SkillsSection = ({ skills, labels }: SkillsSectionProps) => {
  if (!skills) return null;

  const categories = skills.categories || [];
  const tools = skills.tools || [];

  return (
    <>
      {categories.map((skill, index) => (
        <div
          key={`${skill.category}-${index}`}
          className="rounded-lg border border-border bg-card surface text-card-foreground shadow-sm p-6 hover:shadow-md transition-all group fade-in-up-item hover-lift"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary/20 transition-colors">
                <i className={`${skill.icon || "fa-solid fa-circle"} text-primary text-lg`}></i>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight">
                  {skill.category}
                </h3>
                {skill.summary && (
                  <p className="text-xs text-muted-foreground">{skill.summary}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(skill.tags || []).map((rawTag, tagIndex) => {
              const tag = typeof rawTag === "string" ? { name: rawTag } : rawTag;
              const tagName = (tag.name || "").trim();
              if (!tagName) return null;
              const icon = tag.icon || "fa-solid fa-hashtag";
              const iconIsUrl = isUrl(icon);
              return (
                <span
                  key={`${tagName}-${tagIndex}`}
                  className="tag-pill inline-flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground gap-1 hover:bg-primary/10 hover:text-primary transition-colors group/tag"
                >
                  {iconIsUrl ? (
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className="w-4 h-4 rounded-[3px] bg-white/70 p-[1px] transition-transform duration-300 group-hover/tag:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <i className={`${icon} text-primary/80 text-sm transition-transform duration-300 group-hover/tag:scale-110`}></i>
                  )}
                  <span>{tagName}</span>
                </span>
              );
            })}
          </div>
        </div>
      ))}

      {tools.length > 0 && (
        <div
          className="rounded-lg border border-border bg-card surface text-card-foreground shadow-sm p-6 md:col-span-2 hover:shadow-md transition-all fade-in-up-item hover-lift"
          style={{ transitionDelay: `${categories.length * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <i className="fa-solid fa-screwdriver-wrench text-primary text-lg"></i>
              </div>
              <div>
                <h3 className="font-semibold leading-none tracking-tight">
                  {labels.tools}
                </h3>
                {skills.toolsDescription && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {skills.toolsDescription}
                  </p>
                )}
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {labels.toolsBadge}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => {
              const toolName = tool.name.trim();
              if (!toolName) return null;
              const icon = tool.icon || "fa-solid fa-screwdriver-wrench";
              const iconIsUrl = isUrl(icon);
              return (
                <span
                  key={toolName}
                  className="tag-pill inline-flex items-center rounded-full border border-border bg-primary/5 px-3 py-1.5 text-xs font-semibold text-foreground gap-2 hover:bg-primary/10 hover:text-primary transition-colors group/tag"
                >
                  {iconIsUrl ? (
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className="w-4 h-4 rounded-[3px] bg-white/70 p-[1px] transition-transform duration-300 group-hover/tag:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <i className={`${icon} text-primary/80 text-sm transition-transform duration-300 group-hover/tag:scale-110`}></i>
                  )}
                  {toolName}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SkillsSection;
