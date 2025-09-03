import React from 'react'
import ChatQnA from './ChatQnA'
import PdfViewer from './PdfViewer'
import brainIcon from '../assets/brain-svgrepo-com.svg'
import Testimonial from './Testimonial'

export default function MainContent({summary, pdfUrl}) {
    if (!summary) return (
        <main className="py-10">
            <div className="container bg-gray-50 dark:bg-zinc-900 mx-auto py-8 w-3/5 rounded-full text-center px-10 shadow-2xl">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-zinc-100 mt-4">
                    RapidPPT - Your Free AI PowerPoint Summarizer
                </h1>
                <p className="text-stone-800 dark:text-zinc-300 mt-4">
                    Upload your PowerPoint and RapidPPT will summarize it in seconds!  
                    (View the slides on the right to guide you while studying)
                </p>
            </div>
            <div className="py-[20vh]">
                <div className=" mx-auto w-full py-[15vh] px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 bg-gray-50 dark:bg-zinc-900">
                    <div className="px-10">
                        <h2 className="text-6xl font-bold text-gray-900 dark:text-zinc-100">
                            Learn your Powerpoint Quicker with RapidPPT AI Summary Generator
                        </h2>
                        <p className="mt-4 text-gray-700 dark:text-gray-300 text-xl">
                        RapidPPT helps summarize your PowerPoints for easy studying and note-taking. It uses AI to explain each slide, boosting your study efficiency.
                        </p>
                    </div>
                    <div className="">
                        <img
                            src={brainIcon}
                            alt="Illustration of AI PPT summarizer"
                            className="w-full rounded-lg h-[50vh]"
                        />
                    </div>
                </div>
            </div>
            <div>
                <Testimonial />
            </div>
        </main>
    )

    return ( 
            <main className='py-10'>
                <div className="container bg-gray-50 dark:bg-zinc-900 mx-auto py-8 w-3/5 rounded-full text-center px-10 shadow-2xl">
                    <h1 className="text-6xl font-bold text-black dark:text-zinc-100 mt-4">
                    RapidPPT - Your Free AI PowerPoint Summarizer
                    </h1>
                    <p className="text-stone-800 dark:text-zinc-100 mt-4">
                    Upload any PowerPoint and RapidPPT will summarize it in seconds!  
                    (View the slides on the right to guide you while studying)
                    </p>
                </div>
                <div className="container mx-auto py-12 flex gap-5 h-[102vh]">
                    <div className="w-1/2 bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col overflow-hidden">
                        <ChatQnA summary={summary} />
                    </div>

                    <div className="w-1/2 bg-gray-50 dark:bg-zinc-900 p-1 rounded-lg shadow-lg">
                            <PdfViewer pdfUrl={pdfUrl} />
                    </div>
                </div>

                <div className="py-[10vh]">
                    <div className=" mx-auto w-full py-[15vh] px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 bg-gray-50 dark:bg-zinc-900">
                        <div className="">
                            <h2 className="text-6xl font-bold text-gray-900 dark:text-zinc-100">
                                Learn your Powerpoint Quicker with RapidPPT AI Summary Generator
                            </h2>
                            <p className="mt-4 text-gray-700 dark:text-gray-300 text-xl">
                                RapidPPT helps summarize your PowerPoints for easy studying and note-taking. It uses AI to explain each slide, boosting your study efficiency.
                            </p>
                        </div>

                        <div className="">
                            <img
                                src={brainIcon}
                                alt="Illustration of AI PPT summarizer"
                                className="w-full rounded-lg h-[50vh]"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Testimonial />
                </div>
            </main>
    )
}