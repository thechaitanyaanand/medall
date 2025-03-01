// src/pages/DocumentManagementPage.js
import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import './DocumentManagementPage.css';

export default function DocumentManagementPage() {
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState({
    document_name: '',
    document_type: '',
    document_date: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await apiClient.get('/documents/');
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoc((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const formData = new FormData();
    formData.append('document_name', newDoc.document_name);
    formData.append('document_type', newDoc.document_type);
    formData.append('document_date', newDoc.document_date);
    formData.append('file', file);

    try {
      const response = await apiClient.post('/documents/add/', formData);
      setDocuments((prev) => [response.data, ...prev]);
      setNewDoc({ document_name: '', document_type: '', document_date: '' });
      setFile(null);
    } catch (error) {
      console.error("Error uploading document:", error.response?.data || error.message);
      setErrorMsg(JSON.stringify(error.response?.data));
      alert("Error uploading document.");
    }
  };

  // Handler for "Delete": sends a DELETE request for the document
  const handleDelete = async (documentId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }
    try {
      await apiClient.delete(`/documents/${documentId}/`);
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
    } catch (error) {
      console.error("Error deleting document:", error.response?.data || error.message);
      alert("Error deleting document.");
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
          value={newDoc.document_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="document_type"
          placeholder="Document Type"
          value={newDoc.document_type}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="document_date"
          placeholder="Document Date"
          value={newDoc.document_date}
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
      {errorMsg && <p className="error">Error: {errorMsg}</p>}
      {loading ? (
        <p>Loading documents...</p>
      ) : (
        <div className="document-list">
          {documents.map((doc) => (
            <div key={doc.id} className="document-card">
              <h3>{doc.document_name}</h3>
              <p>Type: {doc.document_type}</p>
              <p>Date: {doc.document_date}</p>
              <a href={doc.file} target="_blank" rel="noopener noreferrer">
                View Document
              </a>
              <button onClick={() => handleDelete(doc.id)}>Delete Document</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
