import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import axios from 'axios'

const TestEnvSideBar = ({ onQuestionSelect,testId }) => {
  const [menuItems, setMenuItems] = useState([])
  const [selectedKey, setSelectedKey] = useState('')

  useEffect(() => {
    console.log(testId)
    async function fetchSections() {
      console.log('Fetching sections')
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST}/api/getTestQuestions?test_id=${testId}`,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
            },
          }
        )
        const data = response.data
        console.log(data)

        const transformedItems = data.sections.map((section, index) => ({
          key: `section-${index + 1}`,
          label: section.name,
          children: section.questions.map((question, qIndex) => ({
            key: question.toString(),
            label: `Question ${question}`,
          })),
        }))

        setMenuItems(transformedItems)

        // Set the first question of the first section as active (if available)
        if (
          transformedItems.length > 0 &&
          transformedItems[0].children.length > 0
        ) {
          const firstQuestionKey = transformedItems[0].children[0].key
          setSelectedKey(firstQuestionKey)
          onQuestionSelect(firstQuestionKey) // Notify parent to render the first question
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchSections()
  }, [])

  const handleMenuClick = (e) => {
    setSelectedKey(e.key)
    onQuestionSelect(e.key) // Notify parent about selected question
  }

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems}
      onClick={handleMenuClick}
    />
  )
}

export default TestEnvSideBar
