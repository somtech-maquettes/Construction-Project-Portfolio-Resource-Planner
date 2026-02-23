import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ProjectState } from '../types/project';
interface PortfolioFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedState: ProjectState | 'all';
  onStateChange: (state: ProjectState | 'all') => void;
  selectedYear: number | 'all';
  onYearChange: (year: number | 'all') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}
export function PortfolioFilters({
  searchTerm,
  onSearchChange,
  selectedState,
  onStateChange,
  selectedYear,
  onYearChange,
  sortBy,
  onSortChange
}: PortfolioFiltersProps) {
  const states: (ProjectState | 'all')[] = [
  'all',
  'Développement',
  'Pré-construction',
  'Exécution',
  'Exécution terminé'];

  const years: (number | 'all')[] = ['all', 2024, 2025, 2026];
  const sortOptions = [
  {
    value: 'name',
    label: 'Nom'
  },
  {
    value: 'amount',
    label: 'Montant'
  },
  {
    value: 'profit',
    label: 'Rentabilité'
  },
  {
    value: 'state',
    label: 'État'
  }];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

        </div>
        <select
          value={selectedState}
          onChange={(e) =>
          onStateChange(e.target.value as ProjectState | 'all')
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

          {states.map((state) =>
          <option key={state} value={state}>
              {state === 'all' ? 'Tous les états' : state}
            </option>
          )}
        </select>
        <select
          value={selectedYear}
          onChange={(e) =>
          onYearChange(
            e.target.value === 'all' ? 'all' : Number(e.target.value)
          )
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

          {years.map((year) =>
          <option key={year} value={year}>
              {year === 'all' ? 'Toutes les années' : year}
            </option>
          )}
        </select>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

          {sortOptions.map((option) =>
          <option key={option.value} value={option.value}>
              Trier par: {option.label}
            </option>
          )}
        </select>
      </div>
    </div>);

}