import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

function Dashboard() {
  const [datasets, setDatasets] = useState([])
  const [owner, setOwner] = useState('FLDP')
  const [coverageFilter, setCoverageFilter] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .eq('owner', owner)

      if (error) console.error('Error loading datasets:', error)
      else setDatasets(data)
    }

    fetchData()
  }, [owner])

  const isStale = (ds) => {
    if (ds.update_type === 'Static') return false
    const freqMap = { Monthly: 30, Quarterly: 90, Yearly: 365 }
    const days = freqMap[ds.refresh_frequency]
    if (!days || !ds.last_updated) return false
    const diff = (new Date() - new Date(ds.last_updated)) / (1000 * 60 * 60 * 24)
    return diff > days
  }

  const staleDatasets = datasets.filter(ds => {
    return isStale(ds) && (!coverageFilter || (Array.isArray(ds.coverage) && ds.coverage.includes(coverageFilter)))
  })
  const statusCounts = datasets
    .filter(ds => ds.update_type !== 'Static')
    .reduce((acc, ds) => {
      const s = ds.status || 'Unknown'
      acc[s] = (acc[s] || 0) + 1
      return acc
    }, {})

  return (
    <div style={{ color: '#f0f0f0', padding: '2rem' }}>
      <h2>Data Health Dashboard</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>Owner:</label>
        <select value={owner} onChange={(e) => setOwner(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="FLDP">FLDP</option>
          <option value="Personal">GISNerd</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>Coverage:</label>
        <select value={coverageFilter} onChange={(e) => setCoverageFilter(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="">All</option>
          <option value="Pasco">Pasco</option>
          <option value="Hillsborough">Hillsborough</option>
          <option value="Hernando">Hernando</option>
          <option value="Pinellas">Pinellas</option>
          <option value="Sarasota">Sarasota</option>
          <option value="Manatee">Manatee</option>
          <option value="Citrus">Citrus</option>
          <option value="Polk">Polk</option>
          <option value="SWFWMD">SWFWMD</option>
          <option value="Statewide">Statewide</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#1e1e1e', padding: '1rem', borderRadius: '8px' }}>
          <strong>Needs Refresh:</strong>
          <div style={{ fontSize: '1.5rem' }}>{staleDatasets.length}</div>
        </div>
        <div style={{ backgroundColor: '#1e1e1e', padding: '1rem', borderRadius: '8px' }}>
          <strong>By Status:</strong>
          {Object.entries(statusCounts).map(([key, val]) => (
            <div key={key}>{key}: {val}</div>
          ))}
        </div>
      </div>

      <h3>Stale Datasets</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#333' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Last Updated</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Refresh Frequency</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {staleDatasets.map(ds => (
            <tr key={ds.id} style={{ backgroundColor: '#2a2a2a' }}>
              <td style={{ padding: '8px' }}>{ds.name}</td>
              <td style={{ padding: '8px' }}>{ds.category}</td>
              <td style={{ padding: '8px' }}>{ds.last_updated}</td>
              <td style={{ padding: '8px' }}>{ds.refresh_frequency}</td>
              <td style={{ padding: '8px', color: ds.status === 'Archived' ? 'orange' : '#f0f0f0' }}>
                {ds.status || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard