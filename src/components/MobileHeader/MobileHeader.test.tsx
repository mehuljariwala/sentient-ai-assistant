import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileHeader } from "./MobileHeader";

describe("MobileHeader", () => {
  it("renders header with correct structure", () => {
    render(<MobileHeader />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("lg:hidden"); // Should be hidden on desktop
  });

  it("renders new chat button", () => {
    render(<MobileHeader />);

    const newChatButton = screen.getByLabelText("New conversation");
    expect(newChatButton).toBeInTheDocument();
  });

  it("renders account button with S text", () => {
    render(<MobileHeader />);

    const accountButton = screen.getByLabelText("Account");
    expect(accountButton).toBeInTheDocument();
    expect(accountButton).toHaveTextContent("S");
  });

  it("calls onNewChat when plus button is clicked", () => {
    const mockOnNewChat = jest.fn();
    render(<MobileHeader onNewChat={mockOnNewChat} />);

    const newChatButton = screen.getByLabelText("New conversation");
    fireEvent.click(newChatButton);

    expect(mockOnNewChat).toHaveBeenCalledTimes(1);
  });

  it("does not throw when onNewChat is not provided", () => {
    render(<MobileHeader />);

    const newChatButton = screen.getByLabelText("New conversation");
    expect(() => fireEvent.click(newChatButton)).not.toThrow();
  });

  it("applies custom className", () => {
    render(<MobileHeader className="custom-header" />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("custom-header");
  });

  it("has correct styling classes", () => {
    render(<MobileHeader />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("flex", "items-center", "justify-between");
    expect(header).toHaveClass("bg-white", "dark:bg-gray-900");
    expect(header).toHaveClass(
      "border-b",
      "border-gray-200",
      "dark:border-gray-800"
    );
  });

  it("account button has correct styling", () => {
    render(<MobileHeader />);

    const accountButton = screen.getByLabelText("Account");
    expect(accountButton).toHaveClass("rounded-full", "border-2");
    expect(accountButton).toHaveClass("w-10", "h-10");
  });
});
