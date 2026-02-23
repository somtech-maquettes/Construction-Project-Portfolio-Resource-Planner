import React, { useMemo, useState } from 'react';
import {
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  UserCheck } from
'lucide-react';
import { mockProjects } from '../data/mockProjects';
/**
 * NOTE DE PRODUCTION:
 * Les données de ressources humaines seront tirées du module "ma-place-rh" en production.
 * Ce module fournira:
 * - Liste des employés et leurs compétences
 * - Disponibilité et congés
 * - Taux horaires et coûts
 * - Affectations actuelles
 * - Historique de performance
 *
 * Pour l'instant, nous utilisons des données mockées pour la démonstration.
 */
interface Employee {
  id: string;
  name: string;
  role: string;
  availability: number; // heures disponibles par mois
  currentLoad: number; // heures assignées
  hourlyRate: number;
}
// Données mockées - seront remplacées par l'API ma-place-rh
const mockEmployees: Employee[] = [
{
  id: '1',
  name: 'Jean Tremblay',
  role: 'Chef de projet',
  availability: 160,
  currentLoad: 145,
  hourlyRate: 85
},
{
  id: '2',
  name: 'Marie Dubois',
  role: 'Ingénieur civil',
  availability: 160,
  currentLoad: 155,
  hourlyRate: 75
},
{
  id: '3',
  name: 'Pierre Gagnon',
  role: 'Contremaître',
  availability: 160,
  currentLoad: 120,
  hourlyRate: 65
},
{
  id: '4',
  name: 'Sophie Martin',
  role: 'Estimateur',
  availability: 160,
  currentLoad: 140,
  hourlyRate: 70
},
{
  id: '5',
  name: 'Luc Bergeron',
  role: 'Chef de projet',
  availability: 160,
  currentLoad: 160,
  hourlyRate: 85
},
{
  id: '6',
  name: 'Julie Lavoie',
  role: 'Ingénieur structure',
  availability: 160,
  currentLoad: 130,
  hourlyRate: 75
},
{
  id: '7',
  name: 'Marc Bouchard',
  role: 'Contremaître',
  availability: 160,
  currentLoad: 110,
  hourlyRate: 65
},
{
  id: '8',
  name: 'Annie Roy',
  role: 'Coordinateur',
  availability: 160,
  currentLoad: 150,
  hourlyRate: 60
}];

export function Ressources() {
  const [selectedMonth, setSelectedMonth] = useState('2025-01');
  const [filterRole, setFilterRole] = useState<string>('all');
  const roles = ['all', ...new Set(mockEmployees.map((e) => e.role))];
  const filteredEmployees = useMemo(() => {
    if (filterRole === 'all') return mockEmployees;
    return mockEmployees.filter((e) => e.role === filterRole);
  }, [filterRole]);
  const stats = useMemo(() => {
    const totalCapacity = mockEmployees.reduce(
      (sum, e) => sum + e.availability,
      0
    );
    const totalLoad = mockEmployees.reduce((sum, e) => sum + e.currentLoad, 0);
    const overloaded = mockEmployees.filter(
      (e) => e.currentLoad > e.availability
    ).length;
    const underutilized = mockEmployees.filter(
      (e) => e.currentLoad < e.availability * 0.7
    ).length;
    return {
      totalCapacity,
      totalLoad,
      utilizationRate:
      totalCapacity > 0 ? totalLoad / totalCapacity * 100 : 0,
      overloaded,
      underutilized,
      available: mockEmployees.length - overloaded
    };
  }, []);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const getLoadColor = (employee: Employee) => {
    const percentage = employee.currentLoad / employee.availability * 100;
    if (percentage > 100) return 'text-red-600';
    if (percentage > 90) return 'text-orange-600';
    if (percentage > 70) return 'text-green-600';
    return 'text-blue-600';
  };
  const getLoadBgColor = (employee: Employee) => {
    const percentage = employee.currentLoad / employee.availability * 100;
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 90) return 'bg-orange-500';
    if (percentage > 70) return 'bg-green-500';
    return 'bg-blue-500';
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Planification des Ressources
          </h1>
          <p className="text-gray-600">
            Gestion de la charge de travail et allocation des ressources
            humaines
          </p>
        </div>

        {/* Note de production */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">
                Note de développement
              </p>
              <p className="text-sm text-yellow-800 mt-1">
                Les données de ressources humaines seront intégrées depuis le
                module <strong>"ma-place-rh"</strong> en production. Les données
                actuelles sont des exemples pour la démonstration.
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ressources disponibles</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.available}
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
                <p className="text-sm text-gray-600">Taux d'utilisation</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.utilizationRate.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Surcharge détectée</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.overloaded}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Capacité totale</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalCapacity.toLocaleString()} h
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

              <option value="2025-01">Janvier 2025</option>
              <option value="2025-02">Février 2025</option>
              <option value="2025-03">Mars 2025</option>
              <option value="2025-04">Avril 2025</option>
              <option value="2025-05">Mai 2025</option>
              <option value="2025-06">Juin 2025</option>
            </select>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

              {roles.map((role) =>
              <option key={role} value={role}>
                  {role === 'all' ? 'Tous les rôles' : role}
                </option>
              )}
            </select>
          </div>
        </div>

        {/* Tableau de charge mensuel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Charge de travail par ressource
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                    Nom
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                    Rôle
                  </th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                    Capacité
                  </th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                    Charge actuelle
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                    Utilisation
                  </th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                    Taux horaire
                  </th>
                  <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => {
                  const utilizationPercentage =
                  employee.currentLoad / employee.availability * 100;
                  const isOverloaded =
                  employee.currentLoad > employee.availability;
                  return (
                    <tr
                      key={employee.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                            {employee.name.
                            split(' ').
                            map((n) => n[0]).
                            join('')}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {employee.role}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 text-right font-medium">
                        {employee.availability} h
                      </td>
                      <td className="py-4 px-6 text-sm text-right">
                        <span
                          className={`font-semibold ${getLoadColor(employee)}`}>

                          {employee.currentLoad} h
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`${getLoadBgColor(employee)} h-2 rounded-full transition-all`}
                              style={{
                                width: `${Math.min(utilizationPercentage, 100)}%`
                              }} />

                          </div>
                          <span
                            className={`text-sm font-medium ${getLoadColor(employee)}`}>

                            {utilizationPercentage.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 text-right font-medium">
                        {formatCurrency(employee.hourlyRate)}/h
                      </td>
                      <td className="py-4 px-6 text-center">
                        {isOverloaded ?
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            <AlertTriangle className="w-3 h-3" />
                            Surcharge
                          </span> :
                        utilizationPercentage > 90 ?
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                            Élevé
                          </span> :

                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            <UserCheck className="w-3 h-3" />
                            Disponible
                          </span>
                        }
                      </td>
                    </tr>);

                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informations d'intégration */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Intégration avec ma-place-rh
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              • Les données seront synchronisées en temps réel depuis le module
              ma-place-rh
            </p>
            <p>
              • Les disponibilités incluront automatiquement les congés et
              absences
            </p>
            <p>
              • Les taux horaires et coûts seront mis à jour automatiquement
            </p>
            <p>
              • L'historique de performance sera accessible pour chaque
              ressource
            </p>
          </div>
        </div>
      </div>
    </div>);

}