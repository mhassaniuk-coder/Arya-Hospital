import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Patient, Appointment, Invoice, UrgencyLevel, InventoryItem, Ambulance, Doctor, Task, Bed, Notice, LabTestRequest, RadiologyRequest, Referral, MedicalCertificate, ResearchTrial, MaternityPatient, QueueItem, BloodUnit, BloodBag, BloodDonor, BloodRequest } from '../../types';

interface DataContextType {
  patients: Patient[];
  appointments: Appointment[];
  invoices: Invoice[];
  inventory: InventoryItem[];
  ambulances: Ambulance[];
  staff: Doctor[];
  tasks: Task[];
  beds: Bed[];
  notices: Notice[];
  labRequests: LabTestRequest[];
  radiologyRequests: RadiologyRequest[];
  referrals: Referral[];
  medicalCertificates: MedicalCertificate[];
  researchTrials: ResearchTrial[];
  maternityPatients: MaternityPatient[];
  opdQueue: QueueItem[];
  bloodUnits: BloodUnit[];
  bloodBags: BloodBag[];
  bloodDonors: BloodDonor[];
  bloodRequests: BloodRequest[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  archivePatient: (id: string) => void;
  restorePatient: (id: string) => void;
  addAppointment: (appointment: Appointment) => void;
  addInvoice: (invoice: Invoice) => void;
  addInventoryItem: (item: InventoryItem) => void;
  addAmbulance: (ambulance: Ambulance) => void;
  addStaff: (doctor: Doctor) => void;
  addTask: (task: Task) => void;
  updateTaskStatus: (id: string, status: 'Todo' | 'In Progress' | 'Done') => void;
  addNotice: (notice: Notice) => void;
  updateBedStatus: (id: string, status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance') => void;
  addLabRequest: (request: LabTestRequest) => void;
  addRadiologyRequest: (request: RadiologyRequest) => void;
  addReferral: (referral: Referral) => void;
  addMedicalCertificate: (cert: MedicalCertificate) => void;
  addResearchTrial: (trial: ResearchTrial) => void;
  addMaternityPatient: (patient: MaternityPatient) => void;
  addToQueue: (item: QueueItem) => void;
  updateQueueItem: (id: string, updates: Partial<QueueItem>) => void;
  // Blood Bank CRUD
  addBloodUnit: (unit: BloodUnit) => void;
  updateBloodUnit: (id: string, updates: Partial<BloodUnit>) => void;
  addBloodBag: (bag: BloodBag) => void;
  updateBloodBag: (id: string, updates: Partial<BloodBag>) => void;
  deleteBloodBag: (id: string) => void;
  addBloodDonor: (donor: BloodDonor) => void;
  updateBloodDonor: (id: string, updates: Partial<BloodDonor>) => void;
  deleteBloodDonor: (id: string) => void;
  addBloodRequest: (request: BloodRequest) => void;
  updateBloodRequest: (id: string, updates: Partial<BloodRequest>) => void;
  getStats: () => {
    totalPatients: number;
    totalAppointments: number;
    totalRevenue: number;
    pendingRevenue: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// MOCK DATA MOVED HERE
const INITIAL_PATIENTS: Patient[] = [
  { id: 'P-101', name: 'Sarah Johnson', age: 34, gender: 'Female', admissionDate: '2023-10-24', condition: 'Migraine', roomNumber: '304-A', urgency: UrgencyLevel.MEDIUM, history: 'Chronic migraines since 2018.' },
  { id: 'P-102', name: 'Michael Chen', age: 58, gender: 'Male', admissionDate: '2023-10-22', condition: 'Cardiac Arrest', roomNumber: 'ICU-02', urgency: UrgencyLevel.CRITICAL, history: 'Hypertension, High Cholesterol.' },
  { id: 'P-103', name: 'Emily Davis', age: 24, gender: 'Female', admissionDate: '2023-10-25', condition: 'Fractured Tibia', roomNumber: '201-B', urgency: UrgencyLevel.LOW, history: 'No major history.' },
  { id: 'P-104', name: 'James Wilson', age: 45, gender: 'Male', admissionDate: '2023-10-23', condition: 'Pneumonia', roomNumber: '305-C', urgency: UrgencyLevel.HIGH, history: 'Smoker for 20 years.' },
  { id: 'P-105', name: 'Anita Patel', age: 62, gender: 'Female', admissionDate: '2023-10-21', condition: 'Diabetes T2', roomNumber: '104-A', urgency: UrgencyLevel.MEDIUM, history: 'Insulin dependent.' },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: '1', patientName: 'Sarah Johnson', doctorName: 'Dr. Chen', time: '09:00 AM', date: 'Today', type: 'General Checkup', status: 'Confirmed', isOnline: false },
  { id: '2', patientName: 'Mike Ross', doctorName: 'Dr. Smith', time: '10:30 AM', date: 'Today', type: 'Tele-Consult', status: 'Pending', isOnline: true },
  { id: '3', patientName: 'Emma Watson', doctorName: 'Dr. Chen', time: '02:00 PM', date: 'Today', type: 'Follow-up', status: 'Confirmed', isOnline: false },
  { id: '4', patientName: 'John Doe', doctorName: 'Dr. House', time: '04:15 PM', date: 'Tomorrow', type: 'Neurology', status: 'Cancelled', isOnline: false },
];

const INITIAL_INVOICES: Invoice[] = [
    { id: 'INV-001', patientName: 'Sarah Johnson', date: '2023-10-25', amount: 450.00, status: 'Paid', items: ['Consultation', 'Blood Test'] },
    { id: 'INV-002', patientName: 'Michael Chen', date: '2023-10-24', amount: 1250.00, status: 'Pending', items: ['MRI Scan', 'Consultation'] },
    { id: 'INV-003', patientName: 'Emily Davis', date: '2023-10-20', amount: 120.00, status: 'Overdue', items: ['Follow-up'] },
];

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'MED-001', name: 'Paracetamol', category: 'Medicine', stock: 500, unit: 'Tablets', lastUpdated: '2023-10-25', status: 'In Stock' },
  { id: 'MED-002', name: 'Insulin', category: 'Medicine', stock: 20, unit: 'Vials', lastUpdated: '2023-10-24', status: 'Low Stock' },
  { id: 'SUP-001', name: 'Surgical Masks', category: 'Supply', stock: 1000, unit: 'Pieces', lastUpdated: '2023-10-20', status: 'In Stock' },
  { id: 'SUP-002', name: 'Gloves (L)', category: 'Supply', stock: 0, unit: 'Boxes', lastUpdated: '2023-10-22', status: 'Out of Stock' },
];

const INITIAL_AMBULANCES: Ambulance[] = [
  { id: '1', vehicleNumber: 'AMB-101', driverName: 'John Doe', status: 'Available', location: 'Hospital Base', type: 'ALS' },
  { id: '2', vehicleNumber: 'AMB-102', driverName: 'Mike Smith', status: 'On Route', location: 'Downtown', type: 'BLS' },
  { id: '3', vehicleNumber: 'AMB-103', driverName: 'Sarah Connor', status: 'Maintenance', location: 'Workshop', type: 'ALS' },
  { id: '4', vehicleNumber: 'AMB-104', driverName: 'David Lee', status: 'Available', location: 'Station 2', type: 'BLS' },
];

const INITIAL_STAFF: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Chen', specialty: 'Cardiology', status: 'Online', patients: 12, image: 'https://picsum.photos/seed/doc1/200' },
  { id: '2', name: 'Dr. Michael Ross', specialty: 'Neurology', status: 'In Surgery', patients: 8, image: 'https://picsum.photos/seed/doc2/200' },
  { id: '3', name: 'Dr. James Wilson', specialty: 'Oncology', status: 'Offline', patients: 0, image: 'https://picsum.photos/seed/doc3/200' },
  { id: '4', name: 'Dr. Emily House', specialty: 'General Surgery', status: 'On Break', patients: 5, image: 'https://picsum.photos/seed/doc4/200' },
  { id: '5', name: 'Dr. Lisa Cuddy', specialty: 'Administration', status: 'Online', patients: 2, image: 'https://picsum.photos/seed/doc5/200' },
  { id: '6', name: 'Dr. Eric Foreman', specialty: 'Neurology', status: 'Online', patients: 15, image: 'https://picsum.photos/seed/doc6/200' },
];

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Review MRI Results for Bed 3', assignee: 'Dr. Chen', priority: 'High', status: 'Todo' },
  { id: '2', title: 'Restock Insulin', assignee: 'Pharmacy', priority: 'Medium', status: 'Todo' },
  { id: '3', title: 'Prepare Discharge Summary P-101', assignee: 'Nurse Joy', priority: 'Low', status: 'In Progress' },
  { id: '4', title: 'Sanitize OT-2', assignee: 'Staff A', priority: 'High', status: 'Done' },
];

