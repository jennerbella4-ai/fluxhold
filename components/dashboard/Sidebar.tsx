'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import {
  HomeIcon,
  UserGroupIcon,
  LightBulbIcon,
  ClockIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  isMobile?: boolean
  onMobileClose?: () => void
}

export default function Sidebar({
  isOpen,
  onToggle,
  isMobile = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isHovered, setIsHovered] = useState(false)
  const [userProfile, setUserProfile] = useState<{ name: string; role: string; avatar?: string }>({ name: 'User', role: 'Standard Account' })

  // Fetch profile from Supabase
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, role, avatar')
        .eq('id', user.id)
        .single()

      if (!error && profile) {
        setUserProfile({
          name: profile.full_name || user.email,
          role: profile.role || 'Standard Account',
          avatar: profile.avatar || undefined,
        })
      } else {
        setUserProfile({
          name: user.email || 'User',
          role: 'Standard Account',
        })
      }
    }

    fetchUserProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleLinkClick = () => {
    if (isMobile && onMobileClose) onMobileClose()
  }

  const getSidebarWidth = () => {
    if (isMobile) return 'w-72'
    if (!isOpen && !isHovered) return 'w-16'
    if (screenSize === 'tablet') return 'w-64'
    return 'w-72'
  }

  const navigation = [
    {
      section: 'Main',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Deposit', href: '/dashboard/deposit', icon: BanknotesIcon },
        { name: 'Withdrawals', href: '/dashboard/withdrawals', icon: CreditCardIcon },
        { name: 'Joint Investments', href: '/dashboard/joint-investments', icon: UserGroupIcon },
      ],
    },
    {
      section: 'Activity',
      items: [
        { name: 'Transactions History', href: '/dashboard/transactions', icon: ClockIcon },
        { name: 'Reports', href: '/dashboard/reports', icon: DocumentChartBarIcon },
        { name: 'AI Insight', href: '/dashboard/ai-insight', icon: LightBulbIcon },
      ],
    },
    {
      section: 'Account',
      items: [
        { name: 'Profile Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
        { name: 'Refer & Earn', href: '/dashboard/refer', icon: CurrencyDollarIcon },
      ],
    },
  ]

  return (
    <div
      className={`flex h-full flex-col ${getSidebarWidth()} transition-all duration-300 bg-[#0B1C2D] border-r border-gray-800`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-gray-800">
        <Link href="/dashboard" onClick={handleLinkClick} className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4C6FFF] to-[#0EF2C2] flex items-center justify-center">
            <span className="text-lg font-bold text-[#0B1C2D]">F</span>
          </div>
          {(isOpen || isHovered || isMobile) && (
            <div>
              <span className="text-xl font-bold text-white">Fluxhold</span>
              <span className="block text-xs text-[#0EF2C2]">Investment Platform</span>
            </div>
          )}
        </Link>
        {!isMobile && (isOpen || isHovered) && (
          <button onClick={onToggle} className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-800">
            {isOpen ? <ChevronDoubleLeftIcon className="h-4 w-4 text-gray-400" /> : <ChevronDoubleRightIcon className="h-4 w-4 text-gray-400" />}
          </button>
        )}
        {isMobile && (
          <button onClick={onMobileClose} className="p-1.5 rounded-lg hover:bg-gray-800">
            <XMarkIcon className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto">
        {navigation.map(section => (
          <div key={section.section}>
            {(isOpen || isHovered || isMobile) && <p className="px-3 mb-2 text-xs text-gray-500 uppercase tracking-wider">{section.section}</p>}
            <div className="space-y-1">
              {section.items.map(item => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                const showText = isOpen || isHovered || isMobile
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center px-3 py-3 rounded-xl transition-all ${
                      isActive ? 'bg-gradient-to-r from-[#4C6FFF]/20 to-[#0EF2C2]/10 text-white border border-gray-700' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    } ${!showText ? 'justify-center' : ''}`}
                    title={!showText ? item.name : undefined}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-[#0EF2C2]' : ''}`} />
                    {showText && <span className="ml-3 truncate">{item.name}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-800">
        <div className={`flex items-center ${isOpen || isHovered || isMobile ? 'justify-between' : 'justify-center'}`}>
          <div className="flex items-center min-w-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0EF2C2] flex items-center justify-center bg-gray-600 text-white font-bold">
              {userProfile.avatar ? (
                <Image src={userProfile.avatar} alt="User Avatar" width={40} height={40} className="object-cover" />
              ) : (
                userProfile.name.charAt(0).toUpperCase()
              )}
            </div>
            {(isOpen || isHovered || isMobile) && (
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-white truncate">{userProfile.name}</p>
                <p className="text-xs text-gray-400 truncate">{userProfile.role}</p>
              </div>
            )}
          </div>
          {(isOpen || isHovered || isMobile) && (
            <button onClick={() => setShowLogoutConfirm(true)} className="p-1.5 rounded-lg hover:bg-gray-800">
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#0B1C2D] border border-gray-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-white mb-2">Logout</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to logout?</p>
            <div className="flex space-x-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2 border border-gray-700 rounded-lg text-white hover:bg-gray-800">Cancel</button>
              <button onClick={handleLogout} className="flex-1 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
