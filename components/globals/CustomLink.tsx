import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

const CustomLink = ({ href, children }: Props) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
};

export default CustomLink;
