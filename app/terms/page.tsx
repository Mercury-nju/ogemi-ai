export default function Terms() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Terms and Conditions
          </span>
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Wula.ai, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to these terms, please do not use 
              our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to use Wula.ai for 
              your personal or commercial purposes, subject to these terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. User Content</h2>
            <p>You retain all rights to the content you upload. By uploading content, you grant us:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>The right to process your images to generate videos</li>
              <li>The right to store your content on our servers</li>
              <li>The right to display your content if you choose to make it public</li>
            </ul>
            <p className="mt-4">
              You represent and warrant that you own or have the necessary rights to all content 
              you upload.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. Prohibited Uses</h2>
            <p>You agree not to use Wula.ai to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Upload content that infringes on intellectual property rights</li>
              <li>Create content that is illegal, harmful, or offensive</li>
              <li>Attempt to circumvent any security measures</li>
              <li>Use the service for any automated or systematic data collection</li>
              <li>Resell or redistribute our service without permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. Payment and Refunds</h2>
            <p>
              Subscription fees are billed in advance on a monthly or annual basis. We offer a 
              30-day money-back guarantee for new subscribers. Refunds are not provided for 
              partial months or unused credits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. Service Availability</h2>
            <p>
              We strive to provide uninterrupted access to our service, but we do not guarantee 
              that the service will be available at all times. We may modify, suspend, or 
              discontinue any part of the service at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
            <p>
              Wula.ai shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any 
              material changes. Your continued use of the service after such modifications 
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
            <p>
              For questions about these Terms and Conditions, please contact us at{' '}
              <a href="mailto:legal@wula.ai" className="text-purple-500 hover:text-purple-400">
                legal@wula.ai
              </a>
            </p>
          </section>

          <p className="text-gray-500 text-sm mt-8">
            Last updated: October 28, 2025
          </p>
        </div>
      </div>
    </div>
  )
}

