'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PortfolioChart from '@/components/PortfolioChart'
import DashboardCard from '@/components/DashboardCard'
import ActivityList from '@/components/ActivityList'
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  PlusIcon, 
  MinusIcon, 
  ArrowRightOnRectangleIcon 
} from '@/components/Icons'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState(25000)
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          router.push('/login')
          return
        }
        
        setUser(user)
      } catch (error) {
        console.error('Error checking user:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    
    checkUser()
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        }
      }
    )
    
    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (amount > 0) {
      setBalance(prev => prev + amount)
      setDepositAmount('')
      alert(`Demo deposit of $${amount} completed. This is simulation only.`)
    }
  }

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount)
    if (amount > 0 && amount <= balance) {
      setBalance(prev => prev - amount)
      setWithdrawAmount('')
      alert(`Demo withdrawal of $${amount} completed. This is simulation only.`)
    } else if (amount > balance) {
      alert('Insufficient demo balance')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">FluxHold</span>
              <span className="text-sm text-gray-500 ml-4">Demo Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.email?.split('@')[0]}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Total Portfolio Value"
            value={`$${balance.toLocaleString()}`}
            change="+2.5%"
            isPositive={true}
            icon={<ArrowUpIcon className="w-6 h-6 text-green-600" />}
          />
          
          <DashboardCard
            title="Today's Gain/Loss"
            value="+$423.50"
            change="+1.8%"
            isPositive={true}
            icon={<ArrowUpIcon className="w-6 h-6 text-green-600" />}
          />
          
          <DashboardCard
            title="Demo Risk Level"
            value="Moderate"
            change="Balanced"
            isPositive={null}
            icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>}
          />
        </div>

        {/* Chart and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Portfolio Growth (Simulated)</h2>
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>
            <PortfolioChart />
            <p className="text-sm text-gray-500 mt-4 text-center">
              Chart displays mock data for demonstration purposes
            </p>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <ActivityList />
          </div>
        </div>

        {/* Demo Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Demo Deposit</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <button
                onClick={handleDeposit}
                className="w-full flex items-center justify-center space-x-2 btn-primary"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Simulate Deposit</span>
              </button>
              <p className="text-sm text-gray-500">
                This simulates a deposit for demo purposes only. No real money is involved.
              </p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Demo Withdrawal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    max={balance}
                  />
                </div>
              </div>
              <button
                onClick={handleWithdraw}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                <MinusIcon className="w-5 h-5" />
                <span>Simulate Withdrawal</span>
              </button>
              <p className="text-sm text-gray-500">
                This simulates a withdrawal for demo purposes only. No real money is involved.
              </p>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="card bg-red-50 border border-red-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Demo Data – Not Real Investments</h3>
              <div className="mt-2 text-red-700">
                <p className="mb-2">
                  <strong>Important:</strong> This is a demonstration application for portfolio purposes only.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>All data shown is simulated and does not represent real investments</li>
                  <li>No real money is handled or stored in this application</li>
                  <li>This platform does not provide financial advice</li>
                  <li>Deposit and withdrawal features are for demonstration only</li>
                  <li>Do not enter real financial information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}