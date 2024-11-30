import { configureStore } from '@reduxjs/toolkit'
import sectionReducer from './Slices/SectionSlicer'

export default configureStore({
  reducer: {
    sections: sectionReducer,
  },
})