const INITIAL_BEDS: Bed[] = Array.from({ length: 12 }, (_, i) => ({
  id: `B-${i + 1}`,
  ward: i < 4 ? 'ICU' : 'General Ward A',
  number: `${i < 4 ? 'ICU' : 'G'}-${i + 1}`,
  status: i === 1 || i === 5 || i === 8 ? 'Occupied' : i === 2 ? 'Cleaning' : 'Available',
  patientName: i === 1 ? 'John Doe' : i === 5 ? 'Jane Smith' : i === 8 ? 'Bob Jones' : undefined,
  type: i < 4 ? 'ICU' : 'General'
})) as Bed[];

const INITIAL_NOTICES: Notice[] = [
    { id: '1', title: 'System Maintenance', content: 'The server will be down for maintenance on Sunday 2 AM to 4 AM.', date: 'Oct 26', priority: 'Urgent' },
    { id: '2', title: 'New COVID Protocols', content: 'Please review the updated safety guidelines for the ICU.', date: 'Oct 25', priority: 'Normal' },
    { id: '3', title: 'Staff Meeting', content: 'General staff meeting on Friday at 3 PM in the Conference Hall.', date: 'Oct 24', priority: 'Normal' },
];

const INITIAL_LABS: LabTestRequest[] = [
    { id: 'LAB-001', patientName: 'Sarah Johnson', testName: 'Complete Blood Count (CBC)', priority: 'Routine', status: 'Completed', date: '2023-10-26' },
    { id: 'LAB-002', patientName: 'Michael Chen', testName: 'Liver Function Test', priority: 'Urgent', status: 'Processing', date: '2023-10-26' },
    { id: 'LAB-003', patientName: 'John Doe', testName: 'Lipid Profile', priority: 'Routine', status: 'Sample Collected', date: '2023-10-25' },
];

