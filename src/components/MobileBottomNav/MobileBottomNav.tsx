"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MobileBottomNavProps,
  IconProps,
  NavItem,
} from "./MobileBottomNav.types";
import {
  ANIMATION_CONFIG,
  ICON_PATHS,
  ICON_CONFIG,
  ACCESSIBILITY_LABELS,
} from "./MobileBottomNav.data";
import {
  navClasses,
  navItemClasses,
  iconClasses,
  svgAttributes,
} from "./MobileBottomNav.styles";

// Custom icon components
function HomeIcon({ className }: IconProps) {
  return (
    <svg
      width={ICON_CONFIG.SIZE.width}
      height={ICON_CONFIG.SIZE.height}
      viewBox={ICON_PATHS.HOME.viewBox}
      className={className}
      {...svgAttributes.common}
    >
      {ICON_PATHS.HOME.paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          strokeWidth={path.strokeWidth}
          {...svgAttributes.stroke}
        />
      ))}
    </svg>
  );
}

function HistoryIcon({ className }: IconProps) {
  return (
    <svg
      width={ICON_CONFIG.SIZE.width}
      height={ICON_CONFIG.SIZE.height}
      viewBox={ICON_PATHS.HISTORY.viewBox}
      className={className}
      {...svgAttributes.common}
    >
      {ICON_PATHS.HISTORY.paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fillRule={path.fillRule as any}
          clipRule={path.clipRule as any}
          fill={path.fill}
        />
      ))}
    </svg>
  );
}

function DiscoverIcon({ className }: IconProps) {
  return (
    <svg
      width={ICON_CONFIG.SIZE.width}
      height={ICON_CONFIG.SIZE.height}
      viewBox={ICON_PATHS.DISCOVER.viewBox}
      className={className}
      {...svgAttributes.common}
    >
      {ICON_PATHS.DISCOVER.paths.map((path, index) => (
        <path key={index} d={path.d} fill={path.fill} />
      ))}
    </svg>
  );
}

export function MobileBottomNav({ className }: MobileBottomNavProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { icon: HomeIcon, label: ACCESSIBILITY_LABELS.HOME, href: "/" },
    {
      icon: HistoryIcon,
      label: ACCESSIBILITY_LABELS.HISTORY,
      href: "/history",
    },
    {
      icon: DiscoverIcon,
      label: ACCESSIBILITY_LABELS.DISCOVER,
      href: "/discover",
    },
  ];

  return (
    <nav
      className={cn(navClasses.container, className)}
      role="navigation"
      aria-label={ACCESSIBILITY_LABELS.NAV}
    >
      {/* Active indicator bar with animation */}
      <div className={navClasses.indicatorBar}>
        <div className={navClasses.indicatorContainer}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.label} className={navClasses.indicatorItem}>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      {...ANIMATION_CONFIG.ACTIVE_TAB}
                      className={navClasses.activeIndicator}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* iOS home indicator space */}
      <div className={navClasses.bottomPadding}>
        <div className={navClasses.navItems}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  navItemClasses.base,
                  isActive ? navItemClasses.active : navItemClasses.inactive
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Hover effect */}
                <motion.div
                  className={navItemClasses.hoverEffect}
                  {...ANIMATION_CONFIG.HOVER_EFFECT}
                />

                {/* Icon with micro-interaction */}
                <motion.div
                  {...ANIMATION_CONFIG.ICON_INTERACTION}
                  className={navItemClasses.iconContainer}
                >
                  <Icon className={iconClasses.base} />
                </motion.div>

                {/* Label */}
                <span className={navItemClasses.label}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MobileBottomNav;
