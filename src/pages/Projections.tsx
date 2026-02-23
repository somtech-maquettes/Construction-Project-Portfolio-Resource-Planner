import React, { useMemo, useState } from 'react';
import { mockProjects } from '../data/mockProjects';
import {
  Calendar,
  TrendingUp,
  DollarSign,
  BarChart3,
  ArrowUp,
  ArrowDown } from
'lucide-react';
export function Projections() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const monthlyData = useMemo(() => {
    const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'];

    const data = months.map((monthName, index) => {
      const monthKey = `${selectedYear}-${String(index + 1).padStart(2, '0')}`;
      let totalSales = 0;
      let totalProfit = 0;
      let totalMOD = 0;
      const projectsInMonth: string[] = [];
      mockProjects.forEach((project) => {
        if (project.monthlyProjections[monthKey]) {
          const sales = project.monthlyProjections[monthKey];
          totalSales += sales;
          totalProfit += sales * project.profitPercentage / 100;
          totalMOD +=
          project.estimatedMOD /
          Object.keys(project.monthlyProjections).length;
          projectsInMonth.push(project.name);
        }
      });
      return {
        month: monthName,
        monthKey,
        sales: totalSales,
        profit: totalProfit,
        mod: Math.round(totalMOD),
        projects: projectsInMonth
      };
    });
    return data;
  }, [selectedYear]);
  const maxSales = Math.max(...monthlyData.map((d) => d.sales));
  const totalYearSales = monthlyData.reduce((sum, d) => sum + d.sales, 0);
  const totalYearProfit = monthlyData.reduce((sum, d) => sum + d.profit, 0);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const formatShortCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M$`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}k$`;
    }
    return formatCurrency(amount);
  };
  // Calculer la tendance
  const calculateTrend = (index: number) => {
    if (index === 0) return null;
    const current = monthlyData[index].sales;
    const previous = monthlyData[index - 1].sales;
    if (previous === 0) return null;
    const change = (current - previous) / previous * 100;
    return change;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Projections Financières
          </h1>
          <p className="text-gray-600">
            Visualisation des revenus et bénéfices projetés mois par mois
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Ventes totales {selectedYear}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalYearSales)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Bénéfice total {selectedYear}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalYearProfit)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Marge moyenne</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalYearSales > 0 ?
                  (totalYearProfit / totalYearSales * 100).toFixed(1) :
                  0}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('chart')}
                className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>

                Graphique
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>

                Tableau
              </button>
            </div>
          </div>

          {viewMode === 'chart' ?
          <div className="space-y-8">
              {/* Graphique en colonnes moderne */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Ventes mensuelles projetées
                </h3>
                <div className="relative h-96 bg-gray-50 rounded-lg p-6">
                  {/* Lignes de grille horizontales */}
                  <div className="absolute inset-6 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3, 4].map((i) =>
                  <div key={i} className="border-t border-gray-300" />
                  )}
                  </div>

                  {/* Graphique à colonnes */}
                  <div className="relative h-full flex items-end justify-between gap-2 pt-8 pb-12">
                    {monthlyData.map((data, index) => {
                    const heightPercentage =
                    maxSales > 0 ? data.sales / maxSales * 100 : 0;
                    const trend = calculateTrend(index);
                    const heightPx = Math.max(
                      heightPercentage * 2.5,
                      data.sales > 0 ? 20 : 4
                    );
                    return (
                      <div
                        key={data.month}
                        className="flex-1 flex flex-col items-center justify-end h-full">

                          {/* Valeur au-dessus de la colonne */}
                          {data.sales > 0 &&
                        <div className="mb-2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                              {formatShortCurrency(data.sales)}
                            </div>
                        }

                          {/* Colonne avec tooltip */}
                          <div className="w-full relative group">
                            {/* Tooltip au survol */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                              <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                                <p className="font-semibold">{data.month}</p>
                                <p className="text-gray-300 mt-1">
                                  {formatCurrency(data.sales)}
                                </p>
                                <p className="text-green-400 text-xs mt-1">
                                  Bénéfice: {formatCurrency(data.profit)}
                                </p>
                                {data.projects.length > 0 &&
                              <p className="text-blue-400 text-xs mt-1">
                                    {data.projects.length} projet
                                    {data.projects.length > 1 ? 's' : ''}
                                  </p>
                              }
                              </div>
                            </div>

                            {/* Barre de colonne avec gradient */}
                            <div
                            className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative overflow-hidden"
                            style={{
                              height: `${heightPx}px`,
                              background:
                              data.sales > 0 ?
                              'linear-gradient(to top, #3b82f6, #60a5fa)' :
                              '#e5e7eb'
                            }}>

                              {/* Effet de brillance */}
                              {data.sales > 0 &&
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20" />
                            }
                            </div>
                          </div>

                          {/* Label du mois avec indicateur de tendance */}
                          <div className="text-center mt-2">
                            <p className="text-xs font-medium text-gray-700">
                              {data.month.substring(0, 3)}
                            </p>
                            {trend !== null &&
                          <div
                            className={`flex items-center justify-center gap-0.5 text-xs mt-1 ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-400'}`}>

                                {trend > 0 ?
                            <ArrowUp className="w-3 h-3" /> :
                            trend < 0 ?
                            <ArrowDown className="w-3 h-3" /> :
                            null}
                                <span>{Math.abs(trend).toFixed(0)}%</span>
                              </div>
                          }
                          </div>
                        </div>);

                  })}
                  </div>
                </div>
              </div>

              {/* Graphique de bénéfices */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Bénéfices mensuels projetés
                </h3>
                <div className="relative h-64 bg-gray-50 rounded-lg p-6">
                  <div className="relative h-full flex items-end justify-between gap-2 pt-8 pb-12">
                    {monthlyData.map((data) => {
                    const maxProfit = Math.max(
                      ...monthlyData.map((d) => d.profit)
                    );
                    const heightPercentage =
                    maxProfit > 0 ? data.profit / maxProfit * 100 : 0;
                    const heightPx = Math.max(
                      heightPercentage * 1.5,
                      data.profit > 0 ? 15 : 4
                    );
                    return (
                      <div
                        key={data.month}
                        className="flex-1 flex flex-col items-center justify-end h-full">

                          {data.profit > 0 &&
                        <div className="mb-2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                              {formatShortCurrency(data.profit)}
                            </div>
                        }

                          <div className="w-full relative group">
                            <div
                            className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                            style={{
                              height: `${heightPx}px`,
                              background:
                              data.profit > 0 ?
                              'linear-gradient(to top, #10b981, #34d399)' :
                              '#e5e7eb'
                            }} />

                          </div>

                          <p className="text-xs font-medium text-gray-700 mt-2">
                            {data.month.substring(0, 3)}
                          </p>
                        </div>);

                  })}
                  </div>
                </div>
              </div>
            </div> :

          <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                      Mois
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                      Ventes projetées
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                      Bénéfice projeté
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                      Heures requises
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                      Projets
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data, index) =>
                <tr
                  key={data.month}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>

                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                        {data.month}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right font-semibold">
                        {formatCurrency(data.sales)}
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600 text-right font-semibold">
                        {formatCurrency(data.profit)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">
                        {data.mod.toLocaleString('fr-CA')} h
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {data.projects.length > 0 ?
                    <span className="text-blue-600">
                            {data.projects.length} projet
                            {data.projects.length > 1 ? 's' : ''}
                          </span> :

                    <span className="text-gray-400">Aucun</span>
                    }
                      </td>
                    </tr>
                )}
                  <tr className="border-t-2 border-gray-300 bg-gray-100 font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-900">TOTAL</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">
                      {formatCurrency(totalYearSales)}
                    </td>
                    <td className="py-3 px-4 text-sm text-green-600 text-right">
                      {formatCurrency(totalYearProfit)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">
                      {monthlyData.
                    reduce((sum, d) => sum + d.mod, 0).
                    toLocaleString('fr-CA')}{' '}
                      h
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Détails des projections
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              • Les projections sont calculées à partir des données mensuelles
              de chaque projet
            </p>
            <p>
              • Le bénéfice est estimé selon le pourcentage de rentabilité de
              chaque projet
            </p>
            <p>
              • Les heures requises (Main d'Œuvre Directe) sont réparties
              proportionnellement sur les mois actifs
            </p>
            <p>
              • Les indicateurs de tendance montrent la variation par rapport au
              mois précédent
            </p>
          </div>
        </div>
      </div>
    </div>);

}