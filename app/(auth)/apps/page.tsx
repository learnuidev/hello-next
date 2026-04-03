"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DuChineseIcon } from "../du/components/duchinese-icon";
import { useSettingsDialogState } from "@/components/settings-dialog/settings-dialog.state";
import { useGetReviewUrl } from "@/components/settings-dialog/use-get-review-url";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { useClipboardViewMode } from "../clipboard/hooks/use-clipboard-view-mode";
import { useClipboardState } from "../clipboard/hooks/use-clipboard-state";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";

function AppLinkItem({
  href,
  children,
  className,
  title,
  onClick,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <Link
      href={href || ""}
      onClick={onClick}
      className={cn(
        `dark:text-gray-500 dark:hover:text-white transition text-3xl`,
        `flex flex-col items-center`,
        className
      )}
    >
      {children}

      <p className="text-xs capitalize mt-[2px]">{title}</p>
    </Link>
  );
}

export default function AppsPage() {
  const setOpen = useSettingsDialogState((state) => state.setIsOpen);
  const { data: reviewList } = useListCharacterReviewList();

  const { mode, setMode } = useClipboardViewMode();
  const { state, setState } = useClipboardState();
  const isSuperAdmin = useIsSuperAdmin();

  const reviewUrl = useGetReviewUrl();
  const apps: any = [
    {
      href: "/studio",
      title: "Studio",
      Icon: Icons.studio,
      hidden: !isSuperAdmin,
    },
    {
      href: "/pinyin",
      title: "Pinyin 2.0",
      Icon: Icons.pinyinChart,
    },
    {
      href: "/insights",
      title: "Insights",
      Icon: Icons.chartColumn,
    },
    {
      href: reviewUrl,
      title: "Review",
      Icon: Icons.playCircle,
      hidden: reviewList?.length === 0,
    },

    {
      onClick: () => {
        setOpen(true);
      },
      title: "Settings",
      Icon: Icons.gear,
    },

    {
      href: "/diary",
      title: "Diary",
      Icon: Icons.diary,
    },

    {
      href: "/web",
      title: "Web 4.0",
      Icon: Icons.browser,
      hidden: true,
    },

    {
      href: "/translator",
      title: "Translator",
      Icon: Icons.microphone,
    },
    {
      href: "/clipboard",
      title: "Clipboard",
      Icon: Icons.clipboard,
      // hidden: !isSuperAdmin,
      hidden: true,
      onClick: () => {
        setMode("edit");
      },
    },
  ];
  return (
    <div className="mx-4 mt-16">
      <h1 className="text-center text-2xl mb-20 sm:mb-32 text-gray-400 font-bold">
        Apps
      </h1>

      <section className="flex items-center justify-center flex-wrap gap-16">
        {apps.map((props: any) => {
          const { href, title, onClick, Icon, hidden } = props;

          if (hidden) {
            return null;
          }
          return (
            <AppLinkItem
              key={JSON.stringify(props)}
              onClick={onClick}
              title={title}
              href={href}
              className="flex items-center flex-col"
            >
              <Icon />
            </AppLinkItem>
          );
        })}
      </section>

      <FloatingNavbar />
    </div>
  );
}
