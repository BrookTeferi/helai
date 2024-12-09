const steps = [
    {
      number: "01",
      title: "Sign Up and Set Your Goals",
      description: "Register and input your academic objectives."
    },
    {
      number: "02",
      title: "Learn at Your Own Pace",
      description: "Access customized content designed specifically for your needs."
    },
    {
      number: "03",
      title: "Collaborate and Grow",
      description: "Engage with mentors and peers to expand your expertise."
    },
    {
      number: "04",
      title: "Monitor Progress",
      description: "Use analytics to track improvement and refine your strategy."
    }
  ]
  
  export default function HowItWorks() {
    return (
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">How HELAI Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  