
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router";

interface SearchBarProps {
  placeholder: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);

    if (searchValue.trim()) {
      newSearchParams.set("q", searchValue.trim());
    } else {
      newSearchParams.delete("q");
    }

    setSearchParams(newSearchParams);
    onSearch?.(searchValue.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full p-3 pl-10 pr-12 border border-[var(--graston-light-blue)] rounded-full shadow-sm focus:ring-2 focus:ring-[var(--graston-teal)] focus:outline-none focus:border-[var(--graston-teal)]"
      />
      <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[var(--graston-gray)]" />
      <button
        type="submit"
        className="absolute top-1/2 right-3 transform -translate-y-1/2 px-3 py-1 bg-[var(--graston-teal)] text-white text-sm rounded-full hover:bg-[var(--graston-blue)] transition-colors"
      >
        Search
      </button>
    </form>
  );
}
