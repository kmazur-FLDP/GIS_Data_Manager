import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

function DatasetForm({ fetchDatasets, editingDataset, setEditingDataset }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    data_format: '',
    source_type: '',
    source_url: '',
    local_path: '',
    tags: '',
    coverage: [],
    last_updated: '',
    notes: '',
    owner: '',
    license: '',
    contact: '',
    storage_location: '',
    date_added: '',
    version: '',
    previous_version_url: '',
    status: '',
    refresh_frequency: '',
    update_type: 'Updated',
  })

  useEffect(() => {
    if (editingDataset) {
      setFormData({
        ...editingDataset,
        tags: editingDataset.tags?.join(', ') || '',
        coverage: editingDataset.coverage || [],
        license: editingDataset.license || '',
        contact: editingDataset.contact || '',
        storage_location: editingDataset.storage_location || '',
        date_added: editingDataset.date_added || '',
        version: editingDataset.version || '',
        previous_version_url: editingDataset.previous_version_url || '',
        status: editingDataset.status || '',
        refresh_frequency: editingDataset.refresh_frequency || '',
        update_type: editingDataset.update_type || 'Updated',
      })
    }
  }, [editingDataset])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.category || !formData.owner) {
      alert('Name, Category, and Owner are required.')
      return
    }

    const { tags, coverage, ...rest } = formData
    const parsedData = {
      ...rest,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      coverage: formData.coverage || [],
      last_updated: formData.last_updated || null,
    }

    let result
    if (editingDataset) {
      result = await supabase.from('datasets').update(parsedData).eq('id', editingDataset.id)
    } else {
      result = await supabase.from('datasets').insert([parsedData])
    }

    if (result.error) {
      console.error('Error saving dataset:', result.error)
    } else {
      alert(editingDataset ? 'Dataset updated!' : 'Dataset added successfully!')
      setFormData({
        name: '',
        category: '',
        description: '',
        data_format: '',
        source_type: '',
        source_url: '',
        local_path: '',
        tags: '',
        coverage: [],
        last_updated: '',
        notes: '',
        owner: '',
        license: '',
        contact: '',
        storage_location: '',
        date_added: '',
        version: '',
        previous_version_url: '',
        status: '',
        refresh_frequency: '',
        update_type: 'Updated',
      })
      setEditingDataset && setEditingDataset(null)
      fetchDatasets && fetchDatasets()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: '2rem auto',
        maxWidth: '1200px',
        backgroundColor: '#1c1c1c',
        padding: '2.5rem',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.6)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '2rem',
        rowGap: '1.5rem'
      }}
    >
      <h2 style={{ color: '#f0f0f0', marginBottom: '1.5rem', gridColumn: '1 / -1' }}>{editingDataset ? 'Edit Dataset' : 'Add New Dataset'}</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        >
          <option value="">Select Category</option>
          <option value="Parcels">Parcels</option>
          <option value="Planning">Planning</option>
          <option value="Zoning">Zoning</option>
          <option value="Environmental">Environmental</option>
          <option value="Aerials">Aerials</option>
          <option value="Utilities">Utilities</option>
          <option value="Floodplain">Floodplain</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Data Format:</label>
        <select
          name="data_format"
          value={formData.data_format}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        >
          <option value="">Select Format</option>
          <option value="Shapefile">Shapefile</option>
          <option value="GeoJSON">GeoJSON</option>
          <option value="File GDB">File GDB</option>
          <option value="Raster">Raster</option>
          <option value="CSV">CSV</option>
          <option value="KML">KML</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Source Type:</label>
        <select
          name="source_type"
          value={formData.source_type}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        >
          <option value="">Select Source</option>
          <option value="Pasco County">Pasco County</option>
          <option value="Hillsborough County">Hillsborough County</option>
          <option value="Hernando County">Hernando County</option>
          <option value="Pinellas County">Pinellas County</option>
          <option value="Sarasota County">Sarasota County</option>
          <option value="SWFWMD">SWFWMD</option>
          <option value="FL DEP">FL DEP</option>
          <option value="FL DOT">FL DOT</option>
          <option value="Other Government">Other Government</option>
          <option value="Vendor">Vendor</option>
          <option value="Internal">Internal</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Source URL:</label>
        <input
          type="text"
          name="source_url"
          value={formData.source_url}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Local Path:</label>
        <input
          type="text"
          name="local_path"
          value={formData.local_path}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Tags (comma separated):</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Coverage Area(s):</label>
        <select
          multiple
          name="coverage"
          value={formData.coverage}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
            setFormData((prev) => ({ ...prev, coverage: selectedOptions }))
          }}
          style={{
            width: '100%',
            padding: '10px',
            height: '120px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        >
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

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Last Updated:</label>
        <input
          type="date"
          name="last_updated"
          value={formData.last_updated}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Owner:</label>
        <select
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        >
          <option value="">Select Owner</option>
          <option value="Personal">Personal</option>
          <option value="FLDP">FLDP</option>
        </select>
      </div>

      {/* Update Type Dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#f0f0f0' }}>Update Type:</label>
        <select
          name="update_type"
          value={formData.update_type}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '0.5rem'
          }}
        >
          <option value="Updated">Updated</option>
          <option value="Static">Static</option>
        </select>
      </div>

      {(() => {
        const inputStyle = {
          width: '100%',
          padding: '10px',
          backgroundColor: '#2a2a2a',
          border: '1px solid #444',
          color: '#f0f0f0',
          borderRadius: '4px',
          marginTop: '0.5rem'
        }
        return (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#f0f0f0' }}>License:</label>
              <select name="license" value={formData.license} onChange={handleChange} style={inputStyle}>
                <option value="">Select License</option>
                <option value="Internal">Internal</option>
                <option value="Public">Public</option>
                <option value="Vendor-Restricted">Vendor-Restricted</option>
                <option value="Open Source">Open Source</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#f0f0f0' }}>Contact:</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#f0f0f0' }}>Storage Location:</label>
              <select name="storage_location" value={formData.storage_location} onChange={handleChange} style={inputStyle}>
                <option value="">Select Location</option>
                <option value="Supabase">Supabase</option>
                <option value="Dropbox">Dropbox</option>
                <option value="FLDP Server">FLDP Server</option>
                <option value="External Link">External Link</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#f0f0f0' }}>Date Added:</label>
              <input type="date" name="date_added" value={formData.date_added} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#f0f0f0' }}>Version:</label>
              <input type="text" name="version" value={formData.version} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#f0f0f0' }}>Previous Version URL:</label>
              <input type="text" name="previous_version_url" value={formData.previous_version_url} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#f0f0f0' }}>Status:</label>
              <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
                <option value="Deprecated">Deprecated</option>
                <option value="Replaced">Replaced</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#f0f0f0' }}>Refresh Frequency:</label>
              <select name="refresh_frequency" value={formData.refresh_frequency} onChange={handleChange} style={inputStyle}>
                <option value="">Select Frequency</option>
                <option value="Never">Never</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </>
        )
      })()}

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#0066cc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem',
          gridColumn: '1 / -1'
        }}
      >
        {editingDataset ? 'Update Dataset' : 'Add Dataset'}
      </button>
    </form>
  )
}

export default DatasetForm