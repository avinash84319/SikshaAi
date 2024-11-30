import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  addSection,
  changeSectionName,
  uploadQuestions,
  removeSection,
} from '../Redux/Slices/SectionSlicer'
import SectionCard from '../components/SectionCard'



function GenerateSections() {

  const location = useLocation()
  const navigate=useNavigate()
  const fileUrl = location.state ? location.state.fileUrl : null
  const topics = location.state ? location.state.topics : null
  const fileDetails = useSelector((state) => state.sections)
  const sections = fileDetails.sections
  const dispatch = useDispatch()
  const [isGenerateButtonValid, setIsGenerateButtonValid] = useState(false)
  const [isContentLoading,setIsContentLoading]=useState(false)

  console.log(topics)

  const handleClick = () => {
    dispatch(addSection({ section_id: sections.length, questions: [] }))
  }

  useEffect(() => {
    const checkGenerateButtonValidity = () => {
      return sections.some((section) => section.questions.length > 0)
    }

    setIsGenerateButtonValid(checkGenerateButtonValidity())
  }, [sections])

  const handleGenerateQuestionsClick = async () => {
    let response
    try {
      const sendData = {
        sections,
        user_id: fileDetails.user_id || '12345678',
      }
      setIsContentLoading(true);
      response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/sectionUpload`,
        sendData
      )
      console.log(response.data.message)

      setIsContentLoading(false);
      navigate('/classes')
      
    } catch (error) {
      setIsContentLoading(false)
      alert('Request failed. Please try again.')
      console.error('Error :', error)
    }
    // updating the sectionSlicer with the generated questions
    // console.log(response.data.data)
    // if (response?.data) {
    //   const generatedSections = response.data.data.sections
    //   generatedSections.forEach(async(section) => {
    //     console.log(section)  
    //     await dispatch(
    //       uploadQuestions({
    //         section_id: section.section_id,
    //         questions: section.questions
            
    //       })
    //     )
    //   })
    // }
    
  }

  const updateSectionName = (newName, sectionId) => {
    dispatch(changeSectionName({ section_id: sectionId, name: newName }))
  }

  const deleteSection = (sectionId) => {
    // console.log('Delete Clicked')
    dispatch(removeSection({sectionId: sectionId}))
  }

  return (
    <div className="flex overflow-auto p-5 flex-col items-center bg-white w-[100%]">
      {isContentLoading ? (
        <div className="flex flex-col justify-center items-center mt-32">
          <h1 className="text-4xl mt-44 text-secondary font-bold text-center mt-6">
            Loading...
          </h1>
          <p className="text-lg text-primary text-center mt-2">
            Don't refresh the page
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl text-secondary font-bold text-center mt-6">
            Set Question Paper Blueprint
          </h1>
          <p className="text-lg text-primary text-center mt-2">
            Set Blueprint for your question paper
          </p>
          {sections.length > 0 ? (
            sections.map((section) => (
              <SectionCard
                topics={topics}
                key={section.section_id}
                section={section}
                updateSectionName={updateSectionName}
                deleteSection={deleteSection}
              />
            ))
          ) : (
            <p>No sections available.</p>
          )}
          <button
            className="h-12 w-32 bg-primary text-white border-2 px-2 py-1 mt-4 mb-8 rounded-lg border-primary hover:bg-primary_a"
            onClick={handleClick}
          >
            Add Section
          </button>
          {isGenerateButtonValid && (
            <button
              className="h-12 w-52 bg-primary text-white border-2 px-2 py-1 mt-6 mb-8 rounded-lg border-primary hover:bg-primary_a"
              onClick={handleGenerateQuestionsClick}
            >
              Submit Blueprint
            </button>
          )}
        </div>
      )}
      <div className="flex justify-center items-center my-8">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {fileUrl && (
            <div
              className="mb-4"
              style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                height: '80vh',
                width: '70vw',
              }}
            >
              {fileUrl.includes('teacherstudent') ? (
                <iframe
                  src={fileUrl}
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '80vh',
                    width: '80vw',
                  }}
                  frameborder="0"
                ></iframe>
              ) : (
                <Viewer fileUrl={fileUrl} defaultScale={1.5} />
              )}
            </div>
          )}
        </Worker>
      </div>
    </div>
  )
}

export default GenerateSections
