import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setMetadata } from '../Redux/Slices/SectionSlicer'
import DeleteIcon from '@mui/icons-material/Delete'


export default function PastProjectCard(props) {
    const pdfName = props.pdfName ||'Untitled'
    const pdfId=props.pdf_id
    const totalEasyQ=props.totalEasyQ || 0
    const totalMediumQ=props.totalMediumQ || 0
    const totalHardQ=props.totalHardQ || 0
    const totalSections=props.totalSections || 0
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleViewClick = () => {
        console.log('Clicked')
        // fetching the details of the pdf from the backend
        // and updating the redux store
        const details={
            pdf_id:pdfId,
            user_id:localStorage.getItem('user_id'),
        }
        axios
          .get(`${import.meta.env.VITE_HOST}/api/fetchFileDetails`, {
            params: details,
            headers: {
              'ngrok-skip-browser-warning': '69420',
            },
          })
          .then(async (response) => {
            console.log(response.data)
            const newSections = response.data.sections
            const fileUrl=response.data.pdf_url
            console.log(fileUrl)
            const sections=[]
            newSections.forEach((section) => {
              sections.push({
                section_id: section[1],
                name: section[2],
                mcq: section[3],
                multipleChoice: section[4],
                fillInTheBlanks: section[5],
                trueFalse: section[6],
                matchTheFollowing: section[7],
                subjective: section[8],
                paragraph: section[9],
                questions: section[10],
                easy: section[11],
                medium: section[12],
                hard: section[13],
                easyMarks: section[14],
                mediumMarks: section[15],
                hardMarks: section[16],
              })
            })

            const pdfDetails={
                user_id:localStorage.getItem('user_id'),
                pdf_id:pdfId,
                pdf_name:pdfName,
                sections:sections,
            }
            
            await dispatch(setMetadata(pdfDetails))
            navigate('/generate-sections',{ state: { fileUrl } })
          })
          .catch((error) => {
            console.error('Error fetching file details:', error)
            alert('Error fetching file details')
          })

    }

    const handleDeleteClick=()=>{
        props.deleteFile(pdfId);
    }
    

  return (
    <div className="flex flex-col justify-center items-center my-8 w-full sm:w-[600px] p-3 border-2 rounded-lg border-primary">
      <div className="flex flex-row justify-between w-full items-center mb-3">
        <input
          type="text"
          name="pastProject"
          className="w-[200px] sm:w-[200px] h-[40px] text-xl sm:text-3xl text-secondary border-b-2 px-1 border-primary focus:outline-none focus:border-secondary "
          value={pdfName}
          //   onChange={handleChange}
        />
        <button
          className="mt-2 sm:mt-0 bg-transparent border-2 px-2 py-1 rounded-lg border-primary hover:bg-primary hover:text-white"
          onClick={handleViewClick}
        >
          View
        </button>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <ul className="flex flex-row justify-evenly items-center w-full sm:w-[500px] marker:text-secondary list-disc">
          <li className="mt-1 sm:mt-0">Sections - {totalSections}</li>
          <li className="mt-1 sm:mt-0">Easy - {totalEasyQ}</li>
          <li className="mt-1 sm:mt-0">Medium - {totalMediumQ}</li>
          <li className="mt-1 sm:mt-0">Hard - {totalHardQ}</li>
        </ul>
        <div className="flex justify-center items-center ">
          <DeleteIcon className="cursor-pointer" onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  )
}
