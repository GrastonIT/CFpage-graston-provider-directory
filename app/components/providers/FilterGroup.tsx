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
    <div className="border-b border-[var(--graston-light-blue)] py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left hover:text-[var(--graston-teal)] transition-colors"
      >
        <h3 className="font-semibold text-[var(--graston-dark)]">{title}</h3>
        {isOpen ? 
          <HiChevronUp className="h-5 w-5 text-[var(--graston-blue)]" /> : 
          <HiChevronDown className="h-5 w-5 text-[var(--graston-blue)]" />
        }
      </button>
      {isOpen && (
        <div className="mt-4 space-y-2">
          {options.map(option => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-[var(--graston-light-blue)] px-2 py-1 rounded-md transition-colors">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                className="h-4 w-4 rounded border-[var(--graston-blue)] text-[var(--graston-teal)] focus:ring-[var(--graston-teal)] focus:ring-offset-0"
              />
              <span className="text-sm text-[var(--graston-dark)] font-medium">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
