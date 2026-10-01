import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import Layout from '../components/layout/Layout'
import HeroBanner from '../components/layout/HeroBanner'
import { useApplication } from '../context/ApplicationContext'

export default function SuccessPage() {
  const navigate = useNavigate()
  const { submissionResult, formData } = useApplication()

  return (
    <Layout>
      <HeroBanner
        eyebrow="DED Smart Services - Service Catalogue"
        title="Ibdaa License"
      />

      <div className="section-card success-card">
        <div className="success-icon">
          <CheckCircle2 size={36} color="white" strokeWidth={2.5} />
        </div>

        <div className="success-title">Application Submitted Successfully!</div>
        <div className="success-subtitle">
          Your Ibdaa License application has been received and is currently under review.<br />
          You will be notified via email once a decision is made.
        </div>

        <div className="ref-badge">
          {submissionResult?.reference_number || 'UAQ-IBDAA-XXXXXXXX'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28, fontSize: 13.5, color: '#374151', maxWidth: 340, margin: '0 auto 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ color: '#6b7280' }}>Trade Name</span>
            <span style={{ fontWeight: 600 }}>{formData.tradeName || '—'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ color: '#6b7280' }}>License Type</span>
            <span style={{ fontWeight: 600 }}>Ibdaa License (1 Year)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ color: '#6b7280' }}>Status</span>
            <span style={{ fontWeight: 600, color: '#f59e0b' }}>Under Review</span>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate('/services')}
          style={{ margin: '0 auto' }}
        >
          <ArrowLeft size={16} />
          Back to Services
        </button>
      </div>
    </Layout>
  )
}
