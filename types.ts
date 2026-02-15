import React from 'react';

export enum UrgencyLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface VitalSign {
  time: string;
  heartRate: number;
  bloodPressure: string;
  temp: number;
}

export interface LabResult {
  id: string;
  testName: string;
  date: string;
  result: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
}

export interface PatientFile {
  id: string;
  name: string;
  type: 'PDF' | 'Image' | 'DICOM';
  date: string;
  size: string;
}

export interface DietItem {
  meal: string;
  description: string;
  calories: number;
  status: 'Planned' | 'Consumed';
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'Admission' | 'Surgery' | 'Medication' | 'Discharge';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  admissionDate: string;
  condition: string;
  roomNumber: string;
  urgency: UrgencyLevel;
  history: string;
  medications?: Medication[];
  vitals?: VitalSign[];
  labResults?: LabResult[];
  files?: PatientFile[];
  diet?: DietItem[];
  timeline?: TimelineEvent[];
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  time: string;
  date: string;
  type: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  isOnline?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  status: 'Online' | 'Offline' | 'In Surgery' | 'On Break';
  patients: number;
  image: string;
}

export interface Bed {
  id: string;
  ward: string;
  number: string;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
  patientName?: string;
  type: 'General' | 'ICU' | 'Emergency';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface Invoice {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: string[];
}

export interface Ambulance {
  id: string;
  vehicleNumber: string;
  driverName: string;
  status: 'Available' | 'On Route' | 'Maintenance';
  location: string;
  type: 'ALS' | 'BLS';
}

export interface BloodUnit {
  id: string;
  group: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  bags: number;
  status: 'Low' | 'Adequate' | 'Critical';
}

export interface BloodBag {
  id: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  donorId: string;
  donorName: string;
  collectionDate: string;
  expiryDate: string;
  volume: number; // in ml
  status: 'Available' | 'Reserved' | 'Used' | 'Expired' | 'Discarded';
  location: string; // storage location
}

export interface BloodDonor {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  contact: string;
  email?: string;
  address: string;
  lastDonationDate?: string;
  totalDonations: number;
  status: 'Active' | 'Inactive' | 'Deferred';
  medicalConditions?: string[];
  medications?: string[];
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  patientId: string;
  patientName: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  unitsRequired: number;
  urgency: 'Routine' | 'Urgent' | 'Emergency';
  department: string;
  doctor: string;
  status: 'Pending' | 'Approved' | 'Fulfilled' | 'Cancelled';
  requestDate: string;
  requiredDate: string;
  crossMatchStatus?: 'Pending' | 'Compatible' | 'Incompatible';
  notes?: string;
  fulfilledDate?: string;
  fulfilledUnits?: number;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  staffCount: number;
  status: 'Active' | 'Inactive';
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done';
}

export interface VitalRecord {
  id: string;
  type: 'Birth' | 'Death';
  name: string;
  date: string;
  time: string;
  doctor: string;
}

export interface OTStatus {
    id: string;
    name: string;
    status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
    currentProcedure?: string;
    doctor?: string;
    startTime?: string;
}

export interface Asset {
    id: string;
    name: string;
    type: string;
    serialNumber: string;
    status: 'Operational' | 'Maintenance' | 'Broken';
    lastService: string;
}

export interface Shift {
    id: string;
    staffName: string;
    role: string;
    day: string;
    time: string;
    area: string;
}

export interface InsuranceClaim {
    id: string;
    patientName: string;
    provider: string;
    amount: number;
    status: 'Approved' | 'Pending' | 'Rejected';
    date: string;
}

export interface KitchenOrder {
    id: string;
    patientName: string;
    room: string;
    dietType: string;
    status: 'Pending' | 'Cooking' | 'Delivered';
}

export interface HousekeepingTask {
    id: string;
    area: string;
    assignee: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    priority: 'High' | 'Normal';
}

export interface Visitor {
    id: string;
    visitorName: string;
    patientName: string;
    checkInTime: string;
    status: 'Active' | 'Checked Out';
}

export interface Vaccine {
    id: string;
    name: string;
    stock: number;
    batchNo: string;
    expiry: string;
}

export interface Feedback {
    id: string;
    patientName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    priority: 'Normal' | 'Urgent';
}

export interface LabTestRequest {
    id: string;
    patientName: string;
    testName: string;
    priority: 'Routine' | 'Urgent';
    status: 'Sample Collected' | 'Processing' | 'Completed';
    date: string;
}

export interface RadiologyRequest {
    id: string;
    patientName: string;
    modality: 'X-Ray' | 'MRI' | 'CT Scan' | 'Ultrasound';
    bodyPart: string;
    status: 'Scheduled' | 'Imaging' | 'Report Ready';
    date: string;
}

export interface ProcurementItem {
    id: string;
    itemName: string;
    vendor: string;
    quantity: number;
    status: 'Ordered' | 'Received' | 'Pending';
    cost: number;
}

export interface TeleConsultation {
    id: string;
    doctorName: string;
    patientName: string;
    startTime: string;
    duration: string;
    platform: 'Zoom' | 'In-App' | 'Meet';
    status: 'Scheduled' | 'Live' | 'Completed';
}

export interface CanteenItem {
    id: string;
    name: string;
    category: 'Meal' | 'Snack' | 'Beverage';
    price: number;
    available: boolean;
}

export interface LaundryBatch {
    id: string;
    type: 'Bed Sheets' | 'Gowns' | 'Towels';
    weight: string;
    status: 'Washing' | 'Drying' | 'Folded' | 'Dispatched';
    department: string;
}

export interface MortuaryRecord {
    id: string;
    deceasedName: string;
    dateOfDeath: string;
    freezerNo: string;
    status: 'Occupied' | 'Released';
    relativeName: string;
}

export interface HospitalEvent {
    id: string;
    title: string;
    type: 'Training' | 'Conference' | 'Workshop';
    date: string;
    location: string;
    attendees: number;
}

export interface LostItem {
    id: string;
    item: string;
    foundLocation: string;
    dateFound: string;
    status: 'Unclaimed' | 'Returned';
    finder: string;
}

export interface ParkingSpot {
    id: string;
    number: string;
    section: 'Staff' | 'Visitor' | 'Ambulance';
    status: 'Available' | 'Occupied';
}

export interface WasteRecord {
  id: string;
  type: 'Infectious' | 'Sharps' | 'General' | 'Chemical';
  weight: number;
  collectionTime: string;
  disposalStatus: 'Collected' | 'Incinerated' | 'Pending';
}

export interface TherapySession {
    id: string;
    patientName: string;
    therapyType: string;
    therapist: string;
    date: string;
    status: 'Scheduled' | 'Completed';
}

export interface SterilizationBatch {
    id: string;
    setName: string;
    cycleNumber: string;
    sterilizationDate: string;
    expiryDate: string;
    status: 'Sterile' | 'Processing' | 'Expired';
}

export interface SupportTicket {
    id: string;
    subject: string;
    department: string;
    requester: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'In Progress' | 'Resolved';
}

export interface MaternityPatient {
    id: string;
    name: string;
    weeksPregnant: number;
    doctor: string;
    status: 'Ante-natal' | 'Labor' | 'Post-natal';
    room: string;
}

export interface Incident {
    id: string;
    type: string;
    location: string;
    reportedBy: string;
    date: string;
    severity: 'Low' | 'Medium' | 'High';
    status: 'Investigating' | 'Closed';
}

export interface LibraryItem {
    id: string;
    title: string;
    author: string;
    category: string;
    status: 'Available' | 'Checked Out';
}

export interface Donation {
    id: string;
    donor: string;
    amount: number;
    cause: string;
    date: string;
}

export interface CallLog {
    id: string;
    caller: string;
    type: 'Inquiry' | 'Emergency' | 'Appointment';
    agent: string;
    duration: string;
    time: string;
}

export interface LegalCase {
    id: string;
    caseNumber: string;
    patientName: string;
    type: 'Accident' | 'Assault' | 'Other';
    policeStation: string;
    status: 'Active' | 'Closed';
}

// 10 NEW FEATURES TYPES

export interface QueueItem {
    id: string;
    tokenNumber: number;
    patientName: string;
    doctorName: string;
    department: string;
    status: 'Waiting' | 'In Consultation' | 'Completed';
    waitTime: string;
    priority?: 'Routine' | 'Urgent' | 'Emergency';
    symptoms?: string;
}

export interface Referral {
    id: string;
    patientName: string;
    direction: 'Inbound' | 'Outbound';
    hospital: string;
    reason: string;
    status: 'Pending' | 'Accepted' | 'Completed';
    date: string;
}

export interface MedicalCertificate {
    id: string;
    patientName: string;
    type: 'Sick Leave' | 'Fitness' | 'Death';
    issueDate: string;
    doctor: string;
    status: 'Draft' | 'Issued';
}

export interface AuditLog {
    id: string;
    user: string;
    action: string;
    resource: string;
    timestamp: string;
    status: 'Success' | 'Failed';
}

export interface SecurityLog {
    id: string;
    location: string;
    event: string;
    timestamp: string;
    type: 'Entry' | 'Exit' | 'Alert';
    personnel: string;
}

export interface TrainingModule {
    id: string;
    title: string;
    assignedTo: string;
    dueDate: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    score?: number;
}

export interface FacilityJob {
    id: string;
    issue: string;
    location: string;
    type: 'Electrical' | 'Plumbing' | 'HVAC';
    status: 'Reported' | 'Fixing' | 'Resolved';
    technician: string;
}

export interface TransportRequest {
    id: string;
    patientName: string;
    from: string;
    to: string;
    priority: 'Routine' | 'Urgent';
    status: 'Pending' | 'In Transit' | 'Completed';
    porter: string;
}

export interface ResearchTrial {
    id: string;
    title: string;
    phase: string;
    participants: number;
    status: 'Recruiting' | 'Active' | 'Completed';
    leadResearcher: string;
}

export interface IntercomLog {
    id: string;
    sender: string;
    recipient: string; // "All Staff", "Dr. X", "ICU Ward"
    message: string;
    time: string;
    priority: 'Normal' | 'Emergency';
}

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  patients: number;
  appointments: number;
}

export interface AIAnalysisResult {
  summary: string;
  recommendedActions: string[];
  diagnosisSuggestions: string[];
}

export enum UserRole {
  ADMIN = 'Admin',
  DOCTOR = 'Doctor',
  NURSE = 'Nurse',
  PHARMACIST = 'Pharmacist',
  RECEPTIONIST = 'Receptionist',
  LAB_TECHNICIAN = 'Lab Technician',
  RADIOLOGIST = 'Radiologist',
  ACCOUNTANT = 'Accountant',
  HR_MANAGER = 'HR Manager',
  FACILITY_MANAGER = 'Facility Manager',
  KITCHEN_MANAGER = 'Kitchen Manager',
  EMERGENCY_MANAGER = 'Emergency Manager',
  RESEARCHER = 'Researcher',
  PATIENT = 'Patient'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// ============================================
// AI FEATURE TYPES - Clinical AI Features
// ============================================

// 1. AI-Powered Triage Assistant Types
export interface TriageInput {
  symptoms: string;
  vitalSigns?: {
    heartRate?: number;
    bloodPressure?: string;
    temperature?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
  };
  age?: number;
  gender?: string;
  medicalHistory?: string[];
}

export interface TriageResult {
  urgencyLevel: 'Emergency' | 'Urgent' | 'Normal' | 'Low';
  priorityScore: number; // 1-10 scale
  recommendedDepartment: string;
  estimatedWaitTime: string;
  reasoning: string;
  recommendedActions: string[];
  redFlags: string[];
}

// 2. Smart Medication Dosage Calculator Types
export interface DosageInput {
  medication: string;
  patientWeight?: number; // in kg
  patientAge?: number;
  patientGender?: string;
  indication?: string;
  renalFunction?: {
    creatinineClearance?: number; // mL/min
    serumCreatinine?: number; // mg/dL
  };
  hepaticImpairment?: 'None' | 'Mild' | 'Moderate' | 'Severe';
  currentMedications?: string[];
}

export interface DosageResult {
  recommendedDose: string;
  doseFrequency: string;
  route: string;
  maxDailyDose: string;
  adjustments: string[];
  warnings: string[];
  renalAdjustment?: string;
  pediatricDose?: string;
  geriatricAdjustment?: string;
}

// 3. Clinical Decision Support System (CDSS) Types
export interface CDSSInput {
  patientId: string;
  diagnosis?: string;
  symptoms?: string[];
  labResults?: LabResult[];
  currentMedications?: Medication[];
  vitalSigns?: VitalSign[];
  allergies?: string[];
  age?: number;
  gender?: string;
}

export interface CDSSAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'suggestion';
  title: string;
  description: string;
  source: string;
  timestamp: string;
  actionRequired: boolean;
  suggestedAction?: string;
}

export interface CDSSResult {
  alerts: CDSSAlert[];
  recommendations: string[];
  evidenceBasedGuidelines: {
    guideline: string;
    relevance: string;
    source: string;
  }[];
  riskFactors: string[];
}

// 4. AI-Enhanced Medical Scribe Types
export interface ScribeInput {
  transcription?: string;
  audioData?: string; // base64 encoded
  encounterType?: 'consultation' | 'follow-up' | 'emergency' | 'procedure';
  patientInfo?: {
    name?: string;
    age?: number;
    gender?: string;
  };
}

export interface ScribeResult {
  soapNote: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  icdCodes: {
    code: string;
    description: string;
    confidence: number;
  }[];
  cptCodes: {
    code: string;
    description: string;
  }[];
  followUpRecommendations: string[];
  qualityScore: number;
}

// 5. Intelligent Allergy & Contraindication Alert Types
export interface AllergyCheckInput {
  patientAllergies: string[];
  medications: string[];
  patientConditions?: string[];
  age?: number;
  gender?: string;
}

export interface AllergyAlert {
  severity: 'critical' | 'high' | 'moderate' | 'low';
  allergen: string;
  medication: string;
  reaction: string;
  crossReactivity: string[];
  alternativeMedications: string[];
}

export interface AllergyCheckResult {
  hasAlerts: boolean;
  alerts: AllergyAlert[];
  contraindications: {
    medication: string;
    contraindication: string;
    severity: string;
    reason: string;
  }[];
  safeAlternatives: string[];
}

// 6. AI-Powered Lab Result Interpretation Types
export interface LabInterpretationInput {
  testName: string;
  result: string | number;
  unit?: string;
  referenceRange?: {
    low: number;
    high: number;
  };
  patientAge?: number;
  patientGender?: string;
  previousResults?: {
    date: string;
    result: string | number;
  }[];
  clinicalContext?: string;
}

export interface LabInterpretationResult {
  status: 'Normal' | 'Abnormal' | 'Critical' | 'Borderline';
  interpretation: string;
  clinicalSignificance: string;
  possibleCauses: string[];
  recommendedActions: string[];
  trendAnalysis?: {
    direction: 'increasing' | 'decreasing' | 'stable';
    significance: string;
  };
  followUpRequired: boolean;
  icdCode?: string;
}

