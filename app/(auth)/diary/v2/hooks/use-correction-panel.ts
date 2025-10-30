import { useState, useCallback } from "react";
import { CorrectionStatus } from "../types";

export const useCorrectionPanel = () => {
  const [isCorrectionPanelOpen, setIsCorrectionPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuAnimating, setIsMobileMenuAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<CorrectionStatus>("pending");

  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuAnimating) return;

    setIsMobileMenuAnimating(true);
    setIsMobileMenuOpen(!isMobileMenuOpen);

    setTimeout(() => {
      setIsMobileMenuAnimating(false);
    }, 300); // Match animation duration
  }, [isMobileMenuAnimating, isMobileMenuOpen]);

  return {
    isCorrectionPanelOpen,
    setIsCorrectionPanelOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMobileMenuAnimating,
    toggleMobileMenu,
    activeTab,
    setActiveTab,
  };
};
