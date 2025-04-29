import { useEffect, useState } from 'react'
import DatasetForm from './components/DatasetForm'
import DatasetTable from './components/DatasetTable'
import { supabase } from './services/supabaseClient'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DatasetDetails from './components/DatasetDetails'

function App() {
  const [datasets, setDatasets] = useState([])
  const [filters, setFilters] = useState({ owner: '', category: '', search: '' })
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })
  const [editingDataset, setEditingDataset] = useState(null)
  const [activeTab, setActiveTab] = useState('view')

  const handleEditDataset = (dataset) => {
    setEditingDataset(dataset)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const fetchDatasets = async () => {
    const { data, error } = await supabase
      .from('datasets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching datasets:', error)
    } else {
      setDatasets(data)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleDeleteDataset = async (dataset) => {
    const confirm = window.confirm(`Are you sure you want to delete "${dataset.name}"?`)
    if (!confirm) return

    const { error } = await supabase.from('datasets').delete().eq('id', dataset.id)
    if (error) {
      console.error('Failed to delete dataset:', error)
    } else {
      fetchDatasets()
    }
  }

  useEffect(() => {
    fetchDatasets()
  }, [])

  return (
    <Router>
      <div style={{
        backgroundColor: '#121212',
        color: '#f0f0f0',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          width: '100%',
          paddingLeft: '2rem',
          paddingRight: '2rem'
        }}>
          <Routes>
            <Route path="/" element={
              <>
                <h1>GIS Data Manager</h1>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <button
                    onClick={() => setActiveTab('view')}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: activeTab === 'view' ? '#333' : '#222',
                      color: '#f0f0f0',
                      border: '1px solid #444',
                      cursor: 'pointer'
                    }}
                  >
                    View Datasets
                  </button>
                  <button
                    onClick={() => setActiveTab('add')}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: activeTab === 'add' ? '#333' : '#222',
                      color: '#f0f0f0',
                      border: '1px solid #444',
                      cursor: 'pointer'
                    }}
                  >
                    {editingDataset ? 'Edit Dataset' : 'Add Dataset'}
                  </button>
                </div>

                {activeTab === 'add' && (
                  <DatasetForm
                    fetchDatasets={fetchDatasets}
                    editingDataset={editingDataset}
                    setEditingDataset={setEditingDataset}
                  />
                )}

                {activeTab === 'view' && (
                  <>
                    <div style={{ margin: '1rem 0' }}>
                      <label style={{ marginRight: '1rem' }}>
                        Owner:
                        <select name="owner" value={filters.owner} onChange={handleFilterChange} style={{ marginLeft: '0.5rem' }}>
                          <option value="">All</option>
                          <option value="Personal">Personal</option>
                          <option value="FLDP">FLDP</option>
                        </select>
                      </label>
                      <label style={{ marginRight: '1rem' }}>
                        Category:
                        <select name="category" value={filters.category} onChange={handleFilterChange} style={{ marginLeft: '0.5rem' }}>
                          <option value="">All</option>
                          <option value="Parcels">Parcels</option>
                          <option value="Zoning">Zoning</option>
                          <option value="Environmental">Environmental</option>
                          <option value="Aerials">Aerials</option>
                          <option value="Utilities">Utilities</option>
                          <option value="Floodplain">Floodplain</option>
                        </select>
                      </label>
                      <label>
                        Search:
                        <input
                          type="text"
                          name="search"
                          value={filters.search}
                          onChange={handleFilterChange}
                          placeholder="Search name or description"
                          style={{ marginLeft: '0.5rem', padding: '0.2rem' }}
                        />
                      </label>
                    </div>

                    <DatasetTable
                      datasets={datasets}
                      filters={filters}
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      onDelete={handleDeleteDataset}
                      onEdit={handleEditDataset}
                    />
                  </>
                )}
              </>
            } />
            <Route path="/details/:id" element={<DatasetDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App