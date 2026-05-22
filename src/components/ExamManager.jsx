import React, { useState } from 'react'
import { GraduationCap, ShieldCheck, UserCheck, Plus, Play, Sparkles, CheckCircle } from 'lucide-react'

export default function ExamManager() {
  const [exams, setExams] = useState([
    { id: 'E1', subject: 'CS-401 Compiler Design', date: 'May 25, 2026', time: '09:30 - 12:30', room: 'LH-101', capacity: 120, strength: 80, invigilator: 'Dr. Amit Patel', status: 'Approved' },
    { id: 'E2', subject: 'CS-302 Operating Systems', date: 'May 26, 2026', time: '14:00 - 17:00', room: 'LH-102', capacity: 90, strength: 75, invigilator: 'Prof. Sneha Verma', status: 'Approved' },
    { id: 'E3', subject: 'ECE-202 Analog Circuits', date: 'May 27, 2026', time: '09:30 - 12:30', room: 'Mech-Sem-Hall', capacity: 150, strength: 110, invigilator: 'Prof. Vikram Dave', status: 'Approved' }
  ])

  const [isAllocating, setIsAllocating] = useState(false)
  const [allocationLog, setAllocationLog] = useState([])

  // Simulated exam agent allocation flow
  const triggerAutoAllocation = () => {
    setIsAllocating(true)
    setAllocationLog(['[System] Exam Scheduling Agent active. Scannning student enrollment databases...'])
    
    setTimeout(() => {
      setAllocationLog(prev => [...prev, '[ExamAgent] Grouped 240 CSE students by elective combinations.'])
    }, 1000)

    setTimeout(() => {
      setAllocationLog(prev => [...prev, '[ClassroomAgent] Selected exam halls. Setting social distancing gaps: LH-101 and Seminar Hall mapped.'])
    }, 2200)

    setTimeout(() => {
      setAllocationLog(prev => [...prev, '[ConflictAgent] Checking invigilator constraints. No dual duties for Profs. Sharma, Dave, and Roy.'])
    }, 3500)

    setTimeout(() => {
      const newEx = {
        id: 'E-' + Date.now(),
        subject: 'MAT-101 Discrete Maths',
        date: 'May 28, 2026',
        time: '09:30 - 12:30',
        room: 'LH-101',
        capacity: 120,
        strength: 95,
        invigilator: 'Dr. Ramesh Sharma',
        status: 'Approved'
      }
      setExams(prev => [...prev, newEx])
      setIsAllocating(false)
      setAllocationLog(prev => [...prev, '[System] SUCCESS: MAT-101 scheduled. Allocation locked inside MongoDB.'])
    }, 5000)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Assessment & Exam Hub</h2>
          <p className="text-sm text-slate-400">Manage midterm schedules, seat density parameters, and autonomous invigilator duty binds.</p>
        </div>
        <div>
          <button
            onClick={triggerAutoAllocation}
            disabled={isAllocating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:from-cyber-primary/95 text-white font-bold font-mono text-xs shadow-neon-indigo transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {isAllocating ? 'CALCULATING ALLOCATIONS...' : 'RUN ASSESSMENT ALLOCATOR'}
          </button>
        </div>
      </div>

      {/* Constraints Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-cyber-border flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyber-primary/10 text-cyber-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Seating Density Constraint</span>
            <h4 className="text-lg font-bold text-white font-mono">1.5m Spatial Buffer</h4>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-cyber-border flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyber-accent/10 text-cyber-accent">
            <GraduationCap className="w-5 h-5 text-glow-cyan" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Dedicated Exam Halls</span>
            <h4 className="text-lg font-bold text-white font-mono">3 Allocated Halls</h4>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-cyber-border flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyber-success/10 text-cyber-success">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Faculty Invigilator Pool</span>
            <h4 className="text-lg font-bold text-white font-mono">12 Certified Staff</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column 2 Cols: Exam Table */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-cyber-border flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white tracking-wide">Planned Assessments & Halls</h3>
            <span className="text-[10px] font-mono text-slate-400">Total: {exams.length} Exams</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-cyber-border text-slate-400 pb-2">
                  <th className="py-3 font-semibold">SUBJECT</th>
                  <th className="py-3 font-semibold">DATE & TIME</th>
                  <th className="py-3 font-semibold">EXAM HALL</th>
                  <th className="py-3 font-semibold">DENSITY</th>
                  <th className="py-3 font-semibold">INVIGILATOR</th>
                  <th className="py-3 font-semibold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border/40">
                {exams.map(ex => (
                  <tr key={ex.id} className="hover:bg-white/5 transition-all">
                    <td className="py-4 font-bold text-white">{ex.subject}</td>
                    <td className="py-4">
                      <p className="text-slate-300">{ex.date}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{ex.time}</p>
                    </td>
                    <td className="py-4 text-slate-300">{ex.room}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200">{ex.strength} / {ex.capacity}</span>
                        <span className="text-[9px] text-slate-500">({Math.round((ex.strength/ex.capacity)*100)}%)</span>
                      </div>
                    </td>
                    <td className="py-4 text-cyber-accent">{ex.invigilator}</td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 rounded bg-cyber-success/20 text-cyber-success text-[9px] font-bold">
                        {ex.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Agent Processing Stream */}
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-4 border-b border-cyber-border pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyber-accent" />
              <h3 className="font-bold text-white tracking-wide">Exam Allocation Swarm</h3>
            </div>
            {isAllocating && (
              <span className="text-[9px] px-2 py-0.5 bg-cyber-primary/20 text-cyber-primary animate-pulse font-mono rounded">RUNNING</span>
            )}
          </div>

          <div className="flex-1 bg-slate-950/80 rounded-xl p-4 border border-cyber-border font-mono text-[10px] overflow-y-auto leading-relaxed space-y-2 text-slate-300">
            {allocationLog.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
            {allocationLog.length === 0 && (
              <p className="text-slate-500 italic text-center py-12">Click "RUN ASSESSMENT ALLOCATOR" above to witness the Exam Scheduling Agent Swarm calculate hall and invigilator availability constraints.</p>
            )}
          </div>
          
          <div className="mt-4 p-3 bg-cyber-primary/5 border border-cyber-primary/20 rounded-xl text-[11px] font-mono leading-relaxed text-slate-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-cyber-success" />
            <span>Constraints: Overlaps avoided, seat spatial gaps locked.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
