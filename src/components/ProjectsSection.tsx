import type { Project } from "../types/resume";
import { splitTechStack } from "../utils";
import HtmlBlock from "./HtmlBlock";
import { SpotlightCard } from "./SpotlightCard";

type ProjectsSectionProps = {
  projects?: Project[];
  coreLabel: string;
};

const ProjectsSection = ({ projects, coreLabel }: ProjectsSectionProps) => {
  if (!projects) return null;

  return projects.map((project, index) => (
    <SpotlightCard
      key={`${project.name}-${index}`}
      className="rounded-xl border border-border bg-card surface text-card-foreground shadow fade-in-up-item hover-lift transition-all"
      style={{ transitionDelay: `${index * 150}ms` }}
      spotlightColor="hsl(var(--primary) / 0.15)"
    >
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <i className="fa-solid fa-folder-open text-primary/70 text-lg"></i>
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-user-gear text-xs"></i>
                {project.role}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <i className="fa-regular fa-clock text-xs"></i>
                {project.period}
              </span>
            </div>
          </div>
          <span
            className={`${project.periodClass ?? ""} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shadow-sm ring-1 ring-inset ring-current/20`}
          >
            {project.period}
          </span>
        </div>

        <HtmlBlock
          as="div"
          html={project.description}
          className="text-base text-muted-foreground leading-relaxed"
        />

        <div className="flex flex-wrap gap-2 mt-2">
          {splitTechStack(project.techStack).map((tech) => (
            <span
              key={`${project.name}-${tech}`}
              className="tag-pill inline-flex items-center rounded-full border border-transparent bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 gap-1"
            >
              <i className="fa-solid fa-tag text-[10px]"></i>
              {tech}
            </span>
          ))}
        </div>

        <div className="rounded-lg bg-muted/40 p-4 border border-border/50">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <i className="fa-solid fa-star text-yellow-500"></i>
            {coreLabel}
          </h4>
          <ul className="space-y-3">
            {(project.highlights || []).map((highlight, highlightIndex) => (
              <li key={`${highlight.title}-${highlightIndex}`} className="pl-0">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground flex items-center gap-2 text-sm">
                    <span className="bg-primary/10 rounded-full p-1 flex items-center justify-center w-5 h-5 shrink-0">
                      <i
                        className={`${highlight.icon} ${highlight.iconColor ?? ""} text-[10px]`}
                      ></i>
                    </span>
                    {highlight.title}
                  </span>
                  <HtmlBlock
                    html={highlight.text}
                    className="text-sm text-muted-foreground pl-7"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SpotlightCard>
  ));
};

export default ProjectsSection;
