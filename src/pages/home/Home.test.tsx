import React from "react";
import { render, screen } from "@testing-library/react";
import { HomePage } from "./Home";
import { useAssistantStore } from "@/store/assistant-store";

// Mock the components
jest.mock("@/components/Sidebar", () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

jest.mock("@/components/ConversationView", () => ({
  ConversationView: ({ className }: { className?: string }) => (
    <div data-testid="conversation-view" className={className}>
      ConversationView
    </div>
  ),
}));

jest.mock("@/components/MobileHeader", () => ({
  MobileHeader: ({ onNewChat }: { onNewChat: () => void }) => (
    <div data-testid="mobile-header" onClick={onNewChat}>
      MobileHeader
    </div>
  ),
}));

jest.mock("@/components/MobileBottomNav", () => ({
  MobileBottomNav: () => (
    <div data-testid="mobile-bottom-nav">MobileBottomNav</div>
  ),
}));

// Mock the store
jest.mock("@/store/assistant-store");

describe("HomePage Component", () => {
  const mockCreateNewConversation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAssistantStore as unknown as jest.Mock).mockReturnValue({
      createNewConversation: mockCreateNewConversation,
    });
  });

  it("renders all components correctly", () => {
    render(<HomePage />);

    expect(screen.getByTestId("mobile-header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("conversation-view")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-bottom-nav")).toBeInTheDocument();
  });

  it("applies correct styles to components", () => {
    const { container } = render(<HomePage />);

    // Check container styles
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass(
      "flex",
      "flex-col",
      "lg:flex-row",
      "h-screen",
      "bg-gray-50"
    );

    // Check sidebar wrapper styles
    const sidebarWrapper = screen.getByTestId("sidebar").parentElement;
    expect(sidebarWrapper).toHaveClass("hidden", "lg:block");

    // Check main content styles
    const mainContent = container.querySelector("main");
    expect(mainContent).toHaveClass(
      "flex-1",
      "flex",
      "flex-col",
      "lg:flex-row"
    );

    // Check conversation view styles
    const conversationView = screen.getByTestId("conversation-view");
    expect(conversationView).toHaveClass("flex-1");
  });

  it("passes createNewConversation to MobileHeader", () => {
    render(<HomePage />);

    const mobileHeader = screen.getByTestId("mobile-header");
    mobileHeader.click();

    expect(mockCreateNewConversation).toHaveBeenCalledTimes(1);
  });

  it("renders with custom className", () => {
    render(<HomePage className="custom-class" />);

    // The HomePage component doesn't actually use the className prop in the implementation
    // This test is here for completeness
    expect(screen.getByTestId("conversation-view")).toBeInTheDocument();
  });

  it("uses the assistant store hook", () => {
    render(<HomePage />);

    expect(useAssistantStore).toHaveBeenCalled();
  });
});
