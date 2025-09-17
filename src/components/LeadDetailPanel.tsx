import React, { useState, useEffect } from 'react';
import { Lead, Opportunity } from '../types';

interface LeadDetailPanelProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, updates: Partial<Lead>) => void;
  onConvert: (lead: Lead, amount?: number) => void;
}

export const LeadDetailPanel = ({ 
  lead, 
  isOpen, 
  onClose, 
  onSave, 
  onConvert 
}: LeadDetailPanelProps) => {
  const [editedLead, setEditedLead] = useState<Lead | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState<number | undefined>();
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (lead) {
      setEditedLead({ ...lead });
      setIsEditing(false);
      setEmailError(null);
    }
  }, [lead]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email: string) => {
    setEditedLead(prev => prev ? { ...prev, email } : null);
    if (email && !validateEmail(email)) {
      setEmailError('Formato de email inválido');
    } else {
      setEmailError(null);
    }
  };

  const handleSave = () => {
    if (!editedLead || emailError) return;

    onSave(editedLead.id, {
      email: editedLead.email,
      status: editedLead.status
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedLead(lead ? { ...lead } : null);
    setIsEditing(false);
    setEmailError(null);
  };

  const handleConvert = () => {
    if (!lead) return;
    onConvert(lead, amount);
    onClose();
  };

  const getStatusOptions = () => {
    return [
      { value: 'new', label: 'Novo' },
      { value: 'contacted', label: 'Contatado' },
      { value: 'qualified', label: 'Qualificado' },
      { value: 'converted', label: 'Convertido' }
    ];
  };

  if (!isOpen || !lead || !editedLead) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Detalhes do Lead</h2>
            <button
              onClick={onClose}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome
              </label>
              <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">{lead.name}</div>
            </div>

            {/* Empresa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Empresa
              </label>
              <div className="text-sm text-gray-900 dark:text-gray-100">{lead.company}</div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="email"
                    value={editedLead.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full px-3 py-2 border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      emailError ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{emailError}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-900 dark:text-gray-100">{lead.email}</div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              {isEditing ? (
                <select
                  value={editedLead.status}
                  onChange={(e) => setEditedLead(prev => prev ? { 
                    ...prev, 
                    status: e.target.value as any 
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {getStatusOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center justify-between">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                    lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {getStatusOptions().find(opt => opt.value === lead.status)?.label}
                  </span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>

            {/* Fonte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fonte
              </label>
              <div className="text-sm text-gray-900 dark:text-gray-100">{lead.source}</div>
            </div>

            {/* Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Score
              </label>
              <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">{lead.score}</div>
            </div>

            {/* Conversão para Oportunidade */}
            {lead.status !== 'converted' && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Converter para Oportunidade
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Valor (opcional)
                    </label>
                    <input
                      type="number"
                      value={amount || ''}
                      onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Digite o valor..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <button
                    onClick={handleConvert}
                    className="w-full bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Converter Lead
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {isEditing && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={!!emailError}
                  className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
