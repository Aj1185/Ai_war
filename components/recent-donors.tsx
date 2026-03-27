import { Donor } from '@/lib/types'
import { User, CheckCircle, XCircle } from 'lucide-react'

interface RecentDonorsProps {
  donors: Donor[]
}

export function RecentDonors({ donors }: RecentDonorsProps) {
  return (
    <div className="space-y-3">
      {donors.map((donor) => (
        <div key={donor.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{donor.name}</p>
              <p className="text-xs text-text-muted">{donor.bloodType}</p>
            </div>
          </div>
          <div>
            {donor.status === 'active' ? (
              <CheckCircle className="w-4 h-4 text-success" />
            ) : (
              <XCircle className="w-4 h-4 text-text-muted" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
