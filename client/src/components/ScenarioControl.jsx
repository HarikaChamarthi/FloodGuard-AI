import React from 'react';
import { CloudRain, Zap, ShieldCheck, AlertTriangle, RefreshCw, Sparkles } from 'lucide-react';
import { useFloodData } from '../context/FloodDataContext';
import { SCENARIOS } from '../utils/constants';

export const ScenarioControl = () => {
  const { scenario, setScenario } = useFloodData();

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-xl space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
            Interactive Storm Simulation Control
          </h3>
        </div>
        <span className="text-[11px] text-slate-400">
          Trigger simulated meteorological events to observe real-time AI risk analysis & alert pipelines
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {SCENARIOS.map((sc) => {
          const isActive = scenario === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setScenario(sc.id)}
              className={`p-3 rounded-xl text-left border transition relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-br from-cyan-950 to-blue-950 border-cyan-500/60 shadow-md shadow-cyan-950/60 ring-1 ring-cyan-500/40'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className={`font-bold text-xs ${isActive ? 'text-cyan-200' : 'text-slate-300'}`}>
                  {sc.label}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  {sc.desc}
                </p>
              </div>

              {isActive && (
                <div className="mt-2 text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>SIMULATING</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
