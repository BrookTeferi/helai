import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Brain, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Revolutionizing Medical Education with{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">AI</span>
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Transform your learning experience with personalized, interactive, and collaborative solutions powered by cutting-edge artificial intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:from-blue-700 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-full bg-gray-50 px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0">
              <svg
                viewBox="0 0 1026 1026"
                fill="none"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full animate-spin-slow"
              >
                <path
                  d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
                  stroke="currentColor"
                  strokeOpacity="0.7"
                />
                <path
                  d="M513 1025C230.23 1025 1 795.77 1 513"
                  stroke="url(#:R65m:-gradient-1)"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id=":R65m:-gradient-1"
                    x1="1"
                    y1="513"
                    x2="1"
                    y2="1025"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-image.jpg"
                alt="HELAI Platform"
                width={1000}
                height={700}
                className="relative z-10 rounded-xl shadow-xl ring-1 ring-gray-900/10"
              />
              <div className="absolute -top-4 -right-4 -bottom-4 -left-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-2xl"></div>
            </div>
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="text-center text-sm font-semibold text-gray-900 lg:text-left">
              Trusted by leading medical institutions worldwide
            </p>
            <div className="mt-3 flex items-center justify-center gap-x-8 gap-y-10 sm:gap-x-10 lg:justify-start">
              {['Logo 1', 'Logo 2', 'Logo 3', 'Logo 4', 'Logo 5'].map((logo, index) => (
                <div key={index} className="flex h-8 w-28 items-center justify-center grayscale transition hover:grayscale-0">
                  <span className="sr-only">{logo}</span>
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

