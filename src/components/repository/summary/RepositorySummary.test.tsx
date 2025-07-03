import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RepositorySummary } from "./RepositorySummary";
import * as useServiceModule from "../../../hooks/organization/useService";
import type { VersionControlClient } from "../../../providers/VersionControlClient";
import { OrganizationService } from "../../../services/organization/OrganizationService";
import { RepositoryService } from "../../../services/repository/RepositoryService";

const mockRepository = {
  id: 1,
  name: "repo1",
  description: "A test repo",
  full_name: "org/repo1",
  httpUrl: "https://github.com/org/repo1",
  size: 123,
  openIssues: 5,
  watchers: 10,
};

const createMockVersionControlProvider = (): VersionControlClient => ({
  getOrganization: jest.fn(),
  getRepositories: jest.fn(),
  getRepository: jest.fn().mockResolvedValue(mockRepository),
  getRepositoryLanguages: jest
    .fn()
    .mockResolvedValue({ javascript: 100, typescript: 23 }),
});

const mockVersionControlProvider = createMockVersionControlProvider();
const mockRepositoryService = new RepositoryService(mockVersionControlProvider);
const mockOrganizationService = new OrganizationService(
  mockVersionControlProvider
);

jest.spyOn(useServiceModule, "useServices").mockReturnValue({
  repositoryService: mockRepositoryService,
  organizationService: mockOrganizationService,
});

describe("RepositorySummary", () => {
  afterEach(jest.clearAllMocks);

  it("renders repository summary after fetch", async () => {
    render(
      <MemoryRouter initialEntries={["/org/repo1"]}>
        <Routes>
          <Route
            path=":organizationName/:repositoryName"
            element={<RepositorySummary />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "repo1" })
      ).toBeInTheDocument();
      expect(screen.getByText("A test repo")).toBeInTheDocument();
      expect(screen.getByText("Back to repositories")).toBeInTheDocument();
    });
  });

  it("shows 'No description' if description is missing", async () => {
    (
      mockVersionControlProvider.getRepository as jest.Mock
    ).mockResolvedValueOnce({ ...mockRepository, description: undefined });
    render(
      <MemoryRouter initialEntries={["/org/repo1"]}>
        <Routes>
          <Route
            path=":organizationName/:repositoryName"
            element={<RepositorySummary />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("No description available")).toBeInTheDocument();
    });
  });

  it("renders repository details and languages", async () => {
    render(
      <MemoryRouter initialEntries={["/org/repo1"]}>
        <Routes>
          <Route
            path=":organizationName/:repositoryName"
            element={<RepositorySummary />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("URL")).toBeInTheDocument();
      expect(screen.getByText("Size")).toBeInTheDocument();
      expect(screen.getByText("Open issues")).toBeInTheDocument();
      expect(screen.getByText("Watchers")).toBeInTheDocument();
      expect(screen.getByText("Languages:")).toBeInTheDocument();
      expect(screen.getByText(/javascript/i)).toBeInTheDocument();
      expect(screen.getByText(/typescript/i)).toBeInTheDocument();
    });
  });

  it("shows 'No language data available' if no languages", async () => {
    (
      mockVersionControlProvider.getRepositoryLanguages as jest.Mock
    ).mockResolvedValueOnce(undefined);
    render(
      <MemoryRouter initialEntries={["/org/repo1"]}>
        <Routes>
          <Route
            path=":organizationName/:repositoryName"
            element={<RepositorySummary />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByText("No language data available")
      ).toBeInTheDocument();
    });
  });

  it("handles error fetching repository", async () => {
    (
      mockVersionControlProvider.getRepository as jest.Mock
    ).mockRejectedValueOnce(new Error("fail"));
    render(
      <MemoryRouter initialEntries={["/org/repo1"]}>
        <Routes>
          <Route
            path=":organizationName/:repositoryName"
            element={<RepositorySummary />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: "repo1" })
      ).not.toBeInTheDocument();
    });
  });
});
