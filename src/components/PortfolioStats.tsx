import React, { Component } from 'react';
import { PortfolioStats } from '../types/project';
import { TrendingUp, DollarSign, Briefcase, Clock } from 'lucide-react';
interface PortfolioStatsProps {
  stats: PortfolioStats;
}
export function PortfolioStatsComponent({ stats }: PortfolioStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-CA').format(num);
  };
  const statCards = [
  {
    label: 'Valeur totale des contrats',
    value: formatCurrency(stats.totalContractValue),
    icon: DollarSign,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    label: 'Bénéfice total estimé',
    value: formatCurrency(stats.totalEstimatedProfit),
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    label: 'Projets actifs',
    value:
    (stats.projectsByState['Exécution'] || 0) + (
    stats.projectsByState['Pré-construction'] || 0),
    icon: Briefcase,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    label: 'MOD total requis',
    value: `${formatNumber(stats.totalMOD)} h`,
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>);

      })}
    </div>);

}