// 7. AI-Powered Antimicrobial Stewardship Types
export interface AntimicrobialInput {
  infectionType?: string;
  cultureResults?: {
    organism: string;
    sensitivity: string[];
  }[];
  currentAntibiotics?: string[];
  patientAge?: number;
  renalFunction?: number;
  allergyInfo?: string[];
  previousAntibioticUse?: string[];
}

export interface AntimicrobialResult {
  recommendedAntibiotic: string;
  alternativeOptions: string[];
  recommendedDuration: string;
  doseAdjustment: string;
  deEscalationOptions: string[];
  resistanceWarnings: string[];
  stewardshipAlerts: string[];
  cultureGuidedRecommendation: string;
}

// 8. AI-Powered Vital Signs Monitor Types
export interface VitalSignsAnalysisInput {
  vitalSigns: VitalSign[];
  patientAge?: number;
  patientCondition?: string;
  baselineVitals?: VitalSign;
}

export interface EarlyWarningScore {
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  parameters: {
    parameter: string;
    value: number | string;
    score: number;
    abnormality: string;
  }[];
}

export interface VitalSignsAnalysisResult {
  earlyWarningScore: EarlyWarningScore;
  deteriorationRisk: {
    probability: number;
    timeframe: string;
    indicators: string[];
  };
  alerts: {
    type: 'critical' | 'warning' | 'info';
    message: string;
    parameter: string;
  }[];
  trends: {
    parameter: string;
    trend: 'improving' | 'stable' | 'declining';
    significance: string;
  }[];
  recommendedInterventions: string[];
}

// 9. AI-Powered Diagnostic Suggestion Engine Types
export interface DiagnosticInput {
  symptoms: string[];
  vitalSigns?: VitalSign[];
  labResults?: LabResult[];
  patientAge?: number;
  patientGender?: string;
  medicalHistory?: string[];
  travelHistory?: string[];
  epidemiologicalFactors?: string[];
}

export interface DiagnosticSuggestion {
  diagnosis: string;
  icdCode: string;
  confidence: number;
  likelihood: 'High' | 'Medium' | 'Low';
  supportingEvidence: string[];
  conflictingEvidence: string[];
  recommendedTests: string[];
  riskFactors: string[];
}

export interface DiagnosticResult {
  differentialDiagnoses: DiagnosticSuggestion[];
  primaryDiagnosis: DiagnosticSuggestion;
  rareDiseaseConsiderations: string[];
  recommendedWorkup: string[];
  clinicalGuidelines: string[];
}

// 10. Smart Prescription Generator Types
export interface PrescriptionInput {
  diagnosis: string;
  patientAge?: number;
  patientWeight?: number;
  patientGender?: string;
  allergies?: string[];
  currentMedications?: Medication[];
  renalFunction?: number;
  hepaticFunction?: 'Normal' | 'Impaired';
  insuranceFormulary?: string[];
}

export interface PrescriptionSuggestion {
  medication: string;
  dose: string;
  frequency: string;
  route: string;
  duration: string;
  quantity: number;
  refills: number;
  instructions: string;
  warnings: string[];
  formularyStatus: 'Preferred' | 'Non-Preferred' | 'Not Covered';
  alternatives: string[];
  costEstimate?: string;
}

export interface PrescriptionResult {
  primaryPrescription: PrescriptionSuggestion;
  alternativePrescriptions: PrescriptionSuggestion[];
  adjunctiveMedications: PrescriptionSuggestion[];
  drugInteractions: {
    medication1: string;
    medication2: string;
    severity: string;
    description: string;
    management: string;
  }[];
  counselingPoints: string[];
  followUpRequired: boolean;
}

// AI Service Response Wrapper
export interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  processingTime?: number;
  cached?: boolean;
}

// AI Feature Configuration
export interface AIFeatureConfig {
  enabled: boolean;
  cacheResults: boolean;
  cacheTTL: number; // in seconds
  timeout: number; // in milliseconds
  fallbackEnabled: boolean;
  maxRetries: number;
}

// ============================================
// OPERATIONAL AI FEATURE TYPES - Batch 2
// ============================================

// 1. AI-Powered Bed Management Optimizer Types
export interface BedManagementInput {
  patientAcuity?: 'Low' | 'Medium' | 'High' | 'Critical';
  expectedLOS?: number; // Length of stay in days
  department?: string;
  currentBeds: Bed[];
  pendingDischarges?: {
    patientName: string;
    bedId: string;
    estimatedDischargeTime: string;
  }[];
  incomingPatients?: {
    priority: 'Routine' | 'Urgent' | 'Emergency';
    department: string;
    requiresICU?: boolean;
  }[];
}

export interface BedAssignmentSuggestion {
  bedId: string;
  ward: string;
  bedNumber: string;
  matchScore: number;
  reasoning: string;
  advantages: string[];
  considerations: string[];
}

export interface BedManagementResult {
  optimalAssignments: BedAssignmentSuggestion[];
  turnoverPredictions: {
    bedId: string;
    currentPatient: string;
    predictedDischargeTime: string;
    confidence: number;
  }[];
  dischargePlanningSuggestions: {
    patientName: string;
    currentBed: string;
    recommendation: string;
    barriers: string[];
    estimatedDischargeDate: string;
  }[];
  capacityForecast: {
    time: string;
    expectedOccupancy: number;
    availableBeds: number;
  }[];
  alerts: {
    type: 'critical' | 'warning' | 'info';
    message: string;
    affectedBeds: string[];
  }[];
}

// 2. Intelligent Operating Room Scheduler Types
export interface ORSchedulerInput {
  procedures: {
    id: string;
    procedureName: string;
    patientAge?: number;
    patientCondition?: string;
    surgeon: string;
    urgency: 'Elective' | 'Urgent' | 'Emergency';
    estimatedDuration?: number;
    requiredEquipment?: string[];
  }[];
  operatingRooms: OTStatus[];
  staffAvailability: {
    role: string;
    name: string;
    available: boolean;
    specialties?: string[];
  }[];
  currentDateTime?: string;
}

export interface SurgerySchedulingSuggestion {
  procedureId: string;
  procedureName: string;
  assignedOR: string;
  suggestedStartTime: string;
  predictedDuration: number;
  predictedEndTime: string;
  assignedStaff: {
    role: string;
    name: string;
  }[];
  equipmentAllocated: string[];
  optimizationScore: number;
  reasoning: string;
}

export interface ORSchedulerResult {
  schedule: SurgerySchedulingSuggestion[];
  durationPredictions: {
    procedureId: string;
    procedureName: string;
    baseDuration: number;
    adjustedDuration: number;
    factors: string[];
  }[];
  resourceOptimization: {
    resource: string;
    utilizationRate: number;
    conflicts: string[];
    suggestions: string[];
  }[];
  conflicts: {
    type: string;
    description: string;
    affectedProcedures: string[];
    resolution: string;
  }[];
  efficiency: {
    orUtilizationRate: number;
    staffUtilizationRate: number;
    predictedDelays: number;
  };
}

// 3. Smart Inventory Forecasting Types
export interface InventoryForecastInput {
  items: InventoryItem[];
  historicalUsage?: {
    itemId: string;
    itemName: string;
    monthlyUsage: number[];
    seasonalPatterns?: string[];
  }[];
  upcomingProcedures?: {
    procedureName: string;
    scheduledDate: string;
    requiredItems: string[];
  }[];
  currentStock: {
    itemId: string;
    quantity: number;
    reorderLevel: number;
    expiryDates?: {
      batch: string;
      quantity: number;
      expiryDate: string;
    }[];
  }[];
}

export interface InventoryForecastResult {
  demandForecasts: {
    itemId: string;
    itemName: string;
    predictedDemand: number;
    timeframe: string;
    confidence: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  }[];
  reorderRecommendations: {
    itemId: string;
    itemName: string;
    currentStock: number;
    recommendedOrderQuantity: number;
    urgency: 'Immediate' | 'Soon' | 'Normal';
    estimatedStockoutDate: string;
    preferredVendor?: string;
  }[];
  expiryAlerts: {
    itemId: string;
    itemName: string;
    batchNumber: string;
    expiryDate: string;
    quantity: number;
    daysUntilExpiry: number;
    action: 'Use First' | 'Donate' | 'Dispose';
  }[];
  costOptimizations: {
    itemId: string;
    suggestion: string;
    potentialSavings: number;
    implementation: string;
  }[];
  autoPurchaseOrders?: {
    vendor: string;
    items: {
      itemId: string;
      itemName: string;
      quantity: number;
      estimatedCost: number;
    }[];
    totalEstimatedCost: number;
    priority: 'High' | 'Medium' | 'Low';
  }[];
}

// 4. Intelligent Patient Flow Analytics Types
export interface PatientFlowInput {
  currentQueue: QueueItem[];
  historicalData?: {
    date: string;
    hour: number;
    patientCount: number;
    avgWaitTime: number;
  }[];
  staffingLevels?: {
    department: string;
    staffCount: number;
    required: number;
  }[];
  departmentCapacities?: {
    department: string;
    maxCapacity: number;
    currentOccupancy: number;
  }[];
}

export interface PatientFlowResult {
  volumePredictions: {
    timeframe: string;
    predictedPatients: number;
    confidence: number;
    peakHours: string[];
  }[];
  bottleneckAnalysis: {
    location: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    cause: string;
    impact: string;
    affectedPatients: number;
    recommendations: string[];
  }[];
  staffingRecommendations: {
    department: string;
    currentStaff: number;
    recommendedStaff: number;
    reasoning: string;
    timeSlots: {
      time: string;
      required: number;
    }[];
  }[];
  waitTimeOptimizations: {
    department: string;
    currentAvgWait: number;
    predictedAvgWait: number;
    improvementActions: string[];
  }[];
  flowEfficiency: {
    overallScore: number;
    departmentScores: {
      department: string;
      score: number;
      trend: 'improving' | 'stable' | 'declining';
    }[];
  };
}

// 5. Smart Ambulance Dispatch System Types
export interface AmbulanceDispatchInput {
  emergency: {
    location: string;
    coordinates?: { lat: number; lng: number };
    emergencyType: string;
    severity: 'Critical' | 'Serious' | 'Moderate' | 'Minor';
    patientCount?: number;
    specialRequirements?: string[];
  };
  availableAmbulances: Ambulance[];
  hospitalCapacity: {
    emergencyBeds: number;
    icuBeds: number;
    operatingRooms: number;
  };
  trafficConditions?: {
    route: string;
    delay: number;
    condition: string;
  };
  weatherConditions?: string;
}

export interface AmbulanceDispatchResult {
  recommendedAmbulance: {
    ambulanceId: string;
    vehicleNumber: string;
    driverName: string;
    type: 'ALS' | 'BLS';
    eta: number;
    distance: number;
  };
  routeRecommendation: {
    route: string;
    estimatedTime: number;
    distance: number;
    trafficConditions: string;
    alternativeRoutes: {
      route: string;
      estimatedTime: number;
      reason: string;
    }[];
  };
  hospitalDestination: {
    recommendedHospital: string;
    reasoning: string;
    availableResources: string[];
    preparationInstructions: string[];
  };
  etaPredictions: {
    toScene: number;
    toHospital: number;
    total: number;
    confidence: number;
    factors: string[];
  };
  emergencyResponse: {
    priorityLevel: number;
    recommendedResources: string[];
    preHospitalInstructions: string[];
    notifications: string[];
  };
}

// 6. AI-Powered Staff Scheduling Optimizer Types
export interface StaffSchedulingInput {
  staff: {
    id: string;
    name: string;
    role: string;
    skills: string[];
    preferences?: {
      preferredShifts: string[];
      unavailableDates: string[];
      maxHoursPerWeek: number;
    };
    currentHours: number;
    fatigueScore?: number;
  }[];
  shifts: {
    id: string;
    date: string;
    time: string;
    area: string;
    requiredRole: string;
    requiredSkills?: string[];
    minStaff: number;
  }[];
  historicalPatterns?: {
    staffId: string;
    performanceScore: number;
    absenteeismRate: number;
  }[];
}

export interface StaffSchedulingResult {
  optimizedSchedule: {
    shiftId: string;
    date: string;
    time: string;
    area: string;
    assignedStaff: {
      staffId: string;
      name: string;
      role: string;
      matchScore: number;
    }[];
    coverageGap: boolean;
  }[];
  staffingNeeds: {
    date: string;
    department: string;
    predictedDemand: number;
    currentAllocation: number;
    gap: number;
    recommendation: string;
  }[];
  fatigueRiskAlerts: {
    staffId: string;
    staffName: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    consecutiveShifts: number;
    hoursWorked: number;
    recommendation: string;
  }[];
  skillMatching: {
    shiftId: string;
    requiredSkills: string[];
    coveredSkills: string[];
    missingSkills: string[];
    suggestions: string[];
  }[];
  optimizationMetrics: {
    preferenceMatchRate: number;
    skillCoverageRate: number;
    costEfficiency: number;
    fairnessScore: number;
  };
}

// 7. Smart Equipment Maintenance Predictor Types
export interface EquipmentMaintenanceInput {
  equipment: {
    id: string;
    name: string;
    type: string;
    serialNumber: string;
    status: 'Operational' | 'Maintenance' | 'Broken';
    lastService: string;
    usageHours?: number;
    age?: number;
    criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  }[];
  maintenanceHistory?: {
    equipmentId: string;
    date: string;
    type: 'Preventive' | 'Corrective' | 'Emergency';
    cost: number;
    downtime: number;
    issues: string[];
  }[];
  usagePatterns?: {
    equipmentId: string;
    dailyUsage: number[];
    peakUsageHours: string[];
  }[];
}

export interface EquipmentMaintenanceResult {
  predictiveMaintenance: {
    equipmentId: string;
    equipmentName: string;
    failureRisk: number;
    predictedFailureDate: string;
    recommendedMaintenanceDate: string;
    maintenanceType: 'Preventive' | 'Predictive' | 'Corrective';
    priority: 'Immediate' | 'High' | 'Medium' | 'Low';
    estimatedCost: number;
    estimatedDowntime: number;
    reasoning: string;
  }[];
  riskAssessment: {
    equipmentId: string;
    equipmentName: string;
    riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
    riskFactors: string[];
    impactOnOperations: string;
    mitigationSteps: string[];
  }[];
  costOptimization: {
    equipmentId: string;
    currentMaintenanceCost: number;
    optimizedMaintenanceCost: number;
    savings: number;
    recommendations: string[];
  }[];
  maintenanceSchedule: {
    date: string;
    equipment: string[];
    type: string;
    estimatedDuration: number;
    requiredResources: string[];
  }[];
  criticalAlerts: {
    equipmentId: string;
    alert: string;
    urgency: 'Immediate' | 'Urgent' | 'Scheduled';
    action: string;
  }[];
}

// 8. AI-Powered Housekeeping Scheduler Types
export interface HousekeepingSchedulingInput {
  tasks: HousekeepingTask[];
  dischargePredictions?: {
    roomNumber: string;
    predictedDischargeTime: string;
    patientName: string;
  }[];
  staffAvailability: {
    name: string;
    role: string;
    shift: string;
    skills: string[];
  }[];
  roomPriorities?: {
    roomNumber: string;
    type: 'ICU' | 'General' | 'Emergency' | 'Surgery';
    priority: number;
  }[];
  currentWorkload?: {
    staffName: string;
    assignedTasks: number;
    completedTasks: number;
  }[];
}

