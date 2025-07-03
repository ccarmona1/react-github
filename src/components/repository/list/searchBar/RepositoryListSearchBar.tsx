import { useCallback, type FC } from "react";
import type { RepositorySearchTerms } from "../../../../types/RepositorySearchTerms";

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
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">
        Filter repositories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="type-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type
          </label>
          <select
            id="type-select"
            name="type"
            aria-label="type"
            value={searchTerms?.type || ""}
            onChange={handleSearchChange}
            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none shadow-sm hover:border-blue-400 hover:shadow-md"
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
          <label
            htmlFor="sort-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sort by
          </label>
          <select
            id="sort-select"
            name="sort"
            aria-label="sort"
            value={searchTerms?.sort || ""}
            onChange={handleSearchChange}
            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none shadow-sm hover:border-blue-400 hover:shadow-md"
          >
            <option value="">created</option>
            <option value="updated">updated</option>
            <option value="pushed">pushed</option>
            <option value="full_name">full_name</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="per-page-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 shadow-sm hover:border-blue-400 hover:shadow-md placeholder-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="page-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 shadow-sm hover:border-blue-400 hover:shadow-md placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};
