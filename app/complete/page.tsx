'use client'

import { useRouter } from 'next/navigation'

export default function CompletePage() {
  const router = useRouter()

  const handleNewGame = () => {
    sessionStorage.clear()
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-8 max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Roles assigned.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Start giving clues!
          </p>
          
          <button
            onClick={handleNewGame}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}

