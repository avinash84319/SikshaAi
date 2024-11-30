import React, { useState, useEffect } from 'react'
import Question from '../components/questions/Question.jsx'
import TestEnvSideBar from '../components/TestEnvsideBar.jsx'
import axios from 'axios'
import {useParams,useLocation} from 'react-router-dom'

function TestEnv() {
  const [currentQuestionId, setCurrentQuestionId] = useState(null) // Tracks the selected question
  const [sections, setSections] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null) // Holds the current question details
  const [isLoading, setIsLoading] = useState(false) // Prevent simultaneous requests
  const [userAnswer, setUserAnswer] = useState(null) // Holds the user's selected answer
  const location = useLocation()
  // const test_id = useParams()
   const queryParams = new URLSearchParams(location.search)
   const test_id = queryParams.get('testId')

  const fetchQuestionDetails = async (questionId) => {
    if (isLoading || currentQuestionId === questionId) return // Prevent simultaneous calls or unnecessary fetches
    setIsLoading(true)
    try {
      console.log(questionId)
      const response = await axios.get(
        `${
          import.meta.env.VITE_HOST
        }/api/getTestSingleQuestion?question_id=${questionId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )
      const questionData = response.data.question
      console.log('Question details:', questionData)
      // questionData.options = JSON.parse(questionData.options) // Parse the options JSON string
      setCurrentQuestion(questionData)
      console.log('Current Question:', currentQuestion)
      setUserAnswer(null) // Reset user answer for the next question
    } catch (error) {
      console.error('Error fetching question details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuestionSelect = (questionId) => {
    if (currentQuestionId !== questionId) {
      setCurrentQuestionId(questionId)
      fetchQuestionDetails(questionId)
    }
  }

  const submitQuestionResponse = async () => {
    if (!currentQuestionId || userAnswer === null) {
      alert('Please select an answer before submitting.')
      return
    }
    try {
      const payload = {
        question_id: currentQuestionId,
        answer: userAnswer, // Send the selected answer
      }
      await axios.post(
        `${import.meta.env.VITE_HOST}/api/submitQuestion`,
        payload
      )
      alert('Response submitted successfully!')
      fetchNextQuestion()
    } catch (error) {
      console.error('Error submitting question response:', error)
    }
  }


  const fetchNextQuestion = () => {
    let foundNextQuestion = false
    console.log(sections)

    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      const section = sections[sectionIndex]
      const questionIndex = section.questions.indexOf(currentQuestionId)

      if (questionIndex !== -1) {
        // If there is another question in the current section
        if (questionIndex + 1 < section.questions.length) {
          const nextQuestionId = section.questions[questionIndex + 1]
          handleQuestionSelect(nextQuestionId)
          foundNextQuestion = true
          break
        }

        // If this is the last question in the current section, move to the next section
        if (sectionIndex + 1 < sections.length) {
          const nextSection = sections[sectionIndex + 1]
          if (nextSection.questions.length > 0) {
            const nextQuestionId = nextSection.questions[0]
            handleQuestionSelect(nextQuestionId)
            foundNextQuestion = true
            break
          }
        }
      }
    }

    console.log('Found next question:', foundNextQuestion)

    if (!foundNextQuestion) {
      alert('You have reached the end of the test.')
    }
  }


  const handleAnswerSelect = (ans) => {
    console.log('Selected answer:', ans)
  setUserAnswer(ans);
};

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div
        className="bg-primary p-4 text-center w-full z-20"
        style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
      >
        <h1 className="text-white text-4xl font-bold">Test</h1>
      </div>

      <div style={{ display: 'flex', height: '100%', paddingTop: '80px' }}>
        {/* Sidebar */}
        <div
          style={{
            width: '20%',
            position: 'fixed',
            height: 'calc(100% - 80px)',
            top: '80px',
            overflowY: 'auto',
            backgroundColor: '#f6f8fc',
            borderRight: '1px solid #ddd',
          }}
        >
          <TestEnvSideBar
            sections={sections}
            currentQuestionId={currentQuestionId}
            onQuestionSelect={handleQuestionSelect}
            testId={test_id}
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            width: '80%',
            marginLeft: '20%',
            marginTop: '80px',
            height: 'calc(100% - 80px)',
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {currentQuestion ? (
            console.log(currentQuestion.type),
            <>
              <Question
                key={currentQuestionId}
                questionType={currentQuestion.type}
                difficultyLevel={currentQuestion.difficulty}
                marks={currentQuestion.marks}
                questionDetails={{
                  options: currentQuestion.options,
                  question: currentQuestion.question,
                  correctAnswerIndex: currentQuestion.correct_answer_index,
                }}
                onAnswerSelect={handleAnswerSelect} // Capture the user's selected answer
              />

              <div className="flex justify-between">
                <button
                  onClick={fetchNextQuestion}
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  disabled={isLoading} // Disable button when fetching
                >
                  Next
                </button>
                {/* submit button */}
                <button
                  onClick={submitQuestionResponse}
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: '20px',
                  }}
                  disabled={isLoading || userAnswer === null} // Disable button when fetching or no answer
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <div>No question selected.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestEnv
