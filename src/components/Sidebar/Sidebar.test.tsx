import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sidebar } from "./Sidebar";
import { useAssistantStore } from "@/store/assistant-store";
import { usePathname } from "next/navigation";

// Mock dependencies
jest.mock("@/store/assistant-store");
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));
jest.mock("@/components/Logo", () => ({
  Logo: ({ size, animate }: any) => (
    <div data-testid="logo" data-size={size} data-animate={animate}>
      Logo
    </div>
  ),
}));

// Mock the icon components from Sidebar.data
jest.mock("./Sidebar.data", () => ({
  ...jest.requireActual("./Sidebar.data"),
  HomeIcon: ({ className }: any) => (
    <div data-testid="home-icon" className={className}>
      Home
    </div>
  ),
  LoadingIcon: ({ className }: any) => (
    <div data-testid="loading-icon" className={className}>
      Loading
    </div>
  ),
  GlobeIcon: ({ className }: any) => (
    <div data-testid="globe-icon" className={className}>
      Globe
    </div>
  ),
}));

describe("Sidebar Component", () => {
  const mockCreateNewConversation = jest.fn();
  const mockUsePathname = usePathname as jest.MockedFunction<
    typeof usePathname
  >;
  const mockUseAssistantStore = useAssistantStore as jest.MockedFunction<
    typeof useAssistantStore
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAssistantStore.mockReturnValue({
      createNewConversation: mockCreateNewConversation,
    } as any);
    mockUsePathname.mockReturnValue("/");
  });

  it("renders the logo", () => {
    render(<Sidebar />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("data-size", "32");
    expect(logo).toHaveAttribute("data-animate", "false");
  });

  it("renders all navigation items", () => {
    render(<Sidebar />);

    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("globe-icon")).toBeInTheDocument();
  });

  it("highlights the active navigation item", () => {
    render(<Sidebar />);

    const buttons = screen.getAllByRole("button");
    const homeButton = buttons.find(
      (btn) => btn.getAttribute("aria-label") === "Home"
    );

    expect(homeButton).toHaveClass("bg-gray-900", "text-white");
  });

  it("applies inactive styles to non-active items", () => {
    render(<Sidebar />);

    const buttons = screen.getAllByRole("button");
    const historyButton = buttons.find(
      (btn) => btn.getAttribute("aria-label") === "History"
    );
    const exploreButton = buttons.find(
      (btn) => btn.getAttribute("aria-label") === "Explore"
    );

    expect(historyButton).toHaveClass("text-gray-600");
    expect(exploreButton).toHaveClass("text-gray-600");
  });

  it("updates active item based on pathname", () => {
    mockUsePathname.mockReturnValue("/history");
    render(<Sidebar />);

    const buttons = screen.getAllByRole("button");
    const historyButton = buttons.find(
      (btn) => btn.getAttribute("aria-label") === "History"
    );

    expect(historyButton).toHaveClass("bg-gray-900", "text-white");
  });

  it("renders the new conversation button", () => {
    render(<Sidebar />);

    const newConversationButton = screen.getByLabelText("New conversation");
    expect(newConversationButton).toBeInTheDocument();
  });

  it("calls createNewConversation when plus button is clicked", () => {
    render(<Sidebar />);

    const newConversationButton = screen.getByLabelText("New conversation");
    fireEvent.click(newConversationButton);

    expect(mockCreateNewConversation).toHaveBeenCalledTimes(1);
  });

  it("renders the account button", () => {
    render(<Sidebar />);

    const accountButton = screen.getByLabelText("Account");
    expect(accountButton).toBeInTheDocument();
    expect(accountButton).toHaveTextContent("S");
  });

  it("applies custom className", () => {
    const { container } = render(<Sidebar className="custom-sidebar" />);

    const sidebar = container.firstChild;
    expect(sidebar).toHaveClass("custom-sidebar");
  });

  it("has proper accessibility labels", () => {
    render(<Sidebar />);

    expect(screen.getByLabelText("Home")).toBeInTheDocument();
    expect(screen.getByLabelText("History")).toBeInTheDocument();
    expect(screen.getByLabelText("Explore")).toBeInTheDocument();
    expect(screen.getByLabelText("New conversation")).toBeInTheDocument();
    expect(screen.getByLabelText("Account")).toBeInTheDocument();
  });

  it("maintains proper layout structure", () => {
    const { container } = render(<Sidebar />);

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass("flex", "flex-col", "h-full", "w-16");
  });
});
