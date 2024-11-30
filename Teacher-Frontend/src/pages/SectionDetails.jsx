import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSection } from '../Redux/Slices/SectionSlicer.jsx'
import Difficulty from '../components/DifficultyCard.jsx'
import Question from '../components/questions/Question.jsx'
import { useLocation } from 'react-router-dom'

function SectionDetails() {
  const location = useLocation()
  const sectionFromLocation = location.state.section
  const topics = location.state.topics
  // console.log(topics)

  const section = useSelector((state) =>
    state.sections.sections.find(
      (section) => section.section_id === sectionFromLocation.section_id
    )
  )

  const [value, setValue] = useState(sectionFromLocation.name)
  const [selectedType, setSelectedType] = useState('MCQ')
  const [mcq, setMcq] = useState(section.mcq)
  const [multipleChoice, setMultipleChoice] = useState(section.multipleChoice)
  const [fillInTheBlanks, setFillInTheBlanks] = useState(
    section.fillInTheBlanks
  )
  const [trueFalse, setTrueFalse] = useState(section.trueFalse)
  const [matchTheFollowing, setMatchTheFollowing] = useState(
    section.matchTheFollowing
  )
  const [subjective, setSubjective] = useState(section.subjective)
  const [paragraph, setParagraph] = useState(section.paragraph)

  const [selectedTopics, setSelectedTopics] = useState([])
  const [instructions, setInstructions] = useState('')

  // To be used as a prop for the Difficulty card
  const setValues = {
    setMcq,
    setMultipleChoice,
    setFillInTheBlanks,
    setTrueFalse,
    setMatchTheFollowing,
    setSubjective,
    setParagraph,
  }
  const values = {
    mcq,
    multipleChoice,
    subjective,
    trueFalse,
    matchTheFollowing,
    fillInTheBlanks,
    paragraph,
  }

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleUpdateClick = async () => {
    console.log(selectedTopics)
    await dispatch(
      updateSection({
        section_id: sectionFromLocation.section_id,
        name: value,
        mcq,
        multipleChoice,
        fillInTheBlanks,
        trueFalse,
        matchTheFollowing,
        subjective,
        paragraph,
        selectedTopics,
        instructions,
      })
    )
  }

  const typeOFQuestion = [
    'MCQ',
    'Multiple Choice MCQs',
    'Subjective',
    'True-False',
    'Match the Following',
    'Fill in the Blanks',
    'Paragraph',
  ]

  const questionTypes = [
    'mcq',
    'multipleChoice',
    'subjective',
    'trueFalse',
    'fillInTheBlanks',
    'matchTheFollowing',
    'paragraph',
  ]

  const handleTypeClick = (type) => {
    setSelectedType(type)
  }

  // const handleTopicSelection = (e) => {
  //   const options = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   )
  //   setSelectedTopics(options)
  //   console.log(selectedTopics)
  // }

  const handleInstructionChange = (e) => {
    setInstructions((prev) => e.target.value)
    // console.log(instructions)
  }

  return (
    <div className="flex overflow-auto p-5 flex-col items-center bg-white w-[100%]">
      <div className="flex flex-col justify-center items-center m-2">
        <h1 className="text-4xl text-secondary font-bold text-center mt-6">
          Customize <span className="text-">{sectionFromLocation.name}</span>
        </h1>

        <div className="flex-col my-8 w-full sm:w-[800px] p-3 border-2 rounded-lg border-primary z-10">
          <div className="flex flex-row justify-start w-full items-center mb-3">
            <input
              type="text"
              name="section"
              className="w-[200px] sm:w-[600px] h-[40px] text-xl sm:text-3xl text-secondary border-b-2 px-1 border-primary focus:outline-none focus:border-tertiary"
              value={value}
              onChange={handleChange}
            />
          </div>
          <div className="border-primary border-0 flex flex-row justify-around items-center p-2">
            <div className="border-primary rounded-md border-2 p-0.1">
              <div className="flex flex-col justify-start items-center p-1 mb-[-4px]">
                {typeOFQuestion.map((type, index) => (
                  <div
                    key={index}
                    className={`flex flex-row px-1 w-full mb-1 cursor-pointer ${
                      type === selectedType
                        ? 'bg-secondary text-white border-primary'
                        : 'bg-tertiary'
                    } border-primary border-b-2 rounded-md`}
                    onClick={() => handleTypeClick(type)}
                  >
                    <h3>{type}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-4 gap-y-3 gap-x-[-10px] flex items-center justify-items-center text-center">
                <div></div>
                <div className="bg-secondary text-white flex justify-center items-center text-center rounded w-[70px]">
                  Easy
                </div>
                <div className="bg-secondary text-white flex justify-center items-center rounded w-[70px]">
                  Medium
                </div>
                <div className="bg-secondary text-white flex justify-center items-center rounded w-[70px]">
                  Hard
                </div>
                <div>No. of Question</div>
                <Difficulty
                  id={0}
                  values={values}
                  setValues={setValues}
                  selectedType={selectedType}
                />
                <Difficulty
                  id={1}
                  values={values}
                  setValues={setValues}
                  selectedType={selectedType}
                />
                <Difficulty
                  id={2}
                  values={values}
                  setValues={setValues}
                  selectedType={selectedType}
                />
                <div>Marks</div>
                <Difficulty
                  id={3}
                  values={values}
                  setValues={setValues}
                  selectedType={selectedType}
                />
                <Difficulty
                  id={4}
                  values={values}
                  setValues={setValues}
                  selectedType={selectedType}
                />
                <Difficulty
                  id={5}
                  values={values}
                  setValues={setValues}
                  selectedType={selectedType}
                />
                <div>Time(in min)</div>
                <Difficulty
                  id={6}
                  values={values}
                  setValues={setValues}
                  selectedType={selectedType}
                />
                <Difficulty
                  id={7}
                  values={values}
                  setValues={setValues}
                  selectedType={selectedType}
                />
                <Difficulty
                  id={8}
                  values={values}
                  setValues={setValues}
                  selectedType={selectedType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // adding a dropdown to select the topics for the section and also store the selected topics in a state variable and also add a text input field where the user can add some instructions for the section and also store the instructions in a state variable */}
      <div className="flex flex-col justify-center items-center m-2">
        <h1 className="text-4xl text-secondary font-bold text-center mt-6">
          Add Topics and Instructions
        </h1>
        <div className="flex-col my-8 w-full sm:w-[800px] p-3 border-2 rounded-lg border-primary z-10">
          <div className="flex flex-row justify-between items-center mb-4">
            <label htmlFor="topics" className="text-xl font-bold mr-2">
              Select Topics:
            </label>
            <div className="flex flex-col w-[600px] border border-primary rounded p-2 h-[200px] overflow-auto">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`topic-${index}`}
                    value={topic}
                    checked={selectedTopics.includes(topic)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTopics((prev) => [...prev, topic])
                      } else {
                        setSelectedTopics((prev) =>
                          prev.filter((selected) => selected !== topic)
                        )
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`topic-${index}`} className="text-secondary">
                    {topic}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-between items-center mb-4">
            <label htmlFor="instructions" className="text-xl font-bold mr-2">
              Add Instructions:
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows="4"
              className="w-[600px] border border-primary rounded p-2"
              value={instructions}
              onChange={handleInstructionChange}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="h-12 w-32 bg-primary text-white border-2 px-2 py-1 m-4 rounded-lg border-primary hover:bg-primary_a"
          onClick={handleUpdateClick}
        >
          Update
        </button>
      </div>

      <div className="flex flex-col justify-between items-center mb-8">
        <button
          className="h-12 w-32 bg-primary text-white border-2 px-2 py-1 mt-6 mb-8 rounded-lg border-primary hover:bg-primary_a"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
        <h1>Here is how the question templates will look like</h1>
      </div>
      <div className="flex flex-col justify-center items-center mb-12">
        {section.questions.map((question, index) => (
          // console.log(question.type),
          <Question
            key={index}
            questionType={
              question.type === 'mcq'
                ? 0
                : question.type === 'multipleChoice'
                ? 1
                : question.type === 'subjective'
                ? 2
                : question.type === 'trueFalse'
                ? 3
                : question.type === 'matchTheFollowing'
                ? 4
                : question.type === 'fillInTheBlanks'
                ? 5
                : 6
            }
            difficultyLevel={question.difficulty}
            marks={question.marks}
            questionDetails={question.questionDetails}
          />
        ))}
      </div>
    </div>
  )
}

export default SectionDetails
