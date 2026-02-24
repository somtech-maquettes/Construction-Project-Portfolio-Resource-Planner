import React, { useMemo, useState, Component } from 'react';
import { Plus } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { PortfolioStatsComponent } from '../components/PortfolioStats';
import { PortfolioFilters } from '../components/PortfolioFilters';
import { StateDistributionChart } from '../components/StateDistributionChart';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { ProjectEditModal } from '../components/ProjectEditModal';
import { ProjectCreateModal } from '../components/ProjectCreateModal';
import { ExportButton } from '../components/ExportButton';
import { ViewToggle } from '../components/ViewToggle';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { useProjects } from '../contexts/ProjectContext';
import { Project, ProjectState, PortfolioStats } from '../types/project';
export function Portfolio() {
  const { projects, addProject, updateProject } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<ProjectState | 'all'>(
    'all'
  );
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState('name');
  const [profitRange, setProfitRange] = useState<[number, number]>([0, 30]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [creatingProject, setCreatingProject] = useState(false);
  const { toasts, showToast, removeToast } = useToast();
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.number.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState =
      selectedState === 'all' || project.state === selectedState;
      const matchesYear =
      selectedYear === 'all' || project.year === selectedYear;
      const matchesProfit =
      project.profitPercentage >= profitRange[0] &&
      project.profitPercentage <= profitRange[1];
      return matchesSearch && matchesState && matchesYear && matchesProfit;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'amount':
          return b.contractAmount - a.contractAmount;
        case 'profit':
          return b.profitPercentage - a.profitPercentage;
        case 'state':
          return a.state.localeCompare(b.state);
        default:
          return 0;
      }
    });
    return filtered;
  }, [searchTerm, selectedState, selectedYear, sortBy, profitRange]);
  const stats: PortfolioStats = useMemo(() => {
    return projects.reduce(
      (acc, project) => {
        acc.totalContractValue += project.contractAmount;
        acc.totalEstimatedProfit += project.estimatedProfit;
        acc.projectsByState[project.state] =
        (acc.projectsByState[project.state] || 0) + 1;
        acc.totalMOD += project.estimatedMOD;
        return acc;
      },
      {
        totalContractValue: 0,
        totalEstimatedProfit: 0,
        projectsByState: {} as Record<ProjectState, number>,
        totalMOD: 0
      }
    );
  }, []);
  const handleSaveProject = (updatedProject: Project) => {
    updateProject(updatedProject);
    showToast('Projet mis à jour avec succès', 'success');
    setEditingProject(null);
    setSelectedProject(null);
  };

  const handleCreateProject = (newProject: Project) => {
    addProject(newProject);
    showToast('Projet créé avec succès', 'success');
    setCreatingProject(false);
  };
  const handleEditClick = () => {
    if (selectedProject) {
      setEditingProject(selectedProject);
      setSelectedProject(null);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Portfolio de Projets
            </h1>
            <p className="text-gray-600">
              Vue d'ensemble de tous vos projets de construction
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ExportButton
              projects={filteredProjects}
              onExport={(message) => showToast(message, 'success')} />

            <button
              onClick={() => setCreatingProject(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">

              <Plus className="w-5 h-5" />
              <span>Nouveau projet</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PortfolioStatsComponent stats={stats} />
          </div>
          <div>
            <StateDistributionChart distribution={stats.projectsByState} />
          </div>
        </div>

        <PortfolioFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedState={selectedState}
          onStateChange={setSelectedState}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          sortBy={sortBy}
          onSortChange={setSortBy}
          profitRange={profitRange}
          onProfitRangeChange={setProfitRange} />


        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {filteredProjects.length} projet
            {filteredProjects.length !== 1 ? 's' : ''} trouvé
            {filteredProjects.length !== 1 ? 's' : ''}
          </div>
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        <div
          className={
          view === 'grid' ?
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :
          'space-y-3'
          }>

          {filteredProjects.map((project) =>
          <ProjectCard
            key={project.id}
            project={project}
            view={view}
            onClick={() => setSelectedProject(project)} />

          )}
        </div>

        {filteredProjects.length === 0 &&
        <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun projet trouvé avec les filtres sélectionnés
            </p>
          </div>
        }
      </div>

      {selectedProject &&
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEdit={handleEditClick} />

      }

      {editingProject &&
      <ProjectEditModal
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onSave={handleSaveProject} />

      }

      {creatingProject &&
      <ProjectCreateModal
        onClose={() => setCreatingProject(false)}
        onSave={handleCreateProject}
        existingProjects={projects} />

      }
    </div>);

}