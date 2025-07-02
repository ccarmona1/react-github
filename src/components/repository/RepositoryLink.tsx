import type { FC } from "react";
import { Link } from "react-router-dom";
import type { Repository } from "../../types/Repository";

interface RepositoryLinkProps {
  organizationName: string;
  repository: Repository;
}

export const RepositoryLink: FC<RepositoryLinkProps> = ({
  organizationName,
  repository,
}) => {
  return (
    <Link
      to={`/${organizationName}/repository/${repository.name}`}
      className="block hover:bg-gray-50 transition-colors rounded-md p-2 -m-2"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 truncate">
            {repository.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {repository.description || "No description available"}
          </p>
        </div>
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
