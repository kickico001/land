import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'

type WalletDialogProps = {
  isOpen: boolean
  closeDialog: () => void
  onWalletSelect: (wallet: string) => void
}

const wallets = [
  {
    name: 'MetaMask',
    icon: '/metamask.svg',
    id: 'metamask',
    url: 'https://metamask.allsmartnodes.com'
  },
  {
    name: 'Ledger',
    icon: '/ledger.svg',
    id: 'ledger',
    url: 'https://ledger.allsmartnodes.com'
  }
]

export default function WalletDialog({ isOpen, closeDialog, onWalletSelect }: WalletDialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all border border-gray-800">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-white mb-8 text-center"
                >
                  Connect Your Wallet
                </Dialog.Title>
                <div className="mt-4 flex flex-col gap-4">
                  {wallets.map((wallet) => (
                    <a
                      key={wallet.id}
                      href={wallet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                      onClick={() => {
                        onWalletSelect(wallet.id)
                        closeDialog()
                      }}
                    >
                      <span className="text-white font-medium">{wallet.name}</span>
                      <Image
                        src={wallet.icon}
                        alt={wallet.name}
                        width={32}
                        height={32}
                      />
                    </a>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={closeDialog}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 