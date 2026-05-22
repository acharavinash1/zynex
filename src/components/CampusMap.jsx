import React, { useState } from 'react'
import { Map, Thermometer, ShieldAlert, Zap, Compass, Building, CheckCircle2 } from 'lucide-react'

export default function CampusMap({ classrooms }) {
  const [selectedRoom, setSelectedRoom] = useState(classrooms[0])

  // Energy optimization telemetry statistics
  const energySaved = classrooms.filter(c => c.status === 'Free').length * 4.2 // Mock energy saved in kWh
  const standbyRooms = classrooms.filter(c => c.status === 'Free').length
  const avgTemp = (classrooms.reduce((sum, c) => sum + c.temp, 0) / classrooms.length).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Campus Classroom Monitor</h2>
          <p className="text-sm text-slate-400">Live environmental diagnostics, dynamic structural maps, and automated energy optimizations.</p>
        </div>
      </div>

      {/* Dynamic Energy Statistics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-cyber-border flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyber-accent/10 text-cyber-accent">
            <Zap className="w-5 h-5 text-glow-cyan" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Autonomous Energy Saved Today</span>
            <h4 className="text-lg font-bold text-white font-mono">{energySaved.toFixed(1)} kWh</h4>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-cyber-border flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyber-success/10 text-cyber-success">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Climate Standby Rooms</span>
            <h4 className="text-lg font-bold text-white font-mono">{standbyRooms} Rooms</h4>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-cyber-border flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyber-secondary/10 text-cyber-secondary">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Average Campus Temperature</span>
            <h4 className="text-lg font-bold text-white font-mono">{avgTemp}°C</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Map Grid */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-cyber-border flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6 border-b border-cyber-border pb-3">
            <Compass className="w-5 h-5 text-cyber-primary" />
            <h3 className="font-bold text-white tracking-wide">Dynamic Campus Grid Map</h3>
            <span className="ml-auto text-[10px] font-mono text-slate-400">Interactive Node Selector</span>
          </div>

          {/* Graphical Map Representation */}
          <div className="grid-bg border border-cyber-border/40 rounded-xl p-8 flex-1 flex flex-col justify-center min-h-[350px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Block A */}
              <div className="p-4 rounded-xl border border-cyber-border/30 bg-slate-950/40 relative">
                <div className="flex items-center gap-1.5 mb-4 text-xs font-mono font-bold text-slate-400 tracking-wider">
                  <Building className="w-3.5 h-3.5" />
                  <span>BLOCK A — ACADEMIC</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {classrooms.filter(c => c.block === 'Block A').map(room => {
                    const isSelected = selectedRoom.id === room.id
                    return (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between aspect-square transition-all duration-300 ${
                          isSelected 
                            ? 'border-cyber-primary shadow-neon-indigo bg-cyber-primary/10' 
                            : room.status === 'Free' 
                            ? 'border-cyber-success/30 hover:border-cyber-success/70 bg-cyber-success/5' 
                            : 'border-cyber-accent/30 hover:border-cyber-accent/70 bg-cyber-accent/5'
                        }`}
                      >
                        <span className="font-bold text-xs text-white">{room.name}</span>
                        <div className="mt-4">
                          <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                            room.status === 'Free' ? 'bg-cyber-success/20 text-cyber-success' : 'bg-cyber-accent/20 text-cyber-accent'
                          }`}>
                            {room.status}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Block B */}
              <div className="p-4 rounded-xl border border-cyber-border/30 bg-slate-950/40 relative">
                <div className="flex items-center gap-1.5 mb-4 text-xs font-mono font-bold text-slate-400 tracking-wider">
                  <Building className="w-3.5 h-3.5" />
                  <span>BLOCK B — ENGINEERING</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {classrooms.filter(c => c.block === 'Block B').map(room => {
                    const isSelected = selectedRoom.id === room.id
                    return (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between aspect-square transition-all duration-300 ${
                          isSelected 
                            ? 'border-cyber-primary shadow-neon-indigo bg-cyber-primary/10' 
                            : room.status === 'Free' 
                            ? 'border-cyber-success/30 hover:border-cyber-success/70 bg-cyber-success/5' 
                            : 'border-cyber-accent/30 hover:border-cyber-accent/70 bg-cyber-accent/5'
                        }`}
                      >
                        <span className="font-bold text-xs text-white">{room.name}</span>
                        <div className="mt-4">
                          <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                            room.status === 'Free' ? 'bg-cyber-success/20 text-cyber-success' : 'bg-cyber-accent/20 text-cyber-accent'
                          }`}>
                            {room.status}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Block C */}
              <div className="p-4 rounded-xl border border-cyber-border/30 bg-slate-950/40 relative">
                <div className="flex items-center gap-1.5 mb-4 text-xs font-mono font-bold text-slate-400 tracking-wider">
                  <Building className="w-3.5 h-3.5" />
                  <span>BLOCK C — RESEARCH</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {classrooms.filter(c => c.block === 'Block C').map(room => {
                    const isSelected = selectedRoom.id === room.id
                    const isMaintenance = room.status === 'Under Maintenance'
                    return (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between aspect-square transition-all duration-300 ${
                          isSelected 
                            ? 'border-cyber-primary shadow-neon-indigo bg-cyber-primary/10' 
                            : isMaintenance
                            ? 'border-cyber-danger/30 hover:border-cyber-danger/70 bg-cyber-danger/5'
                            : room.status === 'Free' 
                            ? 'border-cyber-success/30 hover:border-cyber-success/70 bg-cyber-success/5' 
                            : 'border-cyber-accent/30 hover:border-cyber-accent/70 bg-cyber-accent/5'
                        }`}
                      >
                        <span className="font-bold text-xs text-white">{room.name}</span>
                        <div className="mt-4">
                          <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                            isMaintenance
                              ? 'bg-cyber-danger/20 text-cyber-danger'
                              : room.status === 'Free' 
                              ? 'bg-cyber-success/20 text-cyber-success' 
                              : 'bg-cyber-accent/20 text-cyber-accent'
                          }`}>
                            {room.status === 'Under Maintenance' ? 'MAINT' : room.status}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Classroom Inspector */}
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-cyber-border">
            <Thermometer className="w-5 h-5 text-cyber-accent" />
            <h3 className="font-bold text-white tracking-wide">Climate & Utility Diagnostics</h3>
          </div>

          {selectedRoom ? (
            <div className="flex-1 space-y-5 text-xs">
              <div>
                <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-cyber-accent border border-cyber-border uppercase font-semibold">
                  {selectedRoom.block}
                </span>
                <h4 className="text-lg font-extrabold text-white mt-1.5">{selectedRoom.name}</h4>
                <p className="text-slate-400 mt-1 font-sans">{selectedRoom.type} • Capacity: {selectedRoom.capacity} Students</p>
              </div>

              {/* Climate Data Card */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-cyber-border space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-mono text-[10px] uppercase font-semibold">Climate Health Rating</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    selectedRoom.acStatus === 'Normal' ? 'bg-cyber-success/10 text-cyber-success' : 'bg-cyber-danger/10 text-cyber-danger'
                  }`}>
                    {selectedRoom.acStatus === 'Normal' ? 'OPTIMAL' : 'CRITICAL FAULT'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-cyber-border/40 pt-2.5">
                  <span className="text-slate-500">Thermostat Temperature</span>
                  <span className="font-bold text-white font-mono text-sm">{selectedRoom.temp}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Standby HVAC Offset</span>
                  <span className="text-slate-300 font-mono">
                    {selectedRoom.status === 'Free' ? '-4.0°C (ECO Mode)' : '0.0°C (Active)'}
                  </span>
                </div>
              </div>

              {/* Booking Telemetry */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-cyber-border space-y-3 flex-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase font-semibold block border-b border-cyber-border/40 pb-2">Active Schedule Bind</span>
                {selectedRoom.status === 'Occupied' ? (
                  <div className="space-y-2 font-sans text-slate-300 leading-relaxed">
                    <p className="font-bold text-white text-xs">{selectedRoom.currentClass}</p>
                    <p className="text-[11px] text-slate-400">Class size: {selectedRoom.currentOccupancy} students ({Math.round((selectedRoom.currentOccupancy / selectedRoom.capacity)*100)}% density)</p>
                  </div>
                ) : selectedRoom.status === 'Under Maintenance' ? (
                  <div className="flex items-start gap-2 text-cyber-danger p-2 bg-cyber-danger/10 rounded-lg">
                    <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="font-sans leading-relaxed">Room AC maintenance operations are in progress. AI allocation agent has bypassed this hall.</p>
                  </div>
                ) : (
                  <div className="text-slate-500 italic py-4 text-center font-sans">
                    Room is currently vacant. Climate systems placed on eco-standby.
                  </div>
                )}
              </div>

              {/* Proactive Optimization Insight */}
              <div className="p-3 bg-cyber-primary/5 border border-cyber-primary/20 rounded-xl text-[11px] font-mono leading-relaxed text-slate-400">
                <strong className="text-cyber-accent">AI energy-saver:</strong> Vacancy detected. Setroom temp to 24°C, reducing localized HVAC load by <strong className="text-white">18%</strong>.
              </div>

            </div>
          ) : (
            <p className="text-slate-500 italic text-center my-auto">Select a room node on the floor map to inspect climate diagnostics.</p>
          )}
        </div>
      </div>
    </div>
  )
}
