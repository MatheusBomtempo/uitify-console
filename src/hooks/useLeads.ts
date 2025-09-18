import { useState, useEffect } from 'react';
import { Lead, Opportunity } from '../types';
import leadsData from '../data/leads.json';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load data from localStorage
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
        
        // Only load initial data if no saved data exists
        const savedLeads = localStorage.getItem('uitify-leads');
        if (!savedLeads) {
          setLeads(leadsData as Lead[]);
          localStorage.setItem('uitify-leads', JSON.stringify(leadsData));
        }
        
        setError(null);
      } catch (err) {
        setError('Error loading leads');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save leads to localStorage whenever there's a change
  useEffect(() => {
    if (leads.length > 0) {
      localStorage.setItem('uitify-leads', JSON.stringify(leads));
    }
  }, [leads]);

  // Save opportunities to localStorage whenever there's a change
  useEffect(() => {
    if (opportunities.length >= 0) {
      localStorage.setItem('uitify-opportunities', JSON.stringify(opportunities));
    }
  }, [opportunities]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const updateLead = async (id: number, updates: Partial<Lead>) => {
    // Update leads
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    );
    setLeads(updatedLeads);
    setSuccessMessage('Lead updated successfully!');
  };

  const addLead = async (leadData: Omit<Lead, 'id'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now() // Simple timestamp-based ID
    };

    // Add lead
    setLeads(prev => [...prev, newLead]);
    setSuccessMessage('Lead added successfully!');
  };

  const deleteLead = async (id: number) => {
    // Delete lead
    const updatedLeads = leads.filter(lead => lead.id !== id);
    setLeads(updatedLeads);
    setSuccessMessage('Lead deleted successfully!');
  };

  const deleteOpportunity = async (id: number) => {
    // Delete opportunity
    const updatedOpportunities = opportunities.filter(opp => opp.id !== id);
    setOpportunities(updatedOpportunities);
    setSuccessMessage('Opportunity deleted successfully!');
  };

  const convertToOpportunity = (lead: Lead, amount?: number) => {
    const newOpportunity: Opportunity = {
      id: Date.now(), // Simple timestamp-based ID
      name: lead.name,
      stage: 'prospecting',
      amount,
      accountName: lead.company
    };

    setOpportunities(prev => [...prev, newOpportunity]);
    
    // Update lead status to converted
    updateLead(lead.id, { status: 'converted' });
    
    setSuccessMessage('Lead converted to opportunity successfully!');
  };

  const resetData = async () => {
    setLoading(true);
    setLeads(leadsData as Lead[]);
    setOpportunities([]);
    setLoading(false);
  };

  return {
    leads,
    opportunities,
    loading,
    error,
    successMessage,
    updateLead,
    addLead,
    deleteLead,
    deleteOpportunity,
    convertToOpportunity,
    resetData
  };
};