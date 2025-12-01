'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-8 sm:space-y-16 max-w-md w-full px-4">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-2">
            <span className="text-4xl sm:text-5xl animate-bounce-slow">🏈</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent text-center leading-tight">
              NFL Imposter Game
            </h1>
            <span className="text-4xl sm:text-5xl animate-bounce-slow animation-delay-200">🏈</span>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-semibold tracking-wide px-2">
            This app assigns roles. Pass the phone around.
          </p>
        </div>
        
        <button
          onClick={() => router.push('/mode')}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-bold py-5 sm:py-6 px-6 sm:px-8 rounded-2xl text-lg sm:text-xl transition-transform duration-200 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 animate-fade-in"
        >
          Start Game
        </button>
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
        
        .animation-delay-200 {
          animation-delay: 0.15s;
        }
        
        button {
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  )
}

