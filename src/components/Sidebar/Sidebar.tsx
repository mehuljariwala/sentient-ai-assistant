"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { useAssistantStore } from "@/store/assistant-store";
import { usePathname } from "next/navigation";
import { SidebarProps } from "./Sidebar.types";
import {
  SIDEBAR_CONFIG,
  HomeIcon,
  LoadingIcon,
  GlobeIcon,
  MENU_ITEMS_DATA,
  ACCESSIBILITY_LABELS,
} from "./Sidebar.data";
import {
  sidebarClasses,
  buttonClasses,
  accountButtonClasses,
} from "./Sidebar.styles";

export function Sidebar({ className }: SidebarProps) {
  const { createNewConversation } = useAssistantStore();
  const pathname = usePathname();

  const menuItems = [
    {
      ...MENU_ITEMS_DATA[0],
      icon: HomeIcon,
      active: pathname === MENU_ITEMS_DATA[0].href,
    },
    {
      ...MENU_ITEMS_DATA[1],
      icon: LoadingIcon,
      active: pathname === MENU_ITEMS_DATA[1].href,
    },
    {
      ...MENU_ITEMS_DATA[2],
      icon: GlobeIcon,
      active: pathname === MENU_ITEMS_DATA[2].href,
    },
  ];

  return (
    <div className={cn(sidebarClasses.container, className)}>
      {/* Logo at top */}
      <div className={sidebarClasses.logoSection}>
        <Logo size={SIDEBAR_CONFIG.LOGO_SIZE} animate={false} />
      </div>

      {/* Spacer to push menu to center */}
      <div className={sidebarClasses.spacer} />

      {/* Main Navigation - Center */}
      <nav className={sidebarClasses.nav}>
        <ul className={sidebarClasses.navList}>
          {menuItems.map((item) => (
            <li key={item.label} className={sidebarClasses.navItem}>
              <button
                className={cn(
                  buttonClasses.base,
                  item.active ? buttonClasses.active : buttonClasses.inactive
                )}
                aria-label={item.label}
              >
                <item.icon className={buttonClasses.icon} />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Spacer to push bottom items down */}
      <div className={sidebarClasses.spacer} />

      {/* Bottom items */}
      <div className={sidebarClasses.bottomSection}>
        {/* Plus Button */}
        <div className={sidebarClasses.buttonContainer}>
          <button
            onClick={createNewConversation}
            className={cn(buttonClasses.base, buttonClasses.inactive)}
            aria-label={ACCESSIBILITY_LABELS.NEW_CONVERSATION}
          >
            <Plus className={buttonClasses.icon} />
          </button>
        </div>

        {/* Round S icon */}
        <div className={sidebarClasses.buttonContainer}>
          <button
            className={accountButtonClasses.base}
            aria-label={ACCESSIBILITY_LABELS.ACCOUNT}
          >
            {SIDEBAR_CONFIG.ACCOUNT_BUTTON.TEXT}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
