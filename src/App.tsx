import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { OrganizationView } from "./components/organization/Organization";
import { ServicesProvider } from "./hooks/organization/ServicesProvider";
import { RepositoryList } from "./components/repository/list/RepositoryList";
import { RepositorySummary } from "./components/repository/summary/RepositorySummary";

function App() {
  return (
    <ServicesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/godaddy" replace />}></Route>
          <Route path="/:organizationName" element={<OrganizationView />}>
            <Route index element={<RepositoryList />}></Route>
            <Route
              path="/:organizationName/repository/:repositoryName"
              element={<RepositorySummary />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ServicesProvider>
  );
}

export default App;