export interface HousekeepingSchedulingResult {
  optimizedSchedule: {
    taskId: string;
    area: string;
    assignee: string;
    scheduledTime: string;
    priority: 'High' | 'Normal';
    estimatedDuration: number;
    reasoning: string;
  }[];
  dischargeBasedTasks: {
    roomNumber: string;
    predictedDischargeTime: string;
    cleaningWindow: {
      start: string;
      end: string;
    };
    priority: 'High' | 'Normal';
    specialRequirements: string[];
  }[];
  resourceAllocation: {
    staffName: string;
    assignedTasks: number;
    workloadScore: number;
    efficiency: number;
  }[];
  priorityAdjustments: {
    area: string;
    originalPriority: string;
    adjustedPriority: string;
    reason: string;
  }[];
  efficiency: {
    estimatedCompletionTime: number;
    staffUtilization: number;
    taskDistribution: {
      staff: string;
      tasks: number;
    }[];
  };
}

// 9. Intelligent Waste Management System Types
export interface WasteManagementInput {
  wasteRecords: WasteRecord[];
  historicalGeneration?: {
    date: string;
    type: 'Infectious' | 'Sharps' | 'General' | 'Chemical';
    weight: number;
    department: string;
  }[];
  collectionSchedule?: {
    day: string;
    time: string;
    type: string;
  }[];
  storageCapacity?: {
    type: string;
    currentLevel: number;
    maxCapacity: number;
  }[];
}

export interface WasteManagementResult {
  generationPredictions: {
    wasteType: 'Infectious' | 'Sharps' | 'General' | 'Chemical';
    predictedWeight: number;
    timeframe: string;
    trend: 'increasing' | 'stable' | 'decreasing';
    departmentBreakdown: {
      department: string;
      percentage: number;
    }[];
  }[];
  collectionOptimization: {
    wasteType: string;
    recommendedSchedule: {
      day: string;
      time: string;
      frequency: string;
    };
    reasoning: string;
    costSavings: number;
  }[];
  complianceAlerts: {
    type: 'Storage' | 'Segregation' | 'Documentation' | 'Disposal';
    severity: 'Critical' | 'Warning' | 'Info';
    description: string;
    location: string;
    requiredAction: string;
    deadline: string;
  }[];
  costAnalysis: {
    currentCost: number;
    optimizedCost: number;
    savings: number;
    recommendations: string[];
  }[];
  environmentalImpact: {
    carbonFootprint: number;
    recyclingRate: number;
    improvementSuggestions: string[];
  };
}

// 10. Smart Energy Management Types
export interface EnergyManagementInput {
  currentUsage?: {
    area: string;
    consumption: number; // kWh
    cost: number;
  }[];
  historicalUsage?: {
    date: string;
    hour: number;
    consumption: number;
    temperature?: number;
  }[];
  equipment?: {
    name: string;
    type: string;
    powerConsumption: number;
    operationalHours: string;
  }[];
  peakHours?: string[];
  renewableSources?: {
    type: 'Solar' | 'Wind' | 'Generator';
    capacity: number;
    currentOutput: number;
  }[];
}

export interface EnergyManagementResult {
  usageOptimization: {
    area: string;
    currentUsage: number;
    optimizedUsage: number;
    savings: number;
    recommendations: string[];
  }[];
  peakPrediction: {
    date: string;
    predictedPeakHours: string[];
    expectedDemand: number;
    suggestedActions: string[];
  }[];
  costSavings: {
    currentCost: number;
    optimizedCost: number;
    monthlySavings: number;
    yearlyProjection: number;
    implementationSteps: string[];
  }[];
  equipmentEfficiency: {
    equipment: string;
    efficiency: number;
    recommendation: 'Replace' | 'Upgrade' | 'Maintain' | 'Optimize';
    potentialSavings: number;
    paybackPeriod: number;
  }[];
  sustainability: {
    currentCarbonFootprint: number;
    reducedCarbonFootprint: number;
    renewableIntegration: {
      source: string;
      currentContribution: number;
      potentialContribution: number;
    }[];
    greenInitiatives: string[];
  };
  alerts: {
    type: 'Peak Demand' | 'Equipment Malfunction' | 'Efficiency Drop' | 'Cost Spike';
    severity: 'Critical' | 'Warning' | 'Info';
    message: string;
    affectedArea: string;
    action: string;
  }[];
}

// ============================================
// ADMINISTRATIVE AI FEATURE TYPES - Batch 3
// ============================================

// 1. AI-Powered Medical Coding Assistant Types
export interface MedicalCodingInput {
  clinicalNotes: string;
  diagnosis?: string;
  procedures?: string[];
  patientAge?: number;
  patientGender?: string;
  encounterType?: 'inpatient' | 'outpatient' | 'emergency' | 'procedure';
  providerSpecialty?: string;
}

export interface MedicalCodeSuggestion {
  code: string;
  codeSystem: 'ICD-10' | 'CPT' | 'HCPCS' | 'DRG';
  description: string;
  confidence: number;
  isPrimary: boolean;
  modifiers?: string[];
  documentationRequired: string[];
  complianceNotes?: string[];
}

export interface DRGOptimization {
  currentDRG: string;
  suggestedDRG: string;
  currentWeight: number;
  suggestedWeight: number;
  financialImpact: number;
  documentationGaps: string[];
  requiredDiagnoses: string[];
  requiredProcedures: string[];
}

export interface MedicalCodingResult {
  icdCodes: MedicalCodeSuggestion[];
  cptCodes: MedicalCodeSuggestion[];
  hcpcsCodes: MedicalCodeSuggestion[];
  drgOptimization?: DRGOptimization;
  complianceAlerts: {
    type: 'Missing Documentation' | 'Code Mismatch' | 'Unbundling Risk' | 'Upcoding Risk';
    severity: 'Critical' | 'Warning' | 'Info';
    description: string;
    recommendation: string;
  }[];
  codingQuality: {
    accuracy: number;
    completeness: number;
    specificity: number;
    overallScore: number;
  };
  suggestedDocumentation: string[];
}

// 2. Intelligent Claims Denial Predictor Types
export interface ClaimsDenialInput {
  claimId?: string;
  patientInfo: {
    age: number;
    gender: string;
    insuranceType: string;
    planType?: string;
  };
  services: {
    code: string;
    description: string;
    quantity: number;
    unitCost: number;
  }[];
  diagnosisCodes: string[];
  procedureCodes: string[];
  providerInfo?: {
    specialty: string;
    networkStatus: 'In-Network' | 'Out-of-Network';
  };
  priorAuthorization?: {
    required: boolean;
    obtained: boolean;
    authNumber?: string;
  };
  medicalNecessity?: {
    documented: boolean;
    criteria: string[];
  };
  historicalClaims?: {
    totalClaims: number;
    deniedClaims: number;
    commonDenialReasons: string[];
  };
}

export interface DenialRiskFactor {
  factor: string;
  category: 'Documentation' | 'Authorization' | 'Coding' | 'Eligibility' | 'Medical Necessity';
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  mitigationStrategy: string;
}

export interface ClaimsDenialResult {
  denialProbability: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  riskFactors: DenialRiskFactor[];
  missingInformation: {
    type: string;
    description: string;
    required: boolean;
    howToObtain: string;
  }[];
  correctiveActions: {
    priority: 'Immediate' | 'Before Submission' | 'Optional';
    action: string;
    expectedImpact: string;
  }[];
  suggestedDocumentation: {
    documentType: string;
    reason: string;
    importance: 'Required' | 'Recommended';
  }[];
  estimatedReimbursement: {
    original: number;
    optimized: number;
    potentialSavings: number;
  };
  appealPreparation?: {
    commonDenialReasons: string[];
    recommendedEvidence: string[];
    successProbability: number;
  };
}

// 3. AI-Powered Revenue Cycle Analytics Types
export interface RevenueCycleInput {
  timeframe?: string;
  currentRevenue?: number;
  historicalRevenue?: {
    month: string;
    revenue: number;
    collections: number;
    writeOffs: number;
  }[];
  arAging?: {
    days0to30: number;
    days31to60: number;
    days61to90: number;
    days90plus: number;
  };
  claimMetrics?: {
    totalClaims: number;
    paidClaims: number;
    deniedClaims: number;
    pendingClaims: number;
    averageDaysToPayment: number;
  };
  serviceMix?: {
    department: string;
    revenue: number;
    percentage: number;
  }[];
  payerMix?: {
    payer: string;
    revenue: number;
    percentage: number;
    averageReimbursement: number;
  }[];
}

export interface RevenueLeakagePoint {
  category: 'Coding' | 'Billing' | 'Collections' | 'Denials' | 'Write-offs';
  description: string;
  estimatedLoss: number;
  frequency: number;
  rootCause: string;
  remediation: string;
  potentialRecovery: number;
}

