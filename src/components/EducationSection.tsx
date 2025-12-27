import type { Education } from "../types/resume";

type EducationSectionProps = {
  education?: Education;
};

const EducationSection = ({ education }: EducationSectionProps) => {
  if (!education) return null;
  return (
    <div
      className="flex flex-col md:flex-row justify-between items-start md:items-center rounded-lg border border-border bg-card surface text-card-foreground shadow-sm p-6 group hover:border-primary/50 transition-colors fade-in-up-item hover-lift"
      style={{ transitionDelay: "100ms" }}
    >
      <div className="flex items-start gap-4">
        <div className="bg-secondary p-3 rounded-md hidden md:block">
          <i className="fa-solid fa-building-columns text-2xl text-primary"></i>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold leading-none tracking-tight text-lg group-hover:text-primary transition-colors">
            {education.school}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <i className="fa-solid fa-certificate text-xs"></i>
            {education.degree}
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 pl-0 md:pl-0">
        <span className="inline-flex items-center rounded-full border border-transparent bg-secondary px-3 py-1 text-xs font-semibold transition-colors hover:bg-secondary/80 text-secondary-foreground gap-2">
          <i className="fa-regular fa-calendar"></i>
          {education.period}
        </span>
      </div>
    </div>
  );
};

export default EducationSection;
