import { TitleProps, HeadingProps, ParagraphProps , HProps, PProps, HeadingVariant} from "./interfaces";

const Title = ({ heading, variant }: TitleProps) => {
  return <p className={variant}>{heading}</p>;
};

const Heading = ({ heading, variant = "h2", size, style }: HeadingProps) => {
  return (
    <p className={`${size} ${variant}`} style={style}>
      {heading}
    </p>
  );
};

const H = ({ tag, text, variant, className, ...rest }: HProps): JSX.Element => {
  const Tag = `${tag}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return <Tag className={`${variant} ${className}`} {...rest}>{text}</Tag>
}


const P = ({ text, variant, className,  ...rest }: PProps) => {
  return <p className={`${variant} ${className}`} {...rest}>{text}</p>
}

const Paragraph = ({ heading, variant, additionalClass, style }: ParagraphProps) => {
  return <p className={`${additionalClass} ${variant}`} style={style}>{heading}</p>;
};

export { Title, Heading, Paragraph, H, P };
