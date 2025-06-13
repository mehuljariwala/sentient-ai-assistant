export interface SidebarProps {
  className?: string;
}

export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active?: boolean;
}

export interface IconProps {
  className?: string;
}