export interface RevenueCycleResult {
  revenueForecast: {
    period: string;
    predictedRevenue: number;
    confidence: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    factors: string[];
  }[];
  leakageAnalysis: RevenueLeakagePoint[];
  totalLeakage: number;
  optimizationRecommendations: {
    area: string;
    currentPerformance: number;
    targetPerformance: number;
    potentialGain: number;
    actions: string[];
    timeline: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
  kpiProjections: {
    kpi: string;
    currentValue: number;
    projectedValue: number;
    benchmark: number;
    status: 'Above Benchmark' | 'At Benchmark' | 'Below Benchmark';
  }[];
  cashFlowPrediction: {
    month: string;
    expectedCollections: number;
    expectedDisbursements: number;
    netCashFlow: number;
  }[];
  alerts: {
    type: 'Revenue Drop' | 'Denial Spike' | 'AR Growth' | 'Collection Issue';
    severity: 'Critical' | 'Warning' | 'Info';
    message: string;
    recommendedAction: string;
  }[];
}

// 4. Smart Compliance Monitoring System Types
export interface ComplianceMonitoringInput {
  facilityType?: string;
  departments?: string[];
  auditHistory?: {
    date: string;
    type: string;
    findings: string[];
    status: 'Passed' | 'Failed' | 'Pending Remediation';
  }[];
  currentPolicies?: {
    name: string;
    lastUpdated: string;
    nextReview: string;
  }[];
  incidentReports?: {
    type: string;
    date: string;
    severity: string;
  }[];
  staffTraining?: {
    module: string;
    compliance: number;
    dueDate: string;
  }[];
  regulatoryRequirements?: string[];
}

export interface ComplianceChecklist {
  category: string;
  items: {
    requirement: string;
    status: 'Compliant' | 'Non-Compliant' | 'Partial' | 'Unknown';
    evidence: string;
    lastAssessed: string;
    nextAssessment: string;
    responsibleParty: string;
  }[];
  overallStatus: 'Compliant' | 'Non-Compliant' | 'Partial';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ComplianceMonitoringResult {
  overallComplianceScore: number;
  complianceStatus: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical';
  checklists: ComplianceChecklist[];
  riskAssessment: {
    area: string;
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    riskFactors: string[];
    impact: string;
    probability: number;
    mitigationSteps: string[];
  }[];
  alerts: {
    type: 'Regulatory Change' | 'Deadline Approaching' | 'Non-Compliance' | 'Audit Finding';
    severity: 'Critical' | 'Warning' | 'Info';
    title: string;
    description: string;
    dueDate?: string;
    actionRequired: string;
  }[];
  upcomingDeadlines: {
    deadline: string;
    requirement: string;
    daysRemaining: number;
    status: 'On Track' | 'At Risk' | 'Overdue';
    assignedTo: string;
  }[];
  recommendations: {
    priority: 'Immediate' | 'Short-term' | 'Long-term';
    recommendation: string;
    rationale: string;
    estimatedEffort: string;
    impact: string;
  }[];
  regulatoryUpdates: {
    regulation: string;
    change: string;
    effectiveDate: string;
    impact: string;
    requiredActions: string[];
  }[];
}

// 5. AI-Powered Fraud Detection System Types
export interface FraudDetectionInput {
  billingData?: {
    providerId: string;
    claimId: string;
    date: string;
    services: string[];
    amount: number;
    patientId: string;
  }[];
  historicalPatterns?: {
    providerId: string;
    averageClaimAmount: number;
    claimFrequency: number;
    commonProcedures: string[];
  }[];
  flaggedEntities?: string[];
  auditTriggers?: string[];
  timeWindow?: string;
}

export interface FraudIndicator {
  type: 'Billing Anomaly' | 'Upcoding' | 'Unbundling' | 'Phantom Billing' | 'Duplicate Billing' | 'Kickback Pattern';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  evidence: string[];
  affectedClaims: string[];
  estimatedFinancialImpact: number;
  confidence: number;
}

export interface FraudDetectionResult {
  overallRiskScore: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'Normal';
  detectedAnomalies: FraudIndicator[];
  investigationAlerts: {
    alertId: string;
    type: string;
    description: string;
    entities: string[];
    recommendedAction: 'Immediate Investigation' | 'Review Required' | 'Monitor';
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
  }[];
  patternAnalysis: {
    pattern: string;
    frequency: number;
    deviation: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    affectedAreas: string[];
  }[];
  providerRiskScores: {
    providerId: string;
    providerName: string;
    riskScore: number;
    riskFactors: string[];
    historicalFlags: number;
    recommendation: string;
  }[];
  preventionRecommendations: {
    measure: string;
    description: string;
    implementation: string;
    expectedImpact: string;
  }[];
  complianceImplications: {
    regulation: string;
    concern: string;
    requiredAction: string;
  }[];
}

// 6. Intelligent Document Processing Types
export interface DocumentProcessingInput {
  documentType?: 'Medical Record' | 'Insurance Form' | 'Lab Report' | 'Prescription' | 'Consent Form' | 'Referral' | 'Discharge Summary' | 'Other';
  documentContent?: string;
  ocrData?: string;
  extractedFields?: string[];
  patientId?: string;
  language?: string;
}

export interface ExtractedInformation {
  field: string;
  value: string;
  confidence: number;
  location?: {
    page: number;
    boundingBox?: { x: number; y: number; width: number; height: number };
  };
  verified: boolean;
  requiresReview: boolean;
}

export interface DocumentProcessingResult {
  documentCategory: string;
  documentType: string;
  extractedData: ExtractedInformation[];
  classifiedSections: {
    section: string;
    content: string;
    confidence: number;
  }[];
  indexingMetadata: {
    keywords: string[];
    entities: {
      type: 'Patient' | 'Provider' | 'Medication' | 'Diagnosis' | 'Procedure' | 'Date' | 'Organization';
      name: string;
      normalizedValue?: string;
    }[];
    summary: string;
  };
  dataQuality: {
    completeness: number;
    accuracy: number;
    consistency: number;
    issues: string[];
  };
  suggestedActions: {
    action: 'Review Required' | 'Auto-Populate' | 'Link to Record' | 'Flag for Follow-up';
    field: string;
    reason: string;
  }[];
  linkedRecords: {
    type: string;
    id: string;
    confidence: number;
  }[];
  processingMetrics: {
    ocrConfidence: number;
    extractionTime: number;
    pagesProcessed: number;
  };
}

// 7. AI-Powered Audit Trail Analysis Types
export interface AuditTrailInput {
  auditLogs: AuditLog[];
  timeframe?: string;
  userRoles?: string[];
  sensitiveResources?: string[];
  anomalyThreshold?: number;
  historicalPatterns?: {
    userId: string;
    typicalAccessHours: string[];
    typicalResources: string[];
    averageActionsPerDay: number;
  }[];
}

export interface SuspiciousActivity {
  type: 'Unusual Access Time' | 'Excessive Access' | 'Unauthorized Attempt' | 'Data Exfiltration' | 'Privilege Escalation' | 'Account Compromise';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  userId: string;
  userName: string;
  description: string;
  evidence: {
    timestamp: string;
    action: string;
    resource: string;
    anomaly: string;
  }[];
  riskScore: number;
  recommendedAction: string;
}

export interface AuditTrailResult {
  overallRiskScore: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'Normal';
  suspiciousActivities: SuspiciousActivity[];
  accessPatterns: {
    resource: string;
    accessCount: number;
    uniqueUsers: number;
    peakAccessTimes: string[];
    anomalyDetected: boolean;
  }[];
  userBehaviorAnalysis: {
    userId: string;
    userName: string;
    behaviorScore: number;
    deviationFromNorm: number;
    flaggedActions: string[];
    recommendation: string;
  }[];
  complianceReport: {
    regulation: string;
    requirement: string;
    status: 'Compliant' | 'Non-Compliant' | 'Partial';
    evidence: string[];
    gaps: string[];
  }[];
  riskScoring: {
    category: string;
    score: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    contributingFactors: string[];
  }[];
  recommendations: {
    priority: 'Immediate' | 'Short-term' | 'Long-term';
    recommendation: string;
    rationale: string;
    expectedImpact: string;
  }[];
  auditSummary: {
    totalEvents: number;
    uniqueUsers: number;
    flaggedEvents: number;
    complianceScore: number;
  };
}

// 8. Smart Contract Management Types
export interface ContractManagementInput {
  contracts?: {
    id: string;
    name: string;
    type: 'Vendor' | 'Service' | 'Employment' | 'Lease' | 'Insurance' | 'Other';
    startDate: string;
    endDate: string;
    value: number;
    status: 'Active' | 'Expired' | 'Pending Renewal' | 'Under Review';
    parties: string[];
    keyTerms?: string[];
  }[];
  upcomingRenewals?: string[];
  expiringContracts?: string[];
  vendorPerformance?: {
    vendorId: string;
    vendorName: string;
    performanceScore: number;
    issues: string[];
  }[];
}

export interface ContractAnalysis {
  contractId: string;
  contractName: string;
  keyTerms: {
    term: string;
    value: string;
    importance: 'Critical' | 'Important' | 'Standard';
  }[];
  obligations: {
    party: string;
    obligation: string;
    deadline?: string;
    status: 'Pending' | 'Fulfilled' | 'Overdue';
  }[];
  risks: {
    risk: string;
    severity: 'High' | 'Medium' | 'Low';
    mitigation: string;
  }[];
  opportunities: {
    opportunity: string;
    potentialBenefit: string;
    action: string;
  }[];
}

export interface ContractManagementResult {
  expiryAlerts: {
    contractId: string;
    contractName: string;
    daysUntilExpiry: number;
    type: string;
    value: number;
    impact: string;
    recommendedAction: 'Renew' | 'Renegotiate' | 'Terminate' | 'Review';
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
  }[];
  renewalRecommendations: {
    contractId: string;
    contractName: string;
    recommendation: 'Renew' | 'Renegotiate' | 'Terminate' | 'Alternative Vendor';
    reasoning: string;
    suggestedTerms: {
      term: string;
      currentValue: string;
      suggestedValue: string;
      rationale: string;
    }[];
    estimatedSavings: number;
  }[];
  contractAnalyses: ContractAnalysis[];
  vendorInsights: {
    vendor: string;
    totalContracts: number;
    totalValue: number;
    performanceScore: number;
    riskLevel: 'High' | 'Medium' | 'Low';
    recommendation: string;
  }[];
  complianceStatus: {
    contract: string;
    requirement: string;
    status: 'Compliant' | 'Non-Compliant' | 'Unknown';
    action: string;
  }[];
  costOptimization: {
    area: string;
    currentCost: number;
    optimizedCost: number;
    savings: number;
    method: string;
  }[];
}

// 9. AI-Powered Policy Management Types
export interface PolicyManagementInput {
  policies?: {
    id: string;
    name: string;
    category: string;
    version: string;
    effectiveDate: string;
    lastReviewDate: string;
    nextReviewDate: string;
    status: 'Active' | 'Draft' | 'Under Review' | 'Archived';
    owner: string;
  }[];
  regulatoryChanges?: {
    regulation: string;
    changeDate: string;
    description: string;
    affectedPolicies: string[];
  }[];
  complianceGaps?: string[];
  organizationType?: string;
}

export interface PolicyGap {
  policyId: string;
  policyName: string;
  gapType: 'Missing Requirement' | 'Outdated Language' | 'Incomplete Coverage' | 'Conflicting Provisions';
  description: string;
  regulatoryReference: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  remediation: string;
  deadline?: string;
}

export interface PolicyManagementResult {
  versionControl: {
    policyId: string;
    policyName: string;
    currentVersion: string;
    latestVersion: string;
    changes: {
      version: string;
      date: string;
      changes: string[];
      author: string;
    }[];
    updateRequired: boolean;
  }[];
  gapAnalysis: PolicyGap[];
  updateRecommendations: {
    policyId: string;
    policyName: string;
    recommendation: 'Update Required' | 'Review Recommended' | 'Archive' | 'Consolidate';
    reasoning: string;
    suggestedChanges: {
      section: string;
      currentText: string;
      suggestedText: string;
      reason: string;
    }[];
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    estimatedEffort: string;
  }[];
  complianceMapping: {
    regulation: string;
    requirement: string;
    coveredByPolicy: string;
    coverage: 'Full' | 'Partial' | 'None';
    gaps: string[];
  }[];
  reviewSchedule: {
    policy: string;
    nextReview: string;
    daysUntilReview: number;
    reviewer: string;
    status: 'On Schedule' | 'Overdue' | 'Due Soon';
  }[];
  alerts: {
    type: 'Review Overdue' | 'Regulatory Change' | 'Gap Identified' | 'Version Conflict';
    severity: 'Critical' | 'Warning' | 'Info';
    policy: string;
    message: string;
    action: string;
  }[];
}

// 10. Intelligent Reporting Assistant Types
export interface ReportingInput {
  reportType?: string;
  dataScope?: {
    startDate: string;
    endDate: string;
    departments?: string[];
    metrics?: string[];
  };
  requestedMetrics?: string[];
  format?: 'Summary' | 'Detailed' | 'Executive' | 'Technical';
  audience?: 'Leadership' | 'Clinical' | 'Administrative' | 'Regulatory';
  previousReports?: {
    type: string;
    date: string;
    keyFindings: string[];
  }[];
}

export interface ReportMetric {
  name: string;
  value: number | string;
  unit?: string;
  trend?: 'increasing' | 'stable' | 'decreasing';
  comparison?: {
    benchmark: number;
    status: 'Above' | 'At' | 'Below';
    percentageDifference: number;
  };
  significance: string;
}

export interface ReportSection {
  title: string;
  content: string;
  metrics: ReportMetric[];
  insights: string[];
  recommendations: string[];
  visualizations?: {
    type: 'chart' | 'table' | 'graph';
    data: any;
    description: string;
  }[];
}

export interface ReportingResult {
  reportTitle: string;
  reportType: string;
  generatedAt: string;
  executiveSummary: string;
  sections: ReportSection[];
  keyFindings: {
    finding: string;
    importance: 'Critical' | 'High' | 'Medium' | 'Low';
    supportingData: string[];
    actionRequired: boolean;
  }[];
  naturalLanguageSummary: string;
  recommendations: {
    recommendation: string;
    rationale: string;
    priority: 'Immediate' | 'Short-term' | 'Long-term';
    expectedImpact: string;
    implementationSteps: string[];
  }[];
  customReportBuilder: {
    suggestedMetrics: string[];
    suggestedVisualizations: {
      type: string;
      metrics: string[];
      purpose: string;
    }[];
    suggestedFilters: {
      filter: string;
      options: string[];
      default: string;
    }[];
  };
  dataQuality: {
    completeness: number;
    accuracy: number;
    timeliness: number;
    notes: string[];
  };
  exportFormats: ('PDF' | 'Excel' | 'CSV' | 'JSON')[];
}

// ============================================
// PATIENT-FACING AI FEATURE TYPES - Batch 4
// ============================================

// 1. AI Health Chatbot Types
export interface HealthChatbotInput {
  message: string;
  conversationHistory?: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
  patientContext?: {
    age?: number;
    gender?: string;
    knownConditions?: string[];
    currentMedications?: string[];
    allergies?: string[];
  };
  sessionType?: 'general' | 'symptom_inquiry' | 'appointment_help' | 'medication_question' | 'health_tips';
  language?: string;
}

export interface HealthChatbotResult {
  response: string;
  intent: 'general_inquiry' | 'symptom_assessment' | 'appointment_booking' | 'medication_reminder' | 'health_education' | 'emergency_alert' | 'triage_recommendation';
  sentiment: 'concerned' | 'neutral' | 'anxious' | 'urgent' | 'curious';
  suggestedActions: {
    action: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    link?: string;
  }[];
  followUpQuestions: string[];
  resources: {
    title: string;
    type: 'article' | 'video' | 'tool' | 'contact';
    url?: string;
    description: string;
  }[];
  escalationRequired: boolean;
  emergencyDetected: boolean;
  confidence: number;
}

// 2. AI-Powered Symptom Checker Types
export interface SymptomCheckerInput {
  symptoms: {
    name: string;
    severity: 'mild' | 'moderate' | 'severe';
    duration: string;
    location?: string;
    triggers?: string[];
    relievingFactors?: string[];
    associatedSymptoms?: string[];
  }[];
  patientInfo: {
    age: number;
    gender: string;
    medicalHistory?: string[];
    currentMedications?: string[];
    allergies?: string[];
    recentTravel?: string;
    immunizationStatus?: string;
  };
  vitalSigns?: {
    temperature?: number;
    heartRate?: number;
    bloodPressure?: string;
    respiratoryRate?: number;
    oxygenSaturation?: number;
  };
}

export interface SymptomCondition {
  condition: string;
  probability: number;
  icdCode?: string;
  description: string;
  matchingSymptoms: string[];
  missingSymptoms: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  requiresMedicalAttention: boolean;
  typicalDuration: string;
  selfCareOptions: string[];
}

export interface SymptomCheckerResult {
  possibleConditions: SymptomCondition[];
  urgencyLevel: 'self_care' | 'schedule_appointment' | 'urgent_care' | 'emergency';
  urgencyReasoning: string;
  recommendedActions: {
    action: string;
    timeframe: string;
    reason: string;
  }[];
  redFlags: {
    symptom: string;
    description: string;
    action: string;
  }[];
  recommendedSpecialists: {
    specialty: string;
    reason: string;
    urgency: 'routine' | 'urgent' | 'immediate';
  }[];
  homeRemedies: {
    remedy: string;
    instructions: string;
    precautions: string[];
  }[];
  whenToSeekCare: string[];
  followUpTimeline: string;
  disclaimer: string;
}

// 3. Intelligent Appointment Scheduling Assistant Types
export interface AppointmentSchedulingInput {
  patientPreferences: {
    preferredDates?: string[];
    preferredTimes?: string[];
    preferredDays?: string[];
    preferredProviders?: string[];
    locationPreference?: 'nearest' | 'any' | 'specific';
    urgencyLevel?: 'routine' | 'urgent' | 'emergency';
    languagePreference?: string;
    accessibilityNeeds?: string[];
  };
  appointmentType: string;
  reasonForVisit?: string;
  insuranceInfo?: {
    provider: string;
    planType: string;
    requiresReferral: boolean;
  };
  patientHistory?: {
    previousVisits: {
      date: string;
      provider: string;
      department: string;
    }[];
    chronicConditions: string[];
    lastVisit?: string;
  };
  availableSlots?: {
    id: string;
    providerId: string;
    providerName: string;
    specialty: string;
    date: string;
    time: string;
    location: string;
    waitTime?: number;
  }[];
}

export interface AppointmentSlotRecommendation {
  slotId: string;
  providerName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  matchScore: number;
  reasons: string[];
  estimatedWaitTime: number;
  providerMatchReasons: string[];
  travelTime?: number;
  alternativeOptions?: string[];
}

export interface AppointmentSchedulingResult {
  recommendedSlots: AppointmentSlotRecommendation[];
  providerMatches: {
    providerId: string;
    providerName: string;
    specialty: string;
    matchScore: number;
    matchReasons: string[];
    availability: string;
    patientRating?: number;
    experience?: string;
  }[];
  waitTimePredictions: {
    date: string;
    predictedWait: number;
    confidence: number;
    factors: string[];
  }[];
  reschedulingSuggestions: {
    originalAppointment?: string;
    suggestedChanges: string[];
    reason: string;
    benefits: string[];
  }[];
  preparationReminders: {
    timing: string;
    reminder: string;
    importance: string;
  }[];
  insuranceConsiderations: {
    coverage: string;
    estimatedCost: string;
    referralRequired: boolean;
    preAuthorizationNeeded: boolean;
  };
  optimizationTips: string[];
}

// 4. AI-Powered Post-Discharge Follow-Up System Types
export interface DischargeFollowUpInput {
  patientInfo: {
    patientId: string;
    name: string;
    age: number;
    gender: string;
    contactNumber?: string;
    email?: string;
  };
  dischargeDetails: {
    dischargeDate: string;
    diagnosis: string;
    procedures?: string[];
    dischargeSummary: string;
    lengthOfStay: number;
    dischargeDestination: 'home' | 'rehab' | 'nursing_facility' | 'other';
  };
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }[];
  followUpInstructions: string[];
  warningSigns: string[];
  activityRestrictions: string[];
  dietaryRestrictions?: string[];
  appointments?: {
    type: string;
    provider: string;
    date: string;
  }[];
  riskFactors: {
    readmissionRiskScore?: number;
    chronicConditions?: string[];
    previousAdmissions?: number;
    socialSupport?: 'strong' | 'moderate' | 'limited';
    mobilityStatus?: string;
  };
}

export interface FollowUpSchedule {
  type: 'phone_call' | 'video_call' | 'in_person' | 'home_visit';
  scheduledDate: string;
  purpose: string;
  priority: 'high' | 'medium' | 'low';
  checklistItems: string[];
}

export interface RecoveryMilestone {
  milestone: string;
  expectedDate: string;
  indicators: string[];
  warningSigns: string[];
  achievedDate?: string;
  status: 'pending' | 'on_track' | 'delayed' | 'achieved';
}

export interface DischargeFollowUpResult {
  followUpSchedule: FollowUpSchedule[];
  recoveryMilestones: RecoveryMilestone[];
  medicationAdherencePlan: {
    medication: string;
    schedule: string[];
    reminders: {
      timing: string;
      message: string;
    }[];
    potentialIssues: string[];
    adherenceTips: string[];
  }[];
  readmissionRiskAssessment: {
    riskLevel: 'low' | 'moderate' | 'high' | 'very_high';
    riskScore: number;
    riskFactors: string[];
    protectiveFactors: string[];
    mitigationStrategies: string[];
  };
  warningSignMonitoring: {
    sign: string;
    description: string;
    actionToTake: string;
    urgencyLevel: 'emergency' | 'urgent' | 'routine';
    contactNumber?: string;
  }[];
  progressTracking: {
    metric: string;
    baseline: string;
    target: string;
    current?: string;
    measurementFrequency: string;
  }[];
  alerts: {
    type: 'missed_medication' | 'missed_appointment' | 'warning_sign' | 'milestone_delay' | 'high_risk';
    message: string;
    severity: 'info' | 'warning' | 'critical';
    recommendedAction: string;
  }[];
  educationalResources: {
    topic: string;
    format: 'video' | 'article' | 'infographic';
    url?: string;
    summary: string;
  }[];
}

// 5. Personalized Health Education Generator Types
export interface HealthEducationInput {
  patientInfo: {
    age: number;
    gender: string;
    educationLevel?: string;
    language?: string;
    learningPreferences?: ('reading' | 'video' | 'interactive' | 'audio')[];
  };
  healthContext: {
    conditions: string[];
    medications?: string[];
    recentProcedures?: string[];
    upcomingProcedures?: string[];
    labResults?: {
      test: string;
      result: string;
      interpretation?: string;
    }[];
  };
  educationGoals: ('understand_condition' | 'treatment_options' | 'medication_management' | 'lifestyle_changes' | 'prevention' | 'recovery')[];
  specificQuestions?: string[];
  culturalConsiderations?: string[];
}

export interface HealthEducationContent {
  title: string;
  category: string;
  summary: string;
  detailedContent: string;
  keyPoints: string[];
  format: 'text' | 'video' | 'infographic' | 'interactive';
  readingLevel: 'basic' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  relatedTopics: string[];
}

export interface HealthEducationResult {
  primaryContent: HealthEducationContent;
  conditionExplanation: {
    condition: string;
    whatItIs: string;
    causes: string[];
    symptoms: string[];
    progression: string;
    prognosis: string;
  }[];
  treatmentInformation: {
    treatment: string;
    howItWorks: string;
    benefits: string[];
    risks: string[];
    alternatives: string[];
    whatToExpect: string;
  }[];
  lifestyleRecommendations: {
    category: 'diet' | 'exercise' | 'sleep' | 'stress_management' | 'habits';
    recommendation: string;
    rationale: string;
    implementationTips: string[];
    expectedBenefits: string;
  }[];
  preventiveCare: {
    screening: string;
    frequency: string;
    importance: string;
    nextDue?: string;
  }[];
  medicationEducation: {
    medication: string;
    purpose: string;
    howToTake: string;
    sideEffects: string[];
    interactions: string[];
    storage: string;
    missedDose: string;
  }[];
  faqs: {
    question: string;
    answer: string;
    category: string;
  }[];
  resources: {
    title: string;
    type: 'article' | 'video' | 'support_group' | 'app' | 'hotline';
    url?: string;
    description: string;
  }[];
  actionPlan: {
    goal: string;
    steps: string[];
    timeline: string;
    successMetrics: string;
  }[];
}

// 6. AI-Powered Medication Reminder System Types
export interface MedicationReminderInput {
  patientInfo: {
    patientId: string;
    name: string;
    age: number;
    timezone?: string;
    contactMethods: ('sms' | 'email' | 'app' | 'phone_call')[];
  };
  medications: {
    medicationId: string;
    name: string;
    dosage: string;
    frequency: string;
    times: string[];
    startDate: string;
    endDate?: string;
    instructions: string;
    foodRequirements?: 'with_food' | 'empty_stomach' | 'no_restriction';
    specialInstructions?: string;
    refillDate?: string;
    prescriber?: string;
  }[];
  currentMedications?: string[];
  allergies?: string[];
  preferences: {
    reminderLeadTime: number; // minutes before
    snoozeDuration: number; // minutes
    maxSnoozes: number;
    quietHoursStart?: string;
    quietHoursEnd?: string;
  };
  adherenceHistory?: {
    medicationId: string;
    takenCount: number;
    missedCount: number;
    skippedCount: number;
    averageDelayMinutes: number;
  }[];
}

export interface MedicationSchedule {
  medicationId: string;
  medicationName: string;
  scheduledTime: string;
  dosage: string;
  instructions: string;
  status: 'pending' | 'taken' | 'missed' | 'skipped';
  reminderSent: boolean;
  snoozeCount: number;
}

export interface DrugInteractionWarning {
  medication1: string;
  medication2: string;
  severity: 'mild' | 'moderate' | 'severe' | 'contraindicated';
  interaction: string;
  symptoms: string[];
  recommendation: string;
  actionRequired: boolean;
}

export interface MedicationReminderResult {
  optimizedSchedule: MedicationSchedule[];
  interactionWarnings: DrugInteractionWarning[];
  refillReminders: {
    medication: string;
    currentSupply: number;
    daysRemaining: number;
    refillDate: string;
    pharmacyContact?: string;
    reorderUrl?: string;
  }[];
  adherenceReport: {
    overallAdherence: number;
    medicationBreakdown: {
      medication: string;
      adherenceRate: number;
      missedDoses: number;
      pattern: string;
    }[];
    trends: {
      period: string;
      adherence: number;
      improvement: number;
    }[];
    insights: string[];
  };
  personalizedReminders: {
    medication: string;
    time: string;
    message: string;
    tone: 'gentle' | 'standard' | 'urgent';
    additionalContext: string;
  }[];
  sideEffectMonitoring: {
    medication: string;
    commonSideEffects: string[];
    seriousSideEffects: string[];
    whenToReport: string[];
    reportingInstructions: string;
  }[];
  adherenceImprovementTips: {
    tip: string;
    reason: string;
    implementation: string;
    expectedImpact: string;
  }[];
}

// 7. Intelligent Patient Feedback Analyzer Types
export interface PatientFeedbackInput {
  feedbackItems: {
    id: string;
    patientId?: string;
    department?: string;
    provider?: string;
    date: string;
    rating?: number;
    category: 'overall' | 'clinical_care' | 'nursing' | 'facilities' | 'food' | 'billing' | 'discharge' | 'other';
    feedback: string;
    responseSource: 'survey' | 'online_review' | 'complaint' | 'compliment' | 'suggestion';
    patientDemographics?: {
      ageGroup?: string;
      gender?: string;
      visitType?: 'inpatient' | 'outpatient' | 'emergency';
    };
  }[];
  analysisScope?: 'individual' | 'department' | 'organization';
  timeframe?: string;
  previousAnalysis?: {
    averageRating: number;
    topIssues: string[];
    improvementAreas: string[];
  };
}

export interface SentimentAnalysis {
  overallSentiment: 'very_positive' | 'positive' | 'neutral' | 'negative' | 'very_negative';
  sentimentScore: number; // -1 to 1
  emotionalTone: ('grateful' | 'frustrated' | 'satisfied' | 'disappointed' | 'angry' | 'hopeful' | 'anxious' | 'confused')[];
  keyPhrases: {
    phrase: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    frequency: number;
  }[];
  aspectSentiments: {
    aspect: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
    mentions: number;
  }[];
}

export interface FeedbackTrend {
  category: string;
  trend: 'improving' | 'declining' | 'stable';
  changePercentage: number;
  dataPoints: {
    period: string;
    value: number;
  }[];
  significance: string;
}

export interface PatientFeedbackResult {
  sentimentAnalysis: SentimentAnalysis;
  identifiedIssues: {
    issue: string;
    category: string;
    severity: 'critical' | 'major' | 'minor';
    frequency: number;
    affectedDepartments: string[];
    exampleQuotes: string[];
    rootCauseHypothesis: string;
  }[];
  positiveHighlights: {
    highlight: string;
    category: string;
    frequency: number;
    departments: string[];
    exampleQuotes: string[];
  }[];
  trends: FeedbackTrend[];
  actionableInsights: {
    insight: string;
    category: string;
    impact: 'high' | 'medium' | 'low';
    effort: 'quick_win' | 'moderate' | 'significant';
    recommendation: string;
    expectedOutcome: string;
    priority: number;
  }[];
  serviceImprovements: {
    area: string;
    currentScore: number;
    targetScore: number;
    gap: number;
    recommendations: string[];
    timeline: string;
    resources: string[];
  }[];
  providerFeedback: {
    providerId?: string;
    providerName: string;
    department: string;
    averageRating: number;
    feedbackCount: number;
    strengths: string[];
    areasForImprovement: string[];
    patientComments: string[];
  }[];
  departmentAnalysis: {
    department: string;
    averageRating: number;
    feedbackVolume: number;
    topStrengths: string[];
    topConcerns: string[];
    comparisonToAverage: number;
  }[];
  responseRecommendations: {
    feedbackId: string;
    responseType: 'acknowledge' | 'apologize' | 'clarify' | 'compensate' | 'escalate';
    suggestedResponse: string;
    tone: 'formal' | 'warm' | 'empathetic';
    followUpActions: string[];
  }[];
  executiveSummary: {
    totalFeedbackAnalyzed: number;
    overallSatisfactionScore: number;
    npsScore?: number;
    keyStrengths: string[];
    criticalIssues: string[];
    topPriorities: string[];
    progressFromLastPeriod: string;
  };
}

// ============================================
// PREDICTIVE ANALYTICS AI TYPES (Batch 5)
// ============================================

// 1. Patient Readmission Risk Predictor Types
export interface ReadmissionRiskInput {
  patientId: string;
  patientInfo: {
    age: number;
    gender: string;
    admissionDate: string;
    dischargeDate?: string;
    lengthOfStay?: number;
  };
  diagnosis: {
    primary: string;
    secondary?: string[];
    icdCodes?: string[];
  };
  medicalHistory: {
    conditions: string[];
    previousAdmissions: number;
    previousAdmissionsLast30Days: number;
    previousAdmissionsLast90Days: number;
    chronicConditions: string[];
  };
  currentVisit: {
    department: string;
    admissionType: 'emergency' | 'elective' | 'urgent' | 'transfer';
    procedures?: string[];
    complications?: string[];
    dischargeDisposition?: 'home' | 'snf' | 'rehab' | 'other';
  };
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
  };
  labResults?: {
    testName: string;
    value: string;
    isAbnormal: boolean;
  }[];
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  socialDeterminants?: {
    livingArrangement?: string;
    supportSystem?: string;
    transportationAccess?: boolean;
    insuranceType?: string;
  };
}

