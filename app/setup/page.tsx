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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center space-y-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Enter Players
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="space-y-4">
            {players.map((player, index) => (
              <input
                key={index}
                type="text"
                value={player}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder={`Player ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            Start
          </button>
        </div>
      </div>
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