const INITIAL_RADS: RadiologyRequest[] = [
    { id: 'RAD-001', patientName: 'Anita Patel', modality: 'MRI', bodyPart: 'Brain', status: 'Report Ready', date: '2023-10-26' },
    { id: 'RAD-002', patientName: 'Emily Davis', modality: 'X-Ray', bodyPart: 'Left Tibia', status: 'Imaging', date: '2023-10-26' },
    { id: 'RAD-003', patientName: 'James Wilson', modality: 'CT Scan', bodyPart: 'Chest', status: 'Scheduled', date: '2023-10-27' },
];

const INITIAL_REFERRALS: Referral[] = [
    { id: 'REF-001', patientName: 'Jane Doe', direction: 'Outbound', hospital: 'City General', reason: 'Advanced Neurology', status: 'Accepted', date: '2023-10-26' },
    { id: 'REF-002', patientName: 'Mark Smith', direction: 'Inbound', hospital: 'Rural Clinic A', reason: 'ICU Requirement', status: 'Pending', date: '2023-10-25' },
];

const INITIAL_CERTS: MedicalCertificate[] = [
    { id: 'MC-101', patientName: 'Sarah Johnson', type: 'Sick Leave', issueDate: '2023-10-26', doctor: 'Dr. Chen', status: 'Issued' },
    { id: 'MC-102', patientName: 'Michael Chen', type: 'Fitness', issueDate: '2023-10-25', doctor: 'Dr. Ross', status: 'Draft' },
];

const INITIAL_TRIALS: ResearchTrial[] = [
    { id: '1', title: 'Cardio-X Drug Trial', phase: 'Phase III', participants: 120, status: 'Active', leadResearcher: 'Dr. S. Chen' },
    { id: '2', title: 'Diabetes Management Study', phase: 'Phase I', participants: 15, status: 'Recruiting', leadResearcher: 'Dr. J. Doe' },
];

const INITIAL_MOMS: MaternityPatient[] = [
    { id: '1', name: 'Maria Garcia', weeksPregnant: 39, doctor: 'Dr. Cuddy', status: 'Labor', room: 'LDR-01' },
    { id: '2', name: 'Sarah Lee', weeksPregnant: 34, doctor: 'Dr. Cuddy', status: 'Ante-natal', room: '302' },
];

