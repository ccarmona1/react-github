import { useCallback, type FC } from "react";
import type { RepositorySearchTerms } from "../../../../types/RepositorySearchTerms";
import { DynamicIcon } from "../../../common/DynamicIcon";
import { NumericInput } from "../../../common/NumericInput";

interface RepositoryListSearchBarProps {
  onSearchChange: (searchTerms: RepositorySearchTerms) => void;
  searchTerms: RepositorySearchTerms;
}

const defaultSearchTerms: RepositorySearchTerms = {
  type: "",
  sort: "",
  per_page: 10,
  page: 1,
};

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

  const handleReset = useCallback(() => {
    onSearchChange(defaultSearchTerms);
  }, [onSearchChange]);

  return (
    <div className="repository-searchbar-container w-full">
      <div className="flex items-center gap-2 mb-3">
        <DynamicIcon lib="go" icon="GoEye" className="text-sky-500 text-lg" />
        <h3 className="repository-searchbar-title">Filter repositories</h3>
      </div>
      <div className="w-full">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full items-end"
          role="search"
          aria-label="Repository filters"
        >
          <div className="w-full">
            <label htmlFor="type-select" className="label-base">
              Type
            </label>
            <select
              id="type-select"
              name="type"
              aria-label="Type"
              value={searchTerms?.type || ""}
              onChange={handleSearchChange}
              className="input-base w-full"
            >
              <option value="">all</option>
              <option value="public">public</option>
              <option value="private">private</option>
              <option value="forks">forks</option>
              <option value="sources">sources</option>
              <option value="member">member</option>
            </select>
          </div>

          <div className="w-full">
            <label htmlFor="sort-select" className="label-base">
              Sort by
            </label>
            <select
              id="sort-select"
              name="sort"
              aria-label="Sort by"
              value={searchTerms?.sort || ""}
              onChange={handleSearchChange}
              className="input-base w-full"
            >
              <option value="">created</option>
              <option value="updated">updated</option>
              <option value="pushed">pushed</option>
              <option value="full_name">full_name</option>
            </select>
          </div>

          <div className="w-full">
            <NumericInput
              id="per-page-input"
              name="per_page"
              label="Page Size"
              min={1}
              value={searchTerms?.per_page ?? 1}
              onChange={(val) =>
                onSearchChange({ ...searchTerms, per_page: val })
              }
              ariaLabel="Page size"
              className="w-full"
            />
          </div>

          <div className="w-full">
            <NumericInput
              id="page-input"
              name="page"
              label="Page Number"
              min={1}
              value={searchTerms?.page ?? 1}
              onChange={(val) => onSearchChange({ ...searchTerms, page: val })}
              ariaLabel="Page number"
              className="w-full"
            />
          </div>

          <div className="flex items-end w-full h-full">
            <button
              type="button"
              onClick={handleReset}
              className="btn-base w-full"
              aria-label="Reset filters"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
