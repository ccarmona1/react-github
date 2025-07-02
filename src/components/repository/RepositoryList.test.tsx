import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RepositoryList } from "./RepositoryList";
import * as useServiceModule from "../../hooks/organization/useService";
import { RepositoryService } from "../../services/repository/RepositoryService";
import { OrganizationService } from "../../services/organization/OrganizationService";
import type { VersionControlProvider } from "../../providers/VersionControlProvider";

describe("RepositoryList", () => {
  const mockRepositories = [
    { id: 1, name: "repo1", full_name: "org/repo1" },
    { id: 2, name: "repo2", full_name: "org/repo2" },
  ];

  const createMockVersionControlProvider = (): VersionControlProvider => ({
    getOrganization: jest.fn(),
    getRepositories: jest.fn().mockResolvedValue(mockRepositories),
    getRepository: jest.fn(),
  });

  const getServices = (provider?: VersionControlProvider) => {
    const vcp = provider || createMockVersionControlProvider();
    return {
      repositoryService: new RepositoryService(vcp),
      organizationService: new OrganizationService(vcp),
      vcp,
    };
  };

  it("renders repositories after fetch", async () => {
    const { repositoryService, organizationService } = getServices();
    jest.spyOn(useServiceModule, "useServices").mockReturnValue({
      repositoryService,
      organizationService,
    });
    render(
      <MemoryRouter initialEntries={["/org"]}>
        <Routes>
          <Route path=":organizationName" element={<RepositoryList />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Repositories")).toBeInTheDocument();
      expect(screen.getByText("repo1")).toBeInTheDocument();
      expect(screen.getByText("repo2")).toBeInTheDocument();
    });
  });

  it("shows no repositories found if list is empty", async () => {
    const vcp = createMockVersionControlProvider();
    (vcp.getRepositories as jest.Mock).mockResolvedValueOnce([]);
    const { repositoryService, organizationService } = getServices(vcp);
    jest.spyOn(useServiceModule, "useServices").mockReturnValue({
      repositoryService,
      organizationService,
    });
    render(
      <MemoryRouter initialEntries={["/org"]}>
        <Routes>
          <Route path=":organizationName" element={<RepositoryList />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("No repositories found.")).toBeInTheDocument();
    });
  });

  it("returns null and navigates if organizationName is missing", () => {
    const { repositoryService, organizationService } = getServices();
    jest.spyOn(useServiceModule, "useServices").mockReturnValue({
      repositoryService,
      organizationService,
    });
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.innerHTML).toBe("");
  });

  it("handles fetch error gracefully", async () => {
    const vcp = createMockVersionControlProvider();
    (vcp.getRepositories as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    const { repositoryService, organizationService } = getServices(vcp);
    jest.spyOn(useServiceModule, "useServices").mockReturnValue({
      repositoryService,
      organizationService,
    });
    render(
      <MemoryRouter initialEntries={["/org"]}>
        <Routes>
          <Route path=":organizationName" element={<RepositoryList />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("No repositories found.")).toBeInTheDocument();
    });
  });
});
