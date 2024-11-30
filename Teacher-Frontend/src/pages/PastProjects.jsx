import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PastProjectCard from '../components/PastProjectCard'

export default function PastProjects() {
  const [isContentLoading, setIsContentLoading] = useState(true)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const details = {
          user_id: localStorage.getItem('user_id'),
        }

        const response = await axios.get(
          `${import.meta.env.VITE_HOST}/api/fetchFiles`,
          {
            params: details,
            headers: {
              'ngrok-skip-browser-warning': '69420',
            },
          }
        )
        // console.log('response:', response.data)

        // Set the projects state with the fetched data
        setProjects(response.data.files || [])
        setIsContentLoading(false)
      } catch (error) {
        alert('Error fetching projects. Please try again.')
        console.error('Error fetching projects:', error)
        setIsContentLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const deleteFile=(pdfid)=>{
    console.log('Delete Clicked')
    const details={
        pdf_id:pdfid,
        user_id:localStorage.getItem('user_id'),
    }
    axios.get(`${import.meta.env.VITE_HOST}/api/deleteFile`,{params:details,
      headers: {
        'ngrok-skip-browser-warning': '69420',
      },
    }
    )
    .then((response)=>{
      console.log('response:',response)
      if(response.status===200){
        alert('File deleted successfully')
        setProjects(projects.filter((project)=>project.pdfid!==pdfid))
      }
      else{
        alert('Error deleting file. Please try again.')
      }
    })
    .catch((error)=>{
      console.error('Error deleting file:',error)
      alert('Error deleting file. Please try again.')
    })
  }

  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold text-center mt-6">
        Your Past Projects
      </h1>
      {isContentLoading ? (
        <div className="flex flex-col justify-center items-center mt-32">
          <p className="text-lg text-primary text-center mt-2">
            Don't refresh the page
          </p>
          <iframe src="https://lottie.host/embed/a85ac1dc-5cf6-45ea-afa5-41c11559dd98/tF9bcw6cvr.json"></iframe>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-8">
          {projects.length > 0 ? (
            projects.map((project,index) => (
              <PastProjectCard
                key={index}
                pdf_id={project.pdfid}
                pdfName={project.pdfname}
                totalEasyQ={project.easy}
                totalMediumQ={project.medium}
                totalHardQ={project.hard}
                totalSections={project.sections.length}
                deleteFile={deleteFile}
              />
            ))
          ) : (
            <h2 className="text-2xl text-secondary font-bold text-center mt-6">
              No projects found.
            </h2>
          )}
        </div>
      )}
    </div>
  )
}
