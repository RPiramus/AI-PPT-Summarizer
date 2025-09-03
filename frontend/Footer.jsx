import React from 'react'
import {FiGithub, FiLinkedin, FiMail,} from 'react-icons/fi'
import logo from '/Users/ramses/RAMSES STUDY/Ramses Computer Science/CODING PROJECT/ppt-summarizer-ai/frontend/src/assets/logo.png'


export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-4 flex justify-between gap-8">
        
        <div className="flex flex-col items-center">
          <img src={logo} alt="RapidPPT Logo" className="h-10 rounded-full mb-2" />
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
            RapidPPT – AI Summary for your PowerPoints.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Connect</h4>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/RPiramus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer" />
            </a>
            <a
              href="https://www.linkedin.com/in/ramses-piramus-23337a317/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer" />
            </a>
            <a
              href="mailto:rpiramus@gmail.com"
              aria-label="Email"
            >
              <FiMail className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 text-center text-gray-500 dark:text-gray-400 text-xs">
        © {new Date().getFullYear()} RapidPPT. All rights reserved.
      </div>
    </footer>
  )
}
