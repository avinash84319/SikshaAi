import '../css/question.css'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddIcon from '@mui/icons-material/Add'
import Subjective from './Subjective'
import Mcq from './Mcq'
import MultipleMcq from './MultipleMcq'
import TrueFalse from './TrueFalse'
import Parah from './Parah'
import { useState, useEffect } from 'react'


function Question({ questionType, difficultyLevel, marks, questionDetails, onAnswerSelect }) {
    const questionTypes = [
      { value: 0, label: 'MCQs' },
      { value: 1, label: 'Multiple Choice MCQs' },
      { value: 2, label: 'Subjective' },
      { value: 3, label: 'True/False' },
      { value: 4, label: 'Match the following' },
      { value: 5, label: 'Fill in the blanks' },
      { value: 6, label: 'Paragraph' },
    ]

  const QuestionCard = ({ onAnswerSelect }) => {
    console.log(questionType)
    switch (questionType) {
      case 'mcq':
        return (
          <Mcq
            questionDetails={questionDetails}
            onAnswerSelect={onAnswerSelect}
          />
        )
      case 'multipleChoice':
        return <MultipleMcq questionDetails={questionDetails} />
      case 'subjective':
        return <Subjective questionDetails={questionDetails} />
      case 'trueFalse':
        return <TrueFalse questionDetails={questionDetails} />
      case 'matchTheFollowing':
        return <Mcq questionDetails={questionDetails} />
      case 'fillInTheBlanks':
        return <Mcq questionDetails={questionDetails} />
      case 'paragraph':
        return <Parah questionDetails={questionDetails} />
      default:
        return (
          <Mcq
            questionDetails={questionDetails}
            // onAnswerSelect={onAnswerSelect}
          />
        )
    }
  }

  return (
    <div className="main-card">
      <QuestionCard onAnswerSelect={onAnswerSelect} />
    </div>
  )
}

export default Question;

// function Question({ questionType, difficultyLevel, marks,questionDetails }) {
//   const [index, setIndex] = useState(questionType || 0)
//   const [difficulty, setDifficulty] = useState(difficultyLevel || 'easy')
//   const [mark, setMark] = useState(marks || '1')

//   useEffect(() => {
//     setIndex(questionType)
//     setDifficulty(difficultyLevel)
//     setMark(marks)
//   }, [questionType, difficultyLevel, marks])

//   const questionTypes = [
//     { value: 0, label: 'MCQs' },
//     { value: 1, label: 'Multiple Choice MCQs' },
//     { value: 2, label: 'Subjective' },
//     { value: 3, label: 'True/False' },
//     { value: 4, label: 'Match the following' },
//     { value: 5, label: 'Fill in the blanks' },
//     { value: 6, label: 'Paragraph' },
//   ]

//   const difficultyLevels = [
//     { value: 'easy', label: 'Easy' },
//     { value: 'medium', label: 'Medium' },
//     { value: 'hard', label: 'Hard' },
//   ]

//   const marksOptions = [
//     { value: '0', label: '0' },
//     { value: '1', label: '1' },
//     { value: '2', label: '2' },
//     { value: '3', label: '3' },
//     { value: '4', label: '4' },
//     { value: '5', label: '5' },
//   ]

//   const optionalOptions = [
//     { value: 'yes', label: 'Yes' },
//     { value: 'no', label: 'No' },
//   ]

//   const QuestionCard = () => {
//     switch (index) {
//       case 0:
//         return <Mcq questionDetails={questionDetails}/>
//       case 1:
//         return <MultipleMcq questionDetails={questionDetails}/>
//       case 2:
//         return <Subjective questionDetails={questionDetails}/>
//       case 3:
//         return <TrueFalse questionDetails={questionDetails}/>
//       case 4:
//         return <Mcq questionDetails={questionDetails}/> //Fill in the blanks
//       case 5:
//         return <Mcq questionDetails={questionDetails}/> // Match the following
//       case 6:
//         return <Parah questionDetails={questionDetails}/>
//       default:
//         return <Mcq questionDetails={questionDetails}/>
//     }
//   }

//   return (
//     <div className="main-card">
//       <QuestionCard />

//       {/* <div className="customizer">
//         <div className="customizer-select-type">
//           <TextField
//             id="Type-of-question"
//             select
//             label="Type"
//             value={index}
//             onChange={(e) => setIndex(e.target.value)}
//             variant="filled"
//             color="success"
//             sx={{ width: '200px' }}
//           >
//             {questionTypes.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </div>

//         <div className="customizer-select-type">
//           <TextField
//             id="select-difficulty"
//             select
//             label="Difficulty"
//             value={difficulty}
//             onChange={(e) => setDifficulty(e.target.value)}
//             variant="filled"
//             color="success"
//             sx={{ width: '200px' }}
//           >
//             {difficultyLevels.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </div>

//         <div className="customizer-select-type">
//           <TextField
//             id="select-marks"
//             select
//             label="Marks"
//             value={mark}
//             onChange={(e) => setMark(e.target.value)}
//             variant="filled"
//             color="success"
//             sx={{ width: '200px' }}
//           >
//             {marksOptions.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </div>

//         <div className="customizer-select-type">
//           <TextField
//             id="select-optional"
//             select
//             label="Optional"
//             defaultValue="no"
//             variant="filled"
//             color="success"
//             sx={{ width: '200px' }}
//           >
//             {optionalOptions.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </div>
//         <div className="question-card-footer">
//           <Stack direction="row" spacing={5}>
//             <AddIcon />
//             <DeleteIcon />
//             <ContentCopyIcon />
//           </Stack>
//         </div>
//       </div> */}
//     </div>
//   )
// }

