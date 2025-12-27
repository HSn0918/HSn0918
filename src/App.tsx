import { useEffect, useMemo, useRef, useState } from "react";
import EducationSection from "./components/EducationSection";
import Footer from "./components/Footer";
import OpenSourceSection from "./components/OpenSourceSection";
import ProfileSection from "./components/ProfileSection";
import ProjectsSection from "./components/ProjectsSection";
import Sidebar from "./components/Sidebar";
import SkillsSection from "./components/SkillsSection";
import WorkSection from "./components/WorkSection";
import type { LanguageData, ResumeData } from "./types/resume";
import { getGitHubStars } from "./utils";

type Lang = "zh" | "en";
const sectionIds = ["education", "skills", "work", "projects", "opensource"] as const;
type SectionId = (typeof sectionIds)[number];

type I18nLabels = Record<string, string>;

const i18n: Record<Lang, I18nLabels> = {
  zh: {
    "nav-title": "个人简历",
    "nav-education": "教育背景",
    "nav-skills": "专业技能",
    "nav-work": "工作经历",
    "nav-projects": "项目经历",
    "nav-opensource": "开源经历",
    "view-repo": "查看仓库",
    "core-contribution": "核心贡献",
    "featured-projects": "精选项目",
    "other-projects": "其他项目",
    "skill-tags": "技能标签",
    "skill-tools": "工具链",
    "skill-tools-badge": "工具",
    "sidebar-onpage": "页面导航",
    "sidebar-focus": "技能方向",
    "sidebar-contact": "联系方式",
    "footer": "&copy; 2025 HSn. Built with Tailwind CSS & Shadcn Style."
  },
  en: {
    "nav-title": "Resume",
    "nav-education": "Education",
    "nav-skills": "Skills",
    "nav-work": "Experience",
    "nav-projects": "Projects",
    "nav-opensource": "Open Source",
    "view-repo": "View Repository",
    "core-contribution": "Key Contributions",
    "featured-projects": "Featured Projects",
    "other-projects": "Other Projects",
    "skill-tags": "Tags",
    "skill-tools": "Tooling",
    "skill-tools-badge": "Tools",
    "sidebar-onpage": "On this page",
    "sidebar-focus": "Focus",
    "sidebar-contact": "Contact",
    "footer": "&copy; 2025 HSn. Built with Tailwind CSS & Shadcn Style."
  }
};

const getInitialLang = (): Lang => {
  const stored = localStorage.getItem("lang");
  return stored === "en" ? "en" : "zh";
};

const deepMerge = (target: any, source: any) => {
  if (!source) return target;
  const output = { ...target };
  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
      output[key] = target[key].map((item: any, index: number) => {
        if (typeof item === "object" && source[key][index]) {
          return deepMerge(item, source[key][index]);
        }
        return item;
      });
    } else {
      output[key] = source[key];
    }
  });
  return output;
};

type StarsMap = Record<string, number | "N/A">;

