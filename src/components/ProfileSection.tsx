import { useEffect, useMemo, useState, type RefObject } from "react";
import type { Profile } from "../types/resume";

type ProfileSectionProps = {
  profile?: Profile;
  avatarRef: RefObject<HTMLImageElement>;
};

const Typewriter = ({ text }: { text: string }) => {
  const parts = useMemo(() => text.split("|").map((s) => s.trim()), [text]);
  const [partIndex, setPartIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Reset if parts change (e.g. language change)
    setDisplayedText("");
    setPartIndex(0);
    setIsDeleting(false);
  }, [text]);

  useEffect(() => {
    const currentPart = parts[partIndex];
    if (!currentPart) return undefined;

    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentPart.length) {
          setDisplayedText(currentPart.substring(0, displayedText.length + 1));
        } else if (parts.length > 1 || currentPart.length > 0) {
          // If multiple parts, or even just one, wait then delete to loop
          // But if only one part, we might just want to stay there. 
          // Usually typewriter loops are expected for multiple titles.
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentPart.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setPartIndex((prev) => (prev + 1) % parts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, partIndex, parts]);

  return <span className="typewriter-cursor">{displayedText}</span>;
};

const ProfileSection = ({ profile, avatarRef }: ProfileSectionProps) => {
  if (!profile) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-muted h-24 w-24"></div>
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted rounded"></div>
            <div className="h-4 w-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="relative shrink-0 profile-orb">
        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-muted shadow-sm ring-2 ring-background avatar-frame">
          <img
            ref={avatarRef}
            id="profile-avatar"
            src={profile.avatar}
            alt={profile.name}
            className="h-full w-full object-cover cursor-pointer transition-transform duration-700"
          />
        </div>
        <div
          className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-background"
          title="Open to work"
        ></div>
      </div>
      <div className="text-center md:text-left space-y-4">
        <div>
          <h1 className="hero-name text-4xl font-bold tracking-tight lg:text-5xl flex items-center justify-center md:justify-start gap-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 dark:to-orange-300 animate-gradient">
              {profile.name}
            </span>
            <i
              className="fa-solid fa-certificate text-primary text-2xl"
              title="Verified"
            ></i>
          </h1>
          <p className="hero-subtitle text-xl text-muted-foreground mt-2 flex items-center justify-center md:justify-start gap-2 h-8">
            <i className="fa-solid fa-terminal text-sm"></i>
            <Typewriter text={profile.title} />
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {(profile.contacts || []).map((contact) => (
            <a
              key={contact.text}
              href={contact.link}
              target="_blank"
              rel="noreferrer"
              className="cta-pill inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <i className={`${contact.icon} mr-2 text-primary`}></i>
              {contact.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
