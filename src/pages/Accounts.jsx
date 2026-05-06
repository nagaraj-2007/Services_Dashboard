import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Receipt, CreditCard } from 'lucide-react';

const profitData = [
  { name: 'Selvagam Parent', profit: 450000, color: '#6366f1' },
  { name: 'Selvagam Driver', profit: 320000, color: '#10b981' },
  { name: 'Chola Cabs', profit: 280000, color: '#f59e0b' },
  { name: 'Match App', profit: 150000, color: '#ef4444' },
  { name: 'Temple App', profit: 120000, color: '#a855f7' },
];

const monthlyFinance = [
  { month: 'Jan', revenue: 1200000, expenses: 800000 },
  { month: 'Feb', revenue: 1450000, expenses: 850000 },
  { month: 'Mar', revenue: 1320000, expenses: 900000 },
  { month: 'Apr', revenue: 1600000, expenses: 950000 },
];

const Accounts = () => {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Accounts & Profit</h1>
          <p className="page-subtitle">Internal financial oversight and product profitability tracking.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Receipt size={16} /> Generate Invoice
        </button>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '1.5rem' }}>
        <div className="card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>TOTAL REVENUE (Q1)</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
            <IndianRupee size={20} /> 55.7L
          </div>
          <div style={{ color: 'var(--success-color)', fontSize: '0.75rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            <ArrowUpRight size={14} /> +12.5% vs last quarter
          </div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>NET PROFIT</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--success-color)' }}>
            <IndianRupee size={20} /> 21.2L
          </div>
          <div style={{ color: 'var(--success-color)', fontSize: '0.75rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            <ArrowUpRight size={14} /> +8.2% margin growth
          </div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>OPERATIONAL COST</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--danger-color)' }}>
            <IndianRupee size={20} /> 34.5L
          </div>
          <div style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            <ArrowDownRight size={14} /> +4.1% server cost spike
          </div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>PENDING PAYMENTS</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--warning-color)' }}>
            <IndianRupee size={20} /> 4.8L
          </div>
          <div style={{ color: 'var(--warning-color)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            3 clients overdue
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card chart-card">
          <h3>Profit by Application</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" width={100} fontSize={12} />
                <Tooltip 
                  cursor={{fill: 'var(--surface-color-hover)'}}
                  contentStyle={{ background: 'var(--surface-color)', border: 'none', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                />
                <Bar dataKey="profit" radius={[0, 4, 4, 0]}>
                  {profitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card">
          <h3>Revenue vs Expenses</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFinance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ background: 'var(--surface-color)', border: 'none', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}/>
                <Bar dataKey="revenue" fill="var(--primary-color)" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="var(--danger-color)" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>Detailed Profit Ledger</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Client</th>
                  <th>Revenue</th>
                  <th>Maintenance Cost</th>
                  <th>Net Profit</th>
                  <th>Margin</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: 'Selvagam Parent', client: 'Selvagam Group', rev: '12.5L', cost: '3.2L', profit: '9.3L', margin: '74%' },
                  { app: 'Selvagam Driver', client: 'Selvagam Group', rev: '8.2L', cost: '2.8L', profit: '5.4L', margin: '65%' },
                  { app: 'Chola Cabs', client: 'Chola Logistics', rev: '10.0L', cost: '4.5L', profit: '5.5L', margin: '55%' },
                  { app: 'Match App', client: 'Internal Product', rev: '4.5L', cost: '1.2L', profit: '3.3L', margin: '73%' },
                ].map((item, i) => (
                  <tr key={i}>
                    <td><strong>{item.app}</strong></td>
                    <td>{item.client}</td>
                    <td>₹{item.rev}</td>
                    <td style={{ color: 'var(--danger-color)' }}>₹{item.cost}</td>
                    <td style={{ color: 'var(--success-color)', fontWeight: 600 }}>₹{item.profit}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ flex: 1, height: 6, background: 'var(--border-color)', borderRadius: 10, minWidth: 60 }}>
                          <div style={{ width: item.margin, height: '100%', background: 'var(--success-color)', borderRadius: 10 }}></div>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.margin}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
