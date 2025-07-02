import { useEffect, useState, type FC } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useServices } from "../../hooks/organization/useService";
import type { Organization } from "../../types/Organization";
import { OrganizationInformation } from "./OrganizationInformation";

export const OrganizationView: FC = () => {
  const [organization, setOrganization] = useState<Organization>();
  const { organizationName } = useParams();

  const { organizationService } = useServices();

  useEffect(() => {
    const getOrganization = async () => {
      const organization = await organizationService.getOrganization(
        organizationName!
      );
      setOrganization(organization);
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
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              Organization "{organizationName}" does not exist
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
