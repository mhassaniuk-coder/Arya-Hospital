import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  BedDouble,
  Activity,
  Calendar,
  DollarSign,
  ClipboardList,
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Brain,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  UserCheck,
  HeartPulse,
  Bug,
  Package,
  Zap,
  FileText,
  Settings,
  UserPlus,
  Bell,
  CheckCircle2,
  XCircle,
  Info,
  Warning,
  BarChart3,
  Stethoscope,
} from 'lucide-react';
import { useData } from '../src/contexts/DataContext';
import { useTheme } from '../src/contexts/ThemeContext';
import { useAuth } from '../src/contexts/AuthContext';
import {
  useReadmissionRiskPredictor,
  useOutbreakDetection,
  useInventoryForecast,
  usePatientFlowAnalytics,
} from '../hooks/useAI';
import {
  ReadmissionRiskInput,
  OutbreakDetectionInput,
  InventoryForecastInput,
  PatientFlowInput,
  ReadmissionRiskResult,
  OutbreakDetectionResult,
  InventoryForecastResult,
  PatientFlowResult,
  UrgencyLevel,
} from '../types';

// ============================================
// STAT CARD COMPONENT
// ============================================
interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  trendUp,
  icon,
  color,
  subtitle,
  onClick,
}) => (
  <div
    className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
    onClick={onClick}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>
        {icon}
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            trendUp
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}
        >
          {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      )}
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
    {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{subtitle}</p>}
  </div>
);

