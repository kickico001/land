'use client'
import { useState } from 'react'
import WalletDialog from '../components/WalletDialog'

const issues = [
  { title: 'Staking Issues', icon: '🔒' },
  { title: 'Token Claims', icon: '🪙' },
  { title: 'Reward Claims', icon: '🎁' },
  { title: 'Airdrop Claims', icon: '🪂' },
  { title: 'Transaction Delays', icon: '⏳' },
  { title: 'Balance Issues', icon: '💰' },
  { title: 'High Fees', icon: '💸' },
  { title: 'Login Problems', icon: '🔑' },
]

export default function Home() {
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="relative min-h-screen pb-16">
          {/* Purple gradient overlay at top */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-900/5 to-transparent z-10" />

          {/* Content */}
          <div className="relative z-20 min-h-screen flex flex-col items-center justify-start pt-32 px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Resolve Your Crypto Issues{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Instantly
                </span>
              </h1>
              
              <p
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Fast and secure resolution for all your cryptocurrency concerns
              </p>

              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
              >
                {issues.map((issue, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 cursor-default transition-all hover:bg-white/10"
                  >
                    <div className="text-3xl mb-2">{issue.icon}</div>
                    <div className="text-sm font-medium">{issue.title}</div>
                  </div>
                ))}
              </div>

              <div
                className="flex justify-center mb-8"
              >
                <button onClick={() => setIsWalletDialogOpen(true)}>
                  <div
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Connect Wallet
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="absolute bottom-0 w-full py-4 text-center text-gray-400 text-sm bg-black/50 backdrop-blur-sm">
            <p>© {new Date().getFullYear()} Crypto Support. All rights reserved.</p>
          </footer>
        </div>
      </main>

      <WalletDialog 
        isOpen={isWalletDialogOpen}
        closeDialog={() => setIsWalletDialogOpen(false)}
        onWalletSelect={() => {}}
      />
    </>
  )
}