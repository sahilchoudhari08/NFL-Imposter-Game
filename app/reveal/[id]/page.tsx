'use client'

import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Role {
  isImposter: boolean
  player?: string
}

export default function RevealPage() {
  const router = useRouter()
  const params = useParams()
  const playerIndex = params.id ? parseInt(params.id as string) : -1
  
  const [players, setPlayers] = useState<string[]>([])
  const [roles, setRoles] = useState<Record<string, Role>>({})
  const [revealed, setRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(-1)

  useEffect(() => {
    // Load game data from sessionStorage (client-side only)
    if (typeof window !== 'undefined') {
      const storedPlayers = sessionStorage.getItem('players')
      const storedRoles = sessionStorage.getItem('gameRoles')
      
      if (storedPlayers && storedRoles) {
        try {
          const parsedPlayers = JSON.parse(storedPlayers)
          const parsedRoles = JSON.parse(storedRoles)
          setPlayers(parsedPlayers)
          setRoles(parsedRoles)
          setIsLoading(false)
          // Initialize current player index once data is loaded
          if (currentPlayerIndex < 0 && playerIndex >= 0) {
            setCurrentPlayerIndex(playerIndex)
          }
        } catch (error) {
          console.error('Error parsing game data:', error)
          router.push('/')
        }
      } else {
        // If no game data, redirect to home
        router.push('/')
      }
    }
  }, [router, currentPlayerIndex, playerIndex])

  useEffect(() => {
    // Reset revealed state immediately when player index changes
    if (playerIndex !== currentPlayerIndex && playerIndex >= 0 && !isLoading) {
      setRevealed(false)
      setCurrentPlayerIndex(playerIndex)
    }
  }, [playerIndex, currentPlayerIndex, isLoading])

  const handleReveal = () => {
    // Trigger vibration if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(100)
    }
    setRevealed(true)
  }

  const handleNext = () => {
    if (playerIndex < players.length - 1) {
      setRevealed(false)
      router.push(`/reveal/${playerIndex + 1}`)
    } else {
      router.push('/reveal-imposters')
    }
  }

  if (isLoading || playerIndex < 0 || isNaN(playerIndex) || playerIndex !== currentPlayerIndex) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 fixed inset-0">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const currentPlayer = players[playerIndex]
  const role = currentPlayer ? roles[currentPlayer] : undefined

  if (!currentPlayer || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 fixed inset-0">
        <div className="text-white">Error: Player not found</div>
      </div>
    )
  }

  return (
    <div 
      className={`w-full h-screen flex flex-col items-center justify-center fixed inset-0 ${
        !revealed 
          ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white'
      }`}
      onClick={!revealed ? handleReveal : undefined}
    >
      {!revealed ? (
        <div className="text-center space-y-8 animate-pulse">
          <h1 className="text-4xl font-bold mb-4">
            {currentPlayer}
          </h1>
          <p className="text-2xl">
            Tap to reveal your role
          </p>
        </div>
      ) : (
        <div className="text-center space-y-10 max-w-md w-full px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-4">
            {currentPlayer}
          </h1>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 animate-scale-in">
            {role.isImposter ? (
              <div className="space-y-4">
                <div className="text-6xl mb-4">🎭</div>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  You are the IMPOSTER
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">Your player is:</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {role.player}
                </p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-bold py-5 px-6 rounded-2xl text-xl transition-transform duration-200 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 mt-8"
          >
            {playerIndex < players.length - 1 ? 'Next Player' : 'Complete'}
          </button>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

