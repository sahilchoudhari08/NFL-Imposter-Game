'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function RevealImpostersPage() {
  const router = useRouter()
  const [players, setPlayers] = useState<string[]>([])
  const [roles, setRoles] = useState<Record<string, { isImposter: boolean; player?: string }>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    // Load game data from sessionStorage
    const storedPlayers = sessionStorage.getItem('players')
    const storedRoles = sessionStorage.getItem('gameRoles')
    
    if (storedPlayers && storedRoles) {
      setPlayers(JSON.parse(storedPlayers))
      setRoles(JSON.parse(storedRoles))
      setIsLoading(false)
    } else {
      // If no game data, redirect to home
      router.push('/')
    }
  }, [router])

  const handleReveal = () => {
    // Trigger vibration if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(100)
    }
    setRevealed(true)
  }

  const handleContinue = () => {
    router.push('/complete')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    )
  }

  const imposters = players.filter(player => roles[player]?.isImposter)
  const realPlayers = players.filter(player => !roles[player]?.isImposter)
  const realPlayerName = realPlayers.length > 0 ? roles[realPlayers[0]]?.player : 'Unknown'

  if (!revealed) {
    return (
      <div 
        className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-red-700 text-white transition-all duration-300 fixed inset-0"
        onClick={handleReveal}
      >
        <div className="text-center space-y-8 animate-pulse">
          <div className="text-6xl mb-4">🎭</div>
          <h1 className="text-4xl font-bold mb-4">
            Reveal Imposters
          </h1>
          <p className="text-2xl">
            Tap to reveal
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-10 max-w-md w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent mb-4">
          The Imposters
        </h1>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
          {imposters.length === 0 ? (
            <div className="space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                No Imposters!
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everyone was assigned:
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {realPlayerName}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  The imposters were:
                </p>
                <div className="space-y-3">
                  {imposters.map((imposter, index) => (
                    <div
                      key={index}
                      className="bg-red-100 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-400 rounded-xl p-4"
                    >
                      <div className="text-4xl mb-2">🎭</div>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {imposter}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  The player was:
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {realPlayerName}
                </p>
              </div>
            </div>
          )}
          
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-bold py-5 px-6 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 mt-6"
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
        
        @keyframes scale-in {
          from {
            transform: translate3d(0, 0, 0) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
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

