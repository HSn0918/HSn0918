import type { Contact } from "../types/resume";
import HtmlBlock from "./HtmlBlock";

type FooterProps = {
  contacts: Contact[];
  footerHtml: string;
};

const Footer = ({ contacts, footerHtml }: FooterProps) => (
  <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
    <div className="flex justify-center space-x-6 mb-4">
      {contacts.map((contact) => (
        <a
          key={contact.text}
          href={contact.link}
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary transition-all hover:scale-110"
        >
          <i className={`${contact.icon} text-lg`}></i>
        </a>
      ))}
    </div>
    <HtmlBlock as="p" html={footerHtml} />
  </div>
);

export default Footer;
