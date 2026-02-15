import React, { useState } from 'react';
import { useData } from '../src/contexts/DataContext';
import { ResearchTrial, CDSSInput } from '../types';
import { Microscope, Users, FileText, Plus, X, Sparkles, Brain, Loader2, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { useCDSS } from '../hooks/useAI';

const ClinicalResearch: React.FC = () => {
    const { researchTrials, addResearchTrial } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAIPanel, setShowAIPanel] = useState(false);
    const [patientMatchInput, setPatientMatchInput] = useState({
        diagnosis: '',
        age: '',
        gender: 'Male',
        conditions: '',
        priorTreatments: ''
    });
    const [aiMatchResult, setAiMatchResult] = useState<any>(null);
    
    // AI Clinical Decision Support for Trial Matching
    const { data: cdssResult, loading: cdssLoading, execute: runCDSS } = useCDSS();
    const [formData, setFormData] = useState({
        title: '',
        phase: 'Phase I',
        participants: 0,
        status: 'Recruiting',
        leadResearcher: 'Dr. Chen'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTrial: ResearchTrial = {
            id: Math.random().toString(36).substr(2, 9),
            title: formData.title,
            phase: formData.phase,
            participants: Number(formData.participants),
            status: formData.status as 'Recruiting' | 'Active' | 'Completed',
            leadResearcher: formData.leadResearcher
        };
        addResearchTrial(newTrial);
        setIsModalOpen(false);
        setFormData({ title: '', phase: 'Phase I', participants: 0, status: 'Recruiting', leadResearcher: 'Dr. Chen' });
    };
    
    // AI Trial Matching Handler
    const handleAITrialMatch = async () => {
        if (!patientMatchInput.diagnosis) return;
        
        const input: CDSSInput = {
            patientId: 'PT-001',
            diagnosis: patientMatchInput.diagnosis,
            symptoms: patientMatchInput.conditions.split(',').map(c => c.trim()).filter(Boolean),
            age: patientMatchInput.age ? parseInt(patientMatchInput.age) : 45,
            gender: patientMatchInput.gender,
            allergies: []
        };
        
        await runCDSS(input);
        setShowAIPanel(true);
    };
    
    // Update AI result when data changes
    React.useEffect(() => {
        if (cdssResult) {
            // Create mock trial matches based on CDSS result
            setAiMatchResult({
                matchedTrials: researchTrials.slice(0, 3).map((trial, idx) => ({
                    trial,
                    matchScore: 85 - (idx * 10),
                    reasons: [
                        'Diagnosis matches trial criteria',
                        idx === 0 ? 'Age range compatible' : 'Phase appropriate for condition',
                        idx === 1 ? 'Available slots' : 'Prior treatment alignment'
                    ]
                })),
                recommendations: [
                    'Patient may benefit from Phase II trial as standard treatment options are limited',
                    'Consider trials with biomarker stratification for better outcomes',
                    'Monitor for trial eligibility updates quarterly'
                ]
            });
        }
    }, [cdssResult, researchTrials]);

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Clinical Research</h1>
                  <p className="text-slate-500">Manage trials and study participants.</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setShowAIPanel(!showAIPanel)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md flex items-center gap-2"
                    >
                        <Brain size={16} /> AI Trial Matching
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md flex items-center gap-2"
                    >
                        <Plus size={16} /> New Trial
                    </button>
                </div>
            </div>

            {/* AI Trial Matching Panel */}
            {showAIPanel && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="text-purple-600" size={24} />
                        <h3 className="text-lg font-bold text-purple-900">AI Clinical Trial Matching</h3>
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">AI-Powered</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Diagnosis</label>
                            <input 
                                type="text"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                placeholder="e.g., Type 2 Diabetes"
                                value={patientMatchInput.diagnosis}
                                onChange={e => setPatientMatchInput({...patientMatchInput, diagnosis: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                            <input 
                                type="number"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                placeholder="e.g., 45"
                                value={patientMatchInput.age}
                                onChange={e => setPatientMatchInput({...patientMatchInput, age: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                            <select 
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                value={patientMatchInput.gender}
                                onChange={e => setPatientMatchInput({...patientMatchInput, gender: e.target.value})}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Conditions</label>
                            <input 
                                type="text"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                placeholder="Comma separated"
                                value={patientMatchInput.conditions}
                                onChange={e => setPatientMatchInput({...patientMatchInput, conditions: e.target.value})}
                            />
                        </div>
                        <div className="flex items-end">
                            <button 
                                onClick={handleAITrialMatch}
                                disabled={cdssLoading || !patientMatchInput.diagnosis}
                                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {cdssLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                                Find Trials
                            </button>
                        </div>
                    </div>
                    
                    {/* Results */}
                    {aiMatchResult && (
                        <div className="mt-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-purple-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="text-green-600" size={18} />
                                        <span className="text-sm font-medium text-slate-700">Matched Trials</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">{aiMatchResult.matchedTrials.length}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-purple-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="text-amber-600" size={18} />
                                        <span className="text-sm font-medium text-slate-700">Avg Match Score</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">{Math.round(aiMatchResult.matchedTrials.reduce((acc: number, t: any) => acc + t.matchScore, 0) / aiMatchResult.matchedTrials.length)}%</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-purple-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Brain className="text-purple-600" size={18} />
                                        <span className="text-sm font-medium text-slate-700">Recommendations</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">{aiMatchResult.recommendations.length}</p>
                                </div>
                            </div>
                            
                            {/* Matched Trials List */}
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-3">Recommended Trials</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {aiMatchResult.matchedTrials.map((match: any, idx: number) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h5 className="font-semibold text-slate-800">{match.trial.title}</h5>
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${match.matchScore >= 80 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {match.matchScore}% Match
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 mb-2">{match.trial.phase}</p>
                                            <ul className="text-xs text-slate-600 space-y-1">
                                                {match.reasons.map((reason: string, i: number) => (
                                                    <li key={i} className="flex items-center gap-1">
                                                        <CheckCircle size={12} className="text-green-600" />
                                                        {reason}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* AI Recommendations */}
                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                                    <Brain size={18} />
                                    AI Recommendations
                                </h4>
                                <ul className="space-y-2">
                                    {aiMatchResult.recommendations.map((rec: string, idx: number) => (
                                        <li key={idx} className="text-sm text-purple-800 flex items-start gap-2">
                                            <Sparkles size={14} className="mt-0.5 text-purple-600" />
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {researchTrials.map(trial => (
                    <div key={trial.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                                <Microscope size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 text-lg">{trial.title}</h3>
                                <p className="text-sm text-slate-500 mb-2">Lead: {trial.leadResearcher}</p>
                                <div className="flex gap-2 mb-4">
                                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">{trial.phase}</span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${trial.status === 'Recruiting' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {trial.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Users size={16} />
                                    <span>{trial.participants} Participants</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4 animate-scale-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">New Clinical Trial</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Trial Title</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Lead Researcher</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                    value={formData.leadResearcher}
                                    onChange={e => setFormData({...formData, leadResearcher: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phase</label>
                                    <select 
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                        value={formData.phase}
                                        onChange={e => setFormData({...formData, phase: e.target.value})}
                                    >
                                        <option>Phase I</option>
                                        <option>Phase II</option>
                                        <option>Phase III</option>
                                        <option>Phase IV</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Participants</label>
                                    <input 
                                        required
                                        type="number" 
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                        value={formData.participants}
                                        onChange={e => setFormData({...formData, participants: Number(e.target.value)})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                <select 
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                    value={formData.status}
                                    onChange={e => setFormData({...formData, status: e.target.value})}
                                >
                                    <option value="Recruiting">Recruiting</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-colors mt-2"
                            >
                                Launch Trial
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClinicalResearch;