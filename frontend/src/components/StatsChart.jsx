// components/StatsChart.jsx - recharts wrapper
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function StatsChart({ clicks = [] }) {
  // Aggregate clicks by date
  const chartData = React.useMemo(() => {
    const map = {};
    clicks.forEach(c => {
      const date = new Date(c.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      map[date] = (map[date] || 0) + 1;
    });
    return Object.keys(map).map(date => ({ date, clicks: map[date] }));
  }, [clicks]);

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-[#1D1818] bg-[#F8F7F4] text-[#1D1818] font-mono text-xs font-bold uppercase shadow-[4px_4px_0px_#1D1818]">
        [NO CLICK DATA RECORDED YET]
      </div>
    );
  }

  return (
    <div className="h-72 w-full bg-[#F8F7F4] border border-[#1D1818] p-4 pt-6 shadow-[4px_4px_0px_#1D1818]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E63946" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#E63946" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1D1818" opacity={0.2} />
          <XAxis dataKey="date" stroke="#1D1818" tick={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold', fill: '#1D1818' }} />
          <YAxis stroke="#1D1818" allowDecimals={false} tick={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold', fill: '#1D1818' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1D1818', borderColor: '#1D1818', borderRadius: '0px', color: '#fff', fontWeight: 'bold', boxShadow: '4px 4px 0px #E63946' }}
            labelStyle={{ fontFamily: 'monospace', fontSize: '12px', color: '#F8F7F4' }}
          />
          <Area type="monotone" dataKey="clicks" stroke="#E63946" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
