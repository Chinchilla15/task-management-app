import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "@/components/common/Button";
import Bell from "@icons/Bell.svg?react";

describe("Button component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("bg-primary-4");
  });

  it("renders with custom className", () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("custom-class");
  });

  it("renders with an icon", () => {
    render(<Button icon={Bell}>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("renders without animation", () => {
    render(<Button noAnimation>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).not.toHaveClass("animation");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as a child element", () => {
    render(
      <Button asChild>
        <a href="/test">Click me</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: /click me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });
});

it("renders with primary variant", () => {
  render(<Button variant="primary">Click me</Button>);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toHaveClass("bg-primary-4");
  expect(button).toHaveClass("text-white");
});

it("renders with ghost variant", () => {
  render(<Button variant="ghost">Click me</Button>);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toHaveClass("text-blue-500");
  expect(button).toHaveClass("hover:bg-blue-50");
});

it("renders with neutral-light variant", () => {
  render(<Button variant="neutral-light">Click me</Button>);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toHaveClass("bg-neutral-2");
  expect(button).toHaveClass("text-white");
});

it("renders with neutral-dark variant", () => {
  render(<Button variant="neutral-dark">Click me</Button>);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toHaveClass("bg-neutral-3");
  expect(button).toHaveClass("text-white");
});

it("renders with transparent-white variant", () => {
  render(<Button variant="transparent-white">Click me</Button>);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toHaveClass("bg-transparent");
  expect(button).toHaveClass("text-white");
});

it("renders with transparent-neutral variant", () => {
  render(<Button variant="transparent-neutral">Click me</Button>);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toHaveClass("bg-transparent");
  expect(button).toHaveClass("text-neutral-2");
});

it("renders with bordered variant", () => {
  render(<Button variant="bordered">Click me</Button>);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toHaveClass("border");
  expect(button).toHaveClass("border-primary-4");
  expect(button).toHaveClass("text-primary-4");
});

it("renders with small size", () => {
  render(<Button size="sm">Click me</Button>);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toHaveClass("px-3");
  expect(button).toHaveClass("py-1.5");
  expect(button).toHaveClass("text-sm");
});

it("renders with large size", () => {
  render(<Button size="lg">Click me</Button>);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toHaveClass("px-6");
  expect(button).toHaveClass("py-3");
  expect(button).toHaveClass("text-lg");
});
