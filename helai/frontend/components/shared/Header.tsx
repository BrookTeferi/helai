import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          HELAI
        </Link>
        <div className="space-x-6">
          <Link href="#features" className="text-gray-600 hover:text-blue-600 transition duration-300">
            Features
          </Link>
          <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition duration-300">
            How It Works
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600 transition duration-300">
            Login
          </Link>
          <Link href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition duration-300">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  )
}

