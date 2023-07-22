export interface TitleProps {
  heading?: string;
  variant?: "h1 display 1" | "h2 display 2" | "h3 display 3" | "h4 display 4";
}
export interface HeadingProps {
  heading?: string | null ;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: string | undefined;
  style?: any;
}

export interface ParagraphProps {
  heading?: string | null;
  variant?:
    | "text-success"
    | "text-warning"
    | "text-danger"
    | "text-info"
    | "text-primary"
    | "text-muted"
    | "lead";
  style?: any;
  additionalClass?: string | undefined;
}


export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type HeadingVariant  =  'display-1' | 'display-2' | 'display-3' | 'display-4';
export type PVariant =  HeadingTag


export interface HProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag: HeadingTag;
  text: string | undefined | null
  variant?: HeadingVariant
}

export interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string | undefined | null
  variant?: PVariant
}