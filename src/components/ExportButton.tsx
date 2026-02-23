import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { Project } from '../types/project';
import { exportToCSV } from '../utils/exportUtils';
interface ExportButtonProps {
  projects: Project[];
  onExport: (message: string) => void;
}
export function ExportButton({ projects, onExport }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleExport = (format: 'csv' | 'excel') => {
    if (format === 'csv') {
      exportToCSV(projects);
      onExport(`${projects.length} projets exportés en CSV`);
    }
    setIsOpen(false);
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">

        <Download className="w-5 h-5" />
        <span>Exporter</span>
      </button>

      {isOpen &&
      <>
          <div
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            <button
            onClick={() => handleExport('csv')}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">

              <FileSpreadsheet className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">Exporter en CSV</span>
            </button>
            <button
            onClick={() => handleExport('excel')}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">

              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">Exporter en Excel</span>
            </button>
          </div>
        </>
      }
    </div>);

}