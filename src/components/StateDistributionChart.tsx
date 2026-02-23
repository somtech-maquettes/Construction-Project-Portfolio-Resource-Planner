import React from 'react';
import { ProjectState } from '../types/project';
interface StateDistributionChartProps {
  distribution: Record<ProjectState, number>;
}
export function StateDistributionChart({
  distribution
}: StateDistributionChartProps) {
  const states: {
    state: ProjectState;
    color: string;
    label: string;
  }[] = [
  {
    state: 'Développement',
    color: 'bg-yellow-500',
    label: 'Développement'
  },
  {
    state: 'Pré-construction',
    color: 'bg-blue-500',
    label: 'Pré-construction'
  },
  {
    state: 'Exécution',
    color: 'bg-green-500',
    label: 'Exécution'
  },
  {
    state: 'Exécution terminé',
    color: 'bg-gray-500',
    label: 'Terminé'
  }];

  const total = Object.values(distribution).reduce(
    (sum, count) => sum + count,
    0
  );
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Distribution par état
      </h3>

      <div className="space-y-4">
        {states.map(({ state, color, label }) => {
          const count = distribution[state] || 0;
          const percentage = total > 0 ? count / total * 100 : 0;
          return (
            <div key={state}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{label}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {count} ({percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${color} h-2 rounded-full transition-all duration-500`}
                  style={{
                    width: `${percentage}%`
                  }} />

              </div>
            </div>);

        })}
      </div>
    </div>);

}