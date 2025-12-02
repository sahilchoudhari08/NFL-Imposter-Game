'use client'

import { useRouter } from 'next/navigation'

export default function HowToPlayPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-8 max-w-2xl w-full px-4">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-4">
            How to Play
          </h1>
        </div>

        <div key="how-to-play-card" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 animate-fade-in">
          <div className="space-y-6 text-left">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🎮 What is NFL Imposter?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                NFL Imposter is a social deduction game where players try to identify who among them is the "imposter" who doesn't know the assigned NFL player.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                📋 Setup
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                <li>Choose between "All-Time" or "Current" NFL players</li>
                <li>Enter the number of players (3-8)</li>
                <li>Choose how many imposters (0 or more)</li>
                <li>Enter each player's name</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🎯 How to Play
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                <li><strong>Pass the phone around</strong> - Each player takes a turn to see their role</li>
                <li><strong>Real players</strong> see an NFL player name they need to describe</li>
                <li><strong>Imposters</strong> don't know the player and must blend in</li>
                <li><strong>Give clues</strong> - Players take turns giving one-word clues about their player</li>
                <li><strong>Vote</strong> - After clues, vote on who you think is the imposter</li>
                <li><strong>Reveal</strong> - See who the imposters were at the end!</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🏆 Winning Conditions
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                <li><strong>Real players win</strong> if they correctly identify and vote out the imposter(s)</li>
                <li><strong>Imposters win</strong> if they can correctly guess what the NFL player name is!</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                💡 Tips
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                <li>Real players: Give clues that only someone who knows the player would understand</li>
                <li>Imposters: Pay attention to clues and try to blend in without being too obvious</li>
                <li>Keep clues to one word to make it more challenging</li>
                <li>Take notes if needed to remember who said what</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => router.push('/')}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 dark:from-gray-600 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-800 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-transform duration-200 hover:scale-105 active:scale-95 shadow-xl"
            >
              Back
            </button>
            <button
              onClick={() => router.push('/mode')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-transform duration-200 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50"
            >
              Start Game
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

