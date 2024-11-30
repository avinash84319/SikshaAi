import * as React from 'react'
import axios from "axios"

function StudentsPage() {
  const [students, setStudents] = React.useState([]); // Updated to handle fetched data


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/getStudentwithtests`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )
      console.log("Response--",response.data)
      // Transform API response into the format required by StudentCard
      const transformedStudents = response.data.students.map((student) => ({
        name: student.student[1],
        tests: student.tests.map((test, index) => ({
          name: test[4], // Test name
          active: index === 0, // Mark the first test as active
        })),
        graphs: [
          {
            imageUrl:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/4aa8e1890d1d8879367656a4bcab107206a2cabda40a23517765e95658b0e148?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627",
            description: "Performance graph 1",
          },
          {
            imageUrl:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/a66e60cf43d28fa434ae405d45dd36b339634bcc2ae2bf169aea22a43727ae50?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627",
            description: "Performance graph 2",
          },
          {
            imageUrl:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/77901f3f344e1a46b6ff65a3c28103fdc4ce77b7b846eb3ae178da6aae06f569?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627",
            description: "Performance graph 3",
          },
        ],
      }));

      setStudents(transformedStudents);
    } catch (err) {
      console.log("Failed to fetch data. Please try again.");
    } 
  };
  React.useEffect(() => {
    fetchData();
  } ,[]);

  return (
    <main className="flex overflow-hidden p-5 flex-col items-center bg-white w-[100%]">
      <section className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
        {/* <button onClick={()=>fetchData()} className="btn btn-primary mb-5">
          Get Data
        </button> */}

        {students.length > 0 && (
          <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1">
            {students.map((student, index) => (
              <StudentCard
                key={index}
                studentName={student.name}
                testResults={student.tests}
                graphData={student.graphs}
              />
            ))}
          </div>
        )}

      </section>
    </main>
  );
}

const StudentCard = ({ studentName, testResults, graphData }) => {
  return (
    <div className="flex overflow-hidden flex-col px-6 py-7 mx-auto w-full rounded-3xl bg-slate-50 shadow-[-4px_4px_30px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-8">
      <div className="flex gap-5 justify-between text-2xl text-sky-950 max-md:mr-0.5">
        <div>{studentName}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/85d269fa9d07b9d8e45d5d152e1816c94ce3e6151c85daa236c4d94ff32a8a32?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627"
          alt="Student profile settings"
          className="object-contain shrink-0 my-auto aspect-square w-[25px]"
        />
      </div>
      <div className="self-start mt-6 text-base font-medium text-sky-950">Recent Result</div>
      <div className="flex gap-1.5 items-center self-start mt-2.5 text-xs font-medium text-stone-500">
        {testResults.map((test, index) => {
          if (index < 4) {
            return (
              <div
                key={index}
                className={`self-stretch px-3 py-1 my-auto rounded-3xl ${test.active
                  ? 'bg-sky-200 text-sky-950'
                  : 'border border-solid border-stone-500'
                  }`}
              >
                {test.name}
              </div>
            )
          }
          else { return (null); }
        })}
      </div>
      <div className="flex gap-10 items-center mt-9 w-full">
        {graphData.map((graph, index) => (
          <div
            key={index}
            className="flex items-center self-stretch px-7 py-0.5 my-auto bg-blue-100 rounded-3xl w-[84px] max-md:px-5"
          >
            <img
              loading="lazy"
              src={graph.imageUrl}
              alt={graph.description}
              className="object-contain self-stretch my-auto w-8 aspect-square"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
 

export default StudentsPage;