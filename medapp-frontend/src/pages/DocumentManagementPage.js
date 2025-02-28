import React, { useState } from 'react';
import './DocumentManagementPage.css';

export default function DocumentManagementPage() {
  const initialDocuments = [
    {
      id: 1,
      name: 'Blood Test Report',
      type: 'Report',
      date: '2023-01-15',
      fileUrl: 'https://example.com/report1.pdf',
    },
  ];

  const [documents, setDocuments] = useState(initialDocuments);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    fileUrl: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoc = { id: Date.now(), ...formData };
    setDocuments([newDoc, ...documents]);
    setFormData({ name: '', type: '', date: '', fileUrl: '' });
  };

  return (
    <div className="container">
      <h2>My Documents</h2>
      <form onSubmit={handleSubmit} className="document-form">
        <input
          type="text"
          name="name"
          placeholder="Document Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Document Type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="fileUrl"
          placeholder="Document URL"
          value={formData.fileUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Document</button>
      </form>
      <div className="document-list">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <h3>{doc.name}</h3>
            <p>Type: {doc.type}</p>
            <p>Date: {doc.date}</p>
            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
