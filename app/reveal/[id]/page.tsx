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
  
  const [players, setPlayers] = useState<string[]>([])
  const [roles, setRoles] = useState<Record<string, Role>>({})
  const [revealed, setRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [playerIndex, setPlayerIndex] = useState<number>(-1)
  const [displayedPlayerIndex, setDisplayedPlayerIndex] = useState<number>(-1)

  // Get player index from params safely
  useEffect(() => {
    try {
      if (params && params.id) {
        const parsed = parseInt(String(params.id))
        if (!isNaN(parsed) && parsed >= 0) {
          // If player index is changing, reset revealed state and displayed index
          if (parsed !== playerIndex) {
            setRevealed(false)
            setDisplayedPlayerIndex(-1) // Reset to prevent showing old player
          }
          setPlayerIndex(parsed)
        }
      }
    } catch (error) {
      console.error('Error parsing player index:', error)
      router.push('/')
    }
  }, [params, router, playerIndex])

  // Update displayed player index only when data is ready
  useEffect(() => {
    if (!isLoading && playerIndex >= 0 && players.length > 0) {
      setDisplayedPlayerIndex(playerIndex)
    }
  }, [isLoading, playerIndex, players.length])

  // Load game data from sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const storedPlayers = sessionStorage.getItem('players')
      const storedRoles = sessionStorage.getItem('gameRoles')
      
      if (!storedPlayers || !storedRoles) {
        router.push('/')
        return
      }

      const parsedPlayers = JSON.parse(storedPlayers)
      const parsedRoles = JSON.parse(storedRoles)
      
      if (!Array.isArray(parsedPlayers) || typeof parsedRoles !== 'object' || parsedRoles === null) {
        router.push('/')
        return
      }
      
      setPlayers(parsedPlayers)
      setRoles(parsedRoles)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading game data:', error)
      router.push('/')
    }
  }, [router])

  const handleReveal = () => {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(100)
      }
      setRevealed(true)
    } catch (error) {
      console.error('Error in handleReveal:', error)
      setRevealed(true)
    }
  }

  const handleNext = () => {
    try {
      if (players.length > 0 && playerIndex < players.length - 1) {
        setRevealed(false)
        setDisplayedPlayerIndex(-1) // Reset before navigation to prevent showing old player
        router.push(`/reveal/${playerIndex + 1}`)
      } else {
        router.push('/reveal-imposters')
      }
    } catch (error) {
      console.error('Error in handleNext:', error)
      router.push('/')
    }
  }

  // Show loading while data is loading, player index is invalid, or indices don't match
  // Also show loading if displayedPlayerIndex is -1 (reset state)
  if (isLoading || playerIndex < 0 || !players.length || displayedPlayerIndex < 0 || playerIndex !== displayedPlayerIndex) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 fixed inset-0">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Get current player safely using displayedPlayerIndex (only use when it matches playerIndex)
  const currentPlayer = displayedPlayerIndex >= 0 && displayedPlayerIndex < players.length && displayedPlayerIndex === playerIndex
    ? players[displayedPlayerIndex] 
    : null

  if (!currentPlayer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 fixed inset-0">
        <div className="text-white">Error: Player not found</div>
      </div>
    )
  }

  const role = roles[currentPlayer]

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 fixed inset-0">
        <div className="text-white">Error: Role not found</div>
      </div>
    )
  }

  return (
    <div 
      key={`reveal-${displayedPlayerIndex}`}
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
                  {role.player || 'Unknown'}
                </p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-bold py-5 px-6 rounded-2xl text-xl transition-transform duration-200 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 mt-8"
          >
            {displayedPlayerIndex < players.length - 1 ? 'Next Player' : 'Complete'}
          </button>
        </div>
      )}
      
      <style jsx>{`
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
