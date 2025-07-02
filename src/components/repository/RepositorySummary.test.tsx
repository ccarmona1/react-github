import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RepositorySummary } from "./RepositorySummary";
import * as useServiceModule from "../../hooks/organization/useService";
import { RepositoryService } from "../../services/repository/RepositoryService";
import { OrganizationService } from "../../services/organization/OrganizationService";
import type { VersionControlClient } from "../../providers/VersionControlClient";

const mockRepository = {
  id: 1,
  name: "repo1",
  description: "A test repo",
  full_name: "org/repo1",
};

const createMockVersionControlProvider = (): VersionControlClient => ({
  getOrganization: jest.fn(),
  getRepositories: jest.fn(),
  getRepository: jest.fn().mockResolvedValue(mockRepository),
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
});
