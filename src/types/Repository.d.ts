export interface Repository {
  id: string;
  name: string;
  httpUrl: string;
  size: number;
  openIssues: number;
  watchers: number;
  description?: string | null;
}
