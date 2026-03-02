import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/products");
    } catch (err) {
      setError(
        "Las credenciales ingresadas no coinciden con nuestros registros.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* SECCIÓN IZQUIERDA: DISEÑO DE MARCA CON IMAGEN DE AUTOMÓVIL */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-emerald-950 p-12 lg:flex">
        
        {/* === NUEVA IMAGEN DE AUTOMÓVIL === */}
        {/* He elegido una imagen de un sedán ejecutivo plateado para dar seriedad financiera */}
        <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center" />
        
        {/* Overlay de gradiente para oscurecer y asegurar legibilidad */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-emerald-950 via-emerald-900/60 to-emerald-900/10" />

        <div className="relative z-20 flex items-center gap-2">
          {/* El contenedor del icono ahora tiene un toque más sutil */}
          <div className="h-10 w-10 rounded-lg bg-emerald-600/80 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-emerald-950/40">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white uppercase">
            Finanzauto
          </span>
        </div>

        <div className="relative z-20">
          <blockquote className="space-y-2">
            <p className="text-3xl font-light leading-relaxed text-slate-50 italic">
              "Transformando sueños en movilidad con soluciones financieras
              inteligentes y seguras."
            </p>
            {/* Color ajustado de azul a verde claro */}
            <footer className="text-sm font-medium text-emerald-300">
              — Portal Corporativo de Gestión
            </footer>
          </blockquote>
        </div>
      </div>

      {/* SECCIÓN DERECHA: FORMULARIO */}
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 xl:px-24 bg-slate-50/50">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Header del Formulario */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Bienvenido de nuevo
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Ingresa tus datos para acceder a la plataforma de gestión.
            </p>
          </div>

          {/* Alert de Error */}
          {error && (
            <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-600 animate-in fade-in slide-in-from-top-1">
              <span className="font-medium">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Input Usuario */}
              <div className="group relative">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1 mb-1 block">
                  Usuario
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="ej. jperez"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-sm outline-none ring-emerald-600/10 transition-all focus:border-emerald-600 focus:ring-4"
                    required
                  />
                </div>
              </div>

              {/* Input Contraseña */}
              <div className="group relative">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Contraseña
                  </label>
                  <a
                    href="#"
                    className="text-xs font-medium text-emerald-700 hover:text-emerald-800 transition hover:underline"
                  >
                    ¿Olvidaste tu clave?
                  </a>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-12 text-sm outline-none ring-emerald-600/10 transition-all focus:border-emerald-600 focus:ring-4"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Botón Submit - Cambiado a Verde para coincidir */}
            <button
              type="submit"
              disabled={loading}
              className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-emerald-950 active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-emerald-950/20"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight size={18} className="mt-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer del Formulario */}
          <p className="text-center text-xs text-slate-400">
            © 2024 Finanzauto S.A. Todos los derechos reservados. <br />
            Sistema de acceso restringido.
          </p>
        </div>
      </div>
    </div>
  );
}