// ============================================
// AI INSIGHT CARD COMPONENT
// ============================================
interface AIInsightCardProps {
  title: string;
  description: string;
  confidence: number;
  severity: 'critical' | 'warning' | 'info';
  recommendations?: string[];
  isLoading?: boolean;
  icon?: React.ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  description,
  confidence,
  severity,
  recommendations = [],
  isLoading = false,
  icon,
  expanded = false,
  onToggle,
}) => {
  const severityStyles = {
    critical: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-500',
      badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: 'text-amber-500',
      badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-500',
      badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    },
  };

  const style = severityStyles[severity];

  if (isLoading) {
    return (
      <div className={`${style.bg} ${style.border} border rounded-xl p-4 animate-pulse`}>
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          <span className="text-slate-500 dark:text-slate-400">Analyzing...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl overflow-hidden`}>
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {icon && <div className={style.icon}>{icon}</div>}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-slate-800 dark:text-white">{title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${style.badge}`}>
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Brain size={12} />
                  <span>AI Confidence: {confidence}%</span>
                </div>
              </div>
            </div>
          </div>
          {recommendations.length > 0 && (
            <div className="text-slate-400 dark:text-slate-500">
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          )}
        </div>
      </div>
      {expanded && recommendations.length > 0 && (
        <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700 pt-3 mt-2">
          <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
            AI Recommendations
          </h5>
          <ul className="space-y-2">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Zap className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ============================================
// QUICK ACTION BUTTON COMPONENT
// ============================================
interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
  onClick?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  description,
  color,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all hover:scale-[1.02] text-left w-full`}
  >
    <div className={`p-2 rounded-lg ${color} bg-opacity-10 dark:bg-opacity-20`}>
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-slate-800 dark:text-white text-sm">{label}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  </button>
);

// ============================================
// ACTIVITY FEED ITEM COMPONENT
// ============================================
interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, time, type }) => {
  const typeStyles = {
    success: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    warning: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30',
    info: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    error: 'text-red-500 bg-red-100 dark:bg-red-900/30',
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
      <div className={`p-2 rounded-lg ${typeStyles[type]}`}>{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-800 dark:text-white">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{time}</p>
      </div>
    </div>
  );
};

// ============================================
// MAIN ADMIN OVERVIEW COMPONENT
// ============================================
const AdminOverview: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const {
    patients,
    appointments,
    beds,
    staff,
    tasks,
    invoices,
    inventory,
    opdQueue,
    getStats,
  } = useData();
  const isDark = theme === 'dark';
  const stats = getStats();

  // AI Hooks
  const readmissionRisk = useReadmissionRiskPredictor();
  const outbreakDetection = useOutbreakDetection();
  const inventoryForecast = useInventoryForecast();
  const patientFlow = usePatientFlowAnalytics();

  // State for AI insights
  const [aiInsights, setAiInsights] = useState<{
    readmission: ReadmissionRiskResult | null;
    outbreak: OutbreakDetectionResult | null;
    inventory: InventoryForecastResult | null;
    flow: PatientFlowResult | null;
  }>({
    readmission: null,
    outbreak: null,
    inventory: null,
    flow: null,
  });

  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(true);

  // Calculate metrics
  const inpatients = patients.filter((p) => p.roomNumber).length;
  const criticalPatients = patients.filter(
    (p) => p.urgency === UrgencyLevel.CRITICAL
  ).length;
  const occupiedBeds = beds.filter((b) => b.status === 'Occupied').length;
  const totalBeds = beds.length;
  const bedOccupancyRate = Math.round((occupiedBeds / totalBeds) * 100);
  const staffOnDuty = staff.filter(
    (s) => s.status === 'Online' || s.status === 'In Surgery'
  ).length;
  const todayAppointments = appointments.filter(
    (a) => a.date === 'Today' && a.status !== 'Cancelled'
  ).length;
  const pendingTasks = tasks.filter((t) => t.status !== 'Done').length;
  const lowStockItems = inventory.filter((i) => i.status === 'Low Stock').length;

  // Run AI analysis on mount
  useEffect(() => {
    const runAIAnalysis = async () => {
      setIsAiLoading(true);

      // Readmission Risk Analysis
      const readmissionInput: ReadmissionRiskInput = {
        patientData: patients.map((p) => ({
          patientId: p.id,
          age: p.age,
          gender: p.gender,
          diagnoses: [p.condition],
          previousAdmissions: Math.floor(Math.random() * 3) + 1,
          lengthOfStay: Math.floor(Math.random() * 10) + 1,
          dischargeDisposition: 'home',
          medications: [],
          vitalSigns: {
            bloodPressure: '120/80',
            heartRate: 72,
            temperature: 98.6,
            respiratoryRate: 16,
            oxygenSaturation: 98,
          },
          labResults: [],
          socialDeterminants: {
            livingSituation: 'home',
            supportSystem: 'family',
            transportationAccess: true,
          },
        })),
        analysisType: 'hospital-wide',
      };

      // Outbreak Detection Analysis
      const outbreakInput: OutbreakDetectionInput = {
        patientData: patients.map((p) => ({
          patientId: p.id,
          symptoms: [p.condition],
          diagnosis: p.condition,
          department: p.roomNumber?.includes('ICU') ? 'ICU' : 'General',
          admissionDate: p.admissionDate,
          location: p.roomNumber || 'OPD',
        })),
        timeRange: '7d',
        detectionSensitivity: 'high',
      };

      // Inventory Forecast Analysis
      const inventoryInput: InventoryForecastInput = {
        currentInventory: inventory.map((i) => ({
          itemId: i.id,
          itemName: i.name,
          currentStock: i.stock,
          unit: i.unit,
          category: i.category,
          reorderPoint: 50,
          averageDailyUsage: 5,
          leadTime: 3,
        })),
        forecastDays: 30,
        seasonalFactors: [],
      };

      // Patient Flow Analysis
      const flowInput: PatientFlowInput = {
        currentQueue: opdQueue,
        staffingLevels: [
          { department: 'Emergency', staffCount: 5, required: 7 },
          { department: 'OPD', staffCount: 8, required: 8 },
          { department: 'ICU', staffCount: 4, required: 5 },
        ],
        departmentCapacities: [
          { department: 'Emergency', maxCapacity: 20, currentOccupancy: 15 },
          { department: 'OPD', maxCapacity: 50, currentOccupancy: 35 },
          { department: 'ICU', maxCapacity: 10, currentOccupancy: 8 },
        ],
      };

      // Execute AI calls
      try {
        const [readmissionRes, outbreakRes, inventoryRes, flowRes] = await Promise.all([
          readmissionRisk.execute(readmissionInput),
          outbreakDetection.execute(outbreakInput),
          inventoryForecast.execute(inventoryInput),
          patientFlow.execute(flowInput),
        ]);

        setAiInsights({
          readmission: readmissionRes.success ? readmissionRes.data! : null,
          outbreak: outbreakRes.success ? outbreakRes.data! : null,
          inventory: inventoryRes.success ? inventoryRes.data! : null,
          flow: flowRes.success ? flowRes.data! : null,
        });
      } catch (error) {
        console.error('AI Analysis Error:', error);
      } finally {
        setIsAiLoading(false);
      }
    };

    runAIAnalysis();
  }, []);

  // Toggle insight expansion
  const toggleInsight = (id: string) => {
    setExpandedInsight(expandedInsight === id ? null : id);
  };

  // Mock recent activity data
  const recentActivity = [
    { icon: <UserPlus size={16} />, title: 'New patient admitted to ICU', time: '5 min ago', type: 'info' as const },
    { icon: <CheckCircle2 size={16} />, title: 'Discharge summary approved', time: '12 min ago', type: 'success' as const },
    { icon: <AlertTriangle size={16} />, title: 'Low stock alert: Insulin', time: '25 min ago', type: 'warning' as const },
    { icon: <Calendar size={16} />, title: 'New appointment scheduled', time: '30 min ago', type: 'info' as const },
    { icon: <XCircle size={16} />, title: 'Appointment cancelled', time: '45 min ago', type: 'error' as const },
  ];

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Admin Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, {user?.name || 'Administrator'}. Here's your hospital at a glance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              System Online
            </span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
            <FileText size={18} />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          trend="+12%"
          trendUp={true}
          icon={<Users className="text-teal-600 dark:text-teal-400" size={24} />}
          color="bg-teal-500"
          subtitle={`${inpatients} inpatients, ${criticalPatients} critical`}
        />
        <StatCard
          title="Bed Occupancy"
          value={`${bedOccupancyRate}%`}
          trend={bedOccupancyRate > 80 ? 'High' : 'Normal'}
          trendUp={bedOccupancyRate > 80}
          icon={<BedDouble className="text-blue-600 dark:text-blue-400" size={24} />}
          color="bg-blue-500"
          subtitle={`${occupiedBeds}/${totalBeds} beds occupied`}
        />
        <StatCard
          title="Staff on Duty"
          value={staffOnDuty}
          icon={<UserCheck className="text-indigo-600 dark:text-indigo-400" size={24} />}
          color="bg-indigo-500"
          subtitle={`of ${staff.length} total staff`}
        />
        <StatCard
          title="Today's Appointments"
          value={todayAppointments}
          icon={<Calendar className="text-purple-600 dark:text-purple-400" size={24} />}
          color="bg-purple-500"
          subtitle={`${opdQueue.length} in queue`}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={<ClipboardList className="text-orange-600 dark:text-orange-400" size={24} />}
          color="bg-orange-500"
          subtitle={`${tasks.filter((t) => t.priority === 'High').length} high priority`}
        />
        <StatCard
          title="Daily Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          trend="+8%"
          trendUp={true}
          icon={<DollarSign className="text-green-600 dark:text-green-400" size={24} />}
          color="bg-green-500"
          subtitle="Collected today"
        />
        <StatCard
          title="Pending Revenue"
          value={`$${stats.pendingRevenue.toLocaleString()}`}
          icon={<Activity className="text-amber-600 dark:text-amber-400" size={24} />}
          color="bg-amber-500"
          subtitle="Awaiting collection"
        />
        <StatCard
          title="Active Alerts"
          value={lowStockItems + criticalPatients}
          icon={<AlertTriangle className="text-red-600 dark:text-red-400" size={24} />}
          color="bg-red-500"
          subtitle={`${lowStockItems} low stock, ${criticalPatients} critical`}
        />
      </div>

      {/* AI Insights Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Brain className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                AI-Powered Insights
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Predictive analytics and recommendations
              </p>
            </div>
          </div>
          {isAiLoading && (
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Readmission Risk Insight */}
          <AIInsightCard
            title="Readmission Risk Analysis"
            description={
              aiInsights.readmission?.summary ||
              'Analyzing patient readmission risk factors...'
            }
            confidence={aiInsights.readmission?.confidence || 85}
            severity={
              aiInsights.readmission?.highRiskPatients &&
              aiInsights.readmission.highRiskPatients.length > 0
                ? 'warning'
                : 'info'
            }
            recommendations={aiInsights.readmission?.recommendations || [
              'Monitor high-risk patients closely',
              'Implement discharge follow-up protocols',
            ]}
            isLoading={isAiLoading}
            icon={<HeartPulse size={20} className="text-pink-500" />}
            expanded={expandedInsight === 'readmission'}
            onToggle={() => toggleInsight('readmission')}
          />

          {/* Outbreak Detection Insight */}
          <AIInsightCard
            title="Disease Outbreak Detection"
            description={
              aiInsights.outbreak?.summary ||
              'Monitoring for potential disease outbreaks...'
            }
            confidence={aiInsights.outbreak?.confidence || 92}
            severity={
              aiInsights.outbreak?.outbreaksDetected &&
              aiInsights.outbreak.outbreaksDetected.length > 0
                ? 'critical'
                : 'info'
            }
            recommendations={aiInsights.outbreak?.recommendations || [
              'Continue routine surveillance',
              'Maintain infection control protocols',
            ]}
            isLoading={isAiLoading}
            icon={<Bug size={20} className="text-red-500" />}
            expanded={expandedInsight === 'outbreak'}
            onToggle={() => toggleInsight('outbreak')}
          />

          {/* Inventory Forecast Insight */}
          <AIInsightCard
            title="Inventory Forecast"
            description={
              aiInsights.inventory?.summary ||
              'Analyzing inventory levels and predicting shortages...'
            }
            confidence={aiInsights.inventory?.confidence || 88}
            severity={lowStockItems > 0 ? 'warning' : 'info'}
            recommendations={aiInsights.inventory?.recommendations || [
              'Review low stock items',
              'Plan procurement for critical supplies',
            ]}
            isLoading={isAiLoading}
            icon={<Package size={20} className="text-amber-500" />}
            expanded={expandedInsight === 'inventory'}
            onToggle={() => toggleInsight('inventory')}
          />

          {/* Patient Flow Insight */}
          <AIInsightCard
            title="Patient Flow Analysis"
            description={
              aiInsights.flow?.summary ||
              'Analyzing patient flow and wait times...'
            }
            confidence={aiInsights.flow?.confidence || 90}
            severity={
              aiInsights.flow?.bottlenecks && aiInsights.flow.bottlenecks.length > 0
                ? 'warning'
                : 'info'
            }
            recommendations={aiInsights.flow?.recommendations || [
              'Optimize queue management',
              'Consider staff reallocation during peak hours',
            ]}
            isLoading={isAiLoading}
            icon={<BarChart3 size={20} className="text-blue-500" />}
            expanded={expandedInsight === 'flow'}
            onToggle={() => toggleInsight('flow')}
          />
        </div>
      </div>

      {/* Quick Actions and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30">
              <Zap className="text-teal-600 dark:text-teal-400" size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickAction
              icon={<UserPlus className="text-teal-600 dark:text-teal-400" size={20} />}
              label="Add Patient"
              description="Register new patient"
              color="bg-teal-500"
            />
            <QuickAction
              icon={<Calendar className="text-blue-600 dark:text-blue-400" size={20} />}
              label="Schedule"
              description="Book appointment"
              color="bg-blue-500"
            />
            <QuickAction
              icon={<ClipboardList className="text-purple-600 dark:text-purple-400" size={20} />}
              label="Create Task"
              description="Assign new task"
              color="bg-purple-500"
            />
            <QuickAction
              icon={<FileText className="text-green-600 dark:text-green-400" size={20} />}
              label="Generate Report"
              description="Create analytics report"
              color="bg-green-500"
            />
            <QuickAction
              icon={<Stethoscope className="text-indigo-600 dark:text-indigo-400" size={20} />}
              label="AI Consult"
              description="Launch AI assistant"
              color="bg-indigo-500"
            />
            <QuickAction
              icon={<Settings className="text-slate-600 dark:text-slate-400" size={20} />}
              label="Settings"
              description="System configuration"
              color="bg-slate-500"
            />
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Clock className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <button className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
            {recentActivity.map((activity, idx) => (
              <ActivityItem key={idx} {...activity} />
            ))}
          </div>
        </div>
      </div>

      {/* Department Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <Shield className="text-indigo-600 dark:text-indigo-400" size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Department Status
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Emergency', status: 'Active', patients: 15, capacity: 20, color: 'red' },
            { name: 'ICU', status: 'High Load', patients: 8, capacity: 10, color: 'amber' },
            { name: 'OPD', status: 'Normal', patients: 35, capacity: 50, color: 'green' },
            { name: 'Surgery', status: 'In Progress', patients: 3, capacity: 5, color: 'blue' },
          ].map((dept, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  {dept.name}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    dept.color === 'red'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : dept.color === 'amber'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      : dept.color === 'green'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  }`}
                >
                  {dept.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Patients</span>
                <span className="font-medium text-slate-800 dark:text-white">
                  {dept.patients}/{dept.capacity}
                </span>
              </div>
              <div className="mt-2 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    dept.color === 'red'
                      ? 'bg-red-500'
                      : dept.color === 'amber'
                      ? 'bg-amber-500'
                      : dept.color === 'green'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${(dept.patients / dept.capacity) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;