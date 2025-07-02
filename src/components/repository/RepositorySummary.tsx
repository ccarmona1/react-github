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
      <>
        <strong>{repository?.name} Descripcioooon</strong>
        {repository?.description || "No description"}
        <Link to={`/${organizationName}`}>← Back</Link>
      </>
    )
  );
};