const INITIAL_QUEUE: QueueItem[] = [
    { id: '1', tokenNumber: 101, patientName: 'John Doe', doctorName: 'Dr. Sarah Chen', department: 'Cardiology', status: 'In Consultation', waitTime: '0m' },
    { id: '2', tokenNumber: 102, patientName: 'Alice Smith', doctorName: 'Dr. Sarah Chen', department: 'Cardiology', status: 'Waiting', waitTime: '15m' },
    { id: '3', tokenNumber: 103, patientName: 'Bob Brown', doctorName: 'Dr. Sarah Chen', department: 'Cardiology', status: 'Waiting', waitTime: '30m' },
];

// Blood Bank Initial Data
const INITIAL_BLOOD_UNITS: BloodUnit[] = [
    { id: 'BU-001', group: 'A+', bags: 12, status: 'Adequate' },
    { id: 'BU-002', group: 'A-', bags: 3, status: 'Low' },
    { id: 'BU-003', group: 'B+', bags: 15, status: 'Adequate' },
    { id: 'BU-004', group: 'B-', bags: 2, status: 'Critical' },
    { id: 'BU-005', group: 'O+', bags: 20, status: 'Adequate' },
    { id: 'BU-006', group: 'O-', bags: 4, status: 'Low' },
    { id: 'BU-007', group: 'AB+', bags: 8, status: 'Adequate' },
    { id: 'BU-008', group: 'AB-', bags: 1, status: 'Critical' },
];

const INITIAL_BLOOD_BAGS: BloodBag[] = [
    { id: 'BB-001', bloodGroup: 'A+', donorId: 'D-001', donorName: 'John Smith', collectionDate: '2024-01-15', expiryDate: '2024-02-15', volume: 450, status: 'Available', location: 'Freezer A-1' },
    { id: 'BB-002', bloodGroup: 'A+', donorId: 'D-002', donorName: 'Mary Johnson', collectionDate: '2024-01-16', expiryDate: '2024-02-16', volume: 450, status: 'Available', location: 'Freezer A-1' },
    { id: 'BB-003', bloodGroup: 'B+', donorId: 'D-003', donorName: 'Robert Brown', collectionDate: '2024-01-14', expiryDate: '2024-02-14', volume: 450, status: 'Reserved', location: 'Freezer B-1' },
    { id: 'BB-004', bloodGroup: 'O-', donorId: 'D-004', donorName: 'Sarah Wilson', collectionDate: '2024-01-17', expiryDate: '2024-02-17', volume: 450, status: 'Available', location: 'Freezer O-1' },
    { id: 'BB-005', bloodGroup: 'O+', donorId: 'D-005', donorName: 'Michael Davis', collectionDate: '2024-01-10', expiryDate: '2024-02-10', volume: 450, status: 'Available', location: 'Freezer O-1' },
    { id: 'BB-006', bloodGroup: 'AB+', donorId: 'D-006', donorName: 'Emily Chen', collectionDate: '2024-01-18', expiryDate: '2024-02-18', volume: 450, status: 'Available', location: 'Freezer AB-1' },
];

const INITIAL_BLOOD_DONORS: BloodDonor[] = [
    { id: 'D-001', name: 'John Smith', age: 32, gender: 'Male', bloodGroup: 'A+', contact: '555-0101', email: 'john.smith@email.com', address: '123 Main St, City', lastDonationDate: '2024-01-15', totalDonations: 5, status: 'Active', createdAt: '2023-06-15' },
    { id: 'D-002', name: 'Mary Johnson', age: 28, gender: 'Female', bloodGroup: 'A+', contact: '555-0102', email: 'mary.j@email.com', address: '456 Oak Ave, Town', lastDonationDate: '2024-01-16', totalDonations: 3, status: 'Active', createdAt: '2023-08-20' },
    { id: 'D-003', name: 'Robert Brown', age: 45, gender: 'Male', bloodGroup: 'B+', contact: '555-0103', email: 'rbrown@email.com', address: '789 Pine Rd, Village', lastDonationDate: '2024-01-14', totalDonations: 8, status: 'Active', createdAt: '2022-01-10' },
    { id: 'D-004', name: 'Sarah Wilson', age: 35, gender: 'Female', bloodGroup: 'O-', contact: '555-0104', email: 'swilson@email.com', address: '321 Elm St, City', lastDonationDate: '2024-01-17', totalDonations: 12, status: 'Active', createdAt: '2021-03-22' },
    { id: 'D-005', name: 'Michael Davis', age: 40, gender: 'Male', bloodGroup: 'O+', contact: '555-0105', email: 'mdavis@email.com', address: '654 Cedar Ln, Town', lastDonationDate: '2024-01-10', totalDonations: 6, status: 'Active', createdAt: '2022-11-05' },
    { id: 'D-006', name: 'Emily Chen', age: 26, gender: 'Female', bloodGroup: 'AB+', contact: '555-0106', email: 'echen@email.com', address: '987 Birch Dr, City', lastDonationDate: '2024-01-18', totalDonations: 2, status: 'Active', createdAt: '2023-09-12' },
    { id: 'D-007', name: 'David Lee', age: 50, gender: 'Male', bloodGroup: 'B-', contact: '555-0107', email: 'dlee@email.com', address: '147 Maple Way, Village', lastDonationDate: '2023-12-01', totalDonations: 15, status: 'Deferred', medicalConditions: ['High blood pressure'], createdAt: '2020-05-18' },
];

