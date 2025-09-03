import React from 'react'

export default function TestimonialCard({ quote, name, role }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg">
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400">★</span>
        ))}
      </div>
      <p className="text-gray-800 dark:text-gray-200 mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  )
}
