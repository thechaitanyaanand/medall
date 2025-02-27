-- Enable UUID generation extension
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-----------------------------------------------
-- 1. Users Table
-----------------------------------------------
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    mobile_number VARCHAR(20) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('doctor', 'patient')) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-----------------------------------------------
-- 2. Profile Table
-----------------------------------------------
CREATE TABLE profiles (
    profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    address TEXT,
    date_of_birth DATE,
    CONSTRAINT fk_profile_user
      FOREIGN KEY(user_id) 
      REFERENCES users(user_id)
      ON DELETE CASCADE
);

-----------------------------------------------
-- 3. OTP & Verification Table
-----------------------------------------------
CREATE TABLE otp_verifications (
    otp_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    otp_code CHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_otp_user
      FOREIGN KEY(user_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
);

-----------------------------------------------
-- 4. Reminders Table
-----------------------------------------------
CREATE TABLE reminders (
    reminder_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    medicine_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    timings VARCHAR(100),
    tablet_count INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reminder_user
      FOREIGN KEY(user_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
);

-----------------------------------------------
-- 5. Appointments Table
-----------------------------------------------
CREATE TABLE appointments (
    appointment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    doctor_contact VARCHAR(20),
    appointment_reason TEXT,
    appointment_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_appointment_user
      FOREIGN KEY(user_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
);

-----------------------------------------------
-- 6. Documents Table
-----------------------------------------------
CREATE TABLE documents (
    document_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    document_name VARCHAR(150) NOT NULL,
    document_type VARCHAR(50),
    document_date DATE,
    file_url TEXT,
    CONSTRAINT fk_document_user
      FOREIGN KEY(user_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
);

-----------------------------------------------
-- 7. Family Table (Join Table for User Relationships)
-----------------------------------------------
CREATE TABLE family (
    user_id UUID NOT NULL,
    family_member_id UUID NOT NULL,
    PRIMARY KEY(user_id, family_member_id),
    CONSTRAINT fk_family_user
      FOREIGN KEY(user_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE,
    CONSTRAINT fk_family_member
      FOREIGN KEY(family_member_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
);

-----------------------------------------------
-- 8. Connections Table (Doctor-Patient Relationships)
-----------------------------------------------
CREATE TABLE connections (
    connection_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL,
    patient_id UUID NOT NULL,
    otp_code CHAR(6),
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_connection_doctor
      FOREIGN KEY(doctor_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE,
    CONSTRAINT fk_connection_patient
      FOREIGN KEY(patient_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
);
