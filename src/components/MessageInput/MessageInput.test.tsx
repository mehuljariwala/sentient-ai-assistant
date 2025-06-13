import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MessageInput } from "./MessageInput";

describe("MessageInput Component", () => {
  const mockOnSendMessage = jest.fn();

  beforeEach(() => {
    mockOnSendMessage.mockClear();
  });

  it("renders with default props", () => {
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const textarea = screen.getByRole("textbox", { name: /message input/i });
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", "Ask me anything...");
  });

  it("renders with custom placeholder", () => {
    render(
      <MessageInput
        onSendMessage={mockOnSendMessage}
        placeholder="Custom placeholder"
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("placeholder", "Custom placeholder");
  });

  it("updates textarea value on input", async () => {
    const user = userEvent.setup();
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Test message");

    expect(textarea).toHaveValue("Test message");
  });

  it("calls onSendMessage when send button is clicked", async () => {
    const user = userEvent.setup();
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const textarea = screen.getByRole("textbox");

    // Type message first
    await user.type(textarea, "Test message");

    // Wait for the button to be enabled
    await waitFor(() => {
      const sendButton = screen.getByRole("button", { name: /send message/i });
      expect(sendButton).not.toBeDisabled();
    });

    const sendButton = screen.getByRole("button", { name: /send message/i });
    await user.click(sendButton);

    expect(mockOnSendMessage).toHaveBeenCalledWith("Test message");
    expect(textarea).toHaveValue("");
  });

  it("calls onSendMessage when Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Test message{Enter}");

    expect(mockOnSendMessage).toHaveBeenCalledWith("Test message");
    expect(textarea).toHaveValue("");
  });

  it("does not send message when Shift+Enter is pressed", async () => {
    const user = userEvent.setup();
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Test message{Shift>}{Enter}{/Shift}");

    expect(mockOnSendMessage).not.toHaveBeenCalled();
    expect(textarea).toHaveValue("Test message\n");
  });

  it("disables send button when message is empty", () => {
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const sendButton = screen.getByRole("button", { name: /send message/i });
    expect(sendButton).toBeDisabled();
  });

  it("enables send button when message has content", async () => {
    const user = userEvent.setup();
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const textarea = screen.getByRole("textbox");

    // Initially button should be disabled
    let sendButton = screen.getByRole("button", { name: /send message/i });
    expect(sendButton).toBeDisabled();

    // Type some text
    await user.type(textarea, "Test");

    // Wait for button to be enabled (due to AnimatePresence re-render)
    await waitFor(() => {
      sendButton = screen.getByRole("button", { name: /send message/i });
      expect(sendButton).not.toBeDisabled();
    });
  });

  it("disables all controls when disabled prop is true", () => {
    render(<MessageInput onSendMessage={mockOnSendMessage} disabled />);

    const textarea = screen.getByRole("textbox");
    const sendButton = screen.getByRole("button", { name: /send message/i });
    const attachButton = screen.queryByRole("button", { name: /attach file/i });

    expect(textarea).toBeDisabled();
    expect(sendButton).toBeDisabled();
    if (attachButton) {
      expect(attachButton).toBeDisabled();
    }
  });

  it("toggles between timing modes", async () => {
    const user = userEvent.setup();
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const miniButton = screen.getByRole("radio", {
      name: /4 second mini response/i,
    });
    const previewButton = screen.getByRole("radio", {
      name: /s1 preview response/i,
    });

    expect(miniButton).toHaveAttribute("aria-checked", "true");
    expect(previewButton).toHaveAttribute("aria-checked", "false");

    await user.click(previewButton);

    expect(miniButton).toHaveAttribute("aria-checked", "false");
    expect(previewButton).toHaveAttribute("aria-checked", "true");
  });

  it("shows focus ring when textarea is focused", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MessageInput onSendMessage={mockOnSendMessage} />
    );

    const textarea = screen.getByRole("textbox");
    const inputContainer = container.firstChild;

    await user.click(textarea);

    // Check if focus styles are applied (mocked in test environment)
    expect(inputContainer).toHaveClass("ring-2");
  });

  it("removes focus ring when textarea loses focus", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MessageInput onSendMessage={mockOnSendMessage} />
    );

    const textarea = screen.getByRole("textbox");
    const inputContainer = container.firstChild;

    await user.click(textarea);
    await user.tab(); // Move focus away

    // Check if focus styles are removed
    expect(inputContainer).not.toHaveClass("ring-2");
  });

  it("trims whitespace from message before sending", async () => {
    const user = userEvent.setup();
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const textarea = screen.getByRole("textbox");

    // Type message with whitespace
    await user.type(textarea, "  Test message  ");

    // Wait for button to be enabled
    await waitFor(() => {
      const sendButton = screen.getByRole("button", { name: /send message/i });
      expect(sendButton).not.toBeDisabled();
    });

    const sendButton = screen.getByRole("button", { name: /send message/i });
    await user.click(sendButton);

    expect(mockOnSendMessage).toHaveBeenCalledWith("Test message");
  });

  it("does not send empty message with only whitespace", async () => {
    const user = userEvent.setup();
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const textarea = screen.getByRole("textbox");
    const sendButton = screen.getByRole("button", { name: /send message/i });

    await user.type(textarea, "   ");

    expect(sendButton).toBeDisabled();

    await user.click(sendButton);
    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });

  it("has proper accessibility attributes", () => {
    render(<MessageInput onSendMessage={mockOnSendMessage} />);

    const textarea = screen.getByRole("textbox");
    const timingGroup = screen.getByRole("radiogroup");

    expect(textarea).toHaveAttribute("aria-label", "Message input");
    expect(textarea).toHaveAttribute("aria-describedby", "timing-mode");
    expect(timingGroup).toHaveAttribute("aria-label", "Response timing mode");
  });

  it("applies custom className", () => {
    const { container } = render(
      <MessageInput
        onSendMessage={mockOnSendMessage}
        className="custom-class"
      />
    );

    const inputContainer = container.firstChild;
    expect(inputContainer).toHaveClass("custom-class");
  });
});
