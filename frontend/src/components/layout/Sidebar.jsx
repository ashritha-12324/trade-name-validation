import { LayoutGrid, Grid2X2, Settings } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <aside className="sidebar">
      <div
        className={`sidebar-icon ${isActive('/services') ? 'active' : ''}`}
        onClick={() => navigate('/services')}
        title="Services"
      >
        <LayoutGrid size={20} />
      </div>
      <div className="sidebar-icon" title="Dashboard">
        <Grid2X2 size={20} />
      </div>
      <div className="sidebar-spacer" />
      <div
        className={`sidebar-icon ${isActive('/settings') ? 'active' : ''}`}
        onClick={() => navigate('/settings')}
        title="Settings"
      >
        <Settings size={20} />
      </div>
    </aside>
  )
}
