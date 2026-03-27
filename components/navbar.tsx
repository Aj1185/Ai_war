'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Droplet, Users, Activity, AlertCircle, MessageSquare } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Dashboard', icon: Activity },
    { href: '/donors', label: 'Donors', icon: Users },
    { href: '/blood-stock', label: 'Blood Stock', icon: Droplet },
    { href: '/emergency', label: 'Emergency', icon: AlertCircle },
    { href: '/ai-assistant', label: 'AI Assistant', icon: MessageSquare },
  ]

  return (
    <nav className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Droplet className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">Blood Donation</h1>
          </div>

          <div className="hidden md:flex gap-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  pathname === href
                    ? 'text-primary bg-primary-light bg-opacity-20'
                    : 'text-text-muted hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center cursor-pointer">
              <span className="text-sm font-bold">≡</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
