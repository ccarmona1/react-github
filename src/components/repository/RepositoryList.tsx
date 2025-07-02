import { useEffect, useState, type FC } from "react";
import { useServices } from "../../hooks/organization/useService";
import type { Repository } from "../../types/Repository";
import type { RepositorySearchTerms } from "../../types/RepositorySearchTerms";
import { RepositoryLink } from "./RepositoryLink";
import { RepositoryListSearchBar } from "./searchBar/RepositoryListSearchBar";
import { useNavigate, useParams } from "react-router-dom";

export const RepositoryList: FC = () => {
  const { organizationName } = useParams();
  const navigate = useNavigate();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchTerms, setSearchTerms] = useState<RepositorySearchTerms>({
    type: "all",
    sort: "created",
    per_page: 10,
    page: 1,
  });

  const { repositoryService } = useServices();

  useEffect(() => {
    if (!organizationName) return;
    const getRepositories = async () => {
      try {
        const repos = await repositoryService.getRepositories(
          organizationName,
          searchTerms
        );
        setRepositories(repos);
      } catch (error) {
        // istanbul ignore next
        console.error("Failed to fetch repositories:", error);
      }
    };
    getRepositories();
  }, [setRepositories, organizationName, repositoryService, searchTerms]);

  const handleSearchChange = (searchTerms: RepositorySearchTerms) => {
    setSearchTerms(searchTerms);
  };

  if (!organizationName) {
    navigate("");
    return null;
  }

  return (
    <div>
      <h2>Repositories</h2>
      <RepositoryListSearchBar
        onSearchChange={handleSearchChange}
        searchTerms={searchTerms}
      ></RepositoryListSearchBar>
      {repositories.length > 0 ? (
        <ul>
          {repositories.map((repository: Repository) => (
            <li key={repository.id}>
              <RepositoryLink
                organizationName={organizationName}
                repository={repository}
              ></RepositoryLink>
            </li>
          ))}
        </ul>
      ) : (
        <div>No repositories found.</div>
      )}
    </div>
  );
};
