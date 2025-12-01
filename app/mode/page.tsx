'use client'

import { useRouter } from 'next/navigation'

export default function ModePage() {
  const router = useRouter()

  const handleModeSelect = (mode: 'allTime' | 'current') => {
    sessionStorage.setItem('gameMode', mode)
    router.push('/start')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center space-y-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Mode
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <button
            onClick={() => handleModeSelect('allTime')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 px-6 rounded-xl text-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            All-Time Mode
          </button>
          
          <button
            onClick={() => handleModeSelect('current')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 px-6 rounded-xl text-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            Current Mode
          </button>
        </div>
      </div>
    </div>
  )
}

