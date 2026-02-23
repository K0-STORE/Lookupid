import { useState, FormEvent } from 'react';
import { Search, Loader2, AlertCircle, User, Calendar, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  banner: string | null;
  accent_color: number | null;
  bot?: boolean;
  created_at?: string; // We'll calculate this from ID
}

export default function Home() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const res = await fetch(`/api/lookup/${userId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch user');
      }

      setUserData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper to calculate account creation date from Snowflake ID
  const getCreationDate = (id: string) => {
    try {
      const timestamp = Number(BigInt(id) >> 22n) + 1420070400000;
      return new Date(timestamp).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Lookup<span className="text-indigo-500">ID</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          The professional Discord user lookup tool. Get detailed information about any Discord user instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://discord.com/oauth2/authorize?client_id=1475412182492647424&permissions=551903315968&integration_type=0&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            Add to Discord
          </a>
          <a
            href="#lookup"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10"
          >
            Try Online Lookup
          </a>
        </div>
      </motion.div>

      {/* Lookup Tool */}
      <div id="lookup" className="w-full max-w-2xl">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Search className="w-6 h-6 text-indigo-500" />
            User Lookup
          </h2>

          <form onSubmit={handleLookup} className="relative mb-8">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Paste Discord User ID (e.g., 1475412182492647424)"
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-4 pr-32 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {userData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/40 rounded-xl overflow-hidden border border-white/5"
            >
              {/* Banner */}
              <div 
                className="h-32 w-full bg-zinc-800 relative"
                style={{
                  backgroundColor: userData.accent_color ? `#${userData.accent_color.toString(16)}` : '#27272a',
                  backgroundImage: userData.banner ? `url(https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}.png?size=600)` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              <div className="px-6 pb-6 relative">
                {/* Avatar */}
                <div className="absolute -top-16 left-6 p-1.5 bg-black rounded-full">
                  <img
                    src={userData.avatar 
                      ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=128`
                      : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                    alt={userData.username}
                    className="w-24 h-24 rounded-full bg-zinc-800"
                  />
                </div>

                <div className="mt-12 flex flex-col gap-1">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    {userData.username}
                    {userData.bot && (
                      <span className="px-1.5 py-0.5 bg-indigo-500 text-[10px] uppercase font-bold rounded text-white tracking-wide">
                        BOT
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm">{userData.id}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs uppercase tracking-wider font-semibold">
                      <Calendar className="w-4 h-4" />
                      Created At
                    </div>
                    <div className="text-white font-medium">
                      {getCreationDate(userData.id)}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs uppercase tracking-wider font-semibold">
                      <Shield className="w-4 h-4" />
                      Account Type
                    </div>
                    <div className="text-white font-medium">
                      {userData.bot ? 'Bot Account' : 'User Account'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
