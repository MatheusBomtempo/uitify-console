import React, { useState } from 'react';
import { useLeads } from './hooks/useLeads';
import { useTheme } from './hooks/useTheme';
import { LeadsList } from './components/LeadsList';
import { LeadDetailPanel } from './components/LeadDetailPanel';
import { OpportunitiesList } from './components/OpportunitiesList';
import { ThemeToggle } from './components/ThemeToggle';
import { Lead } from './types';

function App() {
  const { leads, opportunities, loading, error, updateLead, convertToOpportunity } = useLeads();
  const { theme, toggleTheme } = useTheme();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'opportunities'>('leads');

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setSelectedLead(null);
  };

  const handleLeadSave = async (id: number, updates: Partial<Lead>) => {
    await updateLead(id, updates);
  };

  const handleConvertLead = (lead: Lead, amount?: number) => {
    convertToOpportunity(lead, amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/src/assets/logo.webp" 
                alt="Uitify Logo" 
                className="mr-3 brightness-0 dark:invert"
                style={{ height: 'auto', width: 'auto', maxHeight: '32px' }}
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Console
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'leads'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Leads ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'opportunities'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Oportunidades ({opportunities.length})
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Error Notification */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="text-red-800 dark:text-red-200">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'leads' ? (
          <LeadsList
            leads={leads}
            onLeadSelect={handleLeadSelect}
            loading={loading}
            error={null} // Erro agora é exibido globalmente
          />
        ) : (
          <OpportunitiesList opportunities={opportunities} />
        )}
      </main>

      {/* Lead Detail Panel */}
      <LeadDetailPanel
        lead={selectedLead}
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
        onSave={handleLeadSave}
        onConvert={handleConvertLead}
      />
    </div>
  );
}

export default App;
