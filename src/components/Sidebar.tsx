import { Link, useLocation } from 'react-router-dom';

const nav = [
  { to: '/', label: 'Dashboard' },
  { to: '/transacciones', label: 'Transacciones' },
  { to: '/categorias', label: 'Categorías' },
  { to: '/reportes', label: 'Reportes' },
  { to: '/configuracion', label: 'Configuración' }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Finanzas 2026</h1>
      <nav className="space-y-2">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`block rounded px-3 py-2 ${location.pathname === item.to ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
