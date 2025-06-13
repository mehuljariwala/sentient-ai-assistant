import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileBottomNav } from "./MobileBottomNav";

// Mock usePathname
let mockPathname = "/";
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

describe("MobileBottomNav Component", () => {
  beforeEach(() => {
    mockPathname = "/";
  });

  it("renders navigation with all items", () => {
    render(<MobileBottomNav />);

    const nav = screen.getByRole("navigation", { name: /mobile navigation/i });
    expect(nav).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: /home/i });
    const historyLink = screen.getByRole("link", { name: /history/i });
    const discoverLink = screen.getByRole("link", { name: /discover/i });

    expect(homeLink).toBeInTheDocument();
    expect(historyLink).toBeInTheDocument();
    expect(discoverLink).toBeInTheDocument();
  });

  it("shows active indicator for current route", () => {
    const { container } = render(<MobileBottomNav />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("aria-current", "page");

    // Check for active indicator
    const activeIndicators = container.querySelectorAll(".bg-gray-900");
    expect(activeIndicators.length).toBeGreaterThan(0);
  });

  it("does not show active indicator for non-current routes", () => {
    render(<MobileBottomNav />);

    const historyLink = screen.getByRole("link", { name: /history/i });
    const discoverLink = screen.getByRole("link", { name: /discover/i });

    expect(historyLink).not.toHaveAttribute("aria-current");
    expect(discoverLink).not.toHaveAttribute("aria-current");
  });

  it("updates active state when route changes", () => {
    const { rerender } = render(<MobileBottomNav />);

    // Initially on home
    let homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("aria-current", "page");

    // Change to history route
    mockPathname = "/history";
    rerender(<MobileBottomNav />);

    homeLink = screen.getByRole("link", { name: /home/i });
    const historyLink = screen.getByRole("link", { name: /history/i });

    expect(homeLink).not.toHaveAttribute("aria-current");
    expect(historyLink).toHaveAttribute("aria-current", "page");
  });

  it("applies correct styling to active and inactive items", () => {
    render(<MobileBottomNav />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    const historyLink = screen.getByRole("link", { name: /history/i });

    expect(homeLink).toHaveClass("text-gray-900");
    expect(historyLink).toHaveClass("text-gray-400");
  });

  it("has correct href attributes for navigation links", () => {
    render(<MobileBottomNav />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    const historyLink = screen.getByRole("link", { name: /history/i });
    const discoverLink = screen.getByRole("link", { name: /discover/i });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(historyLink).toHaveAttribute("href", "/history");
    expect(discoverLink).toHaveAttribute("href", "/discover");
  });

  it("renders all icons with proper accessibility", () => {
    const { container } = render(<MobileBottomNav />);

    const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(svgs).toHaveLength(3); // Home, History, Discover icons
  });

  it("applies custom className", () => {
    const { container } = render(
      <MobileBottomNav className="custom-nav-class" />
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("custom-nav-class");
  });

  it("is hidden on large screens", () => {
    render(<MobileBottomNav />);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("lg:hidden");
  });

  it("has fixed positioning at bottom", () => {
    render(<MobileBottomNav />);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("fixed", "bottom-0", "left-0", "right-0");
  });

  it("includes safe area padding for iOS devices", () => {
    const { container } = render(<MobileBottomNav />);

    const safeAreaDiv = container.querySelector(".pb-safe");
    expect(safeAreaDiv).toBeInTheDocument();
  });

  it("shows hover effects on navigation items", async () => {
    const user = userEvent.setup();
    render(<MobileBottomNav />);

    const historyLink = screen.getByRole("link", { name: /history/i });

    // Check initial state
    expect(historyLink).toHaveClass("text-gray-400");

    // Hover should add hover classes
    await user.hover(historyLink);
    expect(historyLink).toHaveClass("hover:text-gray-600");
  });

  it("maintains proper tab order", () => {
    render(<MobileBottomNav />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);

    // Verify tab order matches visual order
    expect(links[0]).toHaveAccessibleName(/home/i);
    expect(links[1]).toHaveAccessibleName(/history/i);
    expect(links[2]).toHaveAccessibleName(/discover/i);
  });
});
