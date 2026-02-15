import React, { useState, useMemo } from 'react';
import { 
  Droplet, AlertTriangle, Plus, Search, Filter, Edit2, Trash2,
  ChevronDown, ChevronUp, X, UserPlus, Package, Clock, CheckCircle,
  XCircle, Activity, Users, FileText, Download, Calendar
} from 'lucide-react';
import { BloodUnit, BloodBag, BloodDonor, BloodRequest } from '../types';
import { useData } from '../src/contexts/DataContext';
import { useTheme } from '../src/contexts/ThemeContext';

type TabType = 'inventory' | 'donors' | 'requests' | 'bags';
type BloodGroupType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

const BLOOD_GROUPS: BloodGroupType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const BloodBank: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { 
    bloodUnits, bloodBags, bloodDonors, bloodRequests,
    addBloodUnit, updateBloodUnit,
    addBloodBag, updateBloodBag, deleteBloodBag,
    addBloodDonor, updateBloodDonor, deleteBloodDonor,
    addBloodRequest, updateBloodRequest
  } = useData();

  // State
  const [activeTab, setActiveTab] = useState<TabType>('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Modal States
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);
  const [isBagModalOpen, setIsBagModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'donor' | 'bag', item: BloodDonor | BloodBag } | null>(null);

  // Edit States
  const [editingDonor, setEditingDonor] = useState<BloodDonor | null>(null);
  const [editingBag, setEditingBag] = useState<BloodBag | null>(null);
  const [editingRequest, setEditingRequest] = useState<BloodRequest | null>(null);

  // Form States
  const [donorForm, setDonorForm] = useState({
    name: '', age: 0, gender: 'Male', bloodGroup: 'A+' as BloodGroupType,
    contact: '', email: '', address: '', medicalConditions: '', medications: '', status: 'Active' as const
  });

  const [bagForm, setBagForm] = useState({
    bloodGroup: 'A+' as BloodGroupType, donorId: '', donorName: '',
    collectionDate: '', expiryDate: '', volume: 450, location: '', status: 'Available' as const
  });

  const [requestForm, setRequestForm] = useState({
    patientId: '', patientName: '', bloodGroup: 'A+' as BloodGroupType,
    unitsRequired: 1, urgency: 'Routine' as const, department: '',
    doctor: '', requiredDate: '', notes: ''
  });

  // Stats
  const stats = useMemo(() => {
    const totalUnits = bloodUnits.reduce((sum, u) => sum + u.bags, 0);
    const criticalGroups = bloodUnits.filter(u => u.status === 'Critical').length;
    const lowGroups = bloodUnits.filter(u => u.status === 'Low').length;
    const pendingRequests = bloodRequests.filter(r => r.status === 'Pending').length;
    const activeDonors = bloodDonors.filter(d => d.status === 'Active').length;
    const availableBags = bloodBags.filter(b => b.status === 'Available').length;

    return { totalUnits, criticalGroups, lowGroups, pendingRequests, activeDonors, availableBags };
  }, [bloodUnits, bloodRequests, bloodDonors, bloodBags]);

  // Getters
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Adequate': case 'Available': case 'Active': case 'Fulfilled': case 'Compatible':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Low': case 'Pending': case 'Approved':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'Critical': case 'Expired': case 'Discarded': case 'Incompatible': case 'Cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'Reserved': case 'Used': case 'Deferred':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Emergency': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'Urgent': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'Routine': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  // Filtered Data
  const filteredDonors = useMemo(() => {
    let result = [...bloodDonors];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(term) || 
        d.id.toLowerCase().includes(term) ||
        d.bloodGroup.toLowerCase().includes(term)
      );
    }
    if (filterBloodGroup !== 'all') {
      result = result.filter(d => d.bloodGroup === filterBloodGroup);
    }
    if (filterStatus !== 'all') {
      result = result.filter(d => d.status === filterStatus);
    }
    return result;
  }, [bloodDonors, searchTerm, filterBloodGroup, filterStatus]);

  const filteredBags = useMemo(() => {
    let result = [...bloodBags];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(b => 
        b.donorName.toLowerCase().includes(term) || 
        b.id.toLowerCase().includes(term) ||
        b.bloodGroup.toLowerCase().includes(term)
      );
    }
    if (filterBloodGroup !== 'all') {
      result = result.filter(b => b.bloodGroup === filterBloodGroup);
    }
    if (filterStatus !== 'all') {
      result = result.filter(b => b.status === filterStatus);
    }
    return result;
  }, [bloodBags, searchTerm, filterBloodGroup, filterStatus]);

  const filteredRequests = useMemo(() => {
    let result = [...bloodRequests];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(r => 
        r.patientName.toLowerCase().includes(term) || 
        r.id.toLowerCase().includes(term) ||
        r.bloodGroup.toLowerCase().includes(term)
      );
    }
    if (filterBloodGroup !== 'all') {
      result = result.filter(r => r.bloodGroup === filterBloodGroup);
    }
    if (filterStatus !== 'all') {
      result = result.filter(r => r.status === filterStatus);
    }
    return result;
  }, [bloodRequests, searchTerm, filterBloodGroup, filterStatus]);

  // Handlers
  const handleAddDonor = () => {
    const newDonor: BloodDonor = {
      id: `D-${Date.now()}`,
      name: donorForm.name,
      age: donorForm.age,
      gender: donorForm.gender,
      bloodGroup: donorForm.bloodGroup,
      contact: donorForm.contact,
      email: donorForm.email,
      address: donorForm.address,
      totalDonations: 0,
      status: donorForm.status,
      medicalConditions: donorForm.medicalConditions ? donorForm.medicalConditions.split(',').map(s => s.trim()) : undefined,
      medications: donorForm.medications ? donorForm.medications.split(',').map(s => s.trim()) : undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };
    addBloodDonor(newDonor);
    setIsDonorModalOpen(false);
    resetDonorForm();
  };

  const handleEditDonor = () => {
    if (!editingDonor) return;
    updateBloodDonor(editingDonor.id, {
      name: donorForm.name,
      age: donorForm.age,
      gender: donorForm.gender,
      bloodGroup: donorForm.bloodGroup,
      contact: donorForm.contact,
      email: donorForm.email,
      address: donorForm.address,
      status: donorForm.status,
      medicalConditions: donorForm.medicalConditions ? donorForm.medicalConditions.split(',').map(s => s.trim()) : undefined,
      medications: donorForm.medications ? donorForm.medications.split(',').map(s => s.trim()) : undefined,
    });
    setIsDonorModalOpen(false);
    setEditingDonor(null);
    resetDonorForm();
  };

  const handleAddBag = () => {
    const newBag: BloodBag = {
      id: `BB-${Date.now()}`,
      bloodGroup: bagForm.bloodGroup,
      donorId: bagForm.donorId,
      donorName: bagForm.donorName,
      collectionDate: bagForm.collectionDate,
      expiryDate: bagForm.expiryDate,
      volume: bagForm.volume,
      status: bagForm.status,
      location: bagForm.location
    };
    addBloodBag(newBag);
    
    // Update blood unit count
    const unit = bloodUnits.find(u => u.group === bagForm.bloodGroup);
    if (unit) {
      const newCount = unit.bags + 1;
      updateBloodUnit(unit.id, {
        bags: newCount,
        status: newCount <= 2 ? 'Critical' : newCount <= 5 ? 'Low' : 'Adequate'
      });
    }
    
    setIsBagModalOpen(false);
    resetBagForm();
  };

  const handleEditBag = () => {
    if (!editingBag) return;
    updateBloodBag(editingBag.id, {
      bloodGroup: bagForm.bloodGroup,
      donorId: bagForm.donorId,
      donorName: bagForm.donorName,
      collectionDate: bagForm.collectionDate,
      expiryDate: bagForm.expiryDate,
      volume: bagForm.volume,
      status: bagForm.status,
      location: bagForm.location
    });
    setIsBagModalOpen(false);
    setEditingBag(null);
    resetBagForm();
  };

  const handleAddRequest = () => {
    const newRequest: BloodRequest = {
      id: `BR-${Date.now()}`,
      patientId: requestForm.patientId,
      patientName: requestForm.patientName,
      bloodGroup: requestForm.bloodGroup,
      unitsRequired: requestForm.unitsRequired,
      urgency: requestForm.urgency,
      department: requestForm.department,
      doctor: requestForm.doctor,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      requiredDate: requestForm.requiredDate,
      notes: requestForm.notes
    };
    addBloodRequest(newRequest);
    setIsRequestModalOpen(false);
    resetRequestForm();
  };

  const handleUpdateRequestStatus = (id: string, status: BloodRequest['status']) => {
    updateBloodRequest(id, { status });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'donor') {
      deleteBloodDonor(deleteTarget.item.id);
    } else {
      deleteBloodBag(deleteTarget.item.id);
    }
    setIsDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const resetDonorForm = () => {
    setDonorForm({
      name: '', age: 0, gender: 'Male', bloodGroup: 'A+',
      contact: '', email: '', address: '', medicalConditions: '', medications: '', status: 'Active'
    });
  };

  const resetBagForm = () => {
    setBagForm({
      bloodGroup: 'A+', donorId: '', donorName: '',
      collectionDate: '', expiryDate: '', volume: 450, location: '', status: 'Available'
    });
  };

  const resetRequestForm = () => {
    setRequestForm({
      patientId: '', patientName: '', bloodGroup: 'A+',
      unitsRequired: 1, urgency: 'Routine', department: '',
      doctor: '', requiredDate: '', notes: ''
    });
  };

  const openEditDonor = (donor: BloodDonor) => {
    setEditingDonor(donor);
    setDonorForm({
      name: donor.name,
      age: donor.age,
      gender: donor.gender,
      bloodGroup: donor.bloodGroup,
      contact: donor.contact,
      email: donor.email || '',
      address: donor.address,
      medicalConditions: donor.medicalConditions?.join(', ') || '',
      medications: donor.medications?.join(', ') || '',
      status: donor.status
    });
    setIsDonorModalOpen(true);
  };

  const openEditBag = (bag: BloodBag) => {
    setEditingBag(bag);
    setBagForm({
      bloodGroup: bag.bloodGroup,
      donorId: bag.donorId,
      donorName: bag.donorName,
      collectionDate: bag.collectionDate,
      expiryDate: bag.expiryDate,
      volume: bag.volume,
      location: bag.location,
      status: bag.status
    });
    setIsBagModalOpen(true);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Blood Group', 'Bags', 'Status'];
    const rows = bloodUnits.map(u => [u.id, u.group, u.bags, u.status]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blood-inventory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blood Bank Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage blood inventory, donations, and requests.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportToCSV}
            className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Download size={18} /> Export
          </button>
          <button 
            onClick={() => { resetDonorForm(); setIsDonorModalOpen(true); }}
            className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-700 shadow-md flex items-center gap-2"
          >
            <UserPlus size={18} /> Register Donor
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Droplet className="text-red-600 dark:text-red-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalUnits}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Units</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Package className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.availableBags}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.criticalGroups}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Critical</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Activity className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.lowGroups}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Low Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.activeDonors}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Active Donors</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Clock className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.pendingRequests}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
          {[
            { id: 'inventory', label: 'Inventory', icon: Droplet },
            { id: 'bags', label: 'Blood Bags', icon: Package },
            { id: 'donors', label: 'Donors', icon: Users },
            { id: 'requests', label: 'Requests', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'text-red-700 dark:text-red-400 border-b-2 border-red-600 bg-red-50/50 dark:bg-red-900/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                showFilters 
                  ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300' 
                  : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Filter size={16} />
              Filters
            </button>
            {activeTab === 'bags' && (
              <button 
                onClick={() => { resetBagForm(); setIsBagModalOpen(true); }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 flex items-center gap-2"
              >
                <Plus size={16} /> Add Bag
              </button>
            )}
            {activeTab === 'requests' && (
              <button 
                onClick={() => { resetRequestForm(); setIsRequestModalOpen(true); }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 flex items-center gap-2"
              >
                <Plus size={16} /> New Request
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Blood Group:</span>
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                aria-label="Filter by blood group"
              >
                <option value="all">All Groups</option>
                {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                {activeTab === 'donors' && (
                  <>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Deferred">Deferred</option>
                  </>
                )}
                {activeTab === 'bags' && (
                  <>
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Used">Used</option>
                    <option value="Expired">Expired</option>
                    <option value="Discarded">Discarded</option>
                  </>
                )}
                {activeTab === 'requests' && (
                  <>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Fulfilled">Fulfilled</option>
                    <option value="Cancelled">Cancelled</option>
                  </>
                )}
              </select>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bloodUnits.map((unit) => (
                <div 
                  key={unit.id} 
                  className={`bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl border transition-all hover:shadow-md ${
                    unit.status === 'Critical' ? 'border-red-300 dark:border-red-700 animate-pulse' :
                    unit.status === 'Low' ? 'border-orange-300 dark:border-orange-700' :
                    'border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 font-black text-lg shadow-sm">
                      {unit.group}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusColor(unit.status)}`}>
                      {unit.status}
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-slate-800 dark:text-white">{unit.bags}</span>
                    <span className="text-slate-500 dark:text-slate-400 mb-1 text-sm font-medium">Units</span>
                  </div>
                  {unit.status === 'Critical' && (
                    <div className="mt-3 flex items-center gap-2 text-red-600 dark:text-red-400 text-xs">
                      <AlertTriangle size={14} />
                      <span>Urgent: Need donations</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Blood Bags Tab */}
          {activeTab === 'bags' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-700/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Blood Group</th>
                    <th className="px-4 py-3">Donor</th>
                    <th className="px-4 py-3">Collection</th>
                    <th className="px-4 py-3">Expiry</th>
                    <th className="px-4 py-3">Volume</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredBags.map((bag) => (
                    <tr key={bag.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors group">
                      <td className="px-4 py-3 font-mono text-sm text-slate-600 dark:text-slate-300">{bag.id}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded font-bold text-sm">
                          {bag.bloodGroup}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{bag.donorName}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{bag.collectionDate}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{bag.expiryDate}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{bag.volume}ml</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{bag.location}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(bag.status)}`}>
                          {bag.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openEditBag(bag)}
                            className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => { setDeleteTarget({ type: 'bag', item: bag }); setIsDeleteDialogOpen(true); }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBags.length === 0 && (
                <div className="p-8 text-center text-slate-400 dark:text-slate-500">No blood bags found.</div>
              )}
            </div>
          )}

          {/* Donors Tab */}
          {activeTab === 'donors' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-700/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-4 py-3">Donor Info</th>
                    <th className="px-4 py-3">Blood Group</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Donations</th>
                    <th className="px-4 py-3">Last Donation</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredDonors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold text-sm">
                            {donor.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{donor.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{donor.age} yrs, {donor.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded font-bold text-sm">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-slate-700 dark:text-slate-300">{donor.contact}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{donor.email}</p>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{donor.totalDonations}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{donor.lastDonationDate || 'Never'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(donor.status)}`}>
                          {donor.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openEditDonor(donor)}
                            className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => { setDeleteTarget({ type: 'donor', item: donor }); setIsDeleteDialogOpen(true); }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredDonors.length === 0 && (
                <div className="p-8 text-center text-slate-400 dark:text-slate-500">No donors found.</div>
              )}
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-700/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-4 py-3">Request ID</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Blood Group</th>
                    <th className="px-4 py-3">Units</th>
                    <th className="px-4 py-3">Urgency</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Required By</th>
                    <th className="px-4 py-3">Cross Match</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-sm text-slate-600 dark:text-slate-300">{request.id}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900 dark:text-white">{request.patientName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{request.patientId}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded font-bold text-sm">
                          {request.bloodGroup}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{request.unitsRequired}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{request.department}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{request.requiredDate}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(request.crossMatchStatus || 'Pending')}`}>
                          {request.crossMatchStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {request.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => handleUpdateRequestStatus(request.id, 'Approved')}
                                className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                                title="Approve"
                              >
                                <CheckCircle size={14} />
                              </button>
                              <button 
                                onClick={() => handleUpdateRequestStatus(request.id, 'Cancelled')}
                                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                                title="Cancel"
                              >
                                <XCircle size={14} />
                              </button>
                            </>
                          )}
                          {request.status === 'Approved' && (
                            <button 
                              onClick={() => handleUpdateRequestStatus(request.id, 'Fulfilled')}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                              title="Mark Fulfilled"
                            >
                              <CheckCircle size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRequests.length === 0 && (
                <div className="p-8 text-center text-slate-400 dark:text-slate-500">No requests found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Donor Modal */}
      {isDonorModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingDonor ? 'Edit Donor' : 'Register New Donor'}
              </h2>
              <button onClick={() => { setIsDonorModalOpen(false); setEditingDonor(null); resetDonorForm(); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" aria-label="Close">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name *</label>
                  <input type="text" value={donorForm.name} onChange={(e) => setDonorForm(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age *</label>
                  <input type="number" value={donorForm.age} onChange={(e) => setDonorForm(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Age" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                  <select value={donorForm.gender} onChange={(e) => setDonorForm(prev => ({ ...prev, gender: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" aria-label="Select gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Group *</label>
                  <select value={donorForm.bloodGroup} onChange={(e) => setDonorForm(prev => ({ ...prev, bloodGroup: e.target.value as BloodGroupType }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" aria-label="Select blood group">
                    {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact *</label>
                  <input type="text" value={donorForm.contact} onChange={(e) => setDonorForm(prev => ({ ...prev, contact: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input type="email" value={donorForm.email} onChange={(e) => setDonorForm(prev => ({ ...prev, email: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Email address" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
                  <input type="text" value={donorForm.address} onChange={(e) => setDonorForm(prev => ({ ...prev, address: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Full address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Medical Conditions</label>
                  <input type="text" value={donorForm.medicalConditions} onChange={(e) => setDonorForm(prev => ({ ...prev, medicalConditions: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Comma separated" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Medications</label>
                  <input type="text" value={donorForm.medications} onChange={(e) => setDonorForm(prev => ({ ...prev, medications: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Comma separated" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select value={donorForm.status} onChange={(e) => setDonorForm(prev => ({ ...prev, status: e.target.value as BloodDonor['status'] }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" aria-label="Select status">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Deferred">Deferred</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button onClick={() => { setIsDonorModalOpen(false); setEditingDonor(null); resetDonorForm(); }} className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
              <button onClick={editingDonor ? handleEditDonor : handleAddDonor} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">{editingDonor ? 'Save Changes' : 'Register Donor'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Blood Bag Modal */}
      {isBagModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{editingBag ? 'Edit Blood Bag' : 'Add Blood Bag'}</h2>
              <button onClick={() => { setIsBagModalOpen(false); setEditingBag(null); resetBagForm(); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" aria-label="Close">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Group *</label>
                  <select value={bagForm.bloodGroup} onChange={(e) => setBagForm(prev => ({ ...prev, bloodGroup: e.target.value as BloodGroupType }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" aria-label="Select blood group">
                    {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Volume (ml)</label>
                  <input type="number" value={bagForm.volume} onChange={(e) => setBagForm(prev => ({ ...prev, volume: parseInt(e.target.value) || 450 }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Donor ID</label>
                  <input type="text" value={bagForm.donorId} onChange={(e) => setBagForm(prev => ({ ...prev, donorId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="D-XXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Donor Name</label>
                  <input type="text" value={bagForm.donorName} onChange={(e) => setBagForm(prev => ({ ...prev, donorName: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Collection Date *</label>
                  <input type="date" value={bagForm.collectionDate} onChange={(e) => setBagForm(prev => ({ ...prev, collectionDate: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expiry Date *</label>
                  <input type="date" value={bagForm.expiryDate} onChange={(e) => setBagForm(prev => ({ ...prev, expiryDate: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                  <input type="text" value={bagForm.location} onChange={(e) => setBagForm(prev => ({ ...prev, location: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Freezer A-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select value={bagForm.status} onChange={(e) => setBagForm(prev => ({ ...prev, status: e.target.value as BloodBag['status'] }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" aria-label="Select status">
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Used">Used</option>
                    <option value="Expired">Expired</option>
                    <option value="Discarded">Discarded</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button onClick={() => { setIsBagModalOpen(false); setEditingBag(null); resetBagForm(); }} className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
              <button onClick={editingBag ? handleEditBag : handleAddBag} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">{editingBag ? 'Save Changes' : 'Add Bag'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Blood Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">New Blood Request</h2>
              <button onClick={() => { setIsRequestModalOpen(false); resetRequestForm(); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" aria-label="Close">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Patient ID *</label>
                  <input type="text" value={requestForm.patientId} onChange={(e) => setRequestForm(prev => ({ ...prev, patientId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="P-XXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Patient Name *</label>
                  <input type="text" value={requestForm.patientName} onChange={(e) => setRequestForm(prev => ({ ...prev, patientName: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Group *</label>
                  <select value={requestForm.bloodGroup} onChange={(e) => setRequestForm(prev => ({ ...prev, bloodGroup: e.target.value as BloodGroupType }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" aria-label="Select blood group">
                    {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Units Required *</label>
                  <input type="number" value={requestForm.unitsRequired} onChange={(e) => setRequestForm(prev => ({ ...prev, unitsRequired: parseInt(e.target.value) || 1 }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" min="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Urgency *</label>
                  <select value={requestForm.urgency} onChange={(e) => setRequestForm(prev => ({ ...prev, urgency: e.target.value as BloodRequest['urgency'] }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" aria-label="Select urgency">
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Department *</label>
                  <input type="text" value={requestForm.department} onChange={(e) => setRequestForm(prev => ({ ...prev, department: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="ICU, Surgery, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Doctor</label>
                  <input type="text" value={requestForm.doctor} onChange={(e) => setRequestForm(prev => ({ ...prev, doctor: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="Dr. Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Required By *</label>
                  <input type="date" value={requestForm.requiredDate} onChange={(e) => setRequestForm(prev => ({ ...prev, requiredDate: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes</label>
                  <textarea value={requestForm.notes} onChange={(e) => setRequestForm(prev => ({ ...prev, notes: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" rows={2} placeholder="Additional notes..." />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button onClick={() => { setIsRequestModalOpen(false); resetRequestForm(); }} className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
              <button onClick={handleAddRequest} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Submit Request</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <Trash2 className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete {deleteTarget.type === 'donor' ? 'Donor' : 'Blood Bag'}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Are you sure you want to delete <strong>{deleteTarget.type === 'donor' ? (deleteTarget.item as BloodDonor).name : (deleteTarget.item as BloodBag).id}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => { setIsDeleteDialogOpen(false); setDeleteTarget(null); }} className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodBank;
