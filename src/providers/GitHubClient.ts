import { Octokit } from "@octokit/rest";
import type { Organization } from "../types/Organization";
import type { VersionControlClient } from "./VersionControlClient";
import { handleApiCall } from "../common/handle/handleApiCall";
import type { RepositorySearchTerms } from "../types/RepositorySearchTerms";
import type { Repository } from "../types/Repository";

export class GitHubClient implements VersionControlClient {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
  }

  async getOrganization(organizationName: string): Promise<Organization> {
    const githubOrg = await handleApiCall(
      () => this.octokit.rest.orgs.get({ org: organizationName }),
      "fetch organization"
    );

    return {
      id: String(githubOrg.id),
      reposUrl: githubOrg.repos_url,
      avatarUrl: githubOrg.avatar_url,
      followers: githubOrg.followers,
      following: githubOrg.following,
      publicRepos: githubOrg.public_repos,
      login: githubOrg.login,
      htmlUrl: githubOrg.html_url,
      blog: githubOrg.blog,
      email: githubOrg.email,
      twitterUsername: githubOrg.twitter_username,
      description: githubOrg.description,
    };
  }

  async getRepositories(
    organizationName: string,
    repositorySearchTerms: RepositorySearchTerms
  ): Promise<Repository[]> {
    const repositories = await handleApiCall(
      () =>
        this.octokit.rest.repos.listForOrg({
          org: organizationName,
          ...(repositorySearchTerms as unknown as object),
        }),
      "fetch repositories"
    );

    return repositories.map((repo) => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description,
      httpUrl: repo.html_url,
      size: repo.size ?? 0,
      openIssues: repo.open_issues_count ?? 0,
      watchers: repo.watchers_count ?? 0,
    }));
  }

  async getRepository(
    organizationName: string,
    repositoryName: string
  ): Promise<Repository> {
    const repo = await handleApiCall(
      () =>
        this.octokit.rest.repos.get({
          owner: organizationName,
          repo: repositoryName,
        }),
      "fetch repository"
    );

    return {
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description,
      httpUrl: repo.html_url,
      size: repo.size,
      openIssues: repo.open_issues_count,
      watchers: repo.watchers_count,
    };
  }

  async getRepositoryLanguages(
    organizationName: string,
    repositoryName: string
  ): Promise<Record<string, number>> {
    const languages = await handleApiCall(
      () =>
        this.octokit.rest.repos.listLanguages({
          owner: organizationName,
          repo: repositoryName,
        }),
      "fetch repository languages"
    );

    return languages;
  }
}
