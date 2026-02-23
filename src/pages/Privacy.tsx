import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-indigo max-w-none space-y-8 text-gray-300">
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8">
            <p className="text-sm text-indigo-400 font-mono mb-4">Effective Date: February 2026</p>
            <p className="mb-6">
              LookupID respects your privacy. This policy explains how we handle information:
            </p>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-white mb-2">1. Data Collection</h3>
                <p>LookupID collects only the information necessary to provide its services:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Discord User ID, Username, Server Roles, and other metadata when using commands.</li>
                  <li>Command usage is only visible to the user invoking the command (ephemeral messages).</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">2. No Personal Data Storage</h3>
                <p>LookupID does not store or log personal data permanently. No IP addresses, messages, or sensitive information are saved.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">3. Third-Party Sharing</h3>
                <p>LookupID does not share user information with any third party.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">4. Data Security</h3>
                <p>All data accessed by the bot is handled securely and only in-memory for command processing.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">5. Children’s Privacy</h3>
                <p>LookupID is not intended for users under 13 years old. If you believe your child’s information has been collected, contact the bot owner to remove it.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-2">6. Changes to Privacy Policy</h3>
                <p>This policy may be updated at any time. Continued use of LookupID constitutes acceptance of the updated privacy policy.</p>
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
