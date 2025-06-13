export interface MobileBottomNavProps {
  className?: string;
}

export interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

export interface IconProps {
  className?: string;
}
