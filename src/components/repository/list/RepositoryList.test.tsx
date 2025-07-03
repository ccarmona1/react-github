import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RepositoryList } from "./RepositoryList";
import * as useServiceModule from "../../../hooks/organization/useService";
import { RepositoryService } from "../../../services/repository/RepositoryService";
import { OrganizationService } from "../../../services/organization/OrganizationService";
import type { VersionControlClient } from "../../../providers/VersionControlClient";

describe("RepositoryList", () => {
  afterEach(jest.clearAllMocks);

  const mockRepositories = [
    { id: 1, name: "repo1", full_name: "org/repo1" },
    { id: 2, name: "repo2", full_name: "org/repo2" },
  ];

  const createMockVersionControlProvider = (): VersionControlClient => ({
    getOrganization: jest.fn(),
    getRepositories: jest.fn().mockResolvedValue(mockRepositories),
    getRepository: jest.fn(),
    getRepositoryLanguages: jest.fn(),
  });

  const getServices = (provider?: VersionControlClient) => {
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
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/:organizationName" element={<RepositoryList />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
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

  it("handles search parameters correctly", async () => {
    const vcp = createMockVersionControlProvider();
    const { repositoryService, organizationService } = getServices(vcp);
    jest.spyOn(useServiceModule, "useServices").mockReturnValue({
      repositoryService,
      organizationService,
    });

    render(
      <MemoryRouter
        initialEntries={["/org?type=public&sort=updated&per_page=20&page=2"]}
      >
        <Routes>
          <Route path=":organizationName" element={<RepositoryList />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(vcp.getRepositories).toHaveBeenCalledWith("org", {
        type: "public",
        sort: "updated",
        per_page: 20,
        page: 2,
      });
    });
  });

  it("updates search parameters when search terms change", async () => {
    const vcp = createMockVersionControlProvider();
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

    const typeSelect = await screen.findByLabelText("Type");
    fireEvent.change(typeSelect, { target: { value: "public" } });

    await waitFor(
      () => {
        expect(vcp.getRepositories).toHaveBeenCalledWith(
          "org",
          expect.objectContaining({
            type: "public",
          })
        );
      },
      { timeout: 1000 }
    );
  });
});
