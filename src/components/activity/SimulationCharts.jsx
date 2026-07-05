import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function SimulationCharts({ simulation }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="rounded-lg border border-carbon-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Diagram GUBI</p>
        <h3 className="mt-2 text-xl font-extrabold text-carbon-950">Hubungan GCI, UPI, dan GUBI</h3>
        <div className="mt-4 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={simulation.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecec" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill={simulation.status.color} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-lg border border-carbon-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Parameter Simulasi</p>
        <h3 className="mt-2 text-xl font-extrabold text-carbon-950">Nilai setelah skenario</h3>
        <div className="mt-4 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={simulation.impactData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecec" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {simulation.impactData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </div>
  );
}
