import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>hello</Card>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies className prop", () => {
    const { container } = render(<Card className="test-class">content</Card>);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("card-base");
    expect(div).toHaveClass("test-class");
  });
});
