import React, { useState } from 'react';
import './FamilyPage.css';

export default function FamilyPage() {
  const initialFamily = [
    { id: 1, name: 'John Doe', mobile: '+1234567890' },
    { id: 2, name: 'Jane Doe', mobile: '+1987654321' },
  ];
  
  const [familyMembers, setFamilyMembers] = useState(initialFamily);
  const [newMemberMobile, setNewMemberMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handleAddFamilyMember = (e) => {
    e.preventDefault();
    // Simulate sending OTP to the new family member's mobile
    console.log('Sending OTP to', newMemberMobile);
    setShowOTPInput(true);
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    // Simulate OTP verification – here we'll assume OTP is always '123456'
    if (otp === '123456') {
      const newMember = { id: Date.now(), name: `Member ${familyMembers.length + 1}`, mobile: newMemberMobile };
      setFamilyMembers([...familyMembers, newMember]);
      setNewMemberMobile('');
      setOtp('');
      setShowOTPInput(false);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Family Members</h2>
      <div className="family-list">
        {familyMembers.map((member) => (
          <div key={member.id} className="family-card">
            <h3>{member.name}</h3>
            <p>{member.mobile}</p>
          </div>
        ))}
      </div>
      <h3>Add Family Member</h3>
      <form onSubmit={handleAddFamilyMember} className="family-form">
        <input
          type="text"
          placeholder="Family Member Mobile Number"
          value={newMemberMobile}
          onChange={(e) => setNewMemberMobile(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      {showOTPInput && (
        <form onSubmit={verifyOTP} className="otp-form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
}
