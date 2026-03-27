import { EmergencyRequest } from '@/lib/types'
import { AlertCircle, Clock } from 'lucide-react'

interface EmergencyAlertProps {
  request: EmergencyRequest
}

export function EmergencyAlert({ request }: EmergencyAlertProps) {
  const priorityColors = {
    critical: 'bg-red-50 border-red-200 text-red-900',
    high: 'bg-amber-50 border-amber-200 text-amber-900',
    medium: 'bg-blue-50 border-blue-200 text-blue-900',
  }

  const createdDate = new Date(request.createdAt)
  const hoursAgo = Math.round((Date.now() - createdDate.getTime()) / (1000 * 60 * 60))

  return (
    <div className={`p-4 rounded-lg border ${priorityColors[request.priority]}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div>
              <p className="font-semibold text-sm">{request.hospital}</p>
              <p className="text-xs opacity-75">Blood Type: {request.bloodType}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-lg">{request.units}</p>
              <p className="text-xs opacity-75">units</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs opacity-75 mt-2">
            <Clock className="w-3 h-3" />
            <span>{hoursAgo}h ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
