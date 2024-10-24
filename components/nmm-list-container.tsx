export const NmmListContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    // <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-12 my-4 mx-2 md:mx-8">
      {children}
    </div>
  );
};
