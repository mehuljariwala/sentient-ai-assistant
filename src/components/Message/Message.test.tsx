import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Message } from "./Message";
import { Message as MessageType } from "@/types/assistant";

// Mock the Logo component
jest.mock("@/components/Logo", () => ({
  Logo: ({
    size,
    animate,
    className,
  }: {
    size?: number;
    animate?: boolean;
    className?: string;
  }) => (
    <div
      data-testid="logo"
      data-size={size}
      data-animate={animate}
      className={className}
    >
      Logo
    </div>
  ),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
  },
}));

describe("Message Component", () => {
  const mockUserMessage: MessageType = {
    id: "1",
    role: "user",
    content: "Hello, how are you?",
    timestamp: new Date(),
  };

  const mockAssistantMessage: MessageType = {
    id: "2",
    role: "assistant",
    content: "I'm doing well, thank you!",
    timestamp: new Date(),
  };

  const mockLoadingMessage: MessageType = {
    id: "3",
    role: "assistant",
    content: "",
    timestamp: new Date(),
    isLoading: true,
  };

  it("renders user message correctly", () => {
    render(<Message message={mockUserMessage} />);

    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("U")).toBeInTheDocument();
    expect(screen.getByText("Hello, how are you?")).toBeInTheDocument();
  });

  it("renders assistant message correctly", () => {
    render(<Message message={mockAssistantMessage} />);

    expect(screen.getByText("Sentient")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText("I'm doing well, thank you!")).toBeInTheDocument();
  });

  it("renders loading state correctly", () => {
    render(<Message message={mockLoadingMessage} />);

    expect(screen.getByText("Sentient")).toBeInTheDocument();
    expect(
      screen.getByText("Searching for what is sentient...")
    ).toBeInTheDocument();

    const logos = screen.getAllByTestId("logo");
    expect(logos).toHaveLength(2); // Avatar and loading indicator
    expect(logos[1]).toHaveAttribute("data-animate", "true");
  });

  it("shows action buttons for last assistant message", () => {
    render(<Message message={mockAssistantMessage} isLast={true} />);

    expect(screen.getByLabelText("Copy message")).toBeInTheDocument();
    expect(screen.getByLabelText("Like message")).toBeInTheDocument();
    expect(screen.getByLabelText("Dislike message")).toBeInTheDocument();
  });

  it("does not show action buttons for user messages", () => {
    render(<Message message={mockUserMessage} isLast={true} />);

    expect(screen.queryByLabelText("Copy message")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Like message")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Dislike message")).not.toBeInTheDocument();
  });

  it("does not show action buttons for non-last messages", () => {
    render(<Message message={mockAssistantMessage} isLast={false} />);

    expect(screen.queryByLabelText("Copy message")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Like message")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Dislike message")).not.toBeInTheDocument();
  });

  it("handles copy functionality", async () => {
    jest.useFakeTimers();
    const mockWriteText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    render(<Message message={mockAssistantMessage} isLast={true} />);

    const copyButton = screen.getByLabelText("Copy message");

    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(mockWriteText).toHaveBeenCalledWith("I'm doing well, thank you!");

    // The "Copied!" text appears inside the button
    const copiedButton = screen.getByLabelText("Copy message");
    expect(copiedButton).toHaveTextContent("Copied!");

    // Fast-forward time to see the text disappear
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      const button = screen.getByLabelText("Copy message");
      expect(button).not.toHaveTextContent("Copied!");
    });

    jest.useRealTimers();
  });

  it("applies correct styling for user messages", () => {
    const { container } = render(<Message message={mockUserMessage} />);
    const messageDiv = container.firstChild;

    expect(messageDiv).toHaveClass("bg-white", "dark:bg-gray-900");
  });

  it("applies correct styling for assistant messages", () => {
    const { container } = render(<Message message={mockAssistantMessage} />);
    const messageDiv = container.firstChild;

    expect(messageDiv).toHaveClass("bg-gray-50", "dark:bg-gray-950");
  });

  it("renders custom loading message when provided", () => {
    const customLoadingMessage: MessageType = {
      ...mockLoadingMessage,
      content: "Processing your request...",
    };

    render(<Message message={customLoadingMessage} />);

    expect(screen.getByText("Processing your request...")).toBeInTheDocument();
  });
});
