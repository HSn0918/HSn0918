import type { WorkExperience } from "../types/resume";
import HtmlBlock from "./HtmlBlock";

type WorkSectionProps = {
  work?: WorkExperience[];
};

const WorkSection = ({ work }: WorkSectionProps) => {
  if (!work) return null;

  return work.map((job, index) => (
    <div
      key={`${job.company}-${index}`}
      className="rounded-lg border border-border bg-card surface text-card-foreground shadow-sm group fade-in-up-item hover-lift"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div className="flex items-start gap-4">
            <div className="bg-secondary p-2.5 rounded-md hidden md:block">
              <i className="fa-solid fa-briefcase text-xl text-primary"></i>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold leading-none tracking-tight text-lg group-hover:text-primary transition-colors">
                {job.company}
              </h3>
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                <i className="fa-solid fa-user-tag text-xs"></i>
                {job.role}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors gap-2 ${
              job.periodClass ?? "bg-muted text-muted-foreground"
            }`}
          >
            <i className="fa-regular fa-calendar-check"></i>
            {job.period}
          </span>
        </div>
        <ul className="space-y-2 pl-4 md:pl-14 border-l-2 border-muted md:border-none ml-2 md:ml-0">
          {(job.items || []).map((item, itemIndex) => (
            <li
              key={`${item.text}-${itemIndex}`}
              className="flex items-start text-sm text-muted-foreground group/item hover:text-foreground transition-colors"
            >
              <span className="mt-1.5 mr-3 flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 group-hover/item:bg-primary transition-colors"></span>
              <HtmlBlock html={item.text} className="flex-1" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ));
};

export default WorkSection;
