import { render, screen, fireEvent } from "@testing-library/react";
import { RepositoryListSearchBar } from "./RepositoryListSearchBar";
import type { RepositorySearchTerms } from "../../../../types/RepositorySearchTerms";

describe("RepositoryListSearchBar", () => {
  afterEach(jest.clearAllMocks);

  const defaultTerms: RepositorySearchTerms = {
    type: "all",
    sort: "created",
    per_page: 10,
    page: 1,
  };

  it("renders all controls", () => {
    render(
      <RepositoryListSearchBar
        onSearchChange={jest.fn()}
        searchTerms={defaultTerms}
      />
    );
    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
    expect(screen.getByLabelText("Page size")).toBeInTheDocument();
    expect(screen.getByLabelText("Page number")).toBeInTheDocument();
  });

  it("calls onSearchChange when type is changed", () => {
    const onSearchChange = jest.fn();
    render(
      <RepositoryListSearchBar
        onSearchChange={onSearchChange}
        searchTerms={defaultTerms}
      />
    );
    fireEvent.change(screen.getByLabelText("Type"), {
      target: { name: "type", value: "public" },
    });
    expect(onSearchChange).toHaveBeenCalledWith({
      ...defaultTerms,
      type: "public",
    });
  });

  it("calls onSearchChange when sort is changed", () => {
    const onSearchChange = jest.fn();
    render(
      <RepositoryListSearchBar
        onSearchChange={onSearchChange}
        searchTerms={defaultTerms}
      />
    );
    fireEvent.change(screen.getByLabelText("Sort by"), {
      target: { name: "sort", value: "updated" },
    });
    expect(onSearchChange).toHaveBeenCalledWith({
      ...defaultTerms,
      sort: "updated",
    });
  });

  it("calls onSearchChange when per_page is changed", () => {
    const onSearchChange = jest.fn();
    render(
      <RepositoryListSearchBar
        onSearchChange={onSearchChange}
        searchTerms={defaultTerms}
      />
    );
    fireEvent.change(screen.getByLabelText("Page size"), {
      target: { name: "per_page", value: 5 },
    });
    expect(onSearchChange).toHaveBeenCalledWith({
      ...defaultTerms,
      per_page: 5,
    });
  });

  it("calls onSearchChange when page is changed", () => {
    const onSearchChange = jest.fn();
    render(
      <RepositoryListSearchBar
        onSearchChange={onSearchChange}
        searchTerms={defaultTerms}
      />
    );
    fireEvent.change(screen.getByLabelText("Page number"), {
      target: { name: "page", value: 2 },
    });
    expect(onSearchChange).toHaveBeenCalledWith({ ...defaultTerms, page: 2 });
  });
});
