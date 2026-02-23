import { motion } from 'motion/react';

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert prose-indigo max-w-none space-y-8 text-gray-300">
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8">
            <p className="text-sm text-indigo-400 font-mono mb-4">Effective Date: February 2026</p>
            <p className="mb-6">
              Welcome to LookupID, the professional Discord user lookup bot created by nekolas. By using this bot, you agree to the following terms:
            </p>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h3>
                <p>By adding or using LookupID in your server, you agree to these Terms of Service.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">2. Bot Usage</h3>
                <p>LookupID is intended for informational and administrative purposes only. Do not use it to harass, threaten, or invade the privacy of other users.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">3. User Responsibility</h3>
                <p>Server owners and users are responsible for ensuring that they comply with Discord’s Terms of Service and community guidelines.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">4. Limitation of Liability</h3>
                <p>The bot owner (nekolas) is not liable for any indirect, incidental, or consequential damages resulting from the use of LookupID.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">5. Prohibited Uses</h3>
                <p>You may not use LookupID to:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Collect personal data without consent</li>
                  <li>Engage in illegal activities</li>
                  <li>Exploit, hack, or attempt to disrupt other users or Discord servers</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">6. Changes to Terms</h3>
                <p>These Terms may be updated at any time. Continued use of LookupID constitutes acceptance of the updated terms.</p>
              </section>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-sm text-gray-500">
              Bot made by nekolas
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
