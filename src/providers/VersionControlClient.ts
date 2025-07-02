import type { Organization } from "../types/Organization";
import type { Repository } from "../types/Repository";
import type { RepositorySearchTerms } from "../types/RepositorySearchTerms";

export interface VersionControlClient {
  getOrganization(organizationName: string): Promise<Organization>;
  getRepositories(
    organizationName: string,
    repositorySearchTerms: RepositorySearchTerms
  ): Promise<Repository[]>;
  getRepository(
    organizationName: string,
    repositoryName: string
  ): Promise<Repository>;
}
