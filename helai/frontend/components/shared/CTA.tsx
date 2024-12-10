import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">Join the Revolution in Medical Education</h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto">Start your journey today and experience the future of learning with AI-powered personalization and collaboration.</p>
        <Link href="/auth/register" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
          Get Started Now
        </Link>
      </div>
    </section>
  )
}

