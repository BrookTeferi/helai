import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        Revolutionizing Medical Education with AI
      </h1>
      <p className="text-xl mb-12 text-gray-600 max-w-3xl mx-auto">
        Transform your learning experience with personalized, interactive, and collaborative solutions powered by cutting-edge artificial intelligence.
      </p>
      <Link href="/auth/register" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg">
        Start Your Journey
      </Link>
      <div className="mt-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl transform rotate-1"></div>
        <Image 
          src="/images/hero-image.jpg" 
          alt="HELAI Platform" 
          width={1000} 
          height={500} 
          className="rounded-2xl shadow-2xl relative z-10" 
        />
      </div>
    </section>
  )
}

