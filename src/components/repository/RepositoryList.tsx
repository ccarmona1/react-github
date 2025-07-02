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
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Repositories</h2>
        <div className="text-sm text-gray-500">
          {repositories.length} repositories found
        </div>
      </div>

      <div className="mb-6">
        <RepositoryListSearchBar
          onSearchChange={handleSearchChange}
          searchTerms={searchTerms}
        />
      </div>

      {repositories.length > 0 ? (
        <div className="grid gap-4">
          {repositories.map((repository: Repository) => (
            <div
              key={repository.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <RepositoryLink
                organizationName={organizationName}
                repository={repository}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-500">No repositories found.</div>
        </div>
      )}
    </div>
  );
};
