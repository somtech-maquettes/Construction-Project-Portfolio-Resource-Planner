import React, { useMemo } from 'react';
import { mockProjects } from '../data/mockProjects';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  AlertTriangle,
  Calendar,
  Target,
  ArrowUp,
  ArrowDown } from
'lucide-react';
export function Dashboard() {
  const currentYear = 2025;
  const currentMonth = new Date().getMonth() + 1;
  const stats = useMemo(() => {
    const activeProjects = mockProjects.filter(
      (p) => p.state === 'Exécution' || p.state === 'Pré-construction'
    );
    const totalRevenue = mockProjects.reduce(
      (sum, p) => sum + p.contractAmount,
      0
    );
    const totalProfit = mockProjects.reduce(
      (sum, p) => sum + p.estimatedProfit,
      0
    );
    const avgMargin = totalRevenue > 0 ? totalProfit / totalRevenue * 100 : 0;
    // Projections pour les 3 prochains mois
    const next3Months = [];
    for (let i = 0; i < 3; i++) {
      const month = (currentMonth + i - 1) % 12 + 1;
      const year = currentMonth + i > 12 ? currentYear + 1 : currentYear;
      const monthKey = `${year}-${String(month).padStart(2, '0')}`;
      let monthRevenue = 0;
      mockProjects.forEach((project) => {
        if (project.monthlyProjections[monthKey]) {
          monthRevenue += project.monthlyProjections[monthKey];
        }
      });
      next3Months.push({
        month: monthKey,
        revenue: monthRevenue
      });
    }
    // Top 5 projets par valeur
    const topProjects = [...mockProjects].
    sort((a, b) => b.contractAmount - a.contractAmount).
    slice(0, 5);
    return {
      activeProjects: activeProjects.length,
      totalRevenue,
      totalProfit,
      avgMargin,
      next3Months,
      topProjects,
      revenueYTD: totalRevenue * 0.65,
      projectedRevenue: totalRevenue
    };
  }, [currentMonth, currentYear]);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const getMonthName = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
      'fr-CA',
      {
        month: 'long',
        year: 'numeric'
      }
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de Bord Exécutif
          </h1>
          <p className="text-gray-600">
            Vue synthétique des indicateurs clés de performance
          </p>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                <span>12%</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Revenus YTD</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(stats.revenueYTD)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              vs {formatCurrency(stats.projectedRevenue)} projeté
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                <span>8%</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Marge bénéficiaire moyenne
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.avgMargin.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Bénéfice total: {formatCurrency(stats.totalProfit)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                <span>Stable</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Projets actifs</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.activeProjects}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              En exécution ou pré-construction
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-orange-600 text-sm font-medium">
                <span>2 alertes</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Alertes de surcharge</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
            <p className="text-xs text-gray-500 mt-2">
              Conflits de ressources détectés
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Projections de trésorerie 3 mois */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Projections de trésorerie (3 mois)
              </h3>
            </div>
            <div className="space-y-4">
              {stats.next3Months.map((item, index) => {
                const maxRevenue = Math.max(
                  ...stats.next3Months.map((m) => m.revenue)
                );
                const percentage =
                maxRevenue > 0 ? item.revenue / maxRevenue * 100 : 0;
                return (
                  <div key={item.month}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {getMonthName(item.month)}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(item.revenue)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`
                        }} />

                    </div>
                  </div>);

              })}
            </div>
          </div>

          {/* Top 5 projets par valeur */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Top 5 projets par valeur
              </h3>
            </div>
            <div className="space-y-4">
              {stats.topProjects.map((project, index) =>
              <div key={project.id} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {project.name}
                    </p>
                    <p className="text-xs text-gray-500">{project.number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(project.contractAmount)}
                    </p>
                    <p className="text-xs text-green-600">
                      {project.profitPercentage}% marge
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tendance de charge MOD */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Tendance de charge MOD
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-700 mb-1">Janvier 2025</p>
              <p className="text-2xl font-bold text-blue-900">3,200 h</p>
              <p className="text-xs text-blue-600 mt-1">Capacité: 3,500 h</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 mb-1">Février 2025</p>
              <p className="text-2xl font-bold text-green-900">2,800 h</p>
              <p className="text-xs text-green-600 mt-1">Capacité: 3,500 h</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <p className="text-sm text-orange-700 mb-1">Mars 2025</p>
              <p className="text-2xl font-bold text-orange-900">3,600 h</p>
              <p className="text-xs text-orange-600 mt-1">
                ⚠️ Surcharge: +100 h
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="text-sm text-red-700 mb-1">Avril 2025</p>
              <p className="text-2xl font-bold text-red-900">3,900 h</p>
              <p className="text-xs text-red-600 mt-1">⚠️ Surcharge: +400 h</p>
            </div>
          </div>
        </div>

        {/* Note d'information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Tableau de bord en temps réel
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              • Les données sont mises à jour automatiquement à partir des
              projets actifs
            </p>
            <p>
              • Les projections de trésorerie sont basées sur les ventes
              mensuelles projetées
            </p>
            <p>
              • Les alertes de surcharge sont générées lorsque la capacité MOD
              est dépassée
            </p>
          </div>
        </div>
      </div>
    </div>);

}