import { useNavigate } from 'react-router-dom'
function DatasetTable({ datasets, onEdit, onDelete }) {
    const navigate = useNavigate()
    return (
      <div style={{ marginTop: '2rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem' }}>
        <h2>Datasets</h2>
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
                <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {datasets?.length > 0 ? (
                datasets.map((ds, index) => (
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
                  <td colSpan="7" style={{ padding: '10px' }}>No datasets found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  export default DatasetTable