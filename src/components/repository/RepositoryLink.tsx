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
    <Link to={`/${organizationName}/repository/${repository.name}`}>
      <strong>{repository.name}</strong>:{" "}
      {repository.description || "No description"}
    </Link>
  );
};
