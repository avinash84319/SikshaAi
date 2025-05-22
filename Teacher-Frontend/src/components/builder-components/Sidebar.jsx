import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
	{
		icon: "/selected-icon-sidebar/classroom.svg",
		label: "Classrooms",
		route: "/classRoom",
	},
	{
		icon: "/selected-icon-sidebar/Students.svg",
		label: "Students",
		route: "/students",
	},
	{
		icon: "/selected-icon-sidebar/resource.svg",
		label: "Resource",
		route: "/resource",
	},
	{
		icon: "/selected-icon-sidebar/assignment.svg",
		label: "Assignment",
		route: "/assignment",
	},
	{
		icon: "/selected-icon-sidebar/create_test.svg",
		label: "Create Test",
		route: "/upload-file",
	},
	{
		icon: "/selected-icon-sidebar/doubts.svg",
		label: "Doubts",
		route: "/doubts",
	},
];

function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();

	const handleNavigation = (route) => {
		navigate(route);
	};

	return (
		<aside className="w-[15%] min-w-[180px] max-md:w-full bg-slate-50 shadow-md h-full">
			<nav className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 p-4 text-base font-medium text-stone-600">
				<div className="flex flex-col mt-6 space-y-3">
					{menuItems.map((item, index) => (
						<button
							key={index}
							onClick={() => handleNavigation(item.route)}
							className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
                ${
					location.pathname === item.route
						? "bg-blue-100 text-sky-950 font-semibold"
						: "hover:bg-slate-100"
				}`}
						>
							<img
								src={item.icon}
								alt={`${item.label} icon`}
								className="w-6 h-6 object-contain"
							/>
							<span className="truncate">{item.label}</span>
						</button>
					))}
				</div>
			</nav>
		</aside>
	);
}

export default Sidebar;
