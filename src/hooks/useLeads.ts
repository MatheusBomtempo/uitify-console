import { useState, useEffect } from 'react';
import { Lead, Opportunity } from '../types';
import leadsData from '../data/leads.json';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem('uitify-leads');
    const savedOpportunities = localStorage.getItem('uitify-opportunities');
    
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
    if (savedOpportunities) {
      setOpportunities(JSON.parse(savedOpportunities));
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simular latência da API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Só carregar dados iniciais se não houver dados salvos
        const savedLeads = localStorage.getItem('uitify-leads');
        if (!savedLeads) {
          setLeads(leadsData as Lead[]);
          localStorage.setItem('uitify-leads', JSON.stringify(leadsData));
        }
        
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os leads');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Salvar leads no localStorage sempre que houver mudança
  useEffect(() => {
    if (leads.length > 0) {
      localStorage.setItem('uitify-leads', JSON.stringify(leads));
    }
  }, [leads]);

  // Salvar oportunidades no localStorage sempre que houver mudança
  useEffect(() => {
    if (opportunities.length > 0) {
      localStorage.setItem('uitify-opportunities', JSON.stringify(opportunities));
    }
  }, [opportunities]);

  const updateLead = async (id: number, updates: Partial<Lead>) => {
    // Backup do estado anterior
    const previousLeads = leads;
    
    // Atualização otimista
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    );
    setLeads(updatedLeads);

    try {
      // Simular chamada da API com possível falha
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simular falha ocasional (10% de chance)
      if (Math.random() < 0.1) {
        throw new Error('Erro simulado na API');
      }
      
    } catch (err) {
      // Rollback em caso de erro
      setLeads(previousLeads);
      setError('Erro ao salvar alterações. Tente novamente.');
      
      // Limpar erro após 3 segundos
      setTimeout(() => setError(null), 3000);
    }
  };

  const convertToOpportunity = (lead: Lead, amount?: number) => {
    const newOpportunity: Opportunity = {
      id: Date.now(), // ID simples baseado em timestamp
      name: lead.name,
      stage: 'prospecting',
      amount,
      accountName: lead.company
    };

    setOpportunities(prev => [...prev, newOpportunity]);
    
    // Atualizar status do lead para converted
    updateLead(lead.id, { status: 'converted' });
  };

  return {
    leads,
    opportunities,
    loading,
    error,
    updateLead,
    convertToOpportunity
  };
};
