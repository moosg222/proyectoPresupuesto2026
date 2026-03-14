import { useState, type FormEvent } from 'react';
import { authService } from '../services/authService';

export function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (isRegister) await authService.signUp(email, password);
    else await authService.signIn(email, password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form className="bg-white rounded-xl border shadow-sm p-6 w-full max-w-md space-y-3" onSubmit={submit}>
        <h2 className="text-xl font-semibold">{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
        <input className="w-full border rounded px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className="w-full bg-slate-900 text-white rounded py-2">Continuar</button>
        <button type="button" className="text-sm text-sky-700" onClick={() => setIsRegister((v) => !v)}>
          {isRegister ? 'Ya tengo cuenta' : 'Crear una cuenta nueva'}
        </button>
      </form>
    </main>
  );
}
