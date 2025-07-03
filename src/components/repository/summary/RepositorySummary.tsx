import { useEffect, useState, type FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useServices } from "../../../hooks/organization/useService";
import type { Repository } from "../../../types/Repository";
import { languageIconMap } from "../../../utils/languageIconMap";
import { Card } from "../../common/Card";
import { DynamicIcon } from "../../common/DynamicIcon";

export const RepositorySummary: FC = () => {
  const { organizationName, repositoryName } = useParams();
  const navigate = useNavigate();
  const [repository, setRepository] = useState<Repository | undefined>();
  const [languages, setLanguages] = useState<
    Record<string, number> | undefined
  >();
  const [totalSize, setTotalSize] = useState<number>(0);

  if (!organizationName || !repositoryName) {
    navigate("");
  }

  const { repositoryService } = useServices();

  useEffect(() => {
    const getData = async () => {
      if (organizationName && repositoryName) {
        try {
          const savedRepo = await repositoryService.getRepository(
            organizationName,
            repositoryName
          );
          setRepository(savedRepo);
          const languages = await repositoryService.getRepositoryLanguages(
            organizationName,
            repositoryName
          );
          setLanguages(languages);
          if (languages) {
            const totalSize = Object.values(languages).reduce(
              (sum, size) => sum + size,
              0
            );
            setTotalSize(totalSize);
          }
        } catch (error) {
          console.error("Error fetching repository:", error);
        }
      }
    };
    getData();
  }, [organizationName, repositoryName, repositoryService]);

  return (
    repository && (
      <Card className="card-2xl">
        <div className="mb-4">
          <Link
            to={`/${organizationName}`}
            className="btn-base flex items-center gap-2 w-fit"
            role="button"
            tabIndex={0}
          >
            <DynamicIcon
              lib="go"
              icon="GoRepo"
              className="repository-summary-link-icon"
            />
            Back to repositories
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 mb-6 gap-4">
          <div>
            <h1 className="heading-1">{repository.name}</h1>
            <p className="text-base-gray">
              {repository.description || "No description available"}
            </p>
          </div>
        </div>
        <div>
          <h2 className="heading-3">Repository details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-gray-700">
            <div className="card-section">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon
                  lib="go"
                  icon="GoRepo"
                  className="repository-summary-link-icon"
                />
                ID
              </span>
              <span className="truncate text-gray-600">{repository.id}</span>
            </div>
            <div className="card-section">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon
                  lib="go"
                  icon="GoLink"
                  className="repository-summary-link-icon"
                />
                URL
              </span>
              <a
                href={repository.httpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="repository-summary-external-link"
              >
                {repository.httpUrl}
              </a>
            </div>
            <div className="card-section">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon
                  lib="go"
                  icon="GoDatabase"
                  className="repository-summary-link-icon"
                />
                Size
              </span>
              <span className="text-gray-600">{repository.size} KB</span>
            </div>
            <div className="card-section">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon
                  lib="go"
                  icon="GoIssueOpened"
                  className="mr-1 text-sky-500"
                />
                Open issues
              </span>
              <a
                href={repository.httpUrl + "/issues"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600"
              >
                {repository.openIssues}
              </a>
            </div>
            <div className="card-section">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon
                  lib="go"
                  icon="GoEye"
                  className="mr-1 text-sky-400"
                />
                Watchers
              </span>
              <span className="text-gray-600">{repository.watchers}</span>
            </div>
          </div>
          <div className="mt-6">
            <span className="font-medium text-gray-800">Languages:</span>
            {languages ? (
              <ul className="flex flex-wrap gap-2 mt-2">
                {Object.entries(languages).map(([lang, size]) => {
                  const key = lang.toLowerCase().replace(/[^a-z0-9]/g, "");
                  const iconName = languageIconMap[key];
                  return (
                    <li
                      key={lang}
                      className="px-3 py-1 bg-sky-100 rounded-full text-xs font-medium text-sky-900 shadow flex items-center gap-2"
                    >
                      {iconName && (
                        <DynamicIcon
                          lib="si"
                          icon={iconName}
                          className="text-base"
                        />
                      )}
                      {lang}: {((size / totalSize) * 100).toFixed(1)}%
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">No language data available</p>
            )}
          </div>
        </div>
      </Card>
    )
  );
};