export interface ReadmissionRiskFactor {
  factor: string;
  category: 'clinical' | 'demographic' | 'social' | 'utilization';
  impact: 'high' | 'medium' | 'low';
  description: string;
  modifiable: boolean;
  currentValue?: string;
  optimalValue?: string;
}

export interface PreventiveIntervention {
  intervention: string;
  category: 'pre-discharge' | 'post-discharge' | 'follow-up' | 'medication' | 'education';
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  expectedImpact: string;
  timeframe: string;
  responsibleParty: string;
  resources: string[];
}

export interface ReadmissionRiskResult {
  riskScore: number; // 0-100
  riskLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  predictedReadmissionProbability: number;
  riskFactors: ReadmissionRiskFactor[];
  topRiskFactors: string[];
  preventiveInterventions: PreventiveIntervention[];
  recommendedFollowUp: {
    timeframe: string;
    type: 'in-person' | 'telehealth' | 'phone';
    department?: string;
    reason: string;
  }[];
  carePlanAdjustments: {
    area: string;
    currentApproach: string;
    recommendedChange: string;
    rationale: string;
  }[];
  departmentComparison: {
    department: string;
    averageRisk: number;
    patientRisk: number;
    percentile: number;
  };
  historicalTrend: {
    period: string;
    riskScore: number;
    readmitted: boolean;
  }[];
  explanation: string;
  disclaimer: string;
}

// 2. AI-Powered Disease Outbreak Detection Types
export interface OutbreakDetectionInput {
  facilityInfo: {
    type: string;
    capacity: number;
    location: {
      region: string;
      city: string;
      coordinates?: { lat: number; lng: number };
    };
  };
  timeRange: {
    startDate: string;
    endDate: string;
  };
  patientData: {
    date: string;
    department: string;
    diagnoses: {
      icdCode: string;
      description: string;
      count: number;
    }[];
    symptoms: {
      symptom: string;
      count: number;
    }[];
    demographics: {
      ageGroup: string;
      count: number;
    }[];
  }[];
  historicalBaseline?: {
    period: string;
    condition: string;
    averageCases: number;
    standardDeviation: number;
  }[];
  externalData?: {
    source: string;
    data: {
      condition: string;
      region: string;
      cases: number;
    }[];
  }[];
  currentAlerts?: {
    type: string;
    condition: string;
    severity: string;
  }[];
}

