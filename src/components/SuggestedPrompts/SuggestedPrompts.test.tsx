import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { SuggestedPrompt } from "@/types/assistant";

describe("SuggestedPrompts", () => {
  const mockPrompts: SuggestedPrompt[] = [
    { id: "1", text: "What is consciousness?" },
    { id: "2", text: "Explain quantum computing" },
    { id: "3", text: "Tell me about AI ethics" },
  ];

  const mockOnSelectPrompt = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all prompts", () => {
    render(
      <SuggestedPrompts
        prompts={mockPrompts}
        onSelectPrompt={mockOnSelectPrompt}
      />
    );

    mockPrompts.forEach((prompt) => {
      expect(screen.getByText(prompt.text)).toBeInTheDocument();
    });
  });

  it("renders no prompts when array is empty", () => {
    const { container } = render(
      <SuggestedPrompts prompts={[]} onSelectPrompt={mockOnSelectPrompt} />
    );

    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(0);
  });

  it("calls onSelectPrompt with correct text when prompt is clicked", () => {
    render(
      <SuggestedPrompts
        prompts={mockPrompts}
        onSelectPrompt={mockOnSelectPrompt}
      />
    );

    const firstPrompt = screen.getByText(mockPrompts[0].text);
    fireEvent.click(firstPrompt);

    expect(mockOnSelectPrompt).toHaveBeenCalledTimes(1);
    expect(mockOnSelectPrompt).toHaveBeenCalledWith(mockPrompts[0].text);
  });

  it("applies custom className", () => {
    const { container } = render(
      <SuggestedPrompts
        prompts={mockPrompts}
        onSelectPrompt={mockOnSelectPrompt}
        className="custom-prompts"
      />
    );

    const promptsContainer = container.firstChild;
    expect(promptsContainer).toHaveClass("custom-prompts");
  });

  it("has correct styling classes", () => {
    const { container } = render(
      <SuggestedPrompts
        prompts={mockPrompts}
        onSelectPrompt={mockOnSelectPrompt}
      />
    );

    const promptsContainer = container.firstChild;
    expect(promptsContainer).toHaveClass(
      "flex",
      "flex-wrap",
      "gap-2",
      "lg:gap-3",
      "justify-center"
    );
  });

  it("prompt buttons have correct styling", () => {
    render(
      <SuggestedPrompts
        prompts={mockPrompts}
        onSelectPrompt={mockOnSelectPrompt}
      />
    );

    const firstPromptButton = screen.getByText(mockPrompts[0].text);
    expect(firstPromptButton).toHaveClass(
      "px-3",
      "lg:px-4",
      "py-2",
      "lg:py-2.5"
    );
    expect(firstPromptButton).toHaveClass("bg-gray-100", "dark:bg-gray-800");
    expect(firstPromptButton).toHaveClass("rounded-lg", "transition-colors");
  });

  it("handles multiple prompt selections", () => {
    render(
      <SuggestedPrompts
        prompts={mockPrompts}
        onSelectPrompt={mockOnSelectPrompt}
      />
    );

    mockPrompts.forEach((prompt, index) => {
      const promptButton = screen.getByText(prompt.text);
      fireEvent.click(promptButton);

      expect(mockOnSelectPrompt).toHaveBeenCalledTimes(index + 1);
      expect(mockOnSelectPrompt).toHaveBeenLastCalledWith(prompt.text);
    });
  });
});
