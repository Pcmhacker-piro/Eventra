import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    const btn = screen.getByText("Click me");
    expect(btn).toHaveClass("btn-primary", "btn-medium");
    expect(btn).not.toBeDisabled();
  });

  it("applies variant class", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toHaveClass("btn-secondary");
  });

  it("applies size class", () => {
    render(<Button size="small">Small</Button>);
    expect(screen.getByText("Small")).toHaveClass("btn-small");
  });

  it("handles click", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("respects disabled state", () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    const btn = screen.getByText("Disabled");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies ariaLabel", () => {
    render(<Button ariaLabel="Custom accessibility">Text</Button>);
    expect(screen.getByLabelText("Custom accessibility")).toBeInTheDocument();
  });

  it("falls back to primary for invalid variant", () => {
    render(<Button variant="invalid">Fallback</Button>);
    expect(screen.getByText("Fallback")).toHaveClass("btn-primary");
  });

  it("falls back to medium for invalid size", () => {
    render(<Button size="invalid">Fallback</Button>);
    expect(screen.getByText("Fallback")).toHaveClass("btn-medium");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
