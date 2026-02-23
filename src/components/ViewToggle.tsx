import React from 'react';
import { Grid3x3, List } from 'lucide-react';
interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}
export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${view === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>

        <Grid3x3 className="w-4 h-4" />
        <span className="text-sm font-medium">Grille</span>
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${view === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>

        <List className="w-4 h-4" />
        <span className="text-sm font-medium">Liste</span>
      </button>
    </div>);

}