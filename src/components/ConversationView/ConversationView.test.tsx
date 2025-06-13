import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConversationView } from "./ConversationView";
import { useAssistantStore, suggestedPrompts } from "@/store/assistant-store";
import { SuggestedPrompt } from "@/types/assistant";

// Mock the store
jest.mock("@/store/assistant-store", () => ({
  useAssistantStore: jest.fn(),
  suggestedPrompts: [
    { id: "1", text: "What's the meaning of life?" },
    { id: "2", text: "How do you define love?" },
    { id: "3", text: "What's the meaning of AI?" },
    { id: "4", text: "What is Sentient?" },
  ],
}));

// Mock the child components
jest.mock("../Logo", () => ({
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

jest.mock("../Message", () => ({
  Message: ({
    message,
    isLast,
  }: {
    message: { role: string; content?: string };
    isLast?: boolean;
  }) => (
    <div data-testid="message" data-role={message.role} data-is-last={isLast}>
      {message.content || "Loading..."}
    </div>
  ),
}));

jest.mock("../MessageInput", () => ({
  MessageInput: ({
    onSendMessage,
    disabled,
    placeholder,
    className,
  }: {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
  }) => (
    <input
      data-testid="message-input"
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          const target = e.target as HTMLInputElement;
          if (target.value) {
            onSendMessage(target.value);
          }
        }
      }}
    />
  ),
}));

jest.mock("../SuggestedPrompts", () => ({
  SuggestedPrompts: ({
    prompts,
    onSelectPrompt,
    className,
  }: {
    prompts: SuggestedPrompt[];
    onSelectPrompt: (prompt: string) => void;
    className?: string;
  }) => (
    <div data-testid="suggested-prompts" className={className}>
      {prompts &&
        prompts.map((prompt, index) => (
          <button
            key={prompt.id}
            data-testid={`prompt-${index}`}
            onClick={() => onSelectPrompt(prompt.text)}
          >
            {prompt.text}
          </button>
        ))}
    </div>
  ),
}));

describe("ConversationView", () => {
  const mockSendMessage = jest.fn();
  const mockCreateNewConversation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAssistantStore as unknown as jest.Mock).mockReturnValue({
      currentConversation: null,
      sendMessage: mockSendMessage,
      isLoading: false,
      createNewConversation: mockCreateNewConversation,
    });
  });

  it("renders welcome screen when no messages", () => {
    render(<ConversationView />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Sentient")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ask me anything...")
    ).toBeInTheDocument();
    expect(screen.getByTestId("suggested-prompts")).toBeInTheDocument();
  });

  it("creates new conversation on mount if none exists", () => {
    render(<ConversationView />);

    expect(mockCreateNewConversation).toHaveBeenCalled();
  });

  it("renders messages view when messages exist", () => {
    const mockMessages = [
      { id: "1", role: "user", content: "Hello", timestamp: new Date() },
      {
        id: "2",
        role: "assistant",
        content: "Hi there!",
        timestamp: new Date(),
      },
    ];

    (useAssistantStore as unknown as jest.Mock).mockReturnValue({
      currentConversation: { messages: mockMessages },
      sendMessage: mockSendMessage,
      isLoading: false,
      createNewConversation: mockCreateNewConversation,
    });

    render(<ConversationView />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ask a follow up...")
    ).toBeInTheDocument();
  });

  it("shows loading message when isLoading is true", () => {
    const mockMessages = [
      { id: "1", role: "user", content: "Hello", timestamp: new Date() },
    ];

    (useAssistantStore as unknown as jest.Mock).mockReturnValue({
      currentConversation: { messages: mockMessages },
      sendMessage: mockSendMessage,
      isLoading: true,
      createNewConversation: mockCreateNewConversation,
    });

    render(<ConversationView />);

    // The loading message is shown as an empty assistant message
    const messages = screen.getAllByTestId("message");
    const loadingMessage = messages.find(
      (msg) => msg.textContent === "Loading..."
    );
    expect(loadingMessage).toBeInTheDocument();
  });

  it("handles sending messages", async () => {
    render(<ConversationView />);

    const input = screen.getByPlaceholderText(
      "Ask me anything..."
    ) as HTMLInputElement;

    // Set the value first
    fireEvent.change(input, { target: { value: "Test message" } });

    // Then trigger Enter key
    fireEvent.keyPress(input, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith("Test message");
    });
  });

  it("handles selecting suggested prompts", () => {
    render(<ConversationView />);

    const firstPrompt = screen.getByTestId("prompt-0");
    fireEvent.click(firstPrompt);

    expect(mockSendMessage).toHaveBeenCalledWith("What's the meaning of life?");
  });

  it("applies custom className", () => {
    const { container } = render(<ConversationView className="custom-class" />);

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("shows follow-up prompts for conversations with less than 3 messages", () => {
    const mockMessages = [
      { id: "1", role: "user", content: "Hello", timestamp: new Date() },
    ];

    (useAssistantStore as unknown as jest.Mock).mockReturnValue({
      currentConversation: { messages: mockMessages },
      sendMessage: mockSendMessage,
      isLoading: false,
      createNewConversation: mockCreateNewConversation,
    });

    render(<ConversationView />);

    // Should show follow-up prompts (hidden on mobile, but present in DOM)
    const prompts = screen.getAllByTestId("suggested-prompts");
    expect(prompts.length).toBeGreaterThan(0);
  });
});
