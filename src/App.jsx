import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { PGlite } from '@electric-sql/pglite';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RegisterPatient from './components/RegisterPatient';
import QueryPanel from './components/QueryPanel';

const db = new PGlite('idb://my-db');

const App = () => {
  const [view, setView] = useState('Register Patients');
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', gender: '' });
  const [sql, setSql] = useState('SELECT * FROM patients');
  const [sqlResult, setSqlResult] = useState([]);
  const broadcastRef = useRef(null);

  useEffect(() => {
    const initDb = async () => {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT,
          age INTEGER,
          gender TEXT
        );
      `);
      await loadPatients();
    };
    initDb();

    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('patient-db-sync');
      broadcastRef.current = bc;
      bc.onmessage = () => loadPatients();
      return () => bc.close();
    }
  }, []);

  const loadPatients = async () => {
    const result = await db.exec('SELECT * FROM patients ORDER BY id DESC;');
    setPatients(result[0]?.rows ?? []);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, age, gender } = form;
    if (!name || isNaN(age) || !gender) return alert('Invalid form');

    await db.exec(`
      INSERT INTO patients (name, age, gender) VALUES 
      ('${name.replace(/'/g, "''")}', ${Number(age)}, '${gender.replace(/'/g, "''")}')
    `);
    setForm({ name: '', age: '', gender: '' });
    await loadPatients();
    broadcastRef.current?.postMessage('update');
  };

  const handleSqlQuery = async () => {
    try {
      const result = await db.exec(sql);
      setSqlResult(result[0]?.rows ?? []);
    } catch (err) {
      alert('Invalid SQL');
    }
  };

  return (
    <Box sx={{ height: '100%', width: '100vw' }}>
      <Header />
      <Box sx={{ display: 'flex', bgcolor: 'white', width: '100vw', height: '100%', minHeight: '100vh' }}>
        <Sidebar onChangeView={setView} currentView={view} />
        <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 4 } }}>
          {view === 'Register Patients' && (
            <RegisterPatient
              form={form}
              setForm={setForm}
              handleRegister={handleRegister}
              patients={patients}
            />
          )}
          {view === 'Run Query' && (
            <QueryPanel
              sql={sql}
              setSql={setSql}
              sqlResult={sqlResult}
              handleSqlQuery={handleSqlQuery}
            />
          )}
        </Box>
      </Box>
    </Box>
  );

};

export default App;
