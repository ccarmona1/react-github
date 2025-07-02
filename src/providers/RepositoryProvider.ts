export interface RepositoryProvider {
  getRepo(organizationName: string): object[];
}
