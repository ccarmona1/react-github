import type { VersionControlClient } from "../../providers/VersionControlClient";
import type { Repository } from "../../types/Repository";
import type { RepositorySearchTerms } from "../../types/RepositorySearchTerms";

export class RepositoryService {
  private versionControlProvider: VersionControlClient;

  constructor(repositoryProvider: VersionControlClient) {
    this.versionControlProvider = repositoryProvider;
  }

  async getRepositories(
    organizationName: string,
    searchTerms: RepositorySearchTerms
  ): Promise<Repository[]> {
    try {
      return await this.versionControlProvider.getRepositories(
        organizationName,
        searchTerms
      );
    } catch {
      return [];
    }
  }

  async getRepository(
    organizationName: string,
    repositoryName: string
  ): Promise<Repository | undefined> {
    try {
      return await this.versionControlProvider.getRepository(
        organizationName,
        repositoryName
      );
    } catch {
      return undefined;
    }
  }

  async getRepositoryLanguages(
    organizationName: string,
    repositoryName: string
  ): Promise<Record<string, number> | undefined> {
    try {
      return await this.versionControlProvider.getRepositoryLanguages(
        organizationName,
        repositoryName
      );
    } catch {
      return undefined;
    }
  }
}
