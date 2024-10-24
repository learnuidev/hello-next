export const NmmListContainerSentence = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
      {children}
    </div>
  );
};
