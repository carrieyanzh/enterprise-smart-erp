import express from 'express';
import cors from 'cors';
import { createClient } from '@libsql/client';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // <-- Crucial: enables reading JSON payloads sent from the frontend

const db = createClient({
  url: "file:erp_system.db",
});

async function initDb() {
  try {
    await db.execute("PRAGMA foreign_keys = ON;");
    console.log("Successfully connected to erp_system.db (Pure JS Driver)");
  } catch (err) {
    console.error("Database initialization error:", err.message);
  }
}
initDb();

// --- 1. EXISTING GET ROUTE ---
app.get('/api/dashboard/metrics', async (req, res) => {
  const dashboardQuery = `
    SELECT 
        ROUND(SUM(CASE WHEN type = 'REVENUE' THEN amount ELSE 0 END), 2) AS totalRevenue,
        ROUND(SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END), 2) AS totalExpenses,
        ROUND(SUM(CASE WHEN type = 'REVENUE' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END), 2) AS netProfit,
        (SELECT COUNT(*) FROM orders WHERE order_status = 'PENDING') AS pendingOrdersCount,
        (SELECT COUNT(*) FROM products WHERE stock_quantity <= low_stock_threshold) AS lowStockAlerts
    FROM financial_ledger;
  `;

  try {
    const result = await db.execute(dashboardQuery);
    const row = result.rows[0] || {};

    const rev = row.totalRevenue || 0;
    const exp = row.totalExpenses || 0;
    const net = row.netProfit || 0;
    const marginCalc = rev > 0 ? Number(((net / rev) * 100).toFixed(2)) : 0;
    const profitMargin = marginCalc + '%';

    const mockCashFlow = {
      '7d': [
        { date: 'Mon', inflow: 94000, outflow: 62000, net: 32000 },
        { date: 'Tue', inflow: 112000, outflow: 74000, net: 38000 },
        { date: 'Wed', inflow: 145000, outflow: 88000, net: 57000 }
      ],
      '30d': [
        { date: 'Week 1', inflow: 480000, outflow: 310000, net: 170000 },
        { date: 'Week 2', inflow: 620000, outflow: 410000, net: 210000 },
        { date: 'Week 3', inflow: 590000, outflow: 395000, net: 195000 },
        { date: 'Week 4', inflow: 740000, outflow: 460000, net: 280000 }
      ]
    };

    const mockStockCategory = [
      { category: 'Semiconductors', inStock: 54.2, safetyMin: 22.0, valuation: '\$920k' },
      { category: 'Heavy Machinery', inStock: 18.6, safetyMin: 12.0, valuation: '\$1.4M' }
    ];

    const mockCriticalItems = [
      { sku: 'MCU-STM32-H7', name: 'High-Perf 32-bit Cortex MCU', category: 'Semiconductors', warehouse: 'Austin Hub (TX-02)', currentQty: 184, threshold: 800, leadTime: '5 Days', status: 'Critical Alert', reordered: false }
    ];

    res.json({
      kpis: {
        totalRevenue: rev,
        totalExpenses: exp,
        netProfit: net,
        profitMargin: profitMargin
      },
      cashFlowDatasets: mockCashFlow,
      stockCategoryData: mockStockCategory,
      criticalItems: mockCriticalItems,
      recentTransactions: [
        { id: 'TRX-94821', entity: 'Global Aerospace Ltd', type: 'Cash Inflow', amount: '+\$412,800.00', status: 'Settled', category: 'Contract Milestone 2', timestamp: '18 mins ago' }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. NEW POST ROUTE (MAKE SURE THIS IS PRESENT) ---
app.post('/api/financial-ledger', async (req, res) => {
  const { transaction_ref, type, category, amount, description } = req.body;

  if (!transaction_ref || !type || !category || !amount) {
    return res.status(400).json({ error: "Missing required operational parameters." });
  }

  const insertSql = `
    INSERT INTO financial_ledger (transaction_ref, type, category, amount, description, recorded_by_user_id)
    VALUES (?, ?, ?, ?, ?, 1);
  `;

  try {
    await db.execute({ 
      sql: insertSql, 
      args: [transaction_ref, type, category, parseFloat(amount), description || null] 
    });
    res.status(201).json({ success: true });
  } catch (err) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(499).json({ error: "Reference code already exists." });
    }
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
