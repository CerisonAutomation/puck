'use client'
import { useState, useCallback } from 'react'
import { Puck } from '@measured/puck'
import '@measured/puck/puck.css'
import { puckConfig } from '@/puck/config'

type Props = { slug: string; pageId?: string; initialData: any }

export function PuckEditor({ slug, initialData }: Props) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePublish = useCallback(async (data: any) => {
    setSaving(true); setError(null)
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puckData: data, status: 'published' }),
      })
      if (!res.ok) throw new Error(`Save failed: ${res.status}`)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (err: any) { setError(err.message) }
    finally { setSaving(false) }
  }, [slug])

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      {error && <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, background: '#ef4444', color: 'white', padding: '12px 20px', borderRadius: 8 }}>{error}</div>}
      {saved && <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, background: '#22c55e', color: 'white', padding: '12px 20px', borderRadius: 8 }}>Published!</div>}
      <Puck config={puckConfig} data={initialData} onPublish={handlePublish} />
    </div>
  )
}
