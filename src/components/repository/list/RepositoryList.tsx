import { useEffect, useState, useMemo, type FC } from "react";
import { useServices } from "../../../hooks/organization/useService";
import type { Repository } from "../../../types/Repository";
import type { RepositorySearchTerms } from "../../../types/RepositorySearchTerms";
import { RepositoryLink } from "./RepositoryLink";
import { RepositoryListSearchBar } from "./searchBar/RepositoryListSearchBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card } from "../../common/Card";
import { DynamicIcon } from "../../common/DynamicIcon";
import { LoadingSpinner } from "../../common/LoadingSpinner";

const DEFAULT_TERMS: RepositorySearchTerms = {
  type: "all",
  sort: "created",
  per_page: 3,
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
  const searchTerms = useMemo(
    () => getSearchTermsFromParams(searchParams),
    [searchParams]
  );
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { repositoryService } = useServices();

  useEffect(() => {
    if (!organizationName) {
      navigate("");
      return;
    }
  }, [organizationName, navigate]);

  useEffect(() => {
    if (!organizationName) return;
    setLoading(true);
    const getRepositories = async () => {
      try {
        const repos = await repositoryService.getRepositories(
          organizationName,
          searchTerms
        );
        setRepositories(repos);
      } catch {
        setRepositories([]);
      }
      setLoading(false);
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
    <Card className="card-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <DynamicIcon
            lib="go"
            icon="GoRepo"
            className="text-sky-500 text-2xl"
          />
          <h2 className="heading-2">Repositories</h2>
        </div>
        <div className="text-sm-sky">
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
        loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid gap-4">
              {repositories.map((repository: Repository) => (
                <div
                  key={repository.id}
                  className="card-section card-section-hover"
                >
                  <RepositoryLink
                    organizationName={organizationName}
                    repository={repository}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <button
                className="pagination-btn"
                onClick={() =>
                  handleSearchChange({
                    ...searchTerms,
                    page: (searchTerms.page || 1) - 1,
                  })
                }
                disabled={!searchTerms.page || searchTerms.page <= 1 || loading}
                aria-label="Previous page"
              >
                Previous
              </button>
              <button
                className="pagination-btn"
                onClick={() =>
                  handleSearchChange({
                    ...searchTerms,
                    page: (searchTerms.page || 1) + 1,
                  })
                }
                disabled={
                  !searchTerms.per_page ||
                  repositories.length < searchTerms.per_page ||
                  loading
                }
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </>
        )
      ) : (
        <div className="text-center-empty">
          <div className="text-gray-empty">No repositories found.</div>
        </div>
      )}
    </Card>
  );
};
