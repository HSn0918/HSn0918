import type { OpenSource } from "../types/resume";

type OpenSourceSectionProps = {
  openSource?: OpenSource;
  labels: {
    viewRepo: string;
    featured: string;
    other: string;
  };
  stars: Record<string, number | string>;
};

const OpenSourceSection = ({ openSource, labels, stars }: OpenSourceSectionProps) => {
  if (!openSource) return null;

  const featured = openSource.featured || [];
  const others = openSource.others || [];

  return (
    <>
      <div
        className="rounded-lg border border-border bg-card surface text-card-foreground shadow-sm p-6 mb-6 fade-in-up-item hover-lift"
        style={{ transitionDelay: "0ms" }}
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-full text-primary ring-2 ring-primary/20">
            <i className={`${openSource.profile.icon} text-3xl`}></i>
          </div>
          <div>
            <h3 className="font-semibold text-lg hover:underline decoration-primary flex items-center gap-2">
              <a href={openSource.profile.link} target="_blank" rel="noreferrer">
                {openSource.profile.title}
              </a>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs text-muted-foreground"></i>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {openSource.profile.description}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <i className="fa-solid fa-fire text-orange-500"></i>
          {labels.featured}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="rounded-lg border border-border bg-card surface text-card-foreground shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group fade-in-up-item hover-lift"
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {item.image && (
                <div className="h-48 w-full overflow-hidden border-b border-border">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold hover:underline decoration-primary text-lg flex items-center gap-3">
                    {item.image ? (
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <i className="fa-solid fa-book-bookmark text-primary/70 text-2xl"></i>
                    )}
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </h4>
                  <span className="inline-flex items-center rounded-full border border-transparent bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-0.5 text-xs font-semibold text-yellow-700 dark:text-yellow-400 gap-1">
                    <i className="fa-solid fa-star text-[10px]"></i>
                    {stars[item.repo] ?? "..."}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground flex-1">
                  {item.description}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="pt-2 text-xs text-primary font-medium flex items-center gap-1 hover:underline cursor-pointer w-fit"
                >
                  <i className="fa-solid fa-code"></i>
                  {labels.viewRepo}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mt-8 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <i className="fa-solid fa-layer-group text-blue-500"></i>
          {labels.other}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {others.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="rounded-lg border border-border bg-card surface text-card-foreground shadow-sm p-4 hover:bg-accent/50 transition-colors group fade-in-up-item hover-lift"
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm flex items-center gap-2 group-hover:text-primary transition-colors">
                  <i className={`${item.icon} ${item.iconColor ?? ""} text-xs`}></i>
                  <a href={item.link} target="_blank" rel="noreferrer" className="hover:underline">
                    {item.title}
                  </a>
                </h4>
                <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground flex items-center gap-1">
                  <i className="fa-regular fa-star"></i>
                  {stars[item.repo] ?? "..."}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 pl-5 border-l-2 border-border/50 hover:border-primary/30 transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OpenSourceSection;
