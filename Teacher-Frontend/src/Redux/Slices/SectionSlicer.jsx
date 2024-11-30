import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

// Define the initial state with metadata and sections
const initialState = {
  user_id: null,
  pdf_id: null,
  pdf_name: null,
  sections: [],
}

const sectionSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    // Action to set user and PDF info
    setMetadata: (state, action) => {
      const { user_id, pdf_id, pdf_name, sections } = action.payload
      state.user_id = user_id
      state.pdf_id = pdf_id
      state.pdf_name = pdf_name

      // to be used when the details are fetched from the backend for an existing pdf
      if (sections.length > 0) {
        state.sections = sections
      }
    },

    addSection: (state, action) => {
      const newSection = {
        section_id: uuidv4(),
        name: `Section ${action.payload.section_id + 1}`,
        mcq: [0, 0, 0, 1, 1, 1, 0, 0, 0],
        multipleChoice: [0, 0, 0, 1, 1, 1, 0, 0, 0],
        fillInTheBlanks: [0, 0, 0, 1, 1, 1, 0, 0, 0],
        trueFalse: [0, 0, 0, 1, 1, 1, 0, 0, 0],
        matchTheFollowing: [0, 0, 0, 1, 1, 1, 0, 0, 0],
        subjective: [0, 0, 0, 1, 1, 1, 0, 0, 0],
        paragraph: [0, 0, 0, 1, 1, 1, 0, 0, 0],
        questions: [],
        selectedTopics: [],
        instructions: '',
        easy: 0,
        medium: 0,
        hard: 0,
        easyMarks: 0,
        mediumMarks: 0,
        hardMarks: 0,
      }
      state.sections.push(newSection)
    },

    removeSection: (state, action) => {
      const {sectionId} = action.payload
      let oldSections=[]
      state.sections.map((section) => {
        oldSections.push(section)
      })

      state.sections=[]
      
      oldSections.map((section) => {
        if (section.section_id !== sectionId) {
          // console.log(section.section_id)
          state.sections.push(section)
        }
      })
      console.log(state.sections)

    },

    changeSectionName: (state, action) => {
      const { section_id, name } = action.payload
      const section = state.sections.find(
        (section) => section.section_id === section_id
      )
      if (section) {
        section.name = name
      }
    },

    updateSection: (state, action) => {
      const {
        section_id,
        name,
        mcq,
        multipleChoice,
        fillInTheBlanks,
        trueFalse,
        matchTheFollowing,
        subjective,
        paragraph,
        selectedTopics,
        instructions,
      } = action.payload

      const types = [
        mcq,
        multipleChoice,
        fillInTheBlanks,
        trueFalse,
        matchTheFollowing,
        subjective,
        paragraph,
      ]

      const section = state.sections.find(
        (section) => section.section_id === section_id
      )

      if (section) {
        section.name = name
        section.mcq = mcq
        section.multipleChoice = multipleChoice
        section.fillInTheBlanks = fillInTheBlanks
        section.trueFalse = trueFalse
        section.matchTheFollowing = matchTheFollowing
        section.subjective = subjective
        section.paragraph = paragraph
        section.questions = []
        section.easy = 0
        section.medium = 0
        section.hard = 0
        section.easyMarks = 0
        section.mediumMarks = 0
        section.hardMarks = 0
        section.selectedTopics = selectedTopics
        section.instructions = instructions

        types.forEach((type) => {
          for (let i = 0; i < 3; i++) {
            let marks = type[i + 3]
            let timer = type[i + 6]
            let difficulty = i === 0 ? 'easy' : i === 1 ? 'medium' : 'hard'

            section.easy += difficulty === 'easy' ? type[i] : 0
            section.medium += difficulty === 'medium' ? type[i] : 0
            section.hard += difficulty === 'hard' ? type[i] : 0

            section.easyMarks += difficulty === 'easy' ? type[i] * marks : 0
            section.mediumMarks += difficulty === 'medium' ? type[i] * marks : 0
            section.hardMarks += difficulty === 'hard' ? type[i] * marks : 0

            for (let j = 0; j < type[i]; j++) {
              const question = {
                questionDetails: {},
                marks: marks,
                time: timer,
                difficulty: difficulty,
                type:
                  type === mcq
                    ? 'mcq'
                    : type === multipleChoice
                    ? 'multipleChoice'
                    : type === fillInTheBlanks
                    ? 'fillInTheBlanks'
                    : type === trueFalse
                    ? 'trueFalse'
                    : type === matchTheFollowing
                    ? 'matchTheFollowing'
                    : type === subjective
                    ? 'subjective'
                    : 'paragraph',
              }

              section.questions.push(question)
            }
          }
        })
        console.log(section.instructions,section.selectedTopics)
      }
    },

    uploadQuestions: (state, action) => {
      const { section_id, questions } = action.payload
      const section = state.sections.find(
        (section) => section.section_id === section_id
      )

      if (section) {
        section.questions = questions
      }
      console.log(section.questions)
    },

    clearSections: (state) => {
      state.sections = [] // Clear the sections array
    },

    setSections: (state, action) => {
      state.sections = action.payload
    },
  },
})

export const {
  setMetadata,
  addSection,
  removeSection,
  changeSectionName,
  updateSection,
  uploadQuestions,
  clearSections,
  setSections,
} = sectionSlice.actions

export default sectionSlice.reducer
