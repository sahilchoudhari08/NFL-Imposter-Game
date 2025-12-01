'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center space-y-8 max-w-md w-full">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          NFL Imposter Game
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600 text-lg">
              This app assigns roles. Pass the phone around.
            </p>
            <p className="text-gray-500 text-sm">
              Play the NFL Imposter Game - a fun party game where players try to identify the imposter. Choose from All-Time NFL legends or Current NFL stars. Free to play, works on any device.
            </p>
          </div>
          
          <button
            onClick={() => router.push('/mode')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  )
}

