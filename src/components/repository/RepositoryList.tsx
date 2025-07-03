import { useEffect, useState, type FC } from "react";
import { useServices } from "../../hooks/organization/useService";
import type { Repository } from "../../types/Repository";
import type { RepositorySearchTerms } from "../../types/RepositorySearchTerms";
import { RepositoryLink } from "./RepositoryLink";
import { RepositoryListSearchBar } from "./searchBar/RepositoryListSearchBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const DEFAULT_TERMS: RepositorySearchTerms = {
  type: "all",
  sort: "created",
  per_page: 10,
  page: 1,
};

function getSearchTermsFromParams(
  params: URLSearchParams
): RepositorySearchTerms {
  const type = params.get("type");
  const sort = params.get("sort");
  const perPage = params.get("per_page");
  const page = params.get("page");

  return {
    type: type || DEFAULT_TERMS.type,
    sort: sort || DEFAULT_TERMS.sort,
    per_page: perPage ? Number(perPage) : DEFAULT_TERMS.per_page,
    page: page ? Number(page) : DEFAULT_TERMS.page,
  };
}

export const RepositoryList: FC = () => {
  const { organizationName } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerms = getSearchTermsFromParams(searchParams);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const { repositoryService } = useServices();

  useEffect(() => {
    if (!organizationName) {
      navigate("");
      return;
    }
  }, [organizationName, navigate]);

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
        setRepositories([]);
      }
    };

    getRepositories();
  }, [organizationName, repositoryService, searchTerms]);

  const handleSearchChange = (terms: RepositorySearchTerms) => {
    const params: Record<string, string> = {};
    if (terms.type) params.type = terms.type;
    if (terms.sort) params.sort = terms.sort;
    if (terms.per_page) params.per_page = String(terms.per_page);
    if (terms.page) params.page = String(terms.page);
    setSearchParams(params, { replace: true });
  };

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

      {repositories.length > 0 && organizationName ? (
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
