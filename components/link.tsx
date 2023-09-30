import * as NextLink from "next/link";

export const Link = ({
  href,
  children,
  target,
}: {
  href: string;
  target?: any;
  children: any;
}) => {
  const props = (() => {
    let p = {} as any;
    if (target) {
      p.target = target;
    }
    p.href = href;
    return p;
  })();
  return (
    <NextLink.default
      {...props}
      className="inline-flex items-center justify-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-black text-gray-200 font-extralight"
    >
      {children}
    </NextLink.default>
  );
};
