'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import TradingViewTicker from "@/components/TradingViewTicker";
import ExactTradingView from "@/components/ExactTradingView";


interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [amount, setAmount] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (!user || error) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, balance')
      .eq('id', user.id)
      .single()

    const { data: txs } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    setUser({ ...user, profile })
    setBalance(profile?.balance || 0)
    setTransactions(txs || [])
    setLoading(false)
  }

  const handleTransaction = async (type: 'credit' | 'debit') => {
    if (!amount || Number(amount) <= 0) return alert('Enter valid amount')

    setProcessing(true)

    const { error } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type,
        amount: Number(amount),
        description: type === 'credit' ? 'Deposit' : 'Withdrawal'
      })

    if (error) {
      alert(error.message)
    } else {
      setAmount('')
      await loadDashboard()
    }

    setProcessing(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0EF2C2]"></div>
          <p className="mt-4 text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Welcome */}
      <div className="mb-8 p-6 bg-gradient-to-r from-[#4C6FFF]/10 to-[#0EF2C2]/5 rounded-2xl border border-gray-800">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome, {user?.profile?.full_name || 'Investor'} 👋
        </h1>

        <div className="flex flex-wrap items-center gap-6">
          <div className="bg-[#0B1C2D] px-6 py-3 rounded-xl border border-gray-800">
            <div className="text-sm text-gray-400">Balance</div>
            <div className="text-2xl font-bold text-[#0EF2C2]">
              ${balance.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#0B1C2D] px-6 py-3 rounded-xl border border-gray-800">
            <div className="text-sm text-gray-400">Account Type</div>
            <div className="text-xl font-bold text-white">checking620</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-[#0B1C2D] border border-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Transfer</h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              type="number"
              placeholder="Enter amount"
              className="flex-1 px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white outline-none"
            />

            <button
              onClick={() => handleTransaction('credit')}
              disabled={processing}
              className="px-6 py-3 bg-[#0EF2C2] text-black font-semibold rounded-lg hover:opacity-90"
            >
              Deposit
            </button>

            <button
              onClick={() => handleTransaction('debit')}
              disabled={processing}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:opacity-90"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="bg-[#0B1C2D] border border-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-3">Security</h3>
          <p className="text-gray-400 text-sm">
            All transactions are encrypted and secured using Supabase PostgreSQL triggers.
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-[#0B1C2D] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">Transaction History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-black/30 text-gray-400 text-sm">
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-t border-gray-800 text-sm">
                  <td className={`px-6 py-4 font-medium ${tx.type === 'credit' ? 'text-[#0EF2C2]' : 'text-red-400'}`}>
                    {tx.type.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-white">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {tx.description}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(tx.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}

              {transactions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    No transactions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TradingViewTicker />
      <ExactTradingView />
    </>
  )
}
