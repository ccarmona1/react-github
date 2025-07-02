import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as useServiceModule from "../../hooks/organization/useService";
import type { VersionControlProvider } from "../../providers/VersionControlProvider";
import { OrganizationService } from "../../services/organization/OrganizationService";
import { RepositoryService } from "../../services/repository/RepositoryService";
import { OrganizationView } from "./Organization";

const mockOrganization = { login: "godaddy", description: "A test org" };

const createMockVersionControlProvider = (): VersionControlProvider => ({
  getOrganization: jest.fn().mockResolvedValue(mockOrganization),
  getRepositories: jest.fn(),
  getRepository: jest.fn(),
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
      expect(screen.getByText(/Organization Name/)).toBeInTheDocument();
      expect(screen.getByText(/Description/)).toBeInTheDocument();
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
      expect(
        screen.getByText(/Organization does not exist/)
      ).toBeInTheDocument();
    });
  });
});
