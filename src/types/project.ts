export type ProjectState =
'Développement' |
'Pré-construction' |
'Exécution' |
'Exécution terminé';
export interface Project {
  id: string;
  number: string;
  name: string;
  state: ProjectState;
  contractAmount: number;
  estimatedProfit: number;
  profitPercentage: number;
  executionPotential: number;
  estimatedMOD: number;
  year: number;
  monthlyProjections: {
    [key: string]: number; // Format: "2025-01": 50000
  };
}
export interface PortfolioStats {
  totalContractValue: number;
  totalEstimatedProfit: number;
  projectsByState: Record<ProjectState, number>;
  totalMOD: number;
}