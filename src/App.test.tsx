import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders without crashing and redirects to /godaddy", async () => {
    render(<App />);
    expect(await screen.findByText(/mock data/)).toBeInTheDocument();
  });
});
