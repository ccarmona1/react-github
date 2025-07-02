import { useMemo, type FC, type ReactNode } from "react";
import { GitHubProvider } from "../../providers/GitHubProvider";
import { OrganizationService } from "../../services/organization/OrganizationService";
import { ServiceContext } from "./useService";
import { RepositoryService } from "../../services/repository/RepositoryService";

interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesProvider: FC<ServicesProviderProps> = ({ children }) => {
  const services = useMemo(
    () => ({
      organizationService: new OrganizationService(new GitHubProvider()),
      repositoryService: new RepositoryService(new GitHubProvider()),
    }),
    []
  );

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
