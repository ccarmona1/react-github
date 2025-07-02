import type { RepositoryProvider } from "./RepositoryProvider";

export class GitHubProvider implements RepositoryProvider {
  getRepo(organizationName: string): object[] {
    console.log(organizationName);
    return [];
  }
}
