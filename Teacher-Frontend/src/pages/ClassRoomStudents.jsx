// Dashboard.jsx
import * as React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import StudentCard from './StudentCard'

const Dashboard = () => {
  const students = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Williams',
    'David Brown',
    'Emma Davis',
  ]

  return (
    <main className="flex overflow-hidden flex-col bg-white">
      <Header />
      <div className="z-10 w-full max-w-[1173px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[21%] max-md:ml-0 max-md:w-full">
            <Sidebar />
          </div>
          <section className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full">
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                {students.map((student, index) => (
                  <StudentCard key={index} studentName={student} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
