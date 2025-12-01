'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function StartPage() {
  const router = useRouter()
  const [imposters, setImposters] = useState<number | null>(null)

  const handleContinue = () => {
    if (imposters !== null) {
      router.push(`/setup?imposters=${imposters}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center space-y-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How many imposters?
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((num) => (
              <button
                key={num}
                onClick={() => setImposters(num)}
                className={`py-6 px-4 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  imposters === num
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleContinue}
            disabled={imposters === null}
            className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md ${
              imposters !== null
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

