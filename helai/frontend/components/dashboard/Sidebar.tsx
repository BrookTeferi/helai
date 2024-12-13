import Link from 'next/link'
import { Home, BookOpen, Users, BarChart2, Settings, HelpCircle } from 'lucide-react'

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'My Courses', href: '/courses' },
  { icon: Users, label: 'Community', href: '/community' },
  { icon: BarChart2, label: 'Progress', href: '/progress' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
]

export default function Sidebar() {
  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary-600">HELAI</h1>
      </div>
      <nav className="mt-8">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200">
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

