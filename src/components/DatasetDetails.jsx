import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

function DatasetDetails() {
  const { id } = useParams()
  const [dataset, setDataset] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('datasets').select('*').eq('id', id).single()
      if (error) {
        console.error('Error fetching dataset:', error)
      } else {
        setDataset(data)
      }
    }
    fetchData()
  }, [id])

  if (!dataset) {
    return <div style={{ color: '#f0f0f0', padding: '2rem' }}>Loading...</div>
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1000px',
      margin: '0 auto',
      color: '#f0f0f0',
      backgroundColor: '#1e1e1e',
      borderRadius: '8px',
      boxShadow: '0 0 12px rgba(0,0,0,0.4)'
    }}>
      <h2>Dataset Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {[
            ['Name', dataset.name],
            ['Category', dataset.category],
            ['Owner', dataset.owner],
            ['Coverage', dataset.coverage?.join(', ')],
            ['Tags', dataset.tags?.join(', ')],
            ['Data Format', dataset.data_format],
            ['Source Type', dataset.source_type],
            ['Source URL', dataset.source_url],
            ['Local Path', dataset.local_path],
            ['Last Updated', dataset.last_updated],
            ['Date Added', dataset.date_added],
            ['License', dataset.license],
            ['Contact', dataset.contact],
            ['Storage Location', dataset.storage_location],
            ['Version', dataset.version],
            ['Previous Version URL', dataset.previous_version_url],
            ['Status', dataset.status],
            ['Refresh Frequency', dataset.refresh_frequency],
            ['Notes', dataset.notes],
            ['Description', dataset.description],
          ].map(([label, value]) => (
            value ? (
              <tr key={label}>
                <td style={{ padding: '0.5rem', fontWeight: 'bold', borderBottom: '1px solid #444' }}>{label}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #444' }}>{value}</td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/" style={{ color: '#7abaff' }}>← Back to Dataset List</Link>
      </div>
    </div>
  )
}

export default DatasetDetails
