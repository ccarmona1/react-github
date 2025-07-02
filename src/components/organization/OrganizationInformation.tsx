import type { FC } from "react";
import type { Organization } from "../../types/Organization";

interface OrganizationInformationProps {
  organization: Organization;
}

export const OrganizationInformation: FC<OrganizationInformationProps> = ({
  organization,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-4">
        <img
          src={organization.avatarUrl}
          alt={`${organization.login} avatar`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {organization.login}
          </h1>
          {organization.description && (
            <p className="text-gray-600 mt-1">{organization.description}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex space-x-6 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="font-medium">{organization.publicRepos}</span>
          <span className="ml-1">repositories</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">{organization.followers}</span>
          <span className="ml-1">followers</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">{organization.following}</span>
          <span className="ml-1">following</span>
        </div>
      </div>
    </div>
  );
};
