import { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

interface FilterGroupProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

export function FilterGroup({ title, options, selected, onChange }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {isOpen ? <HiChevronUp className="h-5 w-5" /> : <HiChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="mt-4 space-y-2">
          {options.map(option => (
            <label key={option} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                className="h-4 w-4 rounded border-gray-300 text-[var(--graston-teal)] focus:ring-[var(--graston-teal)]"
              />
              <span className="text-sm text-gray-600">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
