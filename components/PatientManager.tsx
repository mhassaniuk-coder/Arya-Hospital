import React, { useState, useMemo, useCallback } from 'react';
import { 
  Search, Plus, Filter, FileText, Edit2, Trash2, Archive, 
  RotateCcw, Download, ChevronLeft, ChevronRight, ChevronUp, 
  ChevronDown, X, UserPlus, BedDouble, Stethoscope, ArrowRight,
  AlertTriangle, CheckCircle, Clock, Users
} from 'lucide-react';
import { Patient, UrgencyLevel } from '../types';
import PatientDetailDrawer from './PatientDetailDrawer';
import AddPatientModal from './AddPatientModal';
import { useData } from '../src/contexts/DataContext';
import { useTheme } from '../src/contexts/ThemeContext';

type ViewMode = 'table' | 'cards';
type SortField = 'name' | 'admissionDate' | 'urgency' | 'age';
type SortOrder = 'asc' | 'desc';
type FilterStatus = 'all' | 'active' | 'archived' | 'critical' | 'high';

interface PatientFormData {
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  emergencyContact: string;
  bloodGroup: string;
  allergies: string;
  insurance: string;
  condition: string;
  roomNumber: string;
  urgency: UrgencyLevel;
  history: string;
}

const initialFormData: PatientFormData = {
  name: '',
  age: 0,
  gender: 'Male',
  contact: '',
  address: '',
  emergencyContact: '',
  bloodGroup: '',
  allergies: '',
  insurance: '',
  condition: '',
  roomNumber: '',
  urgency: UrgencyLevel.MEDIUM,
  history: ''
};

