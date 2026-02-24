import React, { useMemo, useState, createElement } from 'react';
import { X, Save, AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import { Project, ProjectState } from '../types/project';

interface ProjectCreateModalProps {
  onClose: () => void;
  onSave: (newProject: Project) => void;
  existingProjects: Project[];
}

export function ProjectCreateModal({
  onClose,
  onSave,
  existingProjects
}: ProjectCreateModalProps) {
  // Générer automatiquement le prochain numéro de projet
  const generateProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    const projectsThisYear = existingProjects.filter(p => p.number.includes(`P-${currentYear}`));
    const nextNumber = projectsThisYear.length + 1;
    return `P-${currentYear}-${String(nextNumber).padStart(3, '0')}`;
  };

  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const [formData, setFormData] = useState<Project>({
    id: generateId(),
    number: generateProjectNumber(),
    name: '',
    state: 'Développement',
    contractAmount: 0,
    estimatedProfit: 0,
    profitPercentage: 15,
    executionPotential: 50,
    estimatedMOD: 0,
    year: new Date().getFullYear(),
    monthlyProjections: {}
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'financial' | 'projections'>('basic');
  const [monthlyPercentages, setMonthlyPercentages] = useState<Record<string, number>>({});
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(formData.year);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const totalPercentage = useMemo(() => {
    return Object.values(monthlyPercentages).reduce((sum, val) => sum + val, 0);
  }, [monthlyPercentages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert('Le nom du projet est requis');
      return;
    }

    if (formData.contractAmount <= 0) {
      alert('Le montant du contrat doit être supérieur à 0');
      return;
    }

    // Convertir les pourcentages en montants
    const newProjections: Record<string, number> = {};
    Object.entries(monthlyPercentages).forEach(([month, percentage]) => {
      newProjections[month] = Math.round(
        formData.contractAmount * percentage / 100
      );
    });

    const newProject = {
      ...formData,
      monthlyProjections: newProjections,
      estimatedProfit: formData.contractAmount * formData.profitPercentage / 100
    };

    onSave(newProject);
  };

  const handlePercentageChange = (month: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMonthlyPercentages({
      ...monthlyPercentages,
      [month]: numValue
    });
  };

  const removeMonthlyProjection = (month: string) => {
    const newPercentages = { ...monthlyPercentages };
    delete newPercentages[month];
    setMonthlyPercentages(newPercentages);
  };

  const addMonthlyProjection = () => {
    const monthKey = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`;
    if (!monthlyPercentages[monthKey]) {
      setMonthlyPercentages({
        ...monthlyPercentages,
        [monthKey]: 0
      });
    }
    setShowMonthPicker(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPercentageStatus = () => {
    if (totalPercentage === 100) {
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle,
        message: 'Parfait! 100% affecté'
      };
    } else if (totalPercentage > 100) {
      return {
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertTriangle,
        message: 'Sur-affectation'
      };
    } else {
      return {
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: AlertTriangle,
        message: 'Sous-affectation'
      };
    }
  };

  const getMonthName = (monthNum: number) => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[monthNum - 1];
  };

  const states: ProjectState[] = [
    'Développement',
    'Pré-construction',
    'Exécution',
    'Exécution terminé'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Créer un nouveau projet
              </h2>
              <p className="text-sm text-gray-500">Numéro: {formData.number}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'basic'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Informations de base
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('financial')}
                className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'financial'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Informations financières
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('projections')}
                className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'projections'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Projections mensuelles
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Informations de base */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du projet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Centre Commercial Laval"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      État du projet
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          state: e.target.value as ProjectState
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Année
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          year: parseInt(e.target.value)
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="2020"
                      max="2030"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Potentiel d'exécution (%)
                  </label>
                  <input
                    type="number"
                    value={formData.executionPotential}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        executionPotential: parseInt(e.target.value)
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                    max="100"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Probabilité que le projet se concrétise
                  </p>
                </div>
              </div>
            )}

            {/* Informations financières */}
            {activeTab === 'financial' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant du contrat ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.contractAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contractAmount: parseFloat(e.target.value) || 0,
                        estimatedProfit: (parseFloat(e.target.value) || 0) * formData.profitPercentage / 100
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                    step="1000"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(formData.contractAmount)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pourcentage de profit (%)
                    </label>
                    <input
                      type="number"
                      value={formData.profitPercentage}
                      onChange={(e) => {
                        const percentage = parseFloat(e.target.value) || 0;
                        setFormData({
                          ...formData,
                          profitPercentage: percentage,
                          estimatedProfit: formData.contractAmount * percentage / 100
                        });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bénéfice estimé ($)
                    </label>
                    <input
                      type="number"
                      value={formData.estimatedProfit}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formatCurrency(formData.estimatedProfit)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heures estimées (MOD)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedMOD}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedMOD: parseInt(e.target.value) || 0
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.estimatedMOD.toLocaleString('fr-CA')} heures
                  </p>
                </div>
              </div>
            )}

            {/* Projections mensuelles */}
            {activeTab === 'projections' && (
              <div className="space-y-6">
                {/* Indicateur de total */}
                <div
                  className={`${getPercentageStatus().bgColor} border ${
                    getPercentageStatus().borderColor
                  } rounded-lg p-6`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {createElement(getPercentageStatus().icon, {
                        className: `w-6 h-6 ${getPercentageStatus().color}`
                      })}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Total des pourcentages affectés
                        </h3>
                        <p
                          className={`text-sm ${getPercentageStatus().color} font-medium`}
                        >
                          {getPercentageStatus().message}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-4xl font-bold ${getPercentageStatus().color}`}>
                        {totalPercentage.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Montant total: {formatCurrency(formData.contractAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Barre de progression */}
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${
                        totalPercentage === 100
                          ? 'bg-green-500'
                          : totalPercentage > 100
                          ? 'bg-red-500'
                          : 'bg-orange-500'
                      }`}
                      style={{
                        width: `${Math.min(totalPercentage, 100)}%`
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Répartition mensuelle
                  </h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowMonthPicker(!showMonthPicker)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter un mois
                    </button>

                    {showMonthPicker && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowMonthPicker(false)}
                        />
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">
                            Sélectionner un mois
                          </h4>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Année
                              </label>
                              <select
                                value={selectedYear}
                                onChange={(e) =>
                                  setSelectedYear(parseInt(e.target.value))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              >
                                <option value={2024}>2024</option>
                                <option value={2025}>2025</option>
                                <option value={2026}>2026</option>
                                <option value={2027}>2027</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Mois
                              </label>
                              <select
                                value={selectedMonth}
                                onChange={(e) =>
                                  setSelectedMonth(parseInt(e.target.value))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                  (month) => (
                                    <option key={month} value={month}>
                                      {getMonthName(month)}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>

                            <button
                              type="button"
                              onClick={addMonthlyProjection}
                              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              Ajouter
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(monthlyPercentages)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([month, percentage]) => {
                      const [year, monthNum] = month.split('-');
                      const monthName = new Date(
                        parseInt(year),
                        parseInt(monthNum) - 1
                      ).toLocaleDateString('fr-CA', {
                        month: 'long',
                        year: 'numeric'
                      });
                      const estimatedAmount =
                        formData.contractAmount * percentage / 100;
                      return (
                        <div
                          key={month}
                          className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                              {monthName}
                            </label>
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="relative">
                                  <input
                                    type="number"
                                    value={percentage}
                                    onChange={(e) =>
                                      handlePercentageChange(
                                        month,
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                  />
                                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                    %
                                  </span>
                                </div>
                              </div>
                              <div className="w-48 text-right">
                                <p className="text-sm text-gray-600">
                                  Montant estimé
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                  {formatCurrency(estimatedAmount)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMonthlyProjection(month)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      );
                    })}
                </div>

                {Object.keys(monthlyPercentages).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucune projection mensuelle. Cliquez sur "Ajouter un mois" pour commencer.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Save className="w-5 h-5" />
              Créer le projet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}