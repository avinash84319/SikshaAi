import * as React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'

function MultipleMcq(props) {
  const questionDetails = props.questionDetails || {}

  const option_a = questionDetails.options?.[0] ?? 'option_a'
  const option_b = questionDetails.options?.[1] ?? 'option_b'
  const option_c = questionDetails.options?.[2] ?? 'option_c'
  const option_d = questionDetails.options?.[3] ?? 'option_d'

  const question = questionDetails.question ?? 'Question'
  const answer = questionDetails.correct_answer ?? [-1]

  return (
    <div className="main-checkbox-card">
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="filled-multiline-static"
          label="question"
          multiline
          variant="filled"
          color="success"
          sx={{ width: '500px' }}
          value={question} // Added value to display the question
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
          value={option_a}
          control={
            <Radio
              color={answer.includes(0) ? 'success' : 'error'}
              // checked={answer.includes(0)} // Ensure checked state reflects the answer
            />
          }
          label={option_a}
        />
        <FormControlLabel
          value={option_b}
          control={
            <Radio
              color={answer.includes(1) ? 'success' : 'error'}
              // checked={answer.includes(1)}
            />
          }
          label={option_b}
        />
        <FormControlLabel
          value={option_c}
          control={
            <Radio
              color={answer.includes(2) ? 'success' : 'error'}
              // checked={answer.includes(2)}
            />
          }
          label={option_c}
        />
        <FormControlLabel
          value={option_d}
          control={
            <Radio
              color={answer.includes(3) ? 'success' : 'error'}
              // checked={answer.includes(3)}
            />
          }
          label={option_d}
        />
      </Box>
    </div>
  )
}

export default MultipleMcq
