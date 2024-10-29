export const ProfileStatsItem = ({
  children,
  stat,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  stat: number | string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {children}

      <p className="text-lg font-semibold mt-2">{stat}</p>
      <p className="uppercase text-gray-500 font-light text-[10px]">{title}</p>
      <p className="uppercase text-gray-500 font-light text-[10px]">
        {subtitle}
      </p>
    </div>
  );
};
