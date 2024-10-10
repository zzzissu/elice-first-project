import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div className=" flex flex-col  gap-16 items-center  w-80 h-screen ">
            <img src="assets/logo.png" alt="office_logo" className="mt-16" />

            <div className="flex flex-col text-xl gap-20 ">
                <Link to="#" className="flex items-center gap-6 font-sans text-customGray">
                    <img src="assets/project.png" alt="project_logo" />
                    Project
                </Link>

                <Link to="#" className="flex items-center gap-6  font-sans text-customGray">
                    <img src="assets/my page.png" alt="mypage_logo" />
                    My page
                </Link>

                <Link to="#" className="flex items-center gap-6  font-sans text-customGray">
                    <img src="assets/team.png" alt="team_logo" />
                    Team Page
                </Link>

                <Link to="#" className="flex items-center gap-6  font-sans text-customGray">
                    <img src="assets/commu.png" alt="community_logo" />
                    Community
                </Link>

                <Link to="#" className="flex items-center gap-6  font-sans text-customGray">
                    <img src="assets/calendar.png" alt="calendar_logo" />
                    Calendar
                </Link>

                <Link to="#" className="flex items-center gap-6  font-sans text-customGray">
                    <img src="assets/assignment.png" alt="assignment_logo" />
                    Authorization
                </Link>
            </div>
        </div>
    );
}
