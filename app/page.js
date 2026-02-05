'use client';
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      if (data.url) setResult(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff', 
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        border: '1px solid #333', 
        padding: '2rem', 
        borderRadius: '12px', 
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{marginBottom: '1rem'}}>Secure Upload</h2>
        
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
          style={{marginBottom: '1rem', color: '#ccc'}}
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#333' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </button>

        {result && (
          <div style={{marginTop: '1.5rem', textAlign: 'left'}}>
            <p style={{fontSize: '12px', color: '#888', marginBottom: '5px'}}>RESULT:</p>
            <div style={{
              display: 'flex', 
              gap: '10px',
              background: '#111',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #333'
            }}>
              <input 
                readOnly 
                value={result} 
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  width: '100%',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <button 
                onClick={() => navigator.clipboard.writeText(result)}
                style={{
                  background: '#333',
                  border: 'none',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Copy
              </button>
            </div>
            <a 
              href={result} 
              target="_blank" 
              style={{
                display: 'block', 
                marginTop: '10px', 
                color: '#0070f3', 
                textAlign: 'center', 
                fontSize: '14px'
              }}
            >
              Open Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}


