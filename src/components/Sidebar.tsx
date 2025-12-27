import type { Profile, Skills } from "../types/resume";

type SidebarProps = {
  profile?: Profile;
  skills?: Skills;
  labels: {
    onpage: string;
    focus: string;
    contact: string;
    education: string;
    skills: string;
    work: string;
    projects: string;
    opensource: string;
  };
};

const Sidebar = ({ profile, skills, labels }: SidebarProps) => {
  if (!profile) return null;

  const navItems = [
    { id: "education", label: labels.education, icon: "fa-graduation-cap" },
    { id: "skills", label: labels.skills, icon: "fa-code" },
    { id: "work", label: labels.work, icon: "fa-briefcase" },
    { id: "projects", label: labels.projects, icon: "fa-laptop-code" },
    { id: "opensource", label: labels.opensource, icon: "fa-code-branch" }
  ];

  return (
    <>
      <div className="space-y-3">
        <p className="sidebar-title">{labels.onpage}</p>
        <div className="space-y-2">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="sidebar-link">
              <i className={`fa-solid ${item.icon} text-xs text-primary/70`}></i>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="sidebar-title">{labels.focus}</p>
        <div className="flex flex-wrap gap-2">
          {(skills?.categories || []).map((category) => (
            <span
              key={category.category}
              className="tag-pill inline-flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground gap-1"
            >
              <i className={`${category.icon || "fa-solid fa-star"} text-[10px] text-primary/70`}></i>
              <span>{category.category}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="sidebar-title">{labels.contact}</p>
        <div className="space-y-2">
          {(profile.contacts || []).map((contact) => (
            <a
              key={contact.text}
              href={contact.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <i className={`${contact.icon} text-xs text-primary/80`}></i>
              <span>{contact.text}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
