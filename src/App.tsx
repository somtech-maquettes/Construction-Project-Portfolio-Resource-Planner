import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation } from
'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import { Projections } from './pages/Projections';
import { Dashboard } from './pages/Dashboard';
import {
  LayoutDashboard,
  FolderKanban,
  TrendingUp,
  Settings } from
'lucide-react';
function Navigation() {
  const location = useLocation();
  const navItems = [
  {
    path: '/',
    label: 'Portfolio',
    icon: FolderKanban
  },
  {
    path: '/projections',
    label: 'Projections',
    icon: TrendingUp
  },
  {
    path: '/dashboard',
    label: 'Tableau de bord',
    icon: LayoutDashboard
  }];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-sm"></div>
              <span className="text-xl font-bold text-gray-900">
                Gauthier Lens
              </span>
            </div>
            <div className="flex gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>

                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>);

              })}
            </div>
          </div>
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>);

}
export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projections" element={<Projections />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>);

}