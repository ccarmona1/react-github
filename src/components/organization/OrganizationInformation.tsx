import type { FC } from "react";
import type { Organization } from "../../types/Organization";
import { Card } from "../common/Card";
import { DynamicIcon } from "../common/DynamicIcon";

interface OrganizationInformationProps {
  organization: Organization;
}

export const OrganizationInformation: FC<OrganizationInformationProps> = ({
  organization,
}) => {
  return (
    <Card className="mt-8 bg-gradient-to-br from-white via-sky-50 to-sky-100 shadow-2xl rounded-2xl border border-gray-200">
      <div className="flex items-center gap-6 mb-4">
        <img
          src={
            organization.avatarUrl && organization.avatarUrl.length > 0
              ? organization.avatarUrl
              : "not-found.png"
          }
          alt={`${organization.login} avatar`}
          className="w-20 h-20 rounded-full border-4 border-sky-100 shadow-md bg-white object-cover"
        />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
            {organization.login}
          </h1>
          {organization.description && (
            <p className="text-gray-600 text-base mt-1">
              {organization.description}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base text-gray-700 mt-6">
        <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm border border-sky-100 rounded-lg px-4 py-3 shadow-sm">
          <span className="font-semibold text-sky-800 text-lg flex items-center gap-1">
            <DynamicIcon lib="go" icon="GoRepo" className="text-sky-400" />
            {organization.publicRepos}
          </span>
          <span className="text-gray-600 text-xs mt-1">Repositories</span>
        </div>
        <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm border border-sky-100 rounded-lg px-4 py-3 shadow-sm">
          <span className="font-semibold text-sky-800 text-lg flex items-center gap-1">
            <DynamicIcon lib="go" icon="GoPeople" className="text-sky-400" />
            {organization.followers}
          </span>
          <span className="text-gray-600 text-xs mt-1">Followers</span>
        </div>
        <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm border border-sky-100 rounded-lg px-4 py-3 shadow-sm">
          <span className="font-semibold text-sky-800 text-lg flex items-center gap-1">
            <DynamicIcon lib="go" icon="GoPerson" className="text-sky-400" />
            {organization.following}
          </span>
          <span className="text-gray-600 text-xs mt-1">Following</span>
        </div>
      </div>
    </Card>
  );
};
