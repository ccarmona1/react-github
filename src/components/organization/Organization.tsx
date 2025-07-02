import { useEffect, useState, type FC } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useServices } from "../../hooks/organization/useService";
import type { Organization } from "../../types/Organization";

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
    <>
      {organization ? (
        <>
          <>Organization Name: {JSON.stringify(organization.login)}</>
          <>Description: {JSON.stringify(organization)}</>
          <Outlet></Outlet>
        </>
      ) : (
        <div>{organizationName} Organization does not exist</div>
      )}
    </>
  );
};
