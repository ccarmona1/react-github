import type { FC } from "react";
import { Link } from "react-router-dom";
import type { Repository } from "../../../types/Repository";
import { DynamicIcon } from "../../common/DynamicIcon";

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
      className="block hover:bg-gray-50 transition-colors rounded-md p-2 -m-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg-sky">{repository.name}</h3>
          <p className="text-gray">
            {repository.description || "No description available"}
          </p>
        </div>
        <div className="flex-shrink-0">
          <DynamicIcon
            lib="go"
            icon="GoChevronRight"
            className="w-5 h-5 text-gray-400"
          />
        </div>
      </div>
    </Link>
  );
};
