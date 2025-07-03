import { useEffect, useState, type FC } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useServices } from "../../hooks/organization/useService";
import type { Organization } from "../../types/Organization";
import { OrganizationInformation } from "./OrganizationInformation";
import { LoadingSpinner } from "../common/LoadingSpinner";

export const OrganizationView: FC = () => {
  const [organization, setOrganization] = useState<Organization>();
  const [loading, setLoading] = useState<boolean>(true);
  const { organizationName } = useParams();

  const { organizationService } = useServices();

  useEffect(() => {
    setLoading(true);
    const getOrganization = async () => {
      const organization = await organizationService.getOrganization(
        organizationName!
      );
      setOrganization(organization);
      setLoading(false);
    };
    getOrganization();
  }, [organizationService, organizationName]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {organization ? (
          <>
            <OrganizationInformation organization={organization} />
            <Outlet />
          </>
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg max-w-xl mx-auto">
              <div className="mb-2 font-semibold text-gray-700">
                Organization "{organizationName}" not found
              </div>
              <div className="text-base text-gray-400">
                This may be due to a typo, the organization not existing, or a
                temporary issue with GitHub's API rate limits.
                <br />
                <span className="block mt-2">
                  If you want to try the app without API limits, set{" "}
                  <span className="font-mono bg-gray-100 px-1 rounded">
                    NODE_ENV=dev
                  </span>{" "}
                  to use mock data.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
