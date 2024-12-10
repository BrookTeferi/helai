import Image from 'next/image'

const testimonials = [
  {
    body: 'HELAI has completely transformed my medical education experience. The personalized learning paths and AI-driven insights have helped me excel in my studies.',
    author: {
      name: 'Dr. Emily Chen',
      handle: 'emilychen',
      imageUrl: '/placeholder.svg?height=96&width=96',
      role: 'Resident Physician',
    },
  },
  {
    body: 'As a medical educator, I\'ve seen a significant improvement in student engagement and performance since implementing HELAI in our curriculum.',
    author: {
      name: 'Prof. Michael Johnson',
      handle: 'mjohnson',
      imageUrl: '/placeholder.svg?height=96&width=96',
      role: 'Professor of Medicine',
    },
  },
  {
    body: 'The collaborative features and mentorship network on HELAI have been invaluable in my journey to becoming a better healthcare professional.',
    author: {
      name: 'Sarah Thompson',
      handle: 'sthompson',
      imageUrl: '/placeholder.svg?height=96&width=96',
      role: 'Medical Student',
    },
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hear from our users
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <blockquote className="text-gray-900">
                    <p>{`"${testimonial.body}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl} alt="" width={40} height={40} />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                      <div className="text-gray-600">{`@${testimonial.author.handle} - ${testimonial.author.role}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

