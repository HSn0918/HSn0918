import type { ElementType } from "react";

type HtmlBlockProps = {
  as?: ElementType;
  html: string;
  className?: string;
};

const HtmlBlock = ({ as: Tag = "span", html, className }: HtmlBlockProps) => (
  <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

export default HtmlBlock;
