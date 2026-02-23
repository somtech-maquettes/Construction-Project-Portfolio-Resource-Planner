import { Project } from '../types/project';
export const mockProjects: Project[] = [
{
  id: '1',
  number: 'P-2025-001',
  name: 'Centre Commercial Laval',
  state: 'Exécution',
  contractAmount: 2500000,
  estimatedProfit: 375000,
  profitPercentage: 15,
  executionPotential: 85,
  estimatedMOD: 3200,
  year: 2025,
  monthlyProjections: {
    '2025-01': 150000,
    '2025-02': 200000,
    '2025-03': 250000,
    '2025-04': 300000,
    '2025-05': 350000,
    '2025-06': 400000
  }
},
{
  id: '2',
  number: 'P-2025-002',
  name: 'Résidentiel Plateau Mont-Royal',
  state: 'Pré-construction',
  contractAmount: 1800000,
  estimatedProfit: 216000,
  profitPercentage: 12,
  executionPotential: 70,
  estimatedMOD: 2400,
  year: 2025,
  monthlyProjections: {
    '2025-03': 100000,
    '2025-04': 150000,
    '2025-05': 200000,
    '2025-06': 250000
  }
},
{
  id: '3',
  number: 'P-2025-003',
  name: 'Bureaux Downtown',
  state: 'Exécution',
  contractAmount: 4200000,
  estimatedProfit: 588000,
  profitPercentage: 14,
  executionPotential: 90,
  estimatedMOD: 5600,
  year: 2025,
  monthlyProjections: {
    '2025-01': 300000,
    '2025-02': 350000,
    '2025-03': 400000,
    '2025-04': 450000,
    '2025-05': 500000
  }
},
{
  id: '4',
  number: 'P-2024-015',
  name: 'Entrepôt Logistique Sud',
  state: 'Exécution terminé',
  contractAmount: 3100000,
  estimatedProfit: 310000,
  profitPercentage: 10,
  executionPotential: 100,
  estimatedMOD: 4200,
  year: 2024,
  monthlyProjections: {}
},
{
  id: '5',
  number: 'P-2025-004',
  name: 'Rénovation Hôpital',
  state: 'Développement',
  contractAmount: 5500000,
  estimatedProfit: 935000,
  profitPercentage: 17,
  executionPotential: 50,
  estimatedMOD: 7200,
  year: 2025,
  monthlyProjections: {
    '2025-06': 200000,
    '2025-07': 300000,
    '2025-08': 400000
  }
},
{
  id: '6',
  number: 'P-2025-005',
  name: 'Complexe Industriel',
  state: 'Exécution',
  contractAmount: 3800000,
  estimatedProfit: 456000,
  profitPercentage: 12,
  executionPotential: 75,
  estimatedMOD: 4800,
  year: 2025,
  monthlyProjections: {
    '2025-02': 250000,
    '2025-03': 300000,
    '2025-04': 350000,
    '2025-05': 400000
  }
}];