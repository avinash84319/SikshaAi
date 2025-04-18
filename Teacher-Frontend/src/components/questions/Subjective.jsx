import '../css/question.css';
import TextField from '@mui/material/TextField';

function Subjective(props) {
    const questionDetails = props.questionDetails || {}
    const question = questionDetails.question ?? 'Question'
    const answer = questionDetails.correct_answer ?? 'Answer'

    return (
        <div className="subjective-main-card">
                    <div className="subjective-main-card-question">
                        <TextField
                            id="filled-multiline-static"
                            value={question}
                            multiline
                            variant="filled"
                            color='success'
                            sx={{ width: '500px'}}
                        />
                    </div>
                    <div className="subjective-main-card-answer">
                        <TextField
                            id="filled-multiline-static"
                            value={answer}
                            multiline
                            rows={10}
                            variant="filled"
                            color='success'
                            sx={{ width: '500px' }}
                        />
                    </div>
                </div>
    )
}

export default Subjective