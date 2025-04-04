import React, { useState } from 'react';
import { Incident, SeverityFilter, SortOrder } from './types';
import { mockIncidents } from './mockData';
import { format } from 'date-fns';
import './App.css';

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [expandedIncidentId, setExpandedIncidentId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newIncident, setNewIncident] = useState<{
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
  }>({
    title: '',
    description: '',
    severity: 'Low'
  });

  const filteredIncidents = incidents
    .filter(incident => severityFilter === 'All' || incident.severity === severityFilter)
    .sort((a, b) => {
      const dateA = new Date(a.reported_at);
      const dateB = new Date(b.reported_at);
      return sortOrder === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.title || !newIncident.description) return;

    const incident: Incident = {
      id: incidents.length + 1,
      ...newIncident,
      reported_at: new Date().toISOString()
    };

    setIncidents([...incidents, incident]);
    setNewIncident({ title: '', description: '', severity: 'Low' });
    setShowForm(false);
  };

  return (
    <div className="app">
      <header>
        <h1>AI Safety Incident Dashboard</h1>
      </header>

      <div className="controls">
        <div className="filter-controls">
          <label>Filter by Severity:</label>
          <select 
            value={severityFilter} 
            onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="sort-controls">
          <label>Sort by Date:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <button className="report-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Report New Incident'}
        </button>
      </div>

      {showForm && (
        <form className="incident-form" onSubmit={handleSubmit}>
          <h2>Report New Incident</h2>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={newIncident.title}
              onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={newIncident.description}
              onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Severity:</label>
            <select
              value={newIncident.severity}
              onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value as 'Low' | 'Medium' | 'High' })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      <div className="incidents-list">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="incident-card">
            <div className="incident-header">
              <h3>{incident.title}</h3>
              <div className="incident-meta">
                <span className={`severity-badge ${incident.severity.toLowerCase()}`}>
                  {incident.severity}
                </span>
                <span className="date">
                  {format(new Date(incident.reported_at), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
            <button
              className="view-details"
              onClick={() => setExpandedIncidentId(
                expandedIncidentId === incident.id ? null : incident.id
              )}
            >
              {expandedIncidentId === incident.id ? 'Hide Details' : 'View Details'}
            </button>
            {expandedIncidentId === incident.id && (
              <div className="incident-description">
                {incident.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App; 