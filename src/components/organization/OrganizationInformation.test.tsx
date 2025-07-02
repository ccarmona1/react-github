import { render, screen } from "@testing-library/react";
import { OrganizationInformation } from "./OrganizationInformation";
import type { Organization } from "../../types/Organization";

const mockOrganization: Organization = {
  id: "1",
  login: "test-org",
  description: "A test organization",
  avatarUrl: "https://example.com/avatar.png",
  publicRepos: 100,
  followers: 500,
  following: 50,
  htmlUrl: "https://github.com/test-org",
  blog: "https://test-org.com",
  email: "test@example.com",
  reposUrl: "https://api.github.com/orgs/test-org/repos",
  twitterUsername: "testorg",
};

describe("OrganizationInformation", () => {
  it("renders organization information correctly", () => {
    render(<OrganizationInformation organization={mockOrganization} />);

    expect(screen.getByText("test-org")).toBeInTheDocument();
    expect(screen.getByText("A test organization")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("repositories")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("followers")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("following")).toBeInTheDocument();
    expect(screen.getByAltText("test-org avatar")).toBeInTheDocument();
  });

  it("renders organization without description", () => {
    const orgWithoutDescription = { ...mockOrganization, description: null };
    render(<OrganizationInformation organization={orgWithoutDescription} />);

    expect(screen.getByText("test-org")).toBeInTheDocument();
    expect(screen.queryByText("A test organization")).not.toBeInTheDocument();
  });
});
