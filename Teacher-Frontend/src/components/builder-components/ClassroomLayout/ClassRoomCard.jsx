// ClassroomCard.jsx
import * as React from 'react'
function ClassroomCard({ name, description, tests, activeTest, actions }) {
	return (
		<article className="flex flex-col items-start p-4 rounded-2xl bg-slate-50 shadow-md w-full max-w-full h-fit max-md:p-3">
			<div className="flex justify-between items-center w-full text-lg font-semibold text-sky-950">
				<h2>{name}</h2>
				<button
					onClick={() => console.log("Options clicked")}
					aria-label="More options"
				>
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/85d269fa9d07b9d8e45d5d152e1816c94ce3e6151c85daa236c4d94ff32a8a32?apiKey=eb62179562f944abbe4ced56301db351&"
						alt=""
						className="w-5 h-5 object-contain"
					/>
				</button>
			</div>

			<p className="mt-1 text-sm text-sky-950">{description}</p>

			<h3 className="mt-4 text-sm font-medium text-sky-950">
				Recent Result
			</h3>

			<div className="flex flex-wrap gap-2 mt-2 text-xs font-medium text-stone-500">
				{tests.map((test, index) => (
					<button
						key={index}
						className={`px-3 py-1 rounded-2xl ${
							index === activeTest
								? "bg-sky-200 text-sky-950"
								: "border border-stone-500"
						}`}
						onClick={() => console.log(`${test} clicked`)}
					>
						{test}
					</button>
				))}
			</div>

			<div className="flex gap-4 items-center w-full mt-5 overflow-x-auto pb-2">
				{actions.map((action, index) => (
					<button
						key={index}
						className="flex items-center px-4 py-1 bg-blue-100 rounded-2xl min-w-[64px] max-md:px-3"
						onClick={() =>
							console.log(`Action ${index + 1} clicked`)
						}
					>
						<img
							loading="lazy"
							src={`http://b.io/${action}`}
							alt=""
							className="w-6 h-6 object-contain"
						/>
					</button>
				))}
			</div>
		</article>
	);
}

export default ClassroomCard;
