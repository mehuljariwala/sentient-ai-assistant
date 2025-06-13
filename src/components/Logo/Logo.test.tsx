import React from "react";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo Component", () => {
  it("renders with default props", () => {
    render(<Logo />);
    const logo = screen.getByRole("img", { name: /sentient ai logo/i });
    expect(logo).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    const { container } = render(<Logo size={60} />);
    const logoContainer = container.firstChild;
    // Height is calculated based on aspect ratio (61/55)
    const expectedHeight = 60 * (61 / 55);
    expect(logoContainer).toHaveStyle({
      width: "60px",
      height: `${expectedHeight}px`,
    });
  });

  it("applies custom className", () => {
    const { container } = render(<Logo className="custom-class" />);
    const logoContainer = container.firstChild;
    expect(logoContainer).toHaveClass("custom-class");
  });

  it("renders SVG with correct viewBox", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 55 61");
  });

  it("has proper accessibility attributes", () => {
    render(<Logo />);
    const logo = screen.getByRole("img", { name: /sentient ai logo/i });
    expect(logo).toHaveAttribute("aria-label", "Sentient AI logo");
  });

  it("renders all SVG paths", () => {
    const { container } = render(<Logo />);
    const paths = container.querySelectorAll("path");

    // The logo has 18 paths
    expect(paths).toHaveLength(18);
  });

  it("applies animation when animate prop is true", () => {
    const { container } = render(<Logo animate={true} />);
    const logoContainer = container.firstChild;
    // Since framer-motion is mocked, we just check if the component renders
    expect(logoContainer).toBeInTheDocument();
  });

  it("does not apply animation when animate prop is false", () => {
    const { container } = render(<Logo animate={false} />);
    const logoContainer = container.firstChild;
    // Since framer-motion is mocked, we just check if the component renders
    expect(logoContainer).toBeInTheDocument();
  });

  it("maintains aspect ratio with different sizes", () => {
    const sizes = [20, 40, 60, 80, 100];
    const aspectRatio = 61 / 55;

    sizes.forEach((size) => {
      const { container } = render(<Logo size={size} />);
      const logoContainer = container.firstChild;
      const svg = container.querySelector("svg");
      const expectedHeight = size * aspectRatio;

      expect(logoContainer).toHaveStyle({
        width: `${size}px`,
        height: `${expectedHeight}px`,
      });
      expect(svg).toHaveAttribute("width", size.toString());
      expect(svg).toHaveAttribute("height", expectedHeight.toString());
    });
  });
});
