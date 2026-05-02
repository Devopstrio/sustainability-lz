import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Leaf, 
  Cloud, 
  Zap, 
  Target,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Globe,
  Database,
  BarChart4,
  ChevronRight,
  AlertTriangle,
  Server
} from 'lucide-react';

const footprintData = [
  { name: 'Mon', emissions: 450, cost: 120 },
  { name: 'Tue', emissions: 520, cost: 140 },
  { name: 'Wed', emissions: 380, cost: 110 },
  { name: 'Thu', emissions: 610, cost: 160 },
  { name: 'Fri', emissions: 480, cost: 130 },
  { name: 'Sat', emissions: 310, cost: 90 },
  { name: 'Sun', emissions: 290, cost: 85 },
];

const KPI_CARDS = [
  { title: 'Carbon Footprint', value: '124kg', trend: '-12%', color: 'teal', icon: Cloud },
  { title: 'Energy Efficiency', value: '88%', trend: '+4%', color: 'emerald', icon: Zap },
  { title: 'Low Carbon Coverage', value: '72%', trend: '+8%', color: 'teal', icon: Globe },
  { title: 'Cost Optimization', value: '$2.4K', trend: 'Saved', color: 'teal', icon: Leaf },
];

const SustainabilityDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sustainability Landing Zone</h1>
          <p className="text-slate-400">Foundation for carbon-aware and resource-efficient cloud operations.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-slate-700">
            Export ESG Data
          </button>
          <button className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-teal-600/20">
            Optimize Resources
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-teal-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-teal-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('-') || card.trend.includes('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Footprint Trend */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Emissions vs. Cost Correlation</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={footprintData}>
                <defs>
                  <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="emissions" stroke="#14b8a6" fill="url(#colorEmissions)" name="Carbon (g CO2e)" />
                <Area type="monotone" dataKey="cost" stroke="#6366f1" fill="transparent" strokeDasharray="5 5" name="Cost (USD)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource Efficiency */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Efficiency Score by Workload</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'Data Pipeline', score: 94, color: 'bg-emerald-500' },
              { name: 'Web Frontends', score: 82, color: 'bg-teal-500' },
              { name: 'Analytics DB', score: 45, color: 'bg-amber-500' },
              { name: 'Legacy Auth', score: 12, color: 'bg-rose-500' },
            ].map((workload) => (
              <div key={workload.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{workload.name}</span>
                  <span className="text-slate-400">{workload.score}/100</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${workload.color}`} style={{ width: `${workload.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl flex gap-3">
            <AlertTriangle className="text-teal-400 shrink-0" size={18} />
            <p className="text-xs text-slate-400">Policy Violation: <span className="text-rose-400 font-bold">Analytics DB</span> is running in 'us-east-1' (High Carbon). Consider migration to 'west-europe'.</p>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Green-Ops Optimization Actions</h3>
          <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">View Policy Engine</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Recommendation</th>
                <th className="px-6 py-4 font-semibold">Resource</th>
                <th className="px-6 py-4 font-semibold">Estimated Reduction</th>
                <th className="px-6 py-4 font-semibold">Cost Saving</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { type: 'RIGHTSIZING', res: 'eks-prod-node-04', reduction: '450g CO2e', savings: '$12.50', status: 'PENDING' },
                { type: 'REGION_MIGRATION', res: 'rds-analytics-replica', reduction: '1.2kg CO2e', savings: '$45.00', status: 'IN_REVIEW' },
                { type: 'IDLE_CLEANUP', res: 'ebs-temp-vol-982', reduction: '85g CO2e', savings: '$2.10', status: 'AUTO_ENFORCED' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-200">{row.type.replace('_', ' ')}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.res}</td>
                  <td className="px-6 py-4 text-sm text-emerald-400 font-bold">{row.reduction}/mo</td>
                  <td className="px-6 py-4 text-sm text-slate-300 font-medium">{row.savings}/mo</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      row.status === 'PENDING' ? 'text-teal-400 border-teal-500/20 bg-teal-500/10' : 
                      row.status === 'IN_REVIEW' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' : 
                      'text-slate-400 border-slate-500/20 bg-slate-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-teal-400 hover:text-teal-300 text-xs font-bold uppercase tracking-wider">
                      Execute
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;
