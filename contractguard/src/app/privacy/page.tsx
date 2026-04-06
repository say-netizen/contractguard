export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: April 6, 2026</p>

        <div className="space-y-10 text-white/70 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Overview</h2>
            <p>ContractGuard is designed with privacy as a core principle. We do not store your contracts or personal data on our servers. This policy explains what data is processed and how.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Data We Do Not Collect</h2>
            <p>We do not store, log, or retain:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/60">
              <li>The contents of any contract you upload</li>
              <li>Your Anthropic API key</li>
              <li>AI-generated analysis results</li>
              <li>Any personally identifiable information beyond what Stripe collects for payment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How Your Contract is Processed</h2>
            <p>When you upload a contract, the text is extracted in your browser and transmitted directly to the Anthropic Claude API for analysis. Your contract content is processed by Anthropic under their <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">Privacy Policy</a>. ContractGuard does not have access to or store this data at any point.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Your API Key</h2>
            <p>Your Anthropic API key is stored only in your browser session (sessionStorage) and is never transmitted to ContractGuard servers. It is used solely to authenticate requests to the Anthropic API on your behalf.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Payment Data</h2>
            <p>Payments are processed by Stripe. ContractGuard does not collect or store your payment information. Stripe may collect your name, email, and card details in accordance with their <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Cookies and Analytics</h2>
            <p>ContractGuard does not use tracking cookies or third-party analytics. No behavioral data is collected about your usage of the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Third-Party Services</h2>
            <p>The Service relies on the following third-party providers:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/60">
              <li><strong className="text-white/80">Anthropic</strong> — AI analysis of contract text</li>
              <li><strong className="text-white/80">Stripe</strong> — Payment processing</li>
              <li><strong className="text-white/80">Vercel</strong> — Hosting and infrastructure</li>
            </ul>
            <p className="mt-3">Each provider operates under their own privacy policy and data handling practices.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Children's Privacy</h2>
            <p>ContractGuard is not intended for use by anyone under the age of 18. We do not knowingly collect data from minors.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Continued use of the Service after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact</h2>
            <p>For privacy-related questions, please contact us at <a href="mailto:aeoseiya@gmail.com" className="text-emerald-400 hover:text-emerald-300">aeoseiya@gmail.com</a>.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <a href="/" className="text-emerald-400 hover:text-emerald-300 text-sm">← Back to ContractGuard</a>
        </div>
      </div>
    </div>
  );
}
