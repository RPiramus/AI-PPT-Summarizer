import React from 'react'
import TestimonialCard from './TestimonialCard'
import { testimonials } from '../data/Testimonials.js'

export default function Testimonials() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-zinc-900 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          Trusted by Our Users
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-12">
          See what Users are saying about RapidPPT!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              quote={t.quote}
              name={t.name}
              role={t.role}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
