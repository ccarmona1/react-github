import { useMemo, type FC, type ReactNode } from "react";
import { GitHubClient } from "../../providers/GitHubClient";
import { OrganizationService } from "../../services/organization/OrganizationService";
import { ServiceContext } from "./useService";
import { RepositoryService } from "../../services/repository/RepositoryService";
import { DummyClient } from "../../providers/DummyClient";

interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesProvider: FC<ServicesProviderProps> = ({ children }) => {
  const services = useMemo(() => {
    const isDev = process.env.NODE_ENV === "dev";
    const provider = isDev ? new DummyClient() : new GitHubClient();
    return {
      organizationService: new OrganizationService(provider),
      repositoryService: new RepositoryService(provider),
    };
  }, []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
