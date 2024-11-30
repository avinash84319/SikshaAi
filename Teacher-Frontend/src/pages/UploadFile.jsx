import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setMetadata } from '../Redux/Slices/SectionSlicer'
import { v4 as uuidv4 } from 'uuid'

function UploadFile() {
  const fileDetails = useSelector((state) => state.sections)
  const dispatch = useDispatch()

  const [isFileUploaded, setIsFileUploaded] = useState(
    localStorage.getItem('file') == null ? false : true
  )
  const [pdfName, setPdfName] = useState('')
  const [fileUrl, setFileUrl] = useState(null)
  const [scale, setScale] = useState(1.5) // Adjust the initial scale as needed
  const [loading, setLoading] = useState(false) // Loading state
  const navigate = useNavigate()

  useEffect(() => {
    // Load PDF from local storage on component mount
    const storedPdf = localStorage.getItem('file')
    if (storedPdf) {
      setFileUrl(`data:application/pdf;base64,${storedPdf}`)
      setIsFileUploaded(true)
    }
  }, [])

  useEffect(() => {
    dispatch(
      setMetadata({
        user_id: localStorage.getItem('user_id'),
        pdf_id: uuidv4(),
        pdf_name: pdfName,
        sections: [],
      })
    )
  }, [fileUrl])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    setPdfName(selectedFile.name.split('.')[0])
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64File = reader.result
        setFileUrl(base64File)
        localStorage.setItem('file', base64File.split(',')[1])
        setIsFileUploaded(true)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      alert('Please upload a PDF file.')
    }
  }

  const clearStorage = () => {
    localStorage.removeItem('file')
    setFileUrl(null)
    setIsFileUploaded(false)
  }

  const handleProceed = async () => {
    setLoading(true) // Start loading when Proceed button is clicked
    await axios
      .post(`${import.meta.env.VITE_HOST}/api/pdfupload`, {
        pdf_id: fileDetails.pdf_id,
        pdf_name: fileDetails.pdf_name,
        pdf_content: localStorage.getItem('file'),
        user_id: fileDetails.user_id || '12345678',
      })
      .then((response) => {
        const topics = response.data.headings
        setLoading(false) // Stop loading after successful response
        navigate('/generate-sections', { state: { fileUrl, topics: topics } })
      })
      .catch((error) => {
        console.error('Error uploading pdf:', error)
        alert('Uploading PDF failed. Please try again.')
        setLoading(false) // Stop loading if there's an error
      })
  }

  return (
    <div className="flex overflow-auto p-5 flex-col items-center bg-white w-[100%]">
      {loading ? (
        <iframe
          src="https://lottie.host/embed/6be7bb49-9118-49f5-92fd-4fefac2d41c3/NgT4wLryM8.lottie"
          style={{ height: '400px', width: '400px' }}
        ></iframe>
      ) : (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl text-secondary font-bold text-center mt-6">
              Upload File
            </h1>
            <p className="text-lg text-primary text-center mt-2">
              Upload file to generate questions from it
            </p>
            <div className="relative h-12 w-32 mt-4 mb-8">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <button className="w-full h-full bg-primary text-white border-2 px-2 py-1 rounded-lg border-primary hover:bg-primary_a">
                Choose File
              </button>
            </div>
            {isFileUploaded && (
              <div className="flex flex-row justify-around items-center w-96 mb-8">
                <button
                  className="h-12 w-32 bg-primary text-white border-2 px-2 py-1 mt-4 rounded-lg border-primary hover:bg-primary_a"
                  onClick={clearStorage}
                >
                  Delete File
                </button>
                <button
                  className="h-12 w-32 bg-primary text-white border-2 px-2 py-1 mt-4 rounded-lg border-primary hover:bg-primary_a"
                  onClick={handleProceed}
                >
                  Proceed
                </button>
              </div>
            )}
            {isFileUploaded && (
              <div className="flex flex-row justify-between w-full items-center mb-3">
                <h1 className="text-xl text-secondary font-bold text-center mt-6">
                  {pdfName}
                </h1>
              </div>
            )}
            {fileUrl && (
              <div
                className="mb-4"
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '80vh',
                  width: '80vw',
                }}
              >
                <Viewer fileUrl={fileUrl} defaultScale={scale} />
              </div>
            )}
          </div>
        </Worker>
      )}
    </div>
  )
}

export default UploadFile



