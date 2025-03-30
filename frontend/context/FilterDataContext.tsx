import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context and accept `children` as a prop
interface FilteredDataContextProps {
  filteredData: any;
  setFilteredData: React.Dispatch<React.SetStateAction<any>>;
}

const FilteredDataContext = createContext<FilteredDataContextProps | undefined>(undefined);

export const useFilteredData = () => {
  const context = useContext(FilteredDataContext);
  if (!context) {
    throw new Error('useFilteredData must be used within a FilteredDataProvider');
  }
  return context;
};

export const FilteredDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredData, setFilteredData] = useState<any>(null);

  return (
    <FilteredDataContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </FilteredDataContext.Provider>
  );
};
