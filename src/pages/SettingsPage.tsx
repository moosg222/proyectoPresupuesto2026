import { authService } from '../services/authService';

export function SettingsPage() {
  return (
    <section className="bg-white rounded-xl border p-4 space-y-2">
      <h2 className="text-lg font-semibold">Configuración</h2>
      <p className="text-sm text-slate-600">Gestiona tu cuenta y cierra sesión.</p>
      <button className="bg-red-600 text-white rounded px-4 py-2" onClick={() => authService.signOut()}>Cerrar sesión</button>
    </section>
  );
}
