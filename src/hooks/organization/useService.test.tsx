import { render } from "@testing-library/react";
import { useServices } from "./useService";
import { ServiceContext } from "./useService";
import { OrganizationService } from "../../services/organization/OrganizationService";
import { RepositoryService } from "../../services/repository/RepositoryService";
import type { FC } from "react";
import type { VersionControlClient } from "../../providers/VersionControlClient";

const mockProvider: VersionControlClient = {
  getOrganization: jest.fn(),
  getRepositories: jest.fn(),
  getRepository: jest.fn(),
  getRepositoryLanguages: jest.fn(),
};

describe("useServices", () => {
  afterEach(jest.clearAllMocks);

  it("returns context when inside provider", () => {
    const services = {
      organizationService: new OrganizationService(mockProvider),
      repositoryService: new RepositoryService(mockProvider),
    };
    let contextValue;
    const TestComponent: FC = () => {
      contextValue = useServices();
      return null;
    };
    render(
      <ServiceContext.Provider value={services}>
        <TestComponent />
      </ServiceContext.Provider>
    );
    expect(contextValue).toBe(services);
  });

  it("throws error if used outside provider", () => {
    const TestComponent: FC = () => {
      useServices();
      return null;
    };
    expect(() => render(<TestComponent />)).toThrow(
      /useServices must be used within a RepositoryProvider/
    );
  });
});