export interface GeographicCluster {
  id: string;
  condition: string;
  centerLocation: {
    region: string;
    coordinates?: { lat: number; lng: number };
  };
  radius: number; // in km
  caseCount: number;
  expectedCases: number;
  relativeRisk: number;
  pValue: number;
  affectedAreas: string[];
  onsetDate: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface OutbreakAlert {
  id: string;
  condition: string;
  alertType: 'potential_outbreak' | 'confirmed_outbreak' | 'cluster_detected' | 'threshold_exceeded';
  severity: 'watch' | 'warning' | 'alert' | 'emergency';
  description: string;
  affectedDepartments: string[];
  caseCount: number;
  expectedCount: number;
  deviationFromBaseline: number;
  firstDetected: string;
  lastUpdated: string;
  recommendedActions: {
    action: string;
    priority: 'immediate' | 'urgent' | 'routine';
    responsibleParty: string;
  }[];
  publicHealthNotification: boolean;
  isolationProtocols?: string[];
}

export interface OutbreakDetectionResult {
  overallRiskLevel: 'normal' | 'elevated' | 'high' | 'critical';
  activeAlerts: OutbreakAlert[];
  geographicClusters: GeographicCluster[];
  conditionAnalysis: {
    condition: string;
    icdCode: string;
    currentCases: number;
    expectedCases: number;
    deviationPercentage: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    affectedDepartments: string[];
    riskLevel: 'normal' | 'elevated' | 'high' | 'critical';
    firstCaseDate: string;
    mostRecentCase: string;
  }[];
  symptomPatterns: {
    symptom: string;
    frequency: number;
    associatedConditions: string[];
    trend: 'increasing' | 'stable' | 'decreasing';
  }[];
  predictions: {
    condition: string;
    predictedCasesNext7Days: number;
    confidence: number;
    peakDate?: string;
    peakCases?: number;
  }[];
  resourceImpact: {
    resource: string;
    currentUtilization: number;
    predictedUtilization: number;
    shortageRisk: boolean;
    recommendation: string;
  }[];
  publicHealthRecommendations: {
    recommendation: string;
    category: 'surveillance' | 'prevention' | 'communication' | 'resource';
    priority: 'immediate' | 'urgent' | 'routine';
    rationale: string;
  }[];
  historicalComparison: {
    period: string;
    similarOutbreak: string;
    outcome: string;
    lessonsLearned: string[];
  }[];
  executiveSummary: string;
  lastAnalyzed: string;
}

// 3. Patient Length of Stay Predictor Types
export interface LengthOfStayInput {
  patientId: string;
  patientInfo: {
    age: number;
    gender: string;
    bmi?: number;
  };
  admission: {
    date: string;
    type: 'emergency' | 'elective' | 'urgent' | 'transfer';
    department: string;
    source: 'home' | 'transfer' | 'nursing_facility' | 'other';
  };
  diagnosis: {
    primary: string;
    secondary?: string[];
    icdCodes?: string[];
    severity?: 'mild' | 'moderate' | 'severe' | 'critical';
  };
  procedures?: {
    name: string;
    date: string;
    type: 'surgical' | 'diagnostic' | 'therapeutic';
    complexity?: 'minor' | 'moderate' | 'major' | 'complex';
  }[];
  vitals?: {
    date: string;
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
  }[];
  labResults?: {
    date: string;
    testName: string;
    value: string;
    isAbnormal: boolean;
  }[];
  complications?: string[];
  functionalStatus?: {
    mobility: 'independent' | 'assisted' | 'dependent';
    adlScore?: number; // Activities of Daily Living
  };
  socialFactors?: {
    livingArrangement: string;
    supportSystem: 'strong' | 'moderate' | 'limited' | 'none';
    dischargeDestination?: 'home' | 'rehab' | 'snf' | 'other';
  };
  hospitalFactors?: {
    bedAvailability: number;
    staffingRatio: number;
    averageLOSForDiagnosis: number;
  };
}

export interface LOSRiskFactor {
  factor: string;
  category: 'clinical' | 'demographic' | 'social' | 'institutional';
  impact: 'prolonging' | 'shortening';
  magnitude: 'high' | 'medium' | 'low';
  description: string;
  modifiable: boolean;
}

export interface DischargeMilestone {
  milestone: string;
  targetDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  dependencies: string[];
  responsibleParty: string;
  notes?: string;
}

export interface LengthOfStayResult {
  predictedLOS: number; // in days
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  predictedDischargeDate: string;
  riskLevel: 'short' | 'average' | 'prolonged' | 'significantly_prolonged';
  losFactors: LOSRiskFactor[];
  prolongedStayRisk: number; // percentage
  comparisonToBenchmark: {
    diagnosis: string;
    predictedLOS: number;
    benchmarkLOS: number;
    variance: number;
    percentile: number;
  };
  dischargeMilestones: DischargeMilestone[];
  dischargePlanning: {
    estimatedDischargeDate: string;
    dischargeDestination: string;
    preparationRequired: string[];
    barriers: {
      barrier: string;
      severity: 'high' | 'medium' | 'low';
      mitigation: string;
    }[];
    servicesNeeded: string[];
  };
  resourcePlanning: {
    resource: string;
    daysNeeded: number;
    startDate: string;
    endDate: string;
    notes: string;
  }[];
  optimizationRecommendations: {
    recommendation: string;
    potentialDaysSaved: number;
    priority: 'high' | 'medium' | 'low';
    implementation: string;
    barriers: string[];
  }[];
  dailyPredictions: {
    day: number;
    date: string;
    cumulativeProbability: number;
    keyFactors: string[];
  }[];
  alerts: {
    type: 'delay_risk' | 'milestone_missed' | 'barrier_identified' | 'resource_constraint';
    message: string;
    severity: 'info' | 'warning' | 'critical';
    action: string;
  }[];
  explanation: string;
}

// 4. AI-Powered Mortality Risk Assessment Types
export interface MortalityRiskInput {
  patientId: string;
  patientInfo: {
    age: number;
    gender: string;
    ethnicity?: string;
  };
  admission: {
    date: string;
    type: 'emergency' | 'elective' | 'urgent' | 'transfer';
    department: string;
    icuAdmission: boolean;
    icuDays?: number;
  };
  diagnosis: {
    primary: string;
    secondary?: string[];
    icdCodes?: string[];
    stage?: string;
    metastasis?: boolean;
  };
  vitals: {
    date: string;
    systolicBP: number;
    diastolicBP: number;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    glasgowComaScale?: number;
  }[];
  labResults: {
    date: string;
    testName: string;
    value: string;
    isAbnormal: boolean;
  }[];
  scores?: {
    apacheII?: number;
    sofa?: number;
    charlsonComorbidityIndex?: number;
    frailtyScore?: number;
  };
  medicalHistory: {
    conditions: string[];
    surgeries: string[];
    allergies: string[];
  };
  currentStatus: {
    consciousness: 'alert' | 'drowsy' | 'stupor' | 'coma';
    ventilation: boolean;
    vasopressors: boolean;
    dialysis: boolean;
    cpr: boolean;
  };
  interventions?: {
    type: string;
    date: string;
    outcome: string;
  }[];
  goalsOfCare?: {
    documented: boolean;
    type?: 'full_code' | 'dni' | 'dnr' | 'comfort_care';
    lastUpdated?: string;
  };
}

export interface MortalityRiskFactor {
  factor: string;
  category: 'clinical' | 'physiological' | 'laboratory' | 'demographic';
  weight: number;
  description: string;
  contribution: number; // percentage contribution to overall risk
  modifiable: boolean;
  interventionOptions?: string[];
}

export interface ClinicalRecommendation {
  recommendation: string;
  category: 'monitoring' | 'intervention' | 'consultation' | 'goals_of_care';
  priority: 'immediate' | 'urgent' | 'routine';
  rationale: string;
  expectedImpact: string;
  evidenceLevel: 'high' | 'moderate' | 'low';
  references?: string[];
}

export interface FamilyCommunicationGuide {
  topic: string;
  keyPoints: string[];
  suggestedLanguage: string;
  sensitivityLevel: 'standard' | 'elevated' | 'high';
  supportResources: string[];
}

export interface MortalityRiskResult {
  riskScore: number; // 0-100
  riskLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  mortalityProbability: {
    inHospital: number;
    thirtyDay: number;
    ninetyDay: number;
    oneYear: number;
  };
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  riskFactors: MortalityRiskFactor[];
  topContributingFactors: string[];
  clinicalRecommendations: ClinicalRecommendation[];
  monitoringRequirements: {
    parameter: string;
    frequency: string;
    threshold: string;
    action: string;
  }[];
  icuRecommendation: {
    recommended: boolean;
    reason: string;
    timing: 'immediate' | 'within_hours' | 'consider' | 'not_indicated';
    alternatives?: string[];
  };
  prognosis: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
    uncertainties: string[];
  };
  familyCommunication: FamilyCommunicationGuide[];
  goalsOfCareRecommendations: {
    currentStatus: string;
    recommendation: string;
    discussionPoints: string[];
    documentationNeeded: string[];
  };
  comparativeAnalysis: {
    metric: string;
    patientValue: number;
    unitAverage: number;
    benchmark: number;
    interpretation: string;
  }[];
  trajectoryPrediction: {
    timeframe: string;
    predictedStatus: string;
    confidence: number;
    keyDeterminants: string[];
  }[];
  alerts: {
    type: 'critical_deterioration' | 'significant_change' | 'care_escalation' | 'goals_review';
    message: string;
    severity: 'info' | 'warning' | 'critical';
    action: string;
  }[];
  explanation: string;
  disclaimer: string;
  lastUpdated: string;
}

// 5. Predictive Health Trend Analyzer Types
export interface HealthTrendInput {
  facilityInfo: {
    type: string;
    capacity: number;
    departments: string[];
  };
  timeRange: {
    startDate: string;
    endDate: string;
  };
  historicalData: {
    period: string;
    metrics: {
      patientVolume: number;
      admissions: number;
      emergencyVisits: number;
      surgeries: number;
      outpatientVisits: number;
      averageLOS: number;
      readmissionRate: number;
      mortalityRate: number;
      infectionRate: number;
      bedOccupancy: number;
      staffUtilization: number;
    };
  }[];
  currentResources: {
    beds: { total: number; available: number };
    staff: { physicians: number; nurses: number; support: number };
    equipment: { type: string; count: number; utilization: number }[];
  };
  externalFactors?: {
    season: string;
    weatherData?: { date: string; temperature: number; humidity: number }[];
    publicHealthEvents?: string[];
    localEvents?: string[];
  };
  specificQueries?: string[];
}

export interface TrendPrediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  changePercentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
  timeframe: string;
  keyDrivers: string[];
  seasonality: boolean;
  historicalPattern: string;
}

export interface ResourceDemandForecast {
  resource: string;
  currentDemand: number;
  predictedDemand: number;
  peakDemand: number;
  peakDate: string;
  shortageRisk: boolean;
  shortageSeverity?: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  utilizationForecast: {
    date: string;
    demand: number;
    capacity: number;
    utilization: number;
  }[];
}

export interface SeasonalPattern {
  condition: string;
  peakSeason: string;
  lowSeason: string;
  averageCases: number;
  seasonalVariation: number; // percentage
  currentStatus: 'approaching_peak' | 'peak' | 'declining' | 'low';
  preparationRecommendations: string[];
}

export interface StrategicInsight {
  insight: string;
  category: 'capacity' | 'workforce' | 'clinical' | 'financial' | 'quality';
  impact: 'high' | 'medium' | 'low';
  timeframe: 'immediate' | 'short_term' | 'medium_term' | 'long_term';
  description: string;
  supportingData: string[];
  recommendations: string[];
  risks: string[];
  opportunities: string[];
}

export interface HealthTrendResult {
  overallTrends: TrendPrediction[];
  populationHealthPredictions: {
    condition: string;
    currentPrevalence: number;
    predictedPrevalence: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    atRiskPopulation: number;
    preventionOpportunities: string[];
  }[];
  resourceDemandForecasts: ResourceDemandForecast[];
  seasonalPatterns: SeasonalPattern[];
  strategicInsights: StrategicInsight[];
  capacityPlanning: {
    department: string;
    currentCapacity: number;
    recommendedCapacity: number;
    projectedUtilization: number;
    expansionNeeded: boolean;
    timeline: string;
    costEstimate?: number;
  }[];
  workforcePlanning: {
    role: string;
    currentStaffing: number;
    projectedDemand: number;
    gap: number;
    hiringRecommendation: string;
    trainingNeeds: string[];
  }[];
  financialProjections: {
    metric: string;
    currentValue: number;
    projectedValue: number;
    change: number;
    confidence: number;
    factors: string[];
  }[];
  qualityMetrics: {
    metric: string;
    currentPerformance: number;
    target: number;
    projectedPerformance: number;
    onTrack: boolean;
    interventions: string[];
  }[];
  riskAssessment: {
    risk: string;
    probability: number;
    impact: 'high' | 'medium' | 'low';
    mitigation: string;
    monitoring: string;
  }[];
  actionPlan: {
    priority: 'immediate' | 'short_term' | 'medium_term' | 'long_term';
    action: string;
    rationale: string;
    resources: string[];
    expectedOutcome: string;
    kpis: string[];
  }[];
  executiveSummary: string;
  dataQuality: {
    completeness: number;
    reliability: number;
    limitations: string[];
  };
  lastAnalyzed: string;
}

// ============================================
// MEDICAL IMAGING AI TYPES - Batch 6
// ============================================

// 1. AI-Powered Chest X-Ray Analysis Types
export interface ChestXRayAnalysisInput {
  imageData: string; // base64 encoded image
  imageFormat?: 'jpeg' | 'png' | 'dicom';
  patientInfo?: {
    age?: number;
    gender?: string;
    clinicalIndication?: string;
    symptoms?: string[];
    medicalHistory?: string[];
  };
  previousStudies?: {
    date: string;
    findings: string;
  }[];
}

export interface ChestXRayFinding {
  finding: string;
  category: 'lung' | 'cardiac' | 'pleural' | 'bone' | 'mediastinal' | 'soft_tissue' | 'other';
  location: string;
  confidence: number;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  description: string;
  measurements?: {
    name: string;
    value: number;
    unit: string;
  }[];
  regionOfInterest?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  differentialDiagnoses?: string[];
}

export interface ChestXRayAnalysisResult {
  overallImpression: string;
  findings: ChestXRayFinding[];
  abnormalities: {
    type: 'pneumonia' | 'effusion' | 'cardiomegaly' | 'nodule' | 'mass' | 'atelectasis' | 'consolidation' | 'pneumothorax' | 'fracture' | 'other';
    present: boolean;
    confidence: number;
    location: string;
    description: string;
    severity: 'mild' | 'moderate' | 'severe';
  }[];
  cardiacAnalysis: {
    cardiothoracicRatio?: number;
    cardiomegaly: boolean;
    heartSize: 'normal' | 'mildly_enlarged' | 'moderately_enlarged' | 'severely_enlarged';
    cardiacSilhouette: string;
  };
  lungAnalysis: {
    lungFields: 'clear' | 'abnormal';
    infiltrates: { location: string; pattern: string }[];
    nodules: { location: string; size: string }[];
    pleuralEffusion: { side: 'left' | 'right' | 'bilateral'; amount: string }[];
  };
  structuredReport: {
    clinicalIndication: string;
    technique: string;
    comparison: string;
    findings: string;
    impression: string;
    recommendations: string;
  };
  recommendations: {
    type: 'follow_up' | 'additional_imaging' | 'clinical_correlation' | 'urgent_consultation';
    recommendation: string;
    timeframe: string;
    priority: 'routine' | 'urgent' | 'immediate';
  }[];
  qualityMetrics: {
    imageQuality: 'excellent' | 'good' | 'adequate' | 'poor';
    positioning: 'optimal' | 'suboptimal' | 'inadequate';
    penetration: 'optimal' | 'underexposed' | 'overexposed';
    artifacts: string[];
  };
  confidence: number;
  disclaimer: string;
}

// 2. AI-Powered CT Scan Analysis Types
export interface CTScanAnalysisInput {
  imageData: string; // base64 encoded image or DICOM series
  scanType: 'head' | 'chest' | 'abdomen' | 'pelvis' | 'spine' | 'extremity' | 'whole_body';
  contrastUsed?: boolean;
  patientInfo?: {
    age?: number;
    gender?: string;
    clinicalIndication?: string;
    symptoms?: string[];
    medicalHistory?: string[];
  };
  previousStudies?: {
    date: string;
    modality: string;
    findings: string;
  }[];
}

