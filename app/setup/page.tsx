'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { nflPlayersAllTime } from '@/data/nflPlayersAllTime'
import { nflPlayersCurrent } from '@/data/nflPlayersCurrent'

function SetupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const imposters = parseInt(searchParams.get('imposters') || '0')
  const numPlayers = parseInt(searchParams.get('players') || '3')
  
  const [players, setPlayers] = useState(
    Array.from({ length: numPlayers }, (_, i) => `Player ${i + 1}`)
  )

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players]
    newPlayers[index] = value
    setPlayers(newPlayers)
  }

  const handleStart = () => {
    // Get selected mode from sessionStorage
    const mode = sessionStorage.getItem('gameMode') || 'current'
    const playerList = mode === 'allTime' ? nflPlayersAllTime : nflPlayersCurrent
    
    // Assign roles and store in sessionStorage
    const roles = assignRoles(players, imposters, playerList)
    sessionStorage.setItem('gameRoles', JSON.stringify(roles))
    sessionStorage.setItem('players', JSON.stringify(players))
    router.push('/reveal/0')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-10 max-w-md w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-4">
          Enter Players
        </h1>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
          <div className="space-y-4">
            {players.map((player, index) => (
              <input
                key={index}
                type="text"
                value={player}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                placeholder={`Player ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-bold py-5 px-6 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50"
          >
            Start
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          will-change: opacity, transform;
        }
        
        button, input {
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}

function assignRoles(players: string[], numImposters: number, playerList: string[]) {
  const roles: Record<string, { isImposter: boolean; player?: string }> = {}
  
  // Select a random NFL player for real players
  const realPlayer = playerList[Math.floor(Math.random() * playerList.length)]
  
  // Create array of indices
  const indices = players.map((_, i) => i)
  
  if (numImposters === 0) {
    // All players get the same real player
    players.forEach((player) => {
      roles[player] = { isImposter: false, player: realPlayer }
    })
  } else {
    // Randomly select imposter indices
    const imposterIndices = new Set<number>()
    while (imposterIndices.size < numImposters) {
      const randomIndex = Math.floor(Math.random() * players.length)
      imposterIndices.add(randomIndex)
    }
    
    // Assign roles
    players.forEach((player, index) => {
      if (imposterIndices.has(index)) {
        roles[player] = { isImposter: true }
      } else {
        roles[player] = { isImposter: false, player: realPlayer }
      }
    })
  }
  
  return roles
}

export default function SetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <SetupContent />
    </Suspense>
  )
}