const PatientManager: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { patients, addPatient, updatePatient, deletePatient, archivePatient, restorePatient, addToQueue, staff } = useData();
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('admissionDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [editFormData, setEditFormData] = useState<PatientFormData>(initialFormData);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof PatientFormData, string>>>({});
  
  const itemsPerPage = 20;

  // Helper functions
  const getUrgencyColor = (level: UrgencyLevel) => {
    switch (level) {
      case UrgencyLevel.CRITICAL: return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case UrgencyLevel.HIGH: return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case UrgencyLevel.MEDIUM: return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case UrgencyLevel.LOW: return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  const isArchived = (patient: Patient) => patient.condition.startsWith('Archived:');

  // Filtered and sorted patients
  const filteredPatients = useMemo(() => {
    let result = [...patients];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.id.toLowerCase().includes(term) ||
        p.condition.toLowerCase().includes(term) ||
        p.roomNumber.toLowerCase().includes(term)
      );
    }

    // Status filter
    switch (filterStatus) {
      case 'archived':
        result = result.filter(p => isArchived(p));
        break;
      case 'active':
        result = result.filter(p => !isArchived(p));
        break;
      case 'critical':
        result = result.filter(p => p.urgency === UrgencyLevel.CRITICAL);
        break;
      case 'high':
        result = result.filter(p => p.urgency === UrgencyLevel.HIGH || p.urgency === UrgencyLevel.CRITICAL);
        break;
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'admissionDate':
          comparison = new Date(a.admissionDate).getTime() - new Date(b.admissionDate).getTime();
          break;
        case 'age':
          comparison = a.age - b.age;
          break;
        case 'urgency':
          const urgencyOrder = { [UrgencyLevel.CRITICAL]: 0, [UrgencyLevel.HIGH]: 1, [UrgencyLevel.MEDIUM]: 2, [UrgencyLevel.LOW]: 3 };
          comparison = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [patients, searchTerm, filterStatus, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(start, start + itemsPerPage);
  }, [filteredPatients, currentPage]);

  // Stats
  const stats = useMemo(() => ({
    total: patients.length,
    active: patients.filter(p => !isArchived(p)).length,
    archived: patients.filter(p => isArchived(p)).length,
    critical: patients.filter(p => p.urgency === UrgencyLevel.CRITICAL).length
  }), [patients]);

  // Handlers
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleAddPatient = (newPatient: Patient) => {
    addPatient(newPatient);
  };

  const handleEditClick = (patient: Patient) => {
    setEditingPatient(patient);
    setEditFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      contact: (patient as any).contact || '',
      address: (patient as any).address || '',
      emergencyContact: (patient as any).emergencyContact || '',
      bloodGroup: (patient as any).bloodGroup || '',
      allergies: (patient as any).allergies || '',
      insurance: (patient as any).insurance || '',
      condition: patient.condition,
      roomNumber: patient.roomNumber,
      urgency: patient.urgency,
      history: patient.history
    });
    setIsEditModalOpen(true);
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof PatientFormData, string>> = {};
    
    if (!editFormData.name.trim()) errors.name = 'Name is required';
    if (editFormData.age <= 0) errors.age = 'Valid age is required';
    if (!editFormData.condition.trim()) errors.condition = 'Condition is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditSubmit = () => {
    if (!validateForm() || !editingPatient) return;
    
    updatePatient(editingPatient.id, {
      name: editFormData.name,
      age: editFormData.age,
      gender: editFormData.gender,
      condition: editFormData.condition,
      roomNumber: editFormData.roomNumber,
      urgency: editFormData.urgency,
      history: editFormData.history,
      contact: editFormData.contact,
      address: editFormData.address,
      emergencyContact: editFormData.emergencyContact,
      bloodGroup: editFormData.bloodGroup,
      allergies: editFormData.allergies,
      insurance: editFormData.insurance
    } as Partial<Patient>);
    
    setIsEditModalOpen(false);
    setEditingPatient(null);
    setFormErrors({});
  };

  const handleDeleteClick = (patient: Patient) => {
    setPatientToDelete(patient);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (patientToDelete) {
      deletePatient(patientToDelete.id);
    }
    setIsDeleteDialogOpen(false);
    setPatientToDelete(null);
  };

  const handleArchive = (patient: Patient) => {
    if (isArchived(patient)) {
      restorePatient(patient.id);
    } else {
      archivePatient(patient.id);
    }
  };

  const handleAdmitToQueue = (patient: Patient) => {
    const tokenNumber = Math.floor(Math.random() * 1000) + 100;
    addToQueue({
      id: `Q-${Date.now()}`,
      tokenNumber,
      patientName: patient.name,
      doctorName: staff[0]?.name || 'Dr. General',
      department: 'General',
      status: 'Waiting',
      waitTime: '15m',
      symptoms: patient.condition
    });
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Age', 'Gender', 'Condition', 'Room', 'Urgency', 'Admission Date'];
    const rows = filteredPatients.map(p => [
      p.id, p.name, p.age, p.gender, p.condition, p.roomNumber, p.urgency, p.admissionDate
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patients-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Patient Directory</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage patient records, admissions, and discharges.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportToCSV}
            className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Download size={18} /> Export CSV
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-teal-600/20 flex items-center gap-2 transition-all"
          >
            <Plus size={20} />
            Admit Patient
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.active}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.critical}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Critical</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <Archive className="text-slate-600 dark:text-slate-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.archived}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Archived</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, ID, condition, or room..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                showFilters 
                  ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300' 
                  : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Filter size={16} />
              Filters
            </button>
            <div className="flex border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-teal-600 text-white' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-2 text-sm ${viewMode === 'cards' ? 'bg-teal-600 text-white' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
              >
                Cards
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value as FilterStatus); setCurrentPage(1); }}
                className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                <option value="all">All Patients</option>
                <option value="active">Active Only</option>
                <option value="archived">Archived Only</option>
                <option value="critical">Critical</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Sort by:</span>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                <option value="admissionDate">Admission Date</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="urgency">Urgency</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-1.5 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600"
              >
                {sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">Patient Info <SortIcon field="name" /></div>
                  </th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('urgency')}>
                    <div className="flex items-center gap-1">Status <SortIcon field="urgency" /></div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('admissionDate')}>
                    <div className="flex items-center gap-1">Admitted <SortIcon field="admissionDate" /></div>
                  </th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {paginatedPatients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    onClick={() => setSelectedPatient(patient)}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors group cursor-pointer ${isArchived(patient) ? 'opacity-60' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-sm">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{patient.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{patient.id} • {patient.age} yrs • {patient.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">
                      {isArchived(patient) ? patient.condition.replace('Archived: ', '') + ' (Archived)' : patient.condition}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {patient.roomNumber}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getUrgencyColor(patient.urgency)}`}>
                        {patient.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
                      {patient.admissionDate}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleAdmitToQueue(patient)}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="Add to OPD Queue"
                        >
                          <UserPlus size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditClick(patient)}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleArchive(patient)}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
                          title={isArchived(patient) ? 'Restore' : 'Archive'}
                        >
                          {isArchived(patient) ? <RotateCcw size={16} /> : <Archive size={16} />}
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(patient)}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginatedPatients.length === 0 && (
              <div className="p-12 text-center text-slate-400 dark:text-slate-500">
                No patients found matching your criteria.
              </div>
            )}
          </div>
        )}

        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedPatients.map((patient) => (
              <div 
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-600 cursor-pointer transition-all hover:shadow-md ${isArchived(patient) ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{patient.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{patient.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getUrgencyColor(patient.urgency)}`}>
                    {patient.urgency}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Age/Gender:</span>
                    <span className="text-slate-700 dark:text-slate-300">{patient.age} yrs, {patient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Condition:</span>
                    <span className="text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{isArchived(patient) ? patient.condition.replace('Archived: ', '') : patient.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Room:</span>
                    <span className="text-slate-700 dark:text-slate-300">{patient.roomNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Admitted:</span>
                    <span className="text-slate-700 dark:text-slate-300">{patient.admissionDate}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-600 flex justify-end gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleAdmitToQueue(patient); }}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                    title="Add to OPD Queue"
                  >
                    <UserPlus size={14} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEditClick(patient); }}
                    className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleArchive(patient); }}
                    className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded transition-colors"
                    title={isArchived(patient) ? 'Restore' : 'Archive'}
                  >
                    {isArchived(patient) ? <RotateCcw size={14} /> : <Archive size={14} />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(patient); }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of {filteredPatients.length} patients
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-teal-600 text-white'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Patient Detail Drawer */}
      <PatientDetailDrawer 
        patient={selectedPatient} 
        isOpen={!!selectedPatient} 
        onClose={() => setSelectedPatient(null)} 
      />
      
      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPatient}
      />

      {/* Edit Patient Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Patient</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name *</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${formErrors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age *</label>
                  <input
                    type="number"
                    value={editFormData.age}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${formErrors.age ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}
                  />
                  {formErrors.age && <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                  <select
                    value={editFormData.gender}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
                  <select
                    value={editFormData.bloodGroup}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact</label>
                  <input
                    type="text"
                    value={editFormData.contact}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Emergency Contact</label>
                  <input
                    type="text"
                    value={editFormData.emergencyContact}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
                  <input
                    type="text"
                    value={editFormData.address}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Condition *</label>
                  <input
                    type="text"
                    value={editFormData.condition}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, condition: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${formErrors.condition ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}
                  />
                  {formErrors.condition && <p className="text-red-500 text-xs mt-1">{formErrors.condition}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Room Number</label>
                  <input
                    type="text"
                    value={editFormData.roomNumber}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, roomNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Urgency</label>
                  <select
                    value={editFormData.urgency}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, urgency: e.target.value as UrgencyLevel }))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value={UrgencyLevel.LOW}>Low</option>
                    <option value={UrgencyLevel.MEDIUM}>Medium</option>
                    <option value={UrgencyLevel.HIGH}>High</option>
                    <option value={UrgencyLevel.CRITICAL}>Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Insurance</label>
                  <input
                    type="text"
                    value={editFormData.insurance}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, insurance: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Allergies</label>
                  <input
                    type="text"
                    value={editFormData.allergies}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, allergies: e.target.value }))}
                    placeholder="Comma separated list"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Medical History</label>
                  <textarea
                    value={editFormData.history}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, history: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && patientToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <Trash2 className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Patient</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Are you sure you want to permanently delete <strong>{patientToDelete.name}</strong> ({patientToDelete.id})?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setIsDeleteDialogOpen(false); setPatientToDelete(null); }}
                className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManager;
