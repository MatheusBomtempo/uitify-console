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
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
    // Backup previous state
    const previousLeads = leads;
    
    // Optimistic update
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    );
    setLeads(updatedLeads);

    try {
      // Simulate API call with possible failure
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate occasional failure (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Simulated API error');
      }
      
      setSuccessMessage('Lead updated successfully!');
      
    } catch (err) {
      // Rollback on error
      setLeads(previousLeads);
      setError('Failed to save changes. Please try again.');
      
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteLead = async (id: number) => {
    // Backup previous state
    const previousLeads = leads;
    
    // Optimistic delete
    const updatedLeads = leads.filter(lead => lead.id !== id);
    setLeads(updatedLeads);

    try {
      // Simulate API call with possible failure
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate occasional failure (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Simulated API error');
      }
      
      setSuccessMessage('Lead deleted successfully!');
      
    } catch (err) {
      // Rollback on error
      setLeads(previousLeads);
      setError('Failed to delete lead. Please try again.');
      
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteOpportunity = async (id: number) => {
    // Backup previous state
    const previousOpportunities = opportunities;
    
    // Optimistic delete
    const updatedOpportunities = opportunities.filter(opp => opp.id !== id);
    setOpportunities(updatedOpportunities);

    try {
      // Simulate API call with possible failure
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate occasional failure (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Simulated API error');
      }
      
      setSuccessMessage('Opportunity deleted successfully!');
      
    } catch (err) {
      // Rollback on error
      setOpportunities(previousOpportunities);
      setError('Failed to delete opportunity. Please try again.');
      
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
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

  // Utility functions for testing and development
  const simulateLoading = async () => {
    setLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const simulateError = () => {
    setError('Simulated error for testing - server connection failed');
    setLoading(false);
  };

  const clearData = () => {
    setLeads([]);
    setOpportunities([]);
    setError(null);
    setLoading(false);
  };

  const resetData = async () => {
    setLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLeads(leadsData as Lead[]);
    setLoading(false);
  };

  return {
    leads,
    opportunities,
    loading,
    error,
    successMessage,
    updateLead,
    deleteLead,
    deleteOpportunity,
    convertToOpportunity,
    simulateLoading,
    simulateError,
    clearData,
    resetData
  };
};