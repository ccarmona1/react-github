import { createContext, useContext } from "react";
import type { OrganizationService } from "../../services/organization/OrganizationService";
import { RepositoryService } from "../../services/repository/RepositoryService";

export const ServiceContext = createContext<
  | {
      organizationService: OrganizationService;
      repositoryService: RepositoryService;
    }
  | undefined
>(undefined);

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a RepositoryProvider");
  }
  return context;
};
