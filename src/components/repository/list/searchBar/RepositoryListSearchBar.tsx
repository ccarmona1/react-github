import { useCallback, type FC } from "react";
import type { RepositorySearchTerms } from "../../../../types/RepositorySearchTerms";
import { DynamicIcon } from "../../../common/DynamicIcon";

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
    },
    [onSearchChange, searchTerms]
  );

  return (
    <div className="repository-searchbar-container">
      <div className="flex items-center gap-2 mb-3">
        <DynamicIcon lib="go" icon="GoEye" className="text-sky-500 text-lg" />
        <h3 className="repository-searchbar-title">Filter repositories</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="type-select" className="label-base">
            Type
          </label>
          <select
            id="type-select"
            name="type"
            aria-label="type"
            value={searchTerms?.type || ""}
            onChange={handleSearchChange}
            className="input-base"
          >
            <option value="">all</option>
            <option value="public">public</option>
            <option value="private">private</option>
            <option value="forks">forks</option>
            <option value="sources">sources</option>
            <option value="member">member</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-select" className="label-base">
            Sort by
          </label>
          <select
            id="sort-select"
            name="sort"
            aria-label="sort"
            value={searchTerms?.sort || ""}
            onChange={handleSearchChange}
            className="input-base"
          >
            <option value="">created</option>
            <option value="updated">updated</option>
            <option value="pushed">pushed</option>
            <option value="full_name">full_name</option>
          </select>
        </div>

        <div>
          <label htmlFor="per-page-input" className="label-base">
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
            className="input-base input-base-placeholder"
          />
        </div>

        <div>
          <label htmlFor="page-input" className="label-base">
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
            className="input-base input-base-placeholder"
          />
        </div>
      </div>
    </div>
  );
};
