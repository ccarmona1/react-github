import type { VersionControlClient } from "../../providers/VersionControlClient";
import type { Organization } from "../../types/Organization";

export class OrganizationService {
  private versionControlProvider: VersionControlClient;

  constructor(repositoryProvider: VersionControlClient) {
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
