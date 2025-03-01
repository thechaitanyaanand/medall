// src/pages/DocumentManagementPage.js
import React, { useState } from 'react';
import apiClient from '../apiClient';
import './DocumentManagementPage.css';

export default function DocumentManagementPage() {
  const [documentData, setDocumentData] = useState({
    document_name: '',
    document_type: '',
    document_date: '',
  });
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocumentData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('document_name', documentData.document_name);
    formData.append('document_type', documentData.document_type);
    formData.append('document_date', documentData.document_date);
    formData.append('file', file);

    try {
      const response = await apiClient.post('/documents/add/', formData);
      if (response.status === 201 || response.status === 200) {
        setDocuments(prev => [response.data, ...prev]);
        setDocumentData({ document_name: '', document_type: '', document_date: '' });
        setFile(null);
      }
    } catch (error) {
      console.error('Error uploading document:', error.response?.data || error.message);
      alert('Error uploading document.');
    }
  };

  return (
    <div className="container">
      <h2>My Documents</h2>
      <form onSubmit={handleSubmit} className="document-form">
        <input
          type="text"
          name="document_name"
          placeholder="Document Name"
          value={documentData.document_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="document_type"
          placeholder="Document Type"
          value={documentData.document_type}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="document_date"
          value={documentData.document_date}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add Document</button>
      </form>
      <div className="document-list">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <h3>{doc.document_name}</h3>
            <p>Type: {doc.document_type}</p>
            <p>Date: {doc.document_date}</p>
            <a href={doc.file} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
