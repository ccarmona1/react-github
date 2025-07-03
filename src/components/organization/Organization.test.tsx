import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as useServiceModule from "../../hooks/organization/useService";
import type { VersionControlClient } from "../../providers/VersionControlClient";
import { OrganizationService } from "../../services/organization/OrganizationService";
import { RepositoryService } from "../../services/repository/RepositoryService";
import { OrganizationView } from "./Organization";

const mockOrganization = {
  id: "1",
  reposUrl: "",
  avatarUrl: "avatar.png",
  followers: 10,
  following: 5,
  publicRepos: 3,
  login: "godaddy",
  blog: undefined,
  email: undefined,
  twitterUsername: undefined,
  description: "A test org",
  htmlUrl: "https://github.com/godaddy",
};

const createMockVersionControlProvider = (): VersionControlClient => ({
  getOrganization: jest.fn().mockResolvedValue(mockOrganization),
  getRepositories: jest.fn(),
  getRepository: jest.fn(),
  getRepositoryLanguages: jest.fn(),
});

const mockVersionControlProvider = createMockVersionControlProvider();
const mockOrganizationService = new OrganizationService(
  mockVersionControlProvider
);
const mockRepositoryService = new RepositoryService(mockVersionControlProvider);

jest.spyOn(useServiceModule, "useServices").mockReturnValue({
  organizationService: mockOrganizationService,
  repositoryService: mockRepositoryService,
});

describe("OrganizationView", () => {
  afterEach(jest.clearAllMocks);

  it("renders organization info after fetch", async () => {
    render(
      <MemoryRouter initialEntries={["/godaddy"]}>
        <Routes>
          <Route path=":organizationName" element={<OrganizationView />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/godaddy/i)).toBeInTheDocument();
      expect(screen.getByText("A test org")).toBeInTheDocument();
    });
  });

  it("shows not found message if organization is null", async () => {
    (
      mockVersionControlProvider.getOrganization as jest.Mock
    ).mockResolvedValueOnce(undefined);
    render(
      <MemoryRouter>
        <OrganizationView />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/mock data/)).toBeInTheDocument();
    });
  });
});
