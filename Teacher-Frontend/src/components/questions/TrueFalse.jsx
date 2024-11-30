import '../css/question.css';
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function TrueFalse(props) {

  const questionDetails = props.questionDetails || {}

  const option_a = questionDetails.options?.[0] ?? 'True'
  const option_b = questionDetails.options?.[1] ?? 'False'

  const question = questionDetails.question ?? 'Question'
  const answer = questionDetails.correct_answer ?? -1

  return (
    <div className="main-tf-card">
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
      >
        <FormControlLabel
          value={option_a}
          control={<Radio color={answer == 0 ? 'success' : 'error'} />}
          label={option_a}
        />
        <FormControlLabel
          value={option_b}
          control={<Radio color={answer == 1 ? 'success' : 'error'} />}
          label={option_b}
        />
      </RadioGroup>
    </div>
  )
}

export default TrueFalse;