const App = () => {
  const [allData, setAllData] = useState<ResumeData | null>(null);
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [isDark, setIsDark] = useState(() => {
    if (localStorage.theme === "dark") return true;
    if (localStorage.theme === "light") return false;
    return (
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stars, setStars] = useState<StarsMap>({});
  const [activeSectionId, setActiveSectionId] = useState<SectionId>(sectionIds[0]);
  const avatarRef = useRef<HTMLImageElement>(null);

  const labels = useMemo(() => i18n[lang] || i18n.zh, [lang]);
  const data: LanguageData | undefined = allData?.[lang];

  useEffect(() => {
    let active = true;
    fetch("/data.json")
      .then((res) => res.json())
      .then((json: ResumeData) => {
        if (!active) return;
        if (json.common) {
          json.zh = deepMerge(json.zh, json.common);
          json.en = deepMerge(json.en, json.common);
        }
        setAllData(json);
      })
      .catch((error) => console.error("Error loading data:", error));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.theme = isDark ? "dark" : "light";
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    if (!data?.openSource) return undefined;
    const repos = [
      ...(data.openSource.featured || []),
      ...(data.openSource.others || [])
    ]
      .map((item) => item.repo)
      .filter(Boolean);

    let active = true;

    repos.forEach(async (repoPath) => {
      const [owner, repo] = repoPath.split("/");
      const value = await getGitHubStars(owner, repo);
      if (!active) return;
      setStars((prev) => ({ ...prev, [repoPath]: value }));
    });

    return () => {
      active = false;
    };
  }, [data]);

  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in-section");
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [data, lang]);

  useEffect(() => {
    let rafId = 0;

    const updateActive = () => {
      // If we are at the bottom of the page, activate the last section
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight - 50
      ) {
        setActiveSectionId(sectionIds[sectionIds.length - 1]);
        return;
      }

      const offset = 120;
      let nextActive: SectionId = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top;
        if (top - offset <= 0) {
          nextActive = id;
        }
      }

      setActiveSectionId((prev) => (prev === nextActive ? prev : nextActive));
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a"
    ];
    let konamiIndex = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      const expected = konamiCode[konamiIndex];
      if (event.key.toLowerCase() === expected.toLowerCase()) {
        konamiIndex += 1;
        if (konamiIndex === konamiCode.length) {
          try {
            const duration = 3000;
            const end = Date.now() + duration;
            (function frame() {
              confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
              });
              confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
              });
              if (Date.now() < end) {
                requestAnimationFrame(frame);
              }
            })();
          } catch (e) {
            console.log("Confetti!", e);
          }
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar) return undefined;

    let clickCount = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const handleClick = () => {
      clickCount += 1;
      if (resetTimer) {
        clearTimeout(resetTimer);
      }

      if (clickCount === 5) {
        avatar.style.transform = "rotate(720deg) scale(1.1)";
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
        }

        setTimeout(() => {
          avatar.style.transform = "none";
          clickCount = 0;
        }, 1000);
      }

      resetTimer = setTimeout(() => {
        clickCount = 0;
      }, 2000);
    };

    avatar.addEventListener("click", handleClick);
    return () => {
      avatar.removeEventListener("click", handleClick);
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
    };
  }, [data, lang]);

  const navItems = [
    { id: "education", label: labels["nav-education"], icon: "fa-graduation-cap" },
    { id: "skills", label: labels["nav-skills"], icon: "fa-code" },
    { id: "work", label: labels["nav-work"], icon: "fa-briefcase" },
    { id: "projects", label: labels["nav-projects"], icon: "fa-laptop-code" },
    { id: "opensource", label: labels["nav-opensource"], icon: "fa-code-branch" }
  ];

  const languageLabel = lang === "zh" ? "EN" : "中";
  const handleNavigate = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    try {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      target.scrollIntoView(true);
    }
  };

  return (
    <>
      <nav className="w-full border-b border-border/40 bg-background">
        <div className="container mx-auto px-4 max-w-4xl flex h-14 items-center justify-between">
          <a href="#" className="mr-6 flex items-center space-x-2">
            <i className="fa-solid fa-code text-primary text-xl"></i>
            <span className="font-bold hidden sm:inline-block brand-title">
              {labels["nav-title"]}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = item.id === activeSectionId;
              const className = [
                "nav-link transition-colors hover:text-foreground/80 hover:text-primary flex items-center gap-2",
                isActive ? "is-active text-foreground" : "text-foreground/60"
              ].join(" ");

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={className}
                  onClick={() => {
                    handleNavigate(item.id);
                  }}
                  aria-current={isActive ? "location" : undefined}
                >
                  <i className={`fa-solid ${item.icon} text-xs`}></i>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "zh" ? "en" : "zh")}
              className="h-9 px-3 rounded-md border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors text-xs font-semibold"
            >
              {languageLabel}
            </button>
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="h-9 w-9 rounded-md border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <i className="fa-solid fa-sun rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"></i>
              <i className="fa-solid fa-moon absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"></i>
              <span className="sr-only">Toggle theme</span>
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden h-9 w-9 rounded-md border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
            >
              <i className="fa-solid fa-bars text-sm"></i>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden border-t border-border bg-background ${
            mobileOpen ? "block" : "hidden"
          }`}
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  handleNavigate(item.id);
                  setMobileOpen(false);
                }}
                className="nav-link block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <i className={`fa-solid ${item.icon} mr-2 w-4 text-center`}></i>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-4xl px-4 py-16 editor-rail">
        <div className="layout-grid">
          <div className="content-stack space-y-16">
            <header id="profile-section" className="fade-in-section pt-8">
              <ProfileSection profile={data?.profile} avatarRef={avatarRef} />
            </header>

            <section id="education" className="fade-in-section space-y-6 scroll-mt-20">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <i className="fa-solid fa-graduation-cap text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {labels["nav-education"]}
                </h2>
              </div>
              <div className="space-y-4">
                <EducationSection education={data?.education} />
              </div>
            </section>

            <section id="skills" className="fade-in-section space-y-6 scroll-mt-20">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <i className="fa-solid fa-layer-group text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {labels["nav-skills"]}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SkillsSection
                  skills={data?.skills}
                  labels={{
                    tools: labels["skill-tools"],
                    toolsBadge: labels["skill-tools-badge"]
                  }}
                />
              </div>
            </section>

            <section id="work" className="fade-in-section space-y-6 scroll-mt-20">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <i className="fa-solid fa-briefcase text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {labels["nav-work"]}
                </h2>
              </div>
              <div className="space-y-8">
                <WorkSection work={data?.workExperience} />
              </div>
            </section>

            <section id="projects" className="fade-in-section space-y-6 scroll-mt-20">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <i className="fa-solid fa-rocket text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {labels["nav-projects"]}
                </h2>
              </div>
              <div className="grid gap-6">
                <ProjectsSection
                  projects={data?.projects}
                  coreLabel={labels["core-contribution"]}
                />
              </div>
            </section>

            <section id="opensource" className="fade-in-section space-y-6 scroll-mt-20">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <i className="fa-brands fa-github text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {labels["nav-opensource"]}
                </h2>
              </div>
              <div className="space-y-8">
                <OpenSourceSection
                  openSource={data?.openSource}
                  labels={{
                    viewRepo: labels["view-repo"],
                    featured: labels["featured-projects"],
                    other: labels["other-projects"]
                  }}
                  stars={stars}
                />
              </div>
            </section>
          </div>
          <aside className="sidebar surface rounded-2xl border border-border p-5 space-y-6">
            <Sidebar
              profile={data?.profile}
              skills={data?.skills}
              onNavigate={handleNavigate}
              activeId={activeSectionId}
              labels={{
                onpage: labels["sidebar-onpage"],
                focus: labels["sidebar-focus"],
                contact: labels["sidebar-contact"],
                education: labels["nav-education"],
                skills: labels["nav-skills"],
                work: labels["nav-work"],
                projects: labels["nav-projects"],
                opensource: labels["nav-opensource"]
              }}
            />
          </aside>
        </div>
      </main>

      <footer className="border-t border-border py-8 mt-16 bg-muted/30">
        <Footer contacts={data?.profile?.contacts || []} footerHtml={labels.footer} />
      </footer>
    </>
  );
};

export default App;
