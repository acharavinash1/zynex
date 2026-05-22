import React from 'react'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, ReferenceLine
} from 'recharts'
import { Activity, ShieldAlert, Cpu, Sparkles, TrendingUp } from 'lucide-react'

// Simulated historical attendance telemetry
const occupancyData = [
  { hour: '08:00', LH_101: 20, CS_Lab_A: 10, ECE_Lab: 5 },
  { hour: '09:30', LH_101: 85, CS_Lab_A: 40, ECE_Lab: 15 },
  { hour: '11:00', LH_101: 95, CS_Lab_A: 54, ECE_Lab: 40 },
  { hour: '12:30', LH_101: 30, CS_Lab_A: 15, ECE_Lab: 10 },
  { hour: '14:00', LH_101: 75, CS_Lab_A: 45, ECE_Lab: 30 },
  { hour: '15:30', LH_101: 40, CS_Lab_A: 20, ECE_Lab: 35 },
  { hour: '17:00', LH_101: 10, CS_Lab_A: 5, ECE_Lab: 0 }
]

// Faculty Load comparative statistics
const facultyLoadData = [
  { name: 'Dr. Ramesh S.', Scheduled: 12, Limit: 16 },
  { name: 'Prof. Sneha V.', Scheduled: 14, Limit: 16 },
  { name: 'Dr. Amit P.', Scheduled: 8, Limit: 12 },
  { name: 'Prof. Vikram D.', Scheduled: 15, Limit: 16 },
  { name: 'Dr. Ananya R.', Scheduled: 6, Limit: 14 }
]

const aiInsights = [
  {
    id: 1,
    category: 'Classroom Efficiency',
    text: 'LH-101 has a peak occupancy rate of 95% at 11:00 AM. Recommend shifting Maths-101 elective slots to seminar rooms to reduce congestion.',
    score: 'High Impact'
  },
  {
    id: 2,
    category: 'Energy Conservation',
    text: 'Standby HVAC controls generated a savings of 12.6 kWh in vacant rooms today. Standby modes in Block C performed optimally.',
    score: 'Energy Saved'
  },
  {
    id: 3,
    category: 'Workload Balance',
    text: 'Prof. Vikram Dave is at 93.7% teaching capacity (15/16 hrs). The Faculty Workload Agent suggests routing any elective CSE schedules to Dr. Ananya Roy.',
    score: 'Alert Flag'
  }
]

export default function AnalyticsPanel() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Predictive Intelligence Telemetry</h2>
          <p className="text-sm text-slate-400 font-sans">Historical attendance forecasts, algorithmic workload balance checking, and automated optimizations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column 2 Cols: Recharts Panels */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart 1: Classroom Occupancy over peak hours */}
          <div className="glass-panel p-6 rounded-2xl border border-cyber-border">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyber-accent" />
                <h3 className="font-bold text-white tracking-wide">Classroom Occupancy Over Peak Hours</h3>
              </div>
              <span className="text-[10px] font-mono bg-cyber-accent/20 text-cyber-accent px-2 py-0.5 rounded-full">REALTIME TELEMETRY</span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={occupancyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorLh101" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCsLab" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} fontClassName="font-mono" />
                  <YAxis stroke="#94a3b8" fontSize={10} fontClassName="font-mono" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(16, 22, 35, 0.95)', borderColor: 'rgba(99, 102, 241, 0.35)', color: '#f8fafc', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Area type="monotone" dataKey="LH_101" name="LH-101 (Lecture Hall)" stroke="#6366f1" fillOpacity={1} fill="url(#colorLh101)" strokeWidth={2} />
                  <Area type="monotone" dataKey="CS_Lab_A" name="CS-Lab-A (Computer)" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCsLab)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Faculty workload capacity */}
          <div className="glass-panel p-6 rounded-2xl border border-cyber-border">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyber-success" />
                <h3 className="font-bold text-white tracking-wide">Faculty Teaching Credit Workloads</h3>
              </div>
              <span className="text-[10px] font-mono bg-cyber-success/20 text-cyber-success px-2 py-0.5 rounded-full">LOAD BALANCE</span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={facultyLoadData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontClassName="font-mono" />
                  <YAxis stroke="#94a3b8" fontSize={10} fontClassName="font-mono" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(16, 22, 35, 0.95)', borderColor: 'rgba(16, 185, 129, 0.35)', color: '#f8fafc', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <Bar dataKey="Scheduled" name="Scheduled Hours" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Limit" name="Weekly Limit CAP" fill="#ef4444" fillOpacity={0.25} stroke="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: AI Insight Cards */}
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-cyber-border">
            <Cpu className="w-5 h-5 text-cyber-accent text-glow-cyan" />
            <h3 className="font-bold text-white tracking-wide">AI Recommendations Feed</h3>
          </div>

          <div className="space-y-4 flex-1">
            {aiInsights.map(ins => (
              <div key={ins.id} className="p-4 rounded-xl bg-slate-950/70 border border-cyber-border hover:border-cyber-primary/45 transition-all">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">{ins.category}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold ${
                    ins.score === 'High Impact' 
                      ? 'bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/30' 
                      : ins.score === 'Energy Saved' 
                      ? 'bg-cyber-success/20 text-cyber-success border border-cyber-success/30' 
                      : 'bg-cyber-danger/20 text-cyber-danger border border-cyber-danger/30 animate-pulse'
                  }`}>
                    {ins.score}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{ins.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-cyber-primary/5 border border-cyber-primary/20 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyber-accent animate-pulse" />
            <span className="text-[10px] font-mono text-slate-400">Next Swarm recalculation in: <strong className="text-white">14m 22s</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}
