import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

function Mcq({ questionDetails, onAnswerSelect }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const options = questionDetails.options || [
    'Option A',
    'Option B',
    'Option C',
    'Option D',
  ]
  const question = questionDetails.question || 'Default question'

  const handleAnswerChange = (event) => {
    const value = event.target.value
    setSelectedAnswer(value)
    onAnswerSelect(value) // Notify parent about the selected answer
  }

  return (
    <div className="main-mcq-card">
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="filled-multiline-static"
          value={question}
          multiline
          variant="filled"
          color="success"
          sx={{ width: '500px' }}
        />
      </Box>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedAnswer || ''}
        onChange={handleAnswerChange}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={index.toString()} // Store index as the answer value
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </div>
  )
}

export default Mcq
