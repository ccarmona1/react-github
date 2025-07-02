import { useCallback, type FC } from "react";
import type { RepositorySearchTerms } from "../../../types/RepositorySearchTerms";

interface RepositoryListSearchBarProps {
  onSearchChange: (searchTerms: RepositorySearchTerms) => void;
  searchTerms: RepositorySearchTerms;
}

export const RepositoryListSearchBar: FC<RepositoryListSearchBarProps> = ({
  onSearchChange,
  searchTerms,
}) => {
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLElement>) => {
      const { name, value } = event.target as HTMLInputElement;
      let parsedValue: string | number = value;
      if (name === "per_page" || name === "page") {
        parsedValue = Number(value);
      }
      onSearchChange({ ...searchTerms, [name]: parsedValue });
      console.log("hi");
    },
    [onSearchChange, searchTerms]
  );

  return (
    <>
      <label htmlFor="type-select" className="mr-2">
        Type
      </label>
      <select
        id="type-select"
        name="type"
        aria-label="type"
        value={searchTerms?.type || ""}
        onChange={handleSearchChange}
      >
        <option value="">all</option>
        <option value="public">public</option>
        <option value="private">private</option>
        <option value="forks">forks</option>
        <option value="sources">sources</option>
        <option value="member">member</option>
      </select>
      <label htmlFor="sort-select" className="ml-4 mr-2">
        Sort
      </label>
      <select
        id="sort-select"
        name="sort"
        aria-label="sort"
        value={searchTerms?.sort || ""}
        onChange={handleSearchChange}
      >
        <option value="">created</option>
        <option value="updated">updated</option>
        <option value="pushed">pushed</option>
        <option value="full_name">full_name</option>
      </select>
      <label htmlFor="per-page-input" className="ml-4 mr-2">
        Per page
      </label>
      <input
        id="per-page-input"
        name="per_page"
        type="number"
        min={1}
        aria-label="per_page"
        value={searchTerms?.per_page}
        onChange={handleSearchChange}
      />
      <label htmlFor="page-input" className="ml-4 mr-2">
        Page
      </label>
      <input
        id="page-input"
        name="page"
        type="number"
        min={1}
        aria-label="page"
        value={searchTerms?.page}
        onChange={handleSearchChange}
      />
    </>
  );
};
