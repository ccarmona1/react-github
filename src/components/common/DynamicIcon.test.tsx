import { render, waitFor } from "@testing-library/react";
import { DynamicIcon } from "./DynamicIcon";

describe("DynamicIcon", () => {
  it("renders nothing if icon is not loaded", () => {
    const { container } = render(
      <DynamicIcon lib="go" icon="NonExistentIcon" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders icon if valid", async () => {
    const { container } = render(
      <DynamicIcon lib="go" icon="GoChevronUp" className="test-icon" />
    );
    await waitFor(() => {
      const icon = container.querySelector(".test-icon");
      expect(icon).toBeInTheDocument();
    });
  });
});
