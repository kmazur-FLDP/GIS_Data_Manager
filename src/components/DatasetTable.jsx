import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function DatasetTable({ datasets, onEdit, onDelete }) {
  const navigate = useNavigate()
  const [showArchived, setShowArchived] = useState(false)
  const [coverageFilter, setCoverageFilter] = useState('')
  return (
    <div style={{ marginTop: '2rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem' }}>
      <h2>Datasets</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => setShowArchived(!showArchived)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#333',
            color: '#fff',
            border: '1px solid #666',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showArchived ? 'Hide Archived' : 'Show Archived'}
        </button>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Filter by Coverage:</label>
        <select
          value={coverageFilter}
          onChange={(e) => setCoverageFilter(e.target.value)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#222',
            color: '#fff',
            border: '1px solid #666',
            borderRadius: '4px',
            marginRight: '1rem'
          }}
        >
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
      <div style={{ overflowX: 'auto', minWidth: '1000px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Data Format</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Source Type</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Last Updated</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Owner</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {datasets?.length > 0 ? (
              datasets
                .filter(ds => showArchived || ds.status !== 'Archived')
                .filter(ds => !coverageFilter || (Array.isArray(ds.coverage) && ds.coverage.includes(coverageFilter)))
                .map((ds, index) => (
                  <tr
                    key={ds.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#1c1c1c' : '#2a2a2a',
                      color: '#e0e0e0',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#1c1c1c' : '#2a2a2a')}
                  >
                    <td style={{ padding: '8px', borderBottom: '1px solid #444' }}>{ds.name}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #444' }}>{ds.category}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #444' }}>{ds.data_format || '-'}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #444' }}>{ds.source_type || '-'}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #444' }}>{ds.last_updated || '-'}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #444' }}>{ds.owner}</td>
                    <td style={{
                      padding: '8px',
                      borderBottom: '1px solid #444',
                      color: ds.status === 'Archived' ? 'orange' : '#e0e0e0'
                    }}>
                      {ds.status || '-'}
                    </td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #444' }}>
                      <button
                        style={{
                          marginRight: '0.5rem',
                          padding: '4px 8px',
                          backgroundColor: '#444',
                          color: '#fff',
                          border: '1px solid #666',
                          cursor: 'pointer'
                        }}
                        onClick={() => onEdit(ds)}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          marginRight: '0.5rem',
                          padding: '4px 8px',
                          backgroundColor: '#922',
                          color: '#fff',
                          border: '1px solid #c44',
                          cursor: 'pointer'
                        }}
                        onClick={() => onDelete(ds)}
                      >
                        Delete
                      </button>
                      <button
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#0066cc',
                          color: '#fff',
                          border: '1px solid #3399ff',
                          cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/details/${ds.id}`)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: '10px' }}>No datasets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
  
export default DatasetTable