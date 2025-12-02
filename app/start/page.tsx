'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function StartPage() {
  const router = useRouter()
  const [imposters, setImposters] = useState<number | null>(null)
  const [numPlayers, setNumPlayers] = useState<number | null>(null)
  const [step, setStep] = useState<'players' | 'imposters'>('players')

  const handlePlayersContinue = () => {
    if (numPlayers !== null && numPlayers > 0) {
      setStep('imposters')
    }
  }

  const handleImpostersContinue = () => {
    if (imposters !== null && numPlayers !== null) {
      router.push(`/setup?imposters=${imposters}&players=${numPlayers}`)
    }
  }

  const handleBack = () => {
    setStep('players')
  }

  if (step === 'imposters') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center space-y-10 max-w-md w-full">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-4">
            How many imposters?
          </h1>
          
          <div key="imposters-card" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((num) => (
                <button
                  key={num}
                  onClick={() => setImposters(num)}
                  className={`py-6 px-4 rounded-xl font-bold text-xl transition-transform duration-200 hover:scale-105 active:scale-95 ${
                    imposters === num
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-md'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold py-4 px-6 rounded-xl text-lg transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md"
              >
                Back
              </button>
              <button
                onClick={handleImpostersContinue}
                disabled={imposters === null}
                className={`flex-1 py-4 px-6 rounded-xl text-lg font-bold transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md ${
                  imposters !== null
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white shadow-2xl'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translate3d(0, 20px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
          }
          
          button {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-10 max-w-md w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-4">
          How many players?
        </h1>
        
        <div key="players-card" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
          <div className="grid grid-cols-3 gap-4">
            {[3, 4, 5, 6, 7, 8].map((num) => (
              <button
                key={num}
                onClick={() => setNumPlayers(num)}
                className={`py-6 px-4 rounded-xl font-bold text-xl transition-transform duration-200 hover:scale-105 active:scale-95 ${
                  numPlayers === num
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-md'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          
          <button
            onClick={handlePlayersContinue}
            disabled={numPlayers === null}
            className={`w-full py-4 px-6 rounded-2xl text-lg font-bold transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md ${
              numPlayers !== null
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white shadow-2xl'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }
        
        .animation-delay-200 {
          animation-delay: 0.15s;
        }
      `}</style>
    </div>
  )
}

