import React from 'react';
import Button from '../../../components/ui/Button';


const FilterChips = ({ activeFilter, onFilterChange, filters, onAdvancedFilters }) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      <div className="flex space-x-2 flex-shrink-0">
        {filters?.map((filter) => (
          <Button
            key={filter?.id}
            variant={activeFilter === filter?.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter?.id)}
            className="whitespace-nowrap"
          >
            {filter?.label}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onAdvancedFilters}
        iconName="SlidersHorizontal"
        iconPosition="left"
        className="flex-shrink-0 ml-2"
      >
        Filters
      </Button>
    </div>
  );
};

export default FilterChips;