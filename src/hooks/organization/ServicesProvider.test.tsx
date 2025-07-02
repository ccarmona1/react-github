import { render } from "@testing-library/react";
import { ServiceContext } from "./useService";
import { OrganizationService } from "../../services/organization/OrganizationService";
import { RepositoryService } from "../../services/repository/RepositoryService";
import { ServicesProvider } from "./ServicesProvider";
import { useContext } from "react";

describe("ServicesProvider", () => {
  it("provides services to children", () => {
    const childText = "test child";
    const TestChild = () => <div>{childText}</div>;
    const { getByText } = render(
      <ServicesProvider>
        <TestChild />
      </ServicesProvider>
    );
    expect(getByText(childText)).toBeInTheDocument();
  });

  it("provides correct service types", () => {
    let contextValue:
      | {
          organizationService: OrganizationService;
          repositoryService: RepositoryService;
        }
      | undefined;
    const TestChild = () => {
      contextValue = useContext(ServiceContext);
      return null;
    };
    render(
      <ServicesProvider>
        <TestChild />
      </ServicesProvider>
    );
    expect(contextValue?.organizationService).toBeInstanceOf(
      OrganizationService
    );
    expect(contextValue?.repositoryService).toBeInstanceOf(RepositoryService);
  });
});
