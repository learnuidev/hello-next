"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: Icons.home, label: "For You", active: true },
  { icon: Icons.magnifyingGlass, label: "Explore" },
  { icon: Icons.bookOpen, label: "My Library" },
  { icon: Icons.chartColumn, label: "Infographics" },
  { icon: Icons.gear, label: "Studio", permission: true },
];

export function BookSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar transition-transform duration-300 ease-in-out bg-gray-50 dark:bg-[rgb(14,15,16)]",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-sidebar-border">
            <div className="flex items-center gap-4">
              <Icons.mandarin className="text-xl" />

              <span className="text-xl font-bold text-sidebar-foreground">
                mook
              </span>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-6 h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      item.active &&
                        "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    )}
                  >
                    <item.icon className="text-xl" />
                    <span> {item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
