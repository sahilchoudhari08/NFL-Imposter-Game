'use client'

import { useRouter } from 'next/navigation'

export default function ModePage() {
  const router = useRouter()

  const handleModeSelect = (mode: 'allTime' | 'current') => {
    sessionStorage.setItem('gameMode', mode)
    router.push('/start')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-12 max-w-md w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-4">
          Choose Mode
        </h1>
        
        <div className="space-y-4 animate-fade-in">
          <button
            onClick={() => handleModeSelect('allTime')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white font-bold py-6 px-6 rounded-2xl text-xl transition-transform duration-200 hover:scale-105 active:scale-95 shadow-2xl"
          >
            All-Time Mode
          </button>
          
          <button
            onClick={() => handleModeSelect('current')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white font-bold py-6 px-6 rounded-2xl text-xl transition-transform duration-200 hover:scale-105 active:scale-95 shadow-2xl"
          >
            Current Mode
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

