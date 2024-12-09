import { Brain, Users, BarChartIcon, BookOpen } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "Adaptive Learning Paths",
    description: "Customized roadmaps based on your progress to ensure no learning gaps.",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    icon: BarChartIcon,
    title: "Comprehensive Analytics",
    description: "Real-time tracking of your performance to identify strengths and areas for improvement.",
    gradient: "from-purple-400 to-purple-600"
  },
  {
    icon: Users,
    title: "Mentorship Network",
    description: "One-on-one and group mentorships with teacher-approved guides.",
    gradient: "from-pink-400 to-pink-600"
  },
  {
    icon: BookOpen,
    title: "Academic Marketplace",
    description: "Buy, sell, or share educational materials for collaborative growth.",
    gradient: "from-indigo-400 to-indigo-600"
  }
]

export default function Features() {
  return (
    <section id="features" className="container mx-auto px-6 py-24">
      <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Key Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

