import { useEffect, useState, type FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useServices } from "../../hooks/organization/useService";
import type { Repository } from "../../types/Repository";

export const RepositorySummary: FC = () => {
  const { organizationName, repositoryName } = useParams();
  const navigate = useNavigate();
  const [repository, setRepository] = useState<Repository | undefined>();

  if (!organizationName || !repositoryName) {
    navigate("");
  }

  const { repositoryService } = useServices();

  useEffect(() => {
    const getRepository = async () => {
      if (organizationName && repositoryName) {
        try {
          const savedRepo = await repositoryService.getRepository(
            organizationName,
            repositoryName
          );
          setRepository(savedRepo);
        } catch (error) {
          console.error("Error fetching repository:", error);
        }
      }
    };
    getRepository();
  }, [organizationName, repositoryName, repositoryService]);

  return (
    repository && (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="mb-4">
          <Link
            to={`/${organizationName}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to repositories
          </Link>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {repository.name}
          </h1>
          <p className="text-gray-600 mt-2">
            {repository.description || "No description available"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Repository Details
            </h2>
            <div className="text-sm text-gray-600">
              <p>
                Name: <span className="font-medium">{repository.name}</span>
              </p>
              <p>
                ID: <span className="font-medium">{repository.id}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
