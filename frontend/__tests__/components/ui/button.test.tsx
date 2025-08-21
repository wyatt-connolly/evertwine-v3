import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("should render button with default variant", () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center"
      );
    });

    it("should render button with custom variant", () => {
      render(<Button variant="destructive">Delete</Button>);

      const button = screen.getByRole("button", { name: /delete/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(
        "bg-destructive",
        "text-destructive-foreground"
      );
    });

    it("should render button with custom size", () => {
      render(<Button size="lg">Large Button</Button>);

      const button = screen.getByRole("button", { name: /large button/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("h-11", "px-8");
    });

    it("should render disabled button", () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole("button", { name: /disabled button/i });
      expect(button).toBeDisabled();
      expect(button).toHaveClass("pointer-events-none", "opacity-50");
    });

    it("should render button with loading state", () => {
      render(<Button loading>Loading Button</Button>);

      const button = screen.getByRole("button", { name: /loading button/i });
      expect(button).toBeDisabled();
      expect(button).toHaveClass("pointer-events-none");
    });
  });

  describe("Variants", () => {
    it("should apply default variant styles", () => {
      render(<Button>Default</Button>);

      const button = screen.getByRole("button", { name: /default/i });
      expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    });

    it("should apply secondary variant styles", () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole("button", { name: /secondary/i });
      expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
    });

    it("should apply outline variant styles", () => {
      render(<Button variant="outline">Outline</Button>);

      const button = screen.getByRole("button", { name: /outline/i });
      expect(button).toHaveClass("border", "border-input", "bg-background");
    });

    it("should apply ghost variant styles", () => {
      render(<Button variant="ghost">Ghost</Button>);

      const button = screen.getByRole("button", { name: /ghost/i });
      expect(button).toHaveClass(
        "hover:bg-accent",
        "hover:text-accent-foreground"
      );
    });

    it("should apply link variant styles", () => {
      render(<Button variant="link">Link</Button>);

      const button = screen.getByRole("button", { name: /link/i });
      expect(button).toHaveClass("text-primary", "underline-offset-4");
    });
  });

  describe("Sizes", () => {
    it("should apply default size styles", () => {
      render(<Button>Default Size</Button>);

      const button = screen.getByRole("button", { name: /default size/i });
      expect(button).toHaveClass("h-10", "px-4", "py-2");
    });

    it("should apply small size styles", () => {
      render(<Button size="sm">Small</Button>);

      const button = screen.getByRole("button", { name: /small/i });
      expect(button).toHaveClass("h-9", "rounded-md", "px-3");
    });

    it("should apply large size styles", () => {
      render(<Button size="lg">Large</Button>);

      const button = screen.getByRole("button", { name: /large/i });
      expect(button).toHaveClass("h-11", "rounded-md", "px-8");
    });

    it("should apply icon size styles", () => {
      render(<Button size="icon">Icon</Button>);

      const button = screen.getByRole("button", { name: /icon/i });
      expect(button).toHaveClass("h-10", "w-10");
    });
  });

  describe("Interactions", () => {
    it("should call onClick handler when clicked", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button", { name: /click me/i });
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      const button = screen.getByRole("button", { name: /disabled/i });
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should not call onClick when loading", () => {
      const handleClick = jest.fn();
      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      );

      const button = screen.getByRole("button", { name: /loading/i });
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes when loading", () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole("button", { name: /loading/i });
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should have proper ARIA attributes when disabled", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button", { name: /disabled/i });
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Custom Props", () => {
    it("should forward additional props", () => {
      render(
        <Button data-testid="custom-button" aria-label="Custom label">
          Custom
        </Button>
      );

      const button = screen.getByTestId("custom-button");
      expect(button).toHaveAttribute("aria-label", "Custom label");
    });

    it("should apply custom className", () => {
      render(<Button className="custom-class">Custom Class</Button>);

      const button = screen.getByRole("button", { name: /custom class/i });
      expect(button).toHaveClass("custom-class");
    });

    it("should render as different element when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole("link", { name: /link button/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
    });
  });
});
