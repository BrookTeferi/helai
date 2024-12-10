import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">HELAI</h3>
            <p className="text-gray-400">Transforming medical education through AI-powered learning.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-400 transition duration-300">Home</Link></li>
              <li><Link href="#features" className="hover:text-blue-400 transition duration-300">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-blue-400 transition duration-300">How It Works</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition duration-300">Login</Link></li>
              <li><Link href="/register" className="hover:text-blue-400 transition duration-300">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Email: info@helai.com</p>
            <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition duration-300">Twitter</a>
              <a href="#" className="hover:text-blue-400 transition duration-300">LinkedIn</a>
              <a href="#" className="hover:text-blue-400 transition duration-300">Facebook</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HELAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

