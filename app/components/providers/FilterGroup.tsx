
import { useSearchParams } from "react-router";

interface FilterGroupProps {
  facets: {
    specialty: string[];
    languages: string[];
    patients: string[];
  };
}

export function FilterGroup({ facets }: FilterGroupProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filterKey: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (value) {
      newSearchParams.set(filterKey, value);
    } else {
      newSearchParams.delete(filterKey);
    }

    setSearchParams(newSearchParams);
  };

  const filterCategories = [
    { key: 'specialty', label: 'Specialty', options: facets.specialty },
    { key: 'languages', label: 'Languages', options: facets.languages },
    { key: 'patients', label: 'Patient Types', options: facets.patients }
  ];

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-3 text-lg">Filters</h3>
      {filterCategories.map((category) => (
        <div key={category.key} className="mb-3">
          <label className="block font-semibold text-gray-700 mb-1">{category.label}</label>
          <select
            name={category.key}
            value={searchParams.get(category.key) || ""}
            onChange={(e) => handleFilterChange(category.key, e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All {category.label}</option>
            {category.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}

      {/* Clear Filters Button */}
      {Array.from(searchParams.entries()).some(([key]) =>
        ['specialty', 'languages', 'patients', 'grastonLevel'].includes(key)
      ) && (
          <button
            onClick={() => {
              const newSearchParams = new URLSearchParams(searchParams);
              ['specialty', 'languages', 'patients', 'grastonLevel'].forEach(key => {
                newSearchParams.delete(key);
              });
              setSearchParams(newSearchParams);
            }}
            className="w-full mt-3 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        )}
    </div>
  );
}
