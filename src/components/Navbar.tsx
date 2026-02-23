import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Bot } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { path: '/', label: 'Home' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-indigo-500 rounded-lg group-hover:bg-indigo-400 transition-colors">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">LookupID</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                  isActive(link.path) ? 'text-indigo-400' : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://discord.com/oauth2/authorize?client_id=1475412182492647424&permissions=551903315968&integration_type=0&scope=bot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-indigo-500/20"
            >
              Add Bot
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://discord.com/oauth2/authorize?client_id=1475412182492647424&permissions=551903315968&integration_type=0&scope=bot"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center mt-4 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
              >
                Add Bot
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