const INITIAL_BLOOD_REQUESTS: BloodRequest[] = [
    { id: 'BR-001', patientId: 'P-102', patientName: 'Michael Chen', bloodGroup: 'B-', unitsRequired: 2, urgency: 'Emergency', department: 'ICU', doctor: 'Dr. Sarah Chen', status: 'Pending', requestDate: '2024-01-20', requiredDate: '2024-01-20', crossMatchStatus: 'Pending', notes: 'Cardiac surgery scheduled' },
    { id: 'BR-002', patientId: 'P-108', patientName: 'Lisa Anderson', bloodGroup: 'A+', unitsRequired: 1, urgency: 'Routine', department: 'Surgery', doctor: 'Dr. Michael Ross', status: 'Approved', requestDate: '2024-01-19', requiredDate: '2024-01-22', crossMatchStatus: 'Compatible' },
    { id: 'BR-003', patientId: 'P-109', patientName: 'James Taylor', bloodGroup: 'O-', unitsRequired: 3, urgency: 'Urgent', department: 'Emergency', doctor: 'Dr. Emily House', status: 'Fulfilled', requestDate: '2024-01-18', requiredDate: '2024-01-18', crossMatchStatus: 'Compatible', fulfilledDate: '2024-01-18', fulfilledUnits: 3 },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [ambulances, setAmbulances] = useState<Ambulance[]>(INITIAL_AMBULANCES);
  const [staff, setStaff] = useState<Doctor[]>(INITIAL_STAFF);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [beds, setBeds] = useState<Bed[]>(INITIAL_BEDS);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [labRequests, setLabRequests] = useState<LabTestRequest[]>(INITIAL_LABS);
  const [radiologyRequests, setRadiologyRequests] = useState<RadiologyRequest[]>(INITIAL_RADS);
  const [referrals, setReferrals] = useState<Referral[]>(INITIAL_REFERRALS);
  const [medicalCertificates, setMedicalCertificates] = useState<MedicalCertificate[]>(INITIAL_CERTS);
  const [researchTrials, setResearchTrials] = useState<ResearchTrial[]>(INITIAL_TRIALS);
  const [maternityPatients, setMaternityPatients] = useState<MaternityPatient[]>(INITIAL_MOMS);
  const [opdQueue, setOpdQueue] = useState<QueueItem[]>(INITIAL_QUEUE);
  const [bloodUnits, setBloodUnits] = useState<BloodUnit[]>(INITIAL_BLOOD_UNITS);
  const [bloodBags, setBloodBags] = useState<BloodBag[]>(INITIAL_BLOOD_BAGS);
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>(INITIAL_BLOOD_DONORS);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(INITIAL_BLOOD_REQUESTS);

  const addPatient = (patient: Patient) => {
    setPatients(prev => [patient, ...prev]);
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const archivePatient = (id: string) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, urgency: UrgencyLevel.LOW, condition: `Archived: ${p.condition}` } : p));
  };

  const restorePatient = (id: string) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, condition: p.condition.replace('Archived: ', '') } : p));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [appointment, ...prev]);
  };

  const addInvoice = (invoice: Invoice) => {
    setInvoices(prev => [invoice, ...prev]);
  };

  const addInventoryItem = (item: InventoryItem) => {
    setInventory(prev => [item, ...prev]);
  };

  const addAmbulance = (ambulance: Ambulance) => {
    setAmbulances(prev => [ambulance, ...prev]);
  };

  const addStaff = (doctor: Doctor) => {
    setStaff(prev => [doctor, ...prev]);
  };

  const addTask = (task: Task) => {
    setTasks(prev => [task, ...prev]);
  };

  const updateTaskStatus = (id: string, status: 'Todo' | 'In Progress' | 'Done') => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const addNotice = (notice: Notice) => {
    setNotices(prev => [notice, ...prev]);
  };

  const updateBedStatus = (id: string, status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance') => {
    setBeds(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const addLabRequest = (request: LabTestRequest) => {
    setLabRequests(prev => [request, ...prev]);
  };

  const addRadiologyRequest = (request: RadiologyRequest) => {
    setRadiologyRequests(prev => [request, ...prev]);
  };

  const addReferral = (referral: Referral) => {
    setReferrals(prev => [referral, ...prev]);
  };

  const addMedicalCertificate = (cert: MedicalCertificate) => {
    setMedicalCertificates(prev => [cert, ...prev]);
  };

  const addResearchTrial = (trial: ResearchTrial) => {
    setResearchTrials(prev => [trial, ...prev]);
  };

  const addMaternityPatient = (patient: MaternityPatient) => {
    setMaternityPatients(prev => [patient, ...prev]);
  };

  const addToQueue = (item: QueueItem) => {
    setOpdQueue(prev => [item, ...prev]);
  };

  const updateQueueItem = (id: string, updates: Partial<QueueItem>) => {
    setOpdQueue(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  // Blood Bank CRUD Functions
  const addBloodUnit = (unit: BloodUnit) => {
    setBloodUnits(prev => [unit, ...prev]);
  };

  const updateBloodUnit = (id: string, updates: Partial<BloodUnit>) => {
    setBloodUnits(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  const addBloodBag = (bag: BloodBag) => {
    setBloodBags(prev => [bag, ...prev]);
  };

  const updateBloodBag = (id: string, updates: Partial<BloodBag>) => {
    setBloodBags(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBloodBag = (id: string) => {
    setBloodBags(prev => prev.filter(b => b.id !== id));
  };

  const addBloodDonor = (donor: BloodDonor) => {
    setBloodDonors(prev => [donor, ...prev]);
  };

  const updateBloodDonor = (id: string, updates: Partial<BloodDonor>) => {
    setBloodDonors(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteBloodDonor = (id: string) => {
    setBloodDonors(prev => prev.filter(d => d.id !== id));
  };

  const addBloodRequest = (request: BloodRequest) => {
    setBloodRequests(prev => [request, ...prev]);
  };

  const updateBloodRequest = (id: string, updates: Partial<BloodRequest>) => {
    setBloodRequests(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const getStats = () => {
    const totalPatients = patients.length;
    const totalAppointments = appointments.filter(a => a.status !== 'Cancelled').length;
    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.status === 'Paid' ? inv.amount : 0), 0);
    const pendingRevenue = invoices.reduce((sum, inv) => sum + (inv.status === 'Pending' ? inv.amount : 0), 0);
    
    return {
      totalPatients,
      totalAppointments,
      totalRevenue,
      pendingRevenue
    };
  };

  return (
    <DataContext.Provider value={{
      patients,
      appointments,
      invoices,
      inventory,
      ambulances,
      staff,
      tasks,
      beds,
      notices,
      labRequests,
      radiologyRequests,
      referrals,
      medicalCertificates,
      researchTrials,
      maternityPatients,
      opdQueue,
      bloodUnits,
      bloodBags,
      bloodDonors,
      bloodRequests,
      addPatient,
      updatePatient,
      deletePatient,
      archivePatient,
      restorePatient,
      addAppointment,
      addInvoice,
      addInventoryItem,
      addAmbulance,
      addStaff,
      addTask,
      updateTaskStatus,
      addNotice,
      updateBedStatus,
      addLabRequest,
      addRadiologyRequest,
      addReferral,
      addMedicalCertificate,
      addResearchTrial,
      addMaternityPatient,
      addToQueue,
      updateQueueItem,
      addBloodUnit,
      updateBloodUnit,
      addBloodBag,
      updateBloodBag,
      deleteBloodBag,
      addBloodDonor,
      updateBloodDonor,
      deleteBloodDonor,
      addBloodRequest,
      updateBloodRequest,
      getStats
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
