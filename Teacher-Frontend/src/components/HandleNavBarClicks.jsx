// HandleNavBarClicks.jsx
import { clearSections } from '../Redux/Slices/SectionSlicer'
// Function to handle navigation item clicks
export function handleNavClick(name, setNavItems, dispatch, navigate) {
  setNavItems((prevItems) =>
    prevItems.map((item) =>
      item.name === name
        ? { ...item, current: true }
        : { ...item, current: false }
    )
  )
  if (name === 'New Project') {
    dispatch(clearSections())
    localStorage.removeItem('file')
    navigate('/upload-file')
  } else if (name === 'Past Projects') {
    navigate('/past-projects')
  }
}

// Function to handle profile button clicks
export function handleProfileClick(navigate) {
  navigate('/profile')
}
