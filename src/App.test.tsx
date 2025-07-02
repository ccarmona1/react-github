import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders without crashing and redirects to /godaddy", async () => {
    render(<App />);
    // Render root route and redirected content
    expect(
      await screen.findByText(/Organization does not exist/)
    ).toBeInTheDocument();
  });
});
