interface MobileMenuButtonProps {
  toggleMobileMenu: () => void;
  pendingCorrectionsCount: number;
}

export const MobileMenuButton = ({ toggleMobileMenu, pendingCorrectionsCount }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={toggleMobileMenu}
      className="relative p-3 bg-[rgb(10,11,12)]/95 text-white rounded-full shadow-lg md:hidden border border-gray-700/60"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>

      {/* Badge for pending corrections count */}
      {pendingCorrectionsCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
          {pendingCorrectionsCount}
        </span>
      )}
    </button>
  );
};
