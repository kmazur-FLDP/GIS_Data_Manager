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
          {Object.entries(dataset).map(([key, value]) => (
            <tr key={key}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', borderBottom: '1px solid #444' }}>{key}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #444' }}>
                {Array.isArray(value) ? value.join(', ') : value?.toString()}
              </td>
            </tr>
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
