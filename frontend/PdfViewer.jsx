export default function PdfViewer({ pdfUrl }) {
    if (!pdfUrl) {
        return null
    }
    
    const fullUrl = `http://localhost:8000${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`

    return(
        <div className="w-full h-full ">
            <iframe
                src={fullUrl}
                title="Uploaded PDF"
                className="w-full h-full border border-gray-300 rounded"
            ></iframe>
        </div>
    )
  }
  