import React from 'react';
import { Project } from '../types/project';
import { TrendingUp, Clock, Target, DollarSign } from 'lucide-react';
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}
export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const getStateColor = (state: string) => {
    switch (state) {
      case 'Exécution':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pré-construction':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Développement':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Exécution terminé':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getProfitColor = (percentage: number) => {
    if (percentage >= 15) return 'text-green-600';
    if (percentage >= 10) return 'text-blue-600';
    return 'text-orange-600';
  };
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">

      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">{project.number}</p>
          <h3 className="text-lg font-semibold text-gray-900">
            {project.name}
          </h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStateColor(project.state)}`}>

          {project.state}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Contrat</span>
          </div>
          <span className="font-semibold text-gray-900">
            {formatCurrency(project.contractAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Bénéfice estimé</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-gray-900">
              {formatCurrency(project.estimatedProfit)}
            </span>
            <span
              className={`ml-2 text-sm font-medium ${getProfitColor(project.profitPercentage)}`}>

              ({project.profitPercentage}%)
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Target className="w-4 h-4" />
            <span className="text-sm">Potentiel d'exécution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${project.executionPotential}%`
                }} />

            </div>
            <span className="text-sm font-medium text-gray-900">
              {project.executionPotential}%
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">MOD estimé</span>
          </div>
          <span className="font-semibold text-gray-900">
            {new Intl.NumberFormat('fr-CA').format(project.estimatedMOD)} h
          </span>
        </div>
      </div>
    </div>);

}