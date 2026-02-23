import { Project } from '../types/project';

export function exportToCSV(
projects: Project[],
filename: string = 'projets.csv')
{
  const headers = [
  'Numéro',
  'Nom',
  'État',
  'Montant du contrat',
  'Bénéfice estimé',
  'Pourcentage de profit',
  "Potentiel d'exécution",
  'MOD estimé',
  'Année'];


  const rows = projects.map((project) => [
  project.number,
  project.name,
  project.state,
  project.contractAmount,
  project.estimatedProfit,
  project.profitPercentage,
  project.executionPotential,
  project.estimatedMOD,
  project.year]
  );

  const csvContent = [
  headers.join(','),
  ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].
  join('\n');

  const blob = new Blob(['\ufeff' + csvContent], {
    type: 'text/csv;charset=utf-8;'
  });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}