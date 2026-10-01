import { useNavigate } from 'react-router-dom'
import { FileText, ArrowRight } from 'lucide-react'
import Layout from '../components/layout/Layout'
import HeroBanner from '../components/layout/HeroBanner'

export default function ServiceCatalogue() {
  const navigate = useNavigate()

  return (
    <Layout>
      <HeroBanner
        eyebrow="DED Smart Services"
        title="Service Catalogue"
      />

      {/* Service Card */}
      <div className="section-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/services/ibdaa-license')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 10,
              background: 'linear-gradient(135deg, #1a3a6b, #2457a4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <FileText size={22} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e', marginBottom: 4 }}>
                Ibdaa License
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
                A license to encourage UAE nationals &amp; residents (in Umm Al Quwain) to conduct business from home and online (social media).
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 12, background: '#eff6ff', color: '#2457a4', padding: '3px 10px', borderRadius: 12, fontWeight: 500 }}>
                  1 Year — ₿1000
                </span>
                <span style={{ fontSize: 12, background: '#f0fdf4', color: '#16a34a', padding: '3px 10px', borderRadius: 12, fontWeight: 500 }}>
                  AI-Powered
                </span>
              </div>
            </div>
          </div>
          <ArrowRight size={20} color="#6b7280" style={{ flexShrink: 0 }} />
        </div>
      </div>
    </Layout>
  )
}
