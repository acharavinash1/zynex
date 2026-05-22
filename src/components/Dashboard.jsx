import React from 'react'
import { 
  Zap, 
  Percent, 
  Activity, 
  Clock, 
  Flame, 
  RefreshCw, 
  CheckCircle,
  AlertTriangle,
  MonitorPlay,
  Play
} from 'lucide-react'

export default function Dashboard({ 
  classrooms, 
  faculty, 
  timetable, 
  logs, 
  systemHealth, 
  activeConflicts,
  injectScenario 
}) {
  
  // Calculate analytics values based on mock state
  const totalRooms = classrooms.length
  const occupiedRooms = classrooms.filter(c => c.status === 'Occupied').length
  const fillRate = Math.round((occupiedRooms / totalRooms) * 100)
  
  const totalFaculty = faculty.length
  const averageHours = (faculty.reduce((sum, f) => sum + f.currentHours, 0) / totalFaculty).toFixed(1)
  
  const scenarios = [
    { 
      id: 'ac_failure', 
      name: 'Classroom AC Failure', 
      desc: 'Inject absolute temperature crisis in Mech Seminar Hall (Block C). Scans rooms, shifts slots, alerts students.',
      color: 'from-amber-600/20 to-amber-700/20 hover:from-amber-600/30 border-amber-500/30 text-amber-300'
    },
    { 
      id: 'faculty_sick', 
      name: 'Faculty Sick Leave', 
      desc: 'Simulate Prof. Sneha Verma calling in sick. Triggers alternative faculty scanning, load matching, and auto-notification.',
      color: 'from-rose-600/20 to-rose-700/20 hover:from-rose-600/30 border-rose-500/30 text-rose-300'
    },
    { 
      id: 'clash_injection', 
      name: 'Double-Booking Conflict', 
      desc: 'Force double room assignment on LH-101. Activates timetabling logic, detects overlaps, reallocates seamlessly.',
      color: 'from-violet-600/20 to-violet-700/20 hover:from-violet-600/30 border-violet-500/30 text-violet-300'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Top Banner Page Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">OS Control Center</h2>
          <p className="text-sm text-slate-400">Autonomous university operations, real-time agent swarms, and crisis resolution telemetry.</p>
        </div>
        <div className="flex gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-cyber-border flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary"></span>
            <span className="font-mono text-slate-400">Version: v2.4-agentic</span>
          </div>
        </div>
      </div>

      {/* Futuristic Telemetry Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core Scheduling Efficiency */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-cyber-border">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyber-primary/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-cyber-primary/10 text-cyber-primary">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono bg-cyber-primary/20 text-cyber-primary px-2 py-0.5 rounded-full">REALTIME</span>
          </div>
          <h4 className="text-2xl font-bold tracking-tight text-white text-glow-indigo font-mono">94.2%</h4>
          <p className="text-xs text-slate-400 font-medium">Optimization Score</p>
          <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyber-primary" style={{ width: '94%' }}></div>
          </div>
        </div>

        {/* Classroom occupancy */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-cyber-border">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyber-accent/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-cyber-accent/10 text-cyber-accent">
              <Percent className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono bg-cyber-accent/20 text-cyber-accent px-2 py-0.5 rounded-full">OCCUPANCY</span>
          </div>
          <h4 className="text-2xl font-bold tracking-tight text-white text-glow-cyan font-mono">{fillRate}%</h4>
          <p className="text-xs text-slate-400 font-medium">Campus Classroom Fill-Rate</p>
          <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyber-accent" style={{ width: `${fillRate}%` }}></div>
          </div>
        </div>

        {/* Faculty Duties */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-cyber-border">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyber-success/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-cyber-success/10 text-cyber-success">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono bg-cyber-success/20 text-cyber-success px-2 py-0.5 rounded-full font-sans">OPTIMAL</span>
          </div>
          <h4 className="text-2xl font-bold tracking-tight text-white font-mono">{averageHours} hrs</h4>
          <p className="text-xs text-slate-400 font-medium">Avg Faculty Weekly Workload</p>
          <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyber-success" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* System Stability */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-cyber-border">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyber-secondary/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-cyber-secondary/10 text-cyber-secondary">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono bg-cyber-secondary/20 text-cyber-secondary px-2 py-0.5 rounded-full">HEALTHY</span>
          </div>
          <h4 className="text-2xl font-bold tracking-tight text-white font-mono">{systemHealth}%</h4>
          <p className="text-xs text-slate-400 font-medium">OS Agent Telemetry Health</p>
          <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyber-secondary" style={{ width: `${systemHealth}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Scenario Injector & Room Telemetry */}
        <div className="lg:col-span-2 space-y-6">
          {/* Emergency Agent Control Module */}
          <div className="glass-panel p-6 rounded-2xl border border-cyber-border">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-cyber-danger" />
              <h3 className="font-bold text-white tracking-wide">Emergency Crisis Injector</h3>
            </div>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Force chaotic events into the campus grid. Triggering these will launch our collaborative AI agents. Watch them perform real-time resource matching, scheduling reallocations, and push communications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarios.map(sc => (
                <button
                  key={sc.id}
                  onClick={() => injectScenario(sc)}
                  className={`flex flex-col text-left p-4 rounded-xl border bg-gradient-to-b transition-all duration-300 ${sc.color}`}
                >
                  <div className="flex justify-between items-center w-full mb-2">
                    <span className="font-bold text-xs uppercase font-mono tracking-wider">{sc.name}</span>
                    <Play className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{sc.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Room Telemetry */}
          <div className="glass-panel p-6 rounded-2xl border border-cyber-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white tracking-wide">Active Classroom Telemetry</h3>
              <span className="text-[10px] text-slate-400 font-mono">Live Feeds</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-cyber-border text-slate-400 pb-2">
                    <th className="py-3 font-semibold">ROOM NAME</th>
                    <th className="py-3 font-semibold">BLOCK</th>
                    <th className="py-3 font-semibold">CAPACITY</th>
                    <th className="py-3 font-semibold">STATUS</th>
                    <th className="py-3 font-semibold">CURRENT EVENT</th>
                    <th className="py-3 font-semibold">CLIMATE STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border/40">
                  {classrooms.map(c => (
                    <tr key={c.id} className="hover:bg-white/5 transition-all">
                      <td className="py-3 font-bold text-white">{c.name}</td>
                      <td className="py-3 text-slate-400">{c.block}</td>
                      <td className="py-3 text-slate-300">{c.capacity} seats</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          c.status === 'Occupied' 
                            ? 'bg-cyber-primary/20 text-cyber-primary' 
                            : c.status === 'Free' 
                            ? 'bg-cyber-success/20 text-cyber-success' 
                            : 'bg-cyber-warning/20 text-cyber-warning'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-300 font-sans max-w-[150px] truncate">{c.currentClass}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            c.acStatus === 'Normal' ? 'bg-cyber-success' : 'bg-cyber-danger'
                          }`}></span>
                          <span className="text-slate-300">{c.temp}°C ({c.acStatus})</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Swarm Decision Terminal */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyber-border flex flex-col h-[525px]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <MonitorPlay className="w-5 h-5 text-cyber-accent" />
                <h3 className="font-bold text-white tracking-wide">Swarm Operations Logs</h3>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-900 border border-cyber-border text-slate-400 font-mono animate-pulse">STREAMING</span>
            </div>
            
            {/* High tech glass terminal screen */}
            <div className="flex-1 bg-slate-950/80 rounded-xl p-4 border border-cyber-border font-mono text-[11px] overflow-y-auto terminal-scroll leading-relaxed flex flex-col-reverse shadow-inner">
              {logs.map((log, index) => (
                <div key={index} className="mb-3 hover:bg-white/5 p-1 rounded transition-all">
                  <div className="flex items-center justify-between text-slate-500 text-[10px] mb-1">
                    <span>[{log.timestamp}]</span>
                    <span className="text-cyber-accent uppercase tracking-wider">{log.agent}</span>
                  </div>
                  <p className="text-slate-300 font-mono pl-2 border-l border-cyber-primary/45">{log.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-2 bg-cyber-primary/5 border border-cyber-primary/20 rounded-xl flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Agent Communication Mesh:</span>
              <span className="text-cyber-accent font-bold font-mono">8 AGENTS ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
