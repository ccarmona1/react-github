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
      className="block w-full"
    >
      <div className="repository-link-container flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-sky-50 transition w-full max-w-full overflow-hidden">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg-sky truncate">{repository.name}</h3>
          <p className="text-gray truncate">
            {repository.description || "No description available"}
          </p>
        </div>
        <div className="flex-shrink-0 self-center">
          <DynamicIcon
            lib="go"
            icon="GoChevronRight"
            className="repository-link-arrow"
          />
        </div>
      </div>
    </Link>
  );
};
