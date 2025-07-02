import App from "./App";
import { render } from "@testing-library/react";

describe(App.name, () => {
  it("should render my name", () => {
    const { container } = render(<App />);
    expect(container.textContent).toContain("Crisman");
  });
});
