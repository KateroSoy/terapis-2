import { useState, useEffect } from 'react';
import { AppContext, User, Branch, api } from './lib/api';
import { Login } from './pages/Login';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Bookings } from './pages/Bookings';
import { Invoices } from './pages/Invoices';
import { Toaster } from 'sonner';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Session check would go here, for now just loading branches
    api('/api/branches').then(data => {
      setBranches(data);
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await api('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    
    if (res.success) {
      setUser(res.user);
      if (res.user.role !== 'OWNER') {
        setSelectedBranchId(res.user.branchId || 'all');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedBranchId('all');
    setCurrentPage('dashboard');
  };

  if (!user) {
    return (
      <>
        <Login onLogin={login} />
        <Toaster position="top-right" />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'patients': return <Patients />;
      case 'bookings': return <Bookings />;
      case 'invoices': return <Invoices />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      branches, 
      selectedBranchId, 
      setSelectedBranchId, 
      login, 
      logout,
      isLoading 
    }}>
      <AppShell currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </AppShell>
      <Toaster position="top-right" />
    </AppContext.Provider>
  );
}
