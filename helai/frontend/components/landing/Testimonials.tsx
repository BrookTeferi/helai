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
    body: 'As a medical educator, I\'ve witnessed a remarkable transformation in student engagement and performance since integrating HELAI into our curriculum. The interactive tools have truly enhanced the learning experience.',
    author: {
      name: 'Prof. Michael Johnson',
      handle: 'mjohnson',
      imageUrl: '/placeholder.svg?height=96&width=96',
      role: 'Professor of Medicine',
    },
  },
  {
    body: 'The mentorship network on HELAI has been a game changer for me. Connecting with experienced professionals has enriched my understanding of the medical field and boosted my confidence.',
    author: {
      name: 'Sarah Thompson',
      handle: 'sthompson',
      imageUrl: '/placeholder.svg?height=96&width=96',
      role: 'Medical Student',
    },
  },
  {
    body: 'HELAI\'s collaborative features have streamlined our group projects, allowing us to share insights and learn from one another more effectively. It\'s a fantastic resource for aspiring healthcare providers.',
    author: {
      name: 'Dr. Emily Carter',
      handle: 'ecarter',
      imageUrl: '/placeholder.svg?height=96&width=96',
      role: 'Resident Physician',
    },
  },
  {
    body: 'The platform\'s focus on real-world applications has made my studies much more relevant. I feel better prepared for clinical practice thanks to HELAI\'s practical resources.',
    author: {
      name: 'James Lee',
      handle: 'jlee',
      imageUrl: '/placeholder.svg?height=96&width=96',
      role: 'Medical Student',
    },
  },
  {
    body: 'HELAI has significantly improved our educational approach. The data-driven insights help us tailor our teaching methods to meet students\' needs, resulting in better outcomes.',
    author: {
      name: 'Dr. Lisa Patel',
      handle: 'lpatel',
      imageUrl: '/placeholder.svg?height=96&width=96',
      role: 'Attending Physician',
    },
  }
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

