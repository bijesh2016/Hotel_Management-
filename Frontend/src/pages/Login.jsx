import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { IMAGES } from '../data/mockData';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' || user.role === 'hotel_owner' ? '/admin' : from);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-20">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.hero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-900/95" />
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="glass-card border-white/20 p-8 text-white">
          <h2 className="font-display text-3xl font-bold text-center">Welcome Back</h2>
          <p className="mt-2 text-center text-sm text-primary-200">Sign in to your Nepal Hotels account</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4 rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-3 text-sm text-red-200"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="input-field !border-white/20 !bg-white/10 !text-white placeholder:!text-white/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field !border-white/20 !bg-white/10 !text-white placeholder:!text-white/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading} className="btn-accent w-full disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-primary-200">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-accent-400 hover:text-accent-300">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
