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
    <div className="repository-searchbar-container">
      <div className="flex items-center gap-2 mb-3">
        <DynamicIcon lib="go" icon="GoEye" className="text-sky-500 text-lg" />
        <h3 className="repository-searchbar-title">Filter repositories</h3>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 w-full items-end"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 120px" }}
          role="search"
          aria-label="Repository filters"
        >
          <div>
            <label htmlFor="type-select" className="label-base">
              Type
            </label>
            <select
              id="type-select"
              name="type"
              aria-label="Type"
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
              aria-label="Sort by"
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
            />
          </div>

          <div>
            <NumericInput
              id="page-input"
              name="page"
              label="Page Number"
              min={1}
              value={searchTerms?.page ?? 1}
              onChange={(val) => onSearchChange({ ...searchTerms, page: val })}
              ariaLabel="Page number"
            />
          </div>

          <div className="flex flex-col items-center justify-end h-full">
            <label className="invisible block h-0">Reset</label>
            <button
              type="button"
              onClick={handleReset}
              className="btn-base"
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
