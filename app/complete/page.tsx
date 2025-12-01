'use client'

import { useRouter } from 'next/navigation'

export default function CompletePage() {
  const router = useRouter()

  const handleNewGame = () => {
    sessionStorage.clear()
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-12 max-w-md w-full">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 animate-fade-in">
          <div className="text-7xl mb-4 animate-bounce-slow">🎮</div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-8">
            Game Over!
          </h1>
          
          <button
            onClick={handleNewGame}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-bold py-5 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50"
          >
            New Game
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
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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

