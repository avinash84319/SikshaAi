import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'


function SectionCard({ section, updateSectionName ,deleteSection,topics}) {
  const navigate = useNavigate();
  const [sectionValue, setSectionValue] = useState(section.name)

  // total no. of easy, medium and hard questions in the section
  const totalEasyQ=section.mcq[0]+section.multipleChoice[0]+section.fillInTheBlanks[0]+section.trueFalse[0]+section.matchTheFollowing[0]+section.subjective[0]+section.paragraph[0]
  const totalMediumQ=section.mcq[1]+section.multipleChoice[1]+section.fillInTheBlanks[1]+section.trueFalse[1]+section.matchTheFollowing[1]+section.subjective[1]+section.paragraph[1]
  const totalHardQ=section.mcq[2]+section.multipleChoice[2]+section.fillInTheBlanks[2]+section.trueFalse[2]+section.matchTheFollowing[2]+section.subjective[2]+section.paragraph[2]

  const handleChange = (e) => {
    setSectionValue(e.target.value)
    updateSectionName(section.section_id,sectionValue)
  }

  const handleClick = () => {
    console.log('Clicked')
    
    navigate('/section-details', { state: { section ,topics} })
    
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSectionName(sectionValue, section.section_id)
    }, 500)

    return () => clearTimeout(timer)
  }, [sectionValue, section.section_id, updateSectionName])

  const handleDeleteClick = () => {
    deleteSection(section.section_id)    
    
  }


  return (
    <div className="flex flex-col justify-center items-center my-8 w-full sm:w-[800px] p-3 border-2 rounded-lg border-primary">
      <div className="flex flex-row justify-between w-full items-center mb-3">
        <input
          type="text"
          name="section"
          className="w-[200px] sm:w-[600px] h-[40px] text-xl sm:text-3xl text-secondary border-b-2 px-1 border-primary focus:outline-none focus:border-secondary "
          value={sectionValue}
          onChange={handleChange}
        />
        <button
          className="mt-2 sm:mt-0 bg-transparent border-2 px-2 py-1 rounded-lg border-primary hover:bg-primary hover:text-white"
          onClick={handleClick}
        >
          Customize
        </button>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <ul className="flex flex-row justify-evenly items-center w-full sm:w-[500px] marker:text-secondary list-disc">
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

export default SectionCard
