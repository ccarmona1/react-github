import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RepositoryLink } from "./RepositoryLink";
import type { Repository } from "../../types/Repository";

describe("RepositoryLink", () => {
  const repository: Repository = {
    id: "1",
    name: "repo1",
    description: "A test repo",
    httpUrl: "",
    size: 0,
    openIssues: 0,
    watchers: 0,
  };

  it("renders repository name and description", () => {
    render(
      <MemoryRouter>
        <RepositoryLink organizationName="org" repository={repository} />
      </MemoryRouter>
    );
    expect(screen.getByText("repo1")).toBeInTheDocument();
    expect(screen.getByText("A test repo")).toBeInTheDocument();
  });

  it("shows fallback description if missing", () => {
    render(
      <MemoryRouter>
        <RepositoryLink
          organizationName="org"
          repository={{ ...repository, description: undefined }}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("No description available")).toBeInTheDocument();
  });
});
