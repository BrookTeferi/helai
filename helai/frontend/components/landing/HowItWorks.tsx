import { CheckCircle } from 'lucide-react'

const steps = [
  {
    name: 'Sign Up and Set Your Goals',
    description: 'Create your account and define your learning objectives to get a personalized experience.',
  },
  {
    name: 'Take the Initial Assessment',
    description: 'Complete a comprehensive evaluation to determine your current knowledge level and learning style.',
  },
  {
    name: 'Explore Your Customized Curriculum',
    description: 'Dive into a tailored learning path designed specifically for your needs and goals.',
  },
  {
    name: 'Engage with Interactive Content',
    description: 'Learn through a variety of multimedia resources, including videos, quizzes, and simulations.',
  },
  {
    name: 'Collaborate and Seek Guidance',
    description: 'Connect with peers and mentors to enhance your understanding and gain valuable insights.',
  },
  {
    name: 'Track Your Progress',
    description: 'Monitor your advancement with detailed analytics and adjust your strategy as needed.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-gradient-to-b from-white to-blue-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Seamless Learning Journey</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How HELAI Works
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience a revolutionary approach to medical education with our AI-powered platform. Here's how you can get started and make the most of HELAI.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CheckCircle className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  <span className="text-blue-600 mr-2">{`0${index + 1}`}</span>
                  {step.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

