// project/components/CitySelector.tsx

"use client";

import React, { useMemo, useId, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Select, { MenuListProps, StylesConfig } from 'react-select';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Card } from '@/components/ui/card';
import { City, State, Service } from '@/lib/types';

interface CitySelectorProps {
  currentState: State;
  currentCity: City;
  cities: City[];
}

interface OptionType {
  value: string;
  label: string;
}

// Custom MenuList component to integrate react-window for virtualization
const MenuList: React.FC<MenuListProps<OptionType, false>> = (props) => {
  const { options, children, maxHeight } = props;
  const height = 35;

  // Convert children to an array to ensure 'length' property exists
  const childrenArray = React.Children.toArray(children);

  // Determine the initial scroll offset based on the selected option
  const selectedOption = props.getValue()[0];
  const initialOffset = selectedOption
    ? options.findIndex(option => option.label === selectedOption.label) * height
    : 0;

  // Row component for each item in the virtualized list
  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => (
    <div style={style}>
      {childrenArray[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={Math.min(maxHeight, childrenArray.length * height)}
      itemCount={childrenArray.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
      width="100%" // Ensures the list width matches the dropdown menu
    >
      {Row}
    </FixedSizeList>
  );
};

export default function CitySelector({ currentState, currentCity, cities = [] }: CitySelectorProps) {
  const router = useRouter();
  const params = useParams(); // Extract route parameters
  const serviceSlug = params?.service?.toString(); // Safe access with optional chaining
  const selectId = useId(); // Generate unique ID for select
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const options = useMemo(() => {
    return cities.map(city => ({
      value: city.id,
      label: `${city.name}, ${currentState.abbreviation}`
    }));
  }, [cities, currentState]);

  const currentValue = useMemo(() => ({
    value: currentCity.id,
    label: `${currentCity.name}, ${currentState.abbreviation}`
  }), [currentCity, currentState]);

  if (!mounted) {
    return (
      <div className="h-10 bg-gray-100 animate-pulse rounded-md"></div>
    );
  }

  // Handler for when a city is selected
  const handleChange = (selected: OptionType | null) => {
    if (selected) {
      // Determine the navigation path based on the presence of service
      let path = `/${currentState.id}/${selected.value}`;

      if (serviceSlug) {
        // Append the service slug
        path += `/${serviceSlug}`;
      }

      router.push(path);
    }
  };

  // Custom styles for react-select to match your design preferences
  const customStyles: StylesConfig<OptionType, false> = {
    control: (provided) => ({
      ...provided,
      borderColor: '#ccc',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#aaa',
      },
    }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }), // Ensures the menu appears above other elements
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? '#f0f8ff'
        : state.isSelected
        ? '#0070f3'
        : undefined,
      color: state.isSelected ? '#fff' : '#000',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
    }),
  };

  return (
    <Card className="p-6">
      <h2 className="font-semibold mb-4">
        Select a City in {currentState.name}
      </h2>
      <Select
        instanceId={selectId}
        components={{ MenuList }}
        options={options}
        value={currentValue}
        onChange={handleChange}
        placeholder="Search for a city..."
        isSearchable
        noOptionsMessage={() => 'No cities found'}
        styles={customStyles}
        // Accessibility improvements
        aria-label="City Selector"
      />
    </Card>
  );
}