export interface Organization {
  id: string;
  reposUrl: string;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  login: string;
  blog?: string;
  email?: string;
  twitterUsername?: string | null;
  description?: string | null;
  htmlUrl: string;
}
