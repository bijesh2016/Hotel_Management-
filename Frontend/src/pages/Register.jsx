import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { IMAGES } from '../data/mockData';

export default function Register() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(form.full_name, form.email, form.password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
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
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="glass-card border-white/20 p-8 text-white">
          <h2 className="font-display text-3xl font-bold text-center">Create Account</h2>
          <p className="mt-2 text-center text-sm text-primary-200">Join Nepal Hotels and start booking</p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-3 text-sm text-red-200">{error}</div>
          )}
          {success && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mt-4 rounded-xl bg-primary-500/20 border border-primary-400/30 px-4 py-3 text-sm text-primary-100"
            >
              Registration successful! Redirecting...
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {['full_name', 'email', 'password', 'confirm'].map((field, i) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <input
                  type={field.includes('password') || field === 'confirm' ? 'password' : field === 'email' ? 'email' : 'text'}
                  name={field}
                  placeholder={field === 'full_name' ? 'Full name' : field === 'confirm' ? 'Confirm password' : field.charAt(0).toUpperCase() + field.slice(1)}
                  className="input-field !border-white/20 !bg-white/10 !text-white placeholder:!text-white/50"
                  value={form[field]}
                  onChange={handleChange}
                  required
                  minLength={field.includes('password') ? 6 : undefined}
                />
              </motion.div>
            ))}
            <button type="submit" disabled={loading || success} className="btn-accent w-full disabled:opacity-60">
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-primary-200">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-accent-400 hover:text-accent-300">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
