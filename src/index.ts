import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, transactions, solarClock, solarAuditEntries } from '@tcs-network/shared';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3013;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ledger' });
});

app.get('/api/ledger/transactions', async (req, res) => {
  try {
    const allTransactions = await db.select().from(transactions).limit(100);
    res.json(allTransactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.get('/api/ledger/solar-clock', async (req, res) => {
  try {
    const clockData = await db.select().from(solarClock).limit(100);
    res.json(clockData);
  } catch (error) {
    console.error('Error fetching solar clock:', error);
    res.status(500).json({ error: 'Failed to fetch solar clock data' });
  }
});

app.get('/api/ledger/audit', async (req, res) => {
  try {
    const auditData = await db.select().from(solarAuditEntries).limit(100);
    res.json(auditData);
  } catch (error) {
    console.error('Error fetching audit data:', error);
    res.status(500).json({ error: 'Failed to fetch audit data' });
  }
});

app.listen(PORT, () => {
  console.log(`Ledger API running on port ${PORT}`);
});
