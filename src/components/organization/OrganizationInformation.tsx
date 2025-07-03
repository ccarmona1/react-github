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
    <Card className="card-2xl-gray">
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
          <h1 className="heading-1">{organization.login}</h1>
          {organization.description && (
            <p className="text-base-gray">{organization.description}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base text-gray-700 mt-6">
        <div className="card-section-center">
          <span className="font-semibold text-sky-800 text-lg flex items-center gap-1">
            <DynamicIcon lib="go" icon="GoRepo" className="text-sky-400" />
            {organization.publicRepos}
          </span>
          <span className="text-xs-gray">Repositories</span>
        </div>
        <div className="card-section-center">
          <span className="font-semibold text-sky-800 text-lg flex items-center gap-1">
            <DynamicIcon lib="go" icon="GoPeople" className="text-sky-400" />
            {organization.followers}
          </span>
          <span className="text-xs-gray">Followers</span>
        </div>
        <div className="card-section-center">
          <span className="font-semibold text-sky-800 text-lg flex items-center gap-1">
            <DynamicIcon lib="go" icon="GoPerson" className="text-sky-400" />
            {organization.following}
          </span>
          <span className="text-xs-gray">Following</span>
        </div>
      </div>
    </Card>
  );
};
