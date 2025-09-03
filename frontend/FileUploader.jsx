import { useState } from 'react'
import axios from 'axios'

export default function FileUploader({ onComplete }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const { data } = await axios.post(
        'http://localhost:8000/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      onComplete(data.summary, data.pdf_url)
    } catch (err) {
      console.error(err)
      alert('Upload failed. Check your backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".ppt,.pptx"
        onChange={e => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0
                   file:text-sm file:font-semibold
                    file:bg-stone-300 dark:file:bg-stone-500 file:text-zinc-700
                   hover:file:bg-stone-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-zinc-600 text-amber-50 
                   disabled:opacity-50 hover:bg-zinc-700 rounded-full"
      >
        {loading ? 'Uploading…' : 'Upload & Summarize'}
      </button>
    </form>
  )
}
