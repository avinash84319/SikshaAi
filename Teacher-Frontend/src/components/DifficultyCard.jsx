import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput'
import { useTheme } from '@mui/system'

export default function NumberInputIntroduction(props) {
  const id = props.id
  const {
    setMcq,
    setMultipleChoice,
    setFillInTheBlanks,
    setTrueFalse,
    setMatchTheFollowing,
    setSubjective,
    setParagraph,
  } = props.setValues
  const {
    mcq,
    multipleChoice,
    fillInTheBlanks,
    trueFalse,
    matchTheFollowing,
    subjective,
    paragraph,
  } = props.values
  const selectedType = props.selectedType

  const determineInitialValue = () => {
    switch (selectedType) {
      case 'MCQ':
        return mcq[id] || 0
      case 'Multiple Choice MCQs':
        return multipleChoice[id] || 0
      case 'Fill in the Blanks':
        return fillInTheBlanks[id] || 0
      case 'True-False':
        return trueFalse[id] || 0
      case 'Match the Following':
        return matchTheFollowing[id] || 0
      case 'Subjective':
        return subjective[id] || 0
      case 'Paragraph':
        return paragraph[id] || 0
      default:
        return 0
    }
  }

  const [values, setValues] = React.useState(determineInitialValue())

  useEffect(() => {
    setValues(determineInitialValue())
  }, [id,selectedType])

  useEffect(() => {
    switch (selectedType) {
      case 'MCQ':
        setMcq((prev) => {
          const updatedMCQ = [...prev]
          updatedMCQ[id] = values
          return updatedMCQ
        })
        break
      case 'Multiple Choice MCQs':
        setMultipleChoice((prev) => {
          const updatedMultipleChoice = [...prev]
          updatedMultipleChoice[id] = values
          return updatedMultipleChoice
        })
        break
      case 'Fill in the Blanks':
        setFillInTheBlanks((prev) => {
          const updatedFillInTheBlanks = [...prev]
          updatedFillInTheBlanks[id] = values
          return updatedFillInTheBlanks
        })
        break
      case 'True-False':
        setTrueFalse((prev) => {
          const updatedTrueFalse = [...prev]
          updatedTrueFalse[id] = values
          return updatedTrueFalse
        })
        break
      case 'Match the Following':
        setMatchTheFollowing((prev) => {
          const updatedMatchTheFollowing = [...prev]
          updatedMatchTheFollowing[id] = values
          return updatedMatchTheFollowing
        })
        break
      case 'Subjective':
        setSubjective((prev) => {
          const updatedSubjective = [...prev]
          updatedSubjective[id] = values
          return updatedSubjective
        })
        break
      case 'Paragraph':
        setParagraph((prev) => {
          const updatedParagraph = [...prev]
          updatedParagraph[id] = values
          return updatedParagraph
        })
        break
      default:
        break
    }
  }, [values])

  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  return (
    <React.Fragment>
      <BaseNumberInput
        slotProps={{
          root: { className: 'CustomNumberInput' },
          input: { className: 'input' },
          decrementButton: {
            className: 'btn decrement',
            children: '▾',
          },
          incrementButton: {
            className: 'btn increment',
            children: '▴',
          },
        }}
        aria-label="Demo number input"
        placeholder="0"
        max={20}
        min={1}
        onChange={(e) => setValues(Number(e.target.value))}
        onInputChange={(e) => setValues(Number(e.target.value))}
        onClick={(e) => setValues(Number(e.target.value))}
        value={values}
      />
      <Styles isDarkMode={isDarkMode} />
    </React.Fragment>
  )
}

const Styles = ({ isDarkMode }) => (
  <style>
    {`
      .CustomNumberInput {
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 400;
        border-radius: 8px;
        color: ${isDarkMode ? '#C7D0DD' : '#1C2025'};
        background: ${isDarkMode ? '#1C2025' : '#fff'};
        border: 1px solid #082040;
        width: 70px;
        height: 40px;
        box-shadow: 0px 1px 2px #082040;
        display: grid;
        grid-template-columns: 40px 19px;
        grid-template-rows: 1fr 1fr;
        overflow: hidden;
        column-gap: 0px;
        padding: 2px 2px;
      }

      .CustomNumberInput:hover {
        border-color: #082040;
      }

      .CustomNumberInput.${numberInputClasses.focused} {
        border-color: #1F94AD;
        box-shadow: 0px 2px 4px #94A7BF;
      }

      .CustomNumberInput .input {
        font-size: 1rem;
        font-family: inherit;
        font-weight: 400;
        line-height: 1.5;
        grid-column: 1/2;
        grid-row: 1/4;
        color: ${isDarkMode ? '#C7D0DD' : '#1C2025'};
        background: inherit;
        border: none;
        border-radius: inherit;
        padding: 1px 10px;
        outline: 0;
      }

      .CustomNumberInput .input:focus-visible {
        outline: 0;
      }

      .CustomNumberInput .btn {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        appearance: none;
        padding: 0;
        width: 16px;
        height: 16px;
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        line-height: 1;
        box-sizing: border-box;
        background: ${isDarkMode ? '#1C2025' : '#fff'};
        border: 0;
        color: ${isDarkMode ? '#C7D0DD' : '#1C2025'};
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
      }

      .CustomNumberInput .btn:hover {
        background: ${isDarkMode ? '#1C2025' : '#F3F6F9'};
        border-color: ${isDarkMode ? '#434D5B' : '#9DA8B7'};
        cursor: pointer;
      }

      .CustomNumberInput .btn.increment {
        grid-column: 2/3;
        grid-row: 1/2;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid;
        border-bottom: 0;
        border-color: ${isDarkMode ? '#434D5B' : '#DAE2ED'};
        background: ${isDarkMode ? '#1C2025' : '#F3F6F9'};
        color: ${isDarkMode ? '#DAE2ED' : '#1C2025'};

        &:hover {
          cursor: pointer;
          color: #fff;
          background: #0D5463;
          border-color: #66BACC;
        }
      }

      .CustomNumberInput .btn.decrement {
        grid-column: 2/3;
        grid-row: 2/3;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border: 1px solid;
        border-color: ${isDarkMode ? '#434D5B' : '#DAE2ED'};
        background: ${isDarkMode ? '#1C2025' : '#F3F6F9'};
        color: ${isDarkMode ? '#DAE2ED' : '#1C2025'};

        &:hover {
          cursor: pointer;
          color: #fff;
          background: #0D5463;
          border-color: #66BACC;
        }
      }

      .arrow {
        transform: translateY(-1px);
      }
    `}
  </style>
)
