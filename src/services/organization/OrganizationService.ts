import type { VersionControlProvider } from "../../providers/VersionControlProvider";
import type { Organization } from "../../types/Organization";

export class OrganizationService {
  private versionControlProvider: VersionControlProvider;

  constructor(repositoryProvider: VersionControlProvider) {
    this.versionControlProvider = repositoryProvider;
  }

  async getOrganization(
    organizationName: string
  ): Promise<Organization | undefined> {
    try {
      return await this.versionControlProvider.getOrganization(
        organizationName
      );
    } catch {
      return undefined;
    }
  }
}
