import React from 'react';
import {
  X,
  DollarSign,
  TrendingUp,
  Clock,
  Target,
  Calendar,
  FileText } from
'lucide-react';
import { Project } from '../types/project';
interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  onEdit?: () => void;
}
export function ProjectDetailModal({
  project,
  onClose,
  onEdit
}: ProjectDetailModalProps) {
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
  const monthlyProjectionsArray = Object.entries(
    project.monthlyProjections
  ).map(([month, amount]) => ({
    month,
    amount
  }));
  const totalProjectedSales = monthlyProjectionsArray.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="text-sm text-gray-500">{project.number}</p>
            <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">

            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium border ${getStateColor(project.state)}`}>

              {project.state}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
              <Calendar className="w-4 h-4 inline mr-1" />
              Année {project.year}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">Montant du contrat</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatCurrency(project.contractAmount)}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-blue-700">
                  Ventes projetées totales
                </p>
                <p className="text-lg font-semibold text-blue-900">
                  {formatCurrency(totalProjectedSales)}
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-600 text-white p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-green-700">Bénéfice estimé</p>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(project.estimatedProfit)}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-xs text-green-700">Marge bénéficiaire</p>
                <p className="text-lg font-semibold text-green-900">
                  {project.profitPercentage}%
                </p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-600 text-white p-2 rounded-lg">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-purple-700">
                    Potentiel d'exécution
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {project.executionPotential}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-3 mt-4">
                <div
                  className="bg-purple-600 h-3 rounded-full transition-all"
                  style={{
                    width: `${project.executionPotential}%`
                  }} />

              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-600 text-white p-2 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-orange-700">Heures estimées</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {new Intl.NumberFormat('fr-CA').format(
                      project.estimatedMOD
                    )}{' '}
                    h
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-orange-200">
                <p className="text-xs text-orange-700">
                  Coût horaire moyen estimé
                </p>
                <p className="text-lg font-semibold text-orange-900">
                  {formatCurrency(
                    project.contractAmount / project.estimatedMOD
                  )}
                  /h
                </p>
              </div>
            </div>
          </div>

          {monthlyProjectionsArray.length > 0 &&
          <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Projections mensuelles détaillées
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {monthlyProjectionsArray.map(({ month, amount }) => {
                  const [year, monthNum] = month.split('-');
                  const monthName = new Date(
                    parseInt(year),
                    parseInt(monthNum) - 1
                  ).toLocaleDateString('fr-CA', {
                    month: 'long',
                    year: 'numeric'
                  });
                  const percentage =
                  totalProjectedSales > 0 ?
                  amount / totalProjectedSales * 100 :
                  0;
                  return (
                    <div
                      key={month}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">

                        <p className="text-xs text-gray-500 mb-1 capitalize">
                          {monthName}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          {formatCurrency(amount)}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{
                            width: `${percentage}%`
                          }} />

                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {percentage.toFixed(0)}% du total
                        </p>
                      </div>);

                })}
                </div>
              </div>
            </div>
          }

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Informations supplémentaires
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Numéro de projet</p>
                <p className="font-semibold text-gray-900">{project.number}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Année de réalisation</p>
                <p className="font-semibold text-gray-900">{project.year}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Durée estimée</p>
                <p className="font-semibold text-gray-900">
                  {monthlyProjectionsArray.length} mois
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Statut actuel</p>
                <p className="font-semibold text-gray-900">{project.state}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium">

            Fermer
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Exporter PDF
            </button>
            {onEdit &&
            <button
              onClick={onEdit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">

                Modifier le projet
              </button>
            }
          </div>
        </div>
      </div>
    </div>);

}