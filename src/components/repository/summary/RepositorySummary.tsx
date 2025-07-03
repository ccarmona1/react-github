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
        } catch (error) {
          console.error("Error fetching repository:", error);
        }
      }
    };
    getData();
  }, [organizationName, repositoryName, repositoryService]);

  return (
    repository && (
      <Card className="mt-8 bg-gradient-to-br from-white via-sky-50 to-sky-100 shadow-2xl rounded-2xl border border-sky-100">
        <div className="mb-4">
          <Link
            to={`/${organizationName}`}
            className="inline-flex items-center text-sky-600 hover:text-sky-800 text-sm font-medium transition-colors"
          >
            <DynamicIcon lib="go" icon="GoRepo" className="mr-1" />
            Back to repositories
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 break-words mb-1">
              {repository.name}
            </h1>
            <p className="text-gray-600 text-base">
              {repository.description || "No description available"}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Repository details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-gray-700">
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm border border-sky-100 rounded-lg px-4 py-3 shadow-sm">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon lib="go" icon="GoRepo" className="mr-1 text-sky-400" />
                ID
              </span>
              <span className="truncate text-gray-600">{repository.id}</span>
            </div>
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm border border-sky-100 rounded-lg px-4 py-3 shadow-sm">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon lib="go" icon="GoLink" className="mr-1 text-sky-400" />
                URL
              </span>
              <a
                href={repository.httpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline break-all text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {repository.httpUrl}
              </a>
            </div>
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm border border-sky-100 rounded-lg px-4 py-3 shadow-sm">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon lib="go" icon="GoDatabase" className="mr-1 text-sky-400" />
                Size
              </span>
              <span className="text-gray-600">{repository.size} KB</span>
            </div>
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm border border-sky-100 rounded-lg px-4 py-3 shadow-sm">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon lib="go" icon="GoIssueOpened" className="mr-1 text-sky-400" />
                Open issues
              </span>
              <span className="text-gray-600">{repository.openIssues}</span>
            </div>
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm border border-sky-100 rounded-lg px-4 py-3 shadow-sm">
              <span className="font-medium text-gray-800 flex items-center">
                <DynamicIcon lib="go" icon="GoEye" className="mr-1 text-sky-400" />
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
                      {lang}: {((size * 100) / repository.size).toFixed(1)}%
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
