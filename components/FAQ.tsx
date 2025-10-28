'use client'

import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with our service, you can request a full refund within 30 days of your purchase.',
  },
  {
    id: 2,
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your current billing period.',
  },
  {
    id: 3,
    question: 'Can I change my plan?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
  },
  {
    id: 4,
    question: 'Do you offer a free trial?',
    answer: 'Yes, we offer a free plan that allows you to create up to 3 videos per month. No credit card required to get started.',
  },
  {
    id: 5,
    question: 'Do you offer any discounts?',
    answer: 'We offer annual subscription discounts (save 20%) and special pricing for students and educators. Contact our sales team for custom enterprise pricing.',
  },
  {
    id: 6,
    question: 'How can I get technical support or report issues?',
    answer: 'Our support team is available 24/7 via email at support@wula.ai or through the chat widget in your dashboard. We typically respond within 1 hour during business hours.',
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full text-left p-6 flex items-center justify-between"
              >
                <h3 className="text-white text-lg font-semibold pr-8">{faq.question}</h3>
                <svg
                  className={`w-6 h-6 text-purple-500 flex-shrink-0 transition-transform ${
                    openId === faq.id ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openId === faq.id && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