export interface CTFinding {
  finding: string;
  category: 'normal' | 'abnormal' | 'incidental';
  location: string;
  confidence: number;
  severity: 'normal' | 'mild' | 'moderate' | 'severe' | 'critical';
  description: string;
  measurements?: {
    name: string;
    value: number;
    unit: string;
  }[];
  hounsfieldUnits?: number;
  regionOfInterest?: {
    sliceNumber: number;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface CTScanAnalysisResult {
  overallImpression: string;
  findings: CTFinding[];
  detectedAbnormalities: {
    type: 'tumor' | 'hemorrhage' | 'fracture' | 'infarct' | 'infection' | 'mass' | 'nodule' | 'cyst' | 'abscess' | 'other';
    present: boolean;
    confidence: number;
    location: string;
    description: string;
    size?: { value: number; unit: string };
    characteristics: string[];
    differentialDiagnoses: string[];
  }[];
  organAnalysis: {
    organ: string;
    status: 'normal' | 'abnormal';
    findings: string[];
    measurements?: { name: string; value: number; unit: string }[];
  }[];
  threeDReconstruction: {
    available: boolean;
    findings: string[];
    volumes?: { structure: string; volume: number; unit: string }[];
  };
  structuredReport: {
    clinicalIndication: string;
    technique: string;
    comparison: string;
    findings: string;
    impression: string;
    recommendations: string;
  };
  measurements: {
    structure: string;
    measurement: string;
    value: number;
    unit: string;
    normalRange?: string;
    interpretation: string;
  }[];
  recommendations: {
    type: 'follow_up' | 'additional_imaging' | 'biopsy' | 'clinical_correlation' | 'urgent_consultation';
    recommendation: string;
    timeframe: string;
    priority: 'routine' | 'urgent' | 'immediate';
  }[];
  qualityMetrics: {
    imageQuality: 'excellent' | 'good' | 'adequate' | 'poor';
    motionArtifact: boolean;
    contrastOpacification?: 'optimal' | 'suboptimal' | 'poor';
    artifacts: string[];
  };
  confidence: number;
  disclaimer: string;
}

// 3. AI-Powered Ultrasound Analysis Types
export interface UltrasoundAnalysisInput {
  imageData: string; // base64 encoded image or video
  scanType: 'abdominal' | 'obstetric' | 'cardiac' | 'thyroid' | 'breast' | 'musculoskeletal' | 'vascular' | 'pelvic';
  patientInfo?: {
    age?: number;
    gender?: string;
    clinicalIndication?: string;
    lmp?: string; // Last menstrual period for obstetric
    gestationalAge?: number; // in weeks
    symptoms?: string[];
  };
  previousStudies?: {
    date: string;
    findings: string;
  }[];
}

export interface UltrasoundFinding {
  finding: string;
  category: 'normal' | 'abnormal' | 'incidental';
  location: string;
  confidence: number;
  description: string;
  measurements?: {
    name: string;
    value: number;
    unit: string;
  }[];
}

export interface ObstetricAnalysis {
  gestationalAge: {
    estimated: number; // in weeks
    confidence: number;
    method: 'LMP' | 'CRL' | 'BPD' | 'FL' | 'HC' | 'AC' | 'composite';
    range: { lower: number; upper: number };
  };
  fetalBiometry: {
    biparietalDiameter?: { value: number; unit: string; percentile: number };
    headCircumference?: { value: number; unit: string; percentile: number };
    abdominalCircumference?: { value: number; unit: string; percentile: number };
    femurLength?: { value: number; unit: string; percentile: number };
    crownRumpLength?: { value: number; unit: string };
    estimatedFetalWeight?: { value: number; unit: string; percentile: number };
  };
  fetalHeartRate?: number;
  amnioticFluid: {
    index?: number;
    deepestPocket?: number;
    status: 'normal' | 'oligohydramnios' | 'polyhydramnios';
  };
  placenta: {
    location: string;
    grade: number;
    position: 'normal' | 'low_lying' | 'previa';
    abnormalities: string[];
  };
  fetalAnatomy: {
    structure: string;
    status: 'visualized' | 'not_visualized' | 'abnormal';
    findings: string;
  }[];
  fetalPresentation: 'cephalic' | 'breech' | 'transverse' | 'unstable';
  multipleGestation: boolean;
  fetalNumber?: number;
}

export interface UltrasoundAnalysisResult {
  overallImpression: string;
  findings: UltrasoundFinding[];
  obstetricAnalysis?: ObstetricAnalysis;
  organAnalysis?: {
    organ: string;
    status: 'normal' | 'abnormal';
    size?: { value: number; unit: string };
    echogenicity: 'normal' | 'increased' | 'decreased' | 'heterogeneous';
    findings: string[];
    lesions?: { type: string; size: string; location: string }[];
  }[];
  vascularAnalysis?: {
    vessel: string;
    patency: 'patent' | 'stenosis' | 'occluded';
    flowPattern: string;
    velocities?: { peakSystolic: number; endDiastolic: number; unit: string };
    findings: string[];
  }[];
  structuredReport: {
    clinicalIndication: string;
    technique: string;
    comparison: string;
    findings: string;
    impression: string;
    recommendations: string;
  };
  recommendations: {
    type: 'follow_up' | 'additional_imaging' | 'clinical_correlation' | 'urgent_consultation';
    recommendation: string;
    timeframe: string;
    priority: 'routine' | 'urgent' | 'immediate';
  }[];
  qualityMetrics: {
    imageQuality: 'excellent' | 'good' | 'adequate' | 'poor';
    acousticWindows: 'optimal' | 'suboptimal' | 'limited';
    artifacts: string[];
  };
  confidence: number;
  disclaimer: string;
}

// 4. AI-Powered MRI Analysis Types
export interface MRIAnalysisInput {
  imageData: string; // base64 encoded image or DICOM series
  scanType: 'brain' | 'spine' | 'joint' | 'abdomen' | 'pelvis' | 'cardiac' | 'breast' | 'whole_body';
  sequences?: ('T1' | 'T2' | 'FLAIR' | 'DWI' | 'STIR' | 'contrast_T1' | 'SWI' | 'fMRI')[];
  contrastUsed?: boolean;
  patientInfo?: {
    age?: number;
    gender?: string;
    clinicalIndication?: string;
    symptoms?: string[];
    medicalHistory?: string[];
    implants?: string[];
  };
  previousStudies?: {
    date: string;
    modality: string;
    findings: string;
  }[];
}

export interface MRIFinding {
  finding: string;
  category: 'normal' | 'abnormal' | 'incidental';
  location: string;
  confidence: number;
  severity: 'normal' | 'mild' | 'moderate' | 'severe' | 'critical';
  description: string;
  signalCharacteristics: {
    t1Signal: 'hypointense' | 'isointense' | 'hyperintense' | 'mixed';
    t2Signal: 'hypointense' | 'isointense' | 'hyperintense' | 'mixed';
    flairSignal?: 'hypointense' | 'isointense' | 'hyperintense' | 'mixed';
    diffusionRestriction?: boolean;
    enhancement?: 'none' | 'homogeneous' | 'heterogeneous' | 'ring' | 'peripheral';
  };
  measurements?: {
    name: string;
    value: number;
    unit: string;
  }[];
  regionOfInterest?: {
    sliceNumber: number;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface BrainMRIAnalysis {
  ventricles: {
    size: 'normal' | 'mildly_enlarged' | 'moderately_enlarged' | 'severely_enlarged';
    symmetry: 'symmetric' | 'asymmetric';
    description: string;
  };
  whiteMatter: {
    status: 'normal' | 'abnormal';
    lesions: { location: string; size: string; number: number }[];
    description: string;
  };
  grayMatter: {
    status: 'normal' | 'abnormal';
    atrophy: 'none' | 'mild' | 'moderate' | 'severe';
    description: string;
  };
  vascular: {
    status: 'normal' | 'abnormal';
    findings: string[];
    flowVoids: 'normal' | 'abnormal';
  };
  masses: {
    present: boolean;
    location?: string;
    size?: string;
    characteristics?: string[];
    massEffect?: boolean;
    herniation?: string[];
  };
  midlineShift?: number;
}

export interface SpineMRIAnalysis {
  vertebralBodies: {
    status: 'normal' | 'abnormal';
    findings: string[];
    compressionFractures: { level: string; severity: string }[];
  };
  intervertebralDiscs: {
    level: string;
    status: 'normal' | 'bulging' | 'herniated' | 'desiccated';
    herniationType?: 'central' | 'paracentral' | 'foraminal' | 'far_lateral';
    severity?: 'mild' | 'moderate' | 'severe';
    neuralForaminalNarrowing?: 'none' | 'mild' | 'moderate' | 'severe';
    spinalCanalStenosis?: 'none' | 'mild' | 'moderate' | 'severe';
  }[];
  spinalCord: {
    status: 'normal' | 'abnormal';
    signal: 'normal' | 'abnormal';
    compression: { level: string; severity: string }[];
    findings: string[];
  };
  ligaments: {
    status: 'normal' | 'abnormal';
    findings: string[];
  };
}

export interface JointMRIAnalysis {
  joint: string;
  bones: {
    status: 'normal' | 'abnormal';
    marrowSignal: 'normal' | 'abnormal';
    findings: string[];
    fractures?: { location: string; type: string }[];
  };
  cartilage: {
    status: 'normal' | 'abnormal';
    defects: { location: string; grade: number }[];
  };
  menisci?: {
    status: 'normal' | 'abnormal';
    tears: { location: string; type: string; severity: string }[];
  };
  ligaments: {
    name: string;
    status: 'intact' | 'partial_tear' | 'complete_tear' | 'thickening';
    findings: string;
  }[];
  tendons: {
    name: string;
    status: 'normal' | 'tendinopathy' | 'partial_tear' | 'complete_tear';
    findings: string;
  }[];
  synovium: {
    status: 'normal' | 'thickened' | 'inflamed';
    effusion: 'none' | 'mild' | 'moderate' | 'large';
  };
  softTissue: {
    status: 'normal' | 'abnormal';
    findings: string[];
  };
}

export interface MRIAnalysisResult {
  overallImpression: string;
  findings: MRIFinding[];
  brainAnalysis?: BrainMRIAnalysis;
  spineAnalysis?: SpineMRIAnalysis;
  jointAnalysis?: JointMRIAnalysis;
  lesionCharacterization?: {
    lesionType: string;
    location: string;
    size: { value: number; unit: string };
    signalCharacteristics: string;
    enhancement: string;
    differentialDiagnoses: string[];
    likelihood: 'benign' | 'probably_benign' | 'indeterminate' | 'probably_malignant' | 'malignant';
    biRadsCategory?: number;
  }[];
  structuredReport: {
    clinicalIndication: string;
    technique: string;
    comparison: string;
    findings: string;
    impression: string;
    recommendations: string;
  };
  recommendations: {
    type: 'follow_up' | 'additional_imaging' | 'biopsy' | 'clinical_correlation' | 'urgent_consultation';
    recommendation: string;
    timeframe: string;
    priority: 'routine' | 'urgent' | 'immediate';
  }[];
  qualityMetrics: {
    imageQuality: 'excellent' | 'good' | 'adequate' | 'poor';
    motionArtifact: boolean;
    metalArtifact?: boolean;
    artifacts: string[];
  };
  confidence: number;
  disclaimer: string;
}

// 5. AI-Powered Mammography Analysis Types
export interface MammographyAnalysisInput {
  imageData: string; // base64 encoded image(s)
  views: ('CC' | 'MLO' | 'ML' | 'LM' | 'XCCL' | 'XCCM' | 'MAG')[];
  laterality: 'left' | 'right' | 'bilateral';
  patientInfo?: {
    age?: number;
    gender?: string;
    clinicalIndication?: string;
    symptoms?: string[];
    familyHistory?: string[];
    breastDensity?: 'A' | 'B' | 'C' | 'D';
    priorBiopsies?: string[];
    hormoneTherapy?: boolean;
  };
  previousStudies?: {
    date: string;
    findings: string;
    biRadsCategory?: number;
  }[];
}

export interface MammographyFinding {
  finding: string;
  category: 'mass' | 'calcification' | 'architectural_distortion' | 'asymmetry' | 'lymph_node' | 'skin_change' | 'other';
  laterality: 'left' | 'right' | 'bilateral';
  location: {
    quadrant: 'upper_outer' | 'upper_inner' | 'lower_outer' | 'lower_inner' | 'central' | 'subareolar' | 'axillary';
    clockPosition?: number;
    depth?: 'anterior' | 'middle' | 'posterior';
  };
  confidence: number;
  description: string;
  characteristics: {
    shape?: 'round' | 'oval' | 'lobular' | 'irregular';
    margin?: 'circumscribed' | 'obscured' | 'microlobulated' | 'indistinct' | 'spiculated';
    density?: 'high' | 'equal' | 'low' | 'fat_containing';
    size?: { value: number; unit: string };
  };
  calcificationDetails?: {
    type: 'coarse' | 'punctate' | 'amorphous' | 'fine_pleomorphic' | 'fine_linear' | 'vascular' | 'round' | 'milk_of_calcium' | 'suture' | 'dermal';
    distribution: 'diffuse' | 'regional' | 'grouped' | 'linear' | 'segmental';
    number: 'few' | 'multiple' | 'too_numerous';
  };
  regionOfInterest?: {
    view: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface BIRADSAssessment {
  category: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  categoryDescription: string;
  recommendation: string;
  followUpRecommendation?: string;
  probabilityOfMalignancy: string;
}

export interface MammographyAnalysisResult {
  overallImpression: string;
  biRadsAssessment: BIRADSAssessment;
  findings: MammographyFinding[];
  breastDensity: {
    category: 'A' | 'B' | 'C' | 'D';
    description: string;
    percentage: number;
  };
  masses: {
    present: boolean;
    findings: {
      laterality: 'left' | 'right';
      location: string;
      size: string;
      shape: string;
      margin: string;
      density: string;
      assessment: 'benign' | 'probably_benign' | 'suspicious' | 'highly_suspicious';
    }[];
  };
  calcifications: {
    present: boolean;
    findings: {
      laterality: 'left' | 'right';
      location: string;
      type: string;
      distribution: string;
      morphology: string;
      assessment: 'benign' | 'probably_benign' | 'suspicious' | 'highly_suspicious';
    }[];
  };
  architecturalDistortion: {
    present: boolean;
    findings: {
      laterality: 'left' | 'right';
      location: string;
      description: string;
    }[];
  };
  asymmetries: {
    present: boolean;
    findings: {
      type: 'asymmetry' | 'global_asymmetry' | 'focal_asymmetry' | 'developing_asymmetry';
      laterality: 'left' | 'right';
      location: string;
      description: string;
    }[];
  };
  lymphNodes: {
    axillaryStatus: 'normal' | 'abnormal';
    findings: {
      laterality: 'left' | 'right';
      size?: string;
      morphology?: string;
      cortex?: string;
    }[];
  };
  comparisonWithPrior: {
    available: boolean;
    changes: 'stable' | 'new_finding' | 'changed' | 'resolved';
    details: string;
  };
  structuredReport: {
    clinicalIndication: string;
    technique: string;
    comparison: string;
    findings: string;
    impression: string;
    recommendations: string;
  };
  recommendations: {
    type: 'routine_screening' | 'short_term_follow_up' | 'diagnostic_workup' | 'biopsy' | 'clinical_correlation' | 'urgent_consultation';
    recommendation: string;
    timeframe: string;
    priority: 'routine' | 'urgent' | 'immediate';
  }[];
  qualityMetrics: {
    imageQuality: 'excellent' | 'good' | 'adequate' | 'poor';
    positioning: 'optimal' | 'suboptimal' | 'inadequate';
    pectoralisMuscleVisualization: 'adequate' | 'inadequate';
    inframammaryFoldVisualization: 'adequate' | 'inadequate';
    artifacts: string[];
  };
  confidence: number;
  disclaimer: string;
}

// 6. AI-Powered Retinal Imaging Analysis Types
export interface RetinalImagingAnalysisInput {
  imageData: string; // base64 encoded image
  imagingType: 'fundus_photography' | 'OCT' | 'fluorescein_angiography' | 'fundus_autofluorescence';
  laterality: 'left' | 'right' | 'bilateral';
  patientInfo?: {
    age?: number;
    gender?: string;
    diabetesStatus?: 'none' | 'prediabetes' | 'type1' | 'type2';
    diabetesDuration?: number;
    hypertension?: boolean;
    visualAcuity?: string;
    symptoms?: string[];
    currentMedications?: string[];
  };
  previousStudies?: {
    date: string;
    findings: string;
  }[];
}

export interface RetinalFinding {
  finding: string;
  category: 'diabetic_retinopathy' | 'glaucoma' | 'amd' | 'vascular' | 'inflammatory' | 'infectious' | 'neoplastic' | 'other';
  location: string;
  confidence: number;
  severity: 'normal' | 'mild' | 'moderate' | 'severe' | 'proliferative';
  description: string;
  regionOfInterest?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface DiabeticRetinopathyAnalysis {
  present: boolean;
  severity: 'none' | 'mild_npdr' | 'moderate_npdr' | 'severe_npdr' | 'pdr' | 'advanced_pdr';
  microaneurysms: {
    count: number;
    locations: string[];
  };
  hemorrhages: {
    present: boolean;
    type: 'dot_blot' | 'flame' | 'both';
    locations: string[];
  };
  hardExudates: {
    present: boolean;
    distribution: string;
    macularInvolvement: boolean;
  };
  cottonWoolSpots: {
    present: boolean;
    count: number;
    locations: string[];
  };
  neovascularization: {
    present: boolean;
    location: 'disc' | 'elsewhere' | 'iris';
  };
  vitreousHemorrhage: boolean;
  dme: { // Diabetic Macular Edema
    present: boolean;
    severity: 'mild' | 'moderate' | 'severe';
    centralInvolvement: boolean;
  };
  icdrScore: string; // International Clinical Diabetic Retinopathy
}

export interface GlaucomaAnalysis {
  riskLevel: 'low' | 'moderate' | 'high' | 'very_high';
  cupToDiscRatio: {
    vertical: number;
    horizontal: number;
    asymmetry: number;
  };
  rimWidth: {
    inferior: number;
    superior: number;
    nasal: number;
    temporal: number;
  };
  nerveFiberLayer: {
    status: 'normal' | 'thinning';
    pattern: string;
    locations: string[];
  };
  opticDisc: {
    size: 'small' | 'normal' | 'large';
    shape: string;
    notching: boolean;
    hemorrhages: boolean;
    peripapillaryAtrophy: boolean;
  };
  visualField: {
    available: boolean;
    defects: string[];
  };
  iopEstimate?: number;
}

export interface AMDAnalysis {
  present: boolean;
  type: 'none' | 'early_dry' | 'intermediate_dry' | 'advanced_dry' | 'wet';
  drusen: {
    present: boolean;
    size: 'small' | 'medium' | 'large';
    number: 'few' | 'intermediate' | 'many';
    location: string;
    confluence: boolean;
  };
  pigmentaryChanges: {
    present: boolean;
    type: 'hypo' | 'hyper' | 'both';
    location: string;
  };
  geographicAtrophy: {
    present: boolean;
    location: string;
    size?: string;
    fovealInvolvement: boolean;
  };
  neovascularFeatures: {
    present: boolean;
    subretinalFluid: boolean;
    intraretinalFluid: boolean;
    hemorrhage: boolean;
    ped: boolean; // Pigment Epithelial Detachment
  };
  aredsCategory?: number;
}

export interface RetinalImagingAnalysisResult {
  overallImpression: string;
  findings: RetinalFinding[];
  diabeticRetinopathyAnalysis?: DiabeticRetinopathyAnalysis;
  glaucomaAnalysis?: GlaucomaAnalysis;
  amdAnalysis?: AMDAnalysis;
  vascularAnalysis?: {
    arteriovenousRatio: number;
    arteriolarNarrowing: boolean;
    venousDilation: boolean;
    avNicking: boolean;
    retinalVeinOcclusion: boolean;
    retinalArteryOcclusion: boolean;
  };
  macularAnalysis?: {
    status: 'normal' | 'abnormal';
    fovealReflex: 'present' | 'absent';
    edema: boolean;
    hole: boolean;
    scar: boolean;
    findings: string[];
  };
  peripheralFindings?: {
    tears: { location: string; type: string }[];
    holes: { location: string }[];
    lattice: { location: string }[];
    retinalDetachment: boolean;
  };
  structuredReport: {
    clinicalIndication: string;
    technique: string;
    comparison: string;
    findings: string;
    impression: string;
    recommendations: string;
  };
  recommendations: {
    type: 'routine_screening' | 'follow_up' | 'urgent_ophthalmology' | 'treatment' | 'laser' | 'injection';
    recommendation: string;
    timeframe: string;
    priority: 'routine' | 'urgent' | 'immediate';
  }[];
  qualityMetrics: {
    imageQuality: 'excellent' | 'good' | 'adequate' | 'poor';
    fieldOfView: 'adequate' | 'limited';
    mediaOpacity: 'none' | 'mild' | 'moderate' | 'severe';
    artifacts: string[];
  };
  confidence: number;
  disclaimer: string;
}

// 7. AI-Powered Dermatology Image Analysis Types
export interface DermatologyImageAnalysisInput {
  imageData: string; // base64 encoded image
  imageType: 'clinical' | 'dermoscopy' | 'close_up' | 'wide_field';
  bodyLocation?: string;
  patientInfo?: {
    age?: number;
    gender?: string;
    skinType?: number; // Fitzpatrick scale I-VI
    symptoms?: string[];
    duration?: string;
    previousHistory?: string[];
    familyHistory?: string[];
  };
  previousImages?: {
    date: string;
    description: string;
  }[];
}

export interface DermatologyFinding {
  finding: string;
  category: 'benign' | 'malignant' | 'inflammatory' | 'infectious' | 'autoimmune' | 'other';
  confidence: number;
  description: string;
  clinicalFeatures: string[];
  differentialDiagnoses: {
    diagnosis: string;
    probability: number;
    reasoning: string;
  }[];
}

export interface SkinLesionAnalysis {
  lesionType: string;
  morphology: {
    shape: 'round' | 'oval' | 'irregular' | 'polycyclic' | 'serpiginous' | 'annular' | 'other';
    border: 'well_defined' | 'ill_defined' | 'rolled' | 'raised' | 'other';
    surface: 'smooth' | 'rough' | 'scaly' | 'crusted' | 'ulcerated' | 'erosion' | 'other';
    color: string[];
    size?: { value: number; unit: string };
    elevation: 'flat' | 'raised' | 'pedunculated' | 'depressed';
  };
  distribution: string;
  pattern: string;
  regionOfInterest?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface MelanomaRiskAssessment {
  riskLevel: 'low' | 'moderate' | 'high' | 'very_high';
  abcdeScore: {
    asymmetry: boolean;
    borderIrregularity: boolean;
    colorVariation: boolean;
    diameter: boolean;
    evolution: boolean;
    totalScore: number;
  };
  ugluckScore?: number;
  sevenPointChecklist?: {
    majorCriteria: string[];
    minorCriteria: string[];
    totalScore: number;
  };
  recommendation: string;
  urgentEvaluation: boolean;
}

export interface DermoscopyAnalysis {
  pattern: 'reticular' | 'globular' | 'homogeneous' | 'starburst' | 'parallel' | 'multicomponent' | 'nonspecific' | 'other';
  features: {
    pigmentNetwork: { present: boolean; type: string };
    dots: { present: boolean; type: string; distribution: string };
    globules: { present: boolean; type: string; distribution: string };
    streaks: { present: boolean; type: string };
    blueWhiteVeil: boolean;
    regressionStructures: { present: boolean; type: string };
    vascularStructures: { present: boolean; type: string };
    miliaLikeCysts: boolean;
    comedoLikeOpenings: boolean;
  };
  diagnosis: string;
  confidence: number;
}

export interface DermatologyImageAnalysisResult {
  overallImpression: string;
  findings: DermatologyFinding[];
  lesionAnalysis: SkinLesionAnalysis;
  melanomaRiskAssessment?: MelanomaRiskAssessment;
  dermoscopyAnalysis?: DermoscopyAnalysis;
  primaryDiagnosis: {
    diagnosis: string;
    icdCode?: string;
    confidence: number;
    description: string;
    isMalignant: boolean;
    requiresBiopsy: boolean;
  };
  differentialDiagnoses: {
    diagnosis: string;
    icdCode?: string;
    probability: number;
    reasoning: string;
  }[];
  treatmentSuggestions: {
    treatment: string;
    type: 'topical' | 'systemic' | 'procedural' | 'observation' | 'referral';
    description: string;
    duration?: string;
    precautions: string[];
  }[];
  followUpRecommendations: {
    timeframe: string;
    reason: string;
    actions: string[];
    warningSigns: string[];
  };
  structuredReport: {
    clinicalHistory: string;
    examinationFindings: string;
    assessment: string;
    plan: string;
  };
  recommendations: {
    type: 'observation' | 'follow_up' | 'biopsy' | 'excision' | 'referral' | 'urgent_dermatology';
    recommendation: string;
    timeframe: string;
    priority: 'routine' | 'urgent' | 'immediate';
  }[];
  qualityMetrics: {
    imageQuality: 'excellent' | 'good' | 'adequate' | 'poor';
    lighting: 'optimal' | 'suboptimal';
    focus: 'sharp' | 'slightly_blurred' | 'blurred';
    colorAccuracy: 'good' | 'fair' | 'poor';
    artifacts: string[];
  };
  confidence: number;
  disclaimer: string;
}

// 8. AI-Powered ECG Analysis Types
export interface ECGAnalysisInput {
  ecgData: string; // base64 encoded ECG image or digital data
  leadConfiguration: '12-lead' | '6-lead' | '3-lead' | 'single-lead';
  patientInfo?: {
    age?: number;
    gender?: string;
    symptoms?: string[];
    medicalHistory?: string[];
    currentMedications?: string[];
    electrolytes?: {
      potassium?: number;
      sodium?: number;
      calcium?: number;
      magnesium?: number;
    };
  };
  previousECGs?: {
    date: string;
    findings: string;
  }[];
}

export interface ECGFinding {
  finding: string;
  category: 'rhythm' | 'conduction' | 'ischemia' | 'hypertrophy' | 'interval' | 'morphology' | 'artifact' | 'other';
  confidence: number;
  severity: 'normal' | 'borderline' | 'abnormal' | 'critical';
  description: string;
  clinicalSignificance: string;
  leads: string[];
}

export interface RhythmAnalysis {
  rhythmType: 'sinus' | 'atrial_fibrillation' | 'atrial_flutter' | 'atrial_tachycardia' | 'junctional' | 'ventricular' | 'paced' | 'other';
  regularity: 'regular' | 'irregular' | 'regularly_irregular' | 'irregularly_irregular';
  heartRate: number;
  atrialRate?: number;
  ventricularRate: number;
  prInterval: number;
  qrsDuration: number;
  qtInterval: number;
  qtCorrected: number;
  confidence: number;
}

export interface ArrhythmiaDetection {
  type: 'atrial_fibrillation' | 'atrial_flutter' | 'svt' | 'vt' | 'vf' | 'av_block' | 'bundle_branch_block' | 'premature_beats' | 'other';
  present: boolean;
  confidence: number;
  description: string;
  severity: 'benign' | 'potentially_significant' | 'significant' | 'life_threatening';
  characteristics: string[];
  clinicalImplications: string[];
}

export interface IschemiaAnalysis {
  ischemiaPresent: boolean;
  infarctionPresent: boolean;
  location: 'anterior' | 'inferior' | 'lateral' | 'posterior' | 'septal' | 'extensive' | 'multiple';
  affectedLeads: string[];
  stChanges: {
    elevation: { lead: string; magnitude: number }[];
    depression: { lead: string; magnitude: number }[];
  };
  tWaveChanges: {
    type: 'inversion' | 'flattening' | 'peaked';
    leads: string[];
  };
  qWaves: {
    present: boolean;
    leads: string[];
    duration: number;
  };
  ageOfInfarct?: 'hyperacute' | 'acute' | 'evolving' | 'chronic';
  confidence: number;
}

export interface ConductionAbnormality {
  type: 'first_degree_av_block' | 'second_degree_av_block' | 'third_degree_av_block' | 'lbbb' | 'rbbb' | 'lafb' | 'lpfb' | 'ivcd' | 'other';
  present: boolean;
  confidence: number;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  clinicalSignificance: string;
}

export interface ECGAnalysisResult {
  overallInterpretation: string;
  findings: ECGFinding[];
  rhythmAnalysis: RhythmAnalysis;
  arrhythmias: ArrhythmiaDetection[];
  ischemiaAnalysis: IschemiaAnalysis;
  conductionAbnormalities: ConductionAbnormality[];
  hypertrophyAnalysis: {
    leftAtrial: { present: boolean; criteria: string[] };
    rightAtrial: { present: boolean; criteria: string[] };
    leftVentricular: { present: boolean; criteria: string[]; strainPattern: boolean };
    rightVentricular: { present: boolean; criteria: string[] };
  };
  intervalAnalysis: {
    prInterval: { value: number; status: 'normal' | 'short' | 'prolonged' };
    qrsDuration: { value: number; status: 'normal' | 'prolonged' };
    qtInterval: { value: number; corrected: number; status: 'normal' | 'short' | 'prolonged' };
  };
  axisAnalysis: {
    pAxis: { value: number; status: 'normal' | 'left_deviation' | 'right_deviation' };
    qrsAxis: { value: number; status: 'normal' | 'left_deviation' | 'right_deviation' | 'extreme' };
    tAxis: { value: number; status: 'normal' | 'abnormal' };
  };
  comparisonWithPrior?: {
    available: boolean;
    changes: 'no_significant_change' | 'new_abnormality' | 'resolved_abnormality' | 'changed';
    details: string;
  };
  structuredReport: {
    clinicalIndication: string;
    technique: string;
    comparison: string;
    description: string;
    interpretation: string;
    recommendations: string;
  };
  clinicalRecommendations: {
    type: 'immediate_intervention' | 'urgent_cardiology' | 'routine_follow_up' | 'medication_adjustment' | 'further_workup';
    recommendation: string;
    rationale: string;
    priority: 'routine' | 'urgent' | 'immediate';
  }[];
  qualityMetrics: {
    ecgQuality: 'excellent' | 'good' | 'adequate' | 'poor';
    baselineStability: 'stable' | 'unstable';
    artifacts: string[];
    leadPlacement: 'correct' | 'possible_misplacement';
  };
  confidence: number;
  disclaimer: string;
}