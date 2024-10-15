import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div className=" flex flex-col  gap-16 items-center  w-80 h-screen ">
            <img src="/assets/logo.png" alt="office_logo" className="mt-16" />

            <div className="flex flex-col text-xl gap-20 ">
                <Link
                    to="Project"
                    className="flex items-center gap-6 font-sans font-bold text-customGray hover:scale-110 transition-transform focus:text-mainColor"
                >
                    <img src="/assets/project.png" alt="project_logo" />
                    Project
                </Link>

                <Link
                    to="MyPage"
                    className="flex items-center gap-6 font-bold  font-sans text-customGray hover:scale-110 transition-transform focus:text-mainColor"
                >
                    <img src="/assets/mypage.png" alt="mypage_logo" />
                    My page
                </Link>

                <Link
                    to="TeamPage"
                    className="flex items-center gap-6 font-bold  font-sans text-customGray hover:scale-110 transition-transform focus:text-mainColor"
                >
                    <img src="/assets/team.png" alt="team_logo" />
                    Team Page
                </Link>

                <Link
                    to="mail"
                    className="flex items-center gap-6 font-bold  font-sans text-customGray hover:scale-110 transition-transform focus:text-mainColor"
                >
                    <img src="/assets/mail.png" alt="calendar_logo" />
                    Mail
                </Link>

                <Link
                    to="Authpage"
                    className="flex items-center gap-6  font-bold font-sans text-customGray hover:scale-110 transition-transform focus:text-mainColor"
                >
                    <img src="/assets/assignment.png" alt="assignment_logo" />
                    Authorization
                </Link>

            </div>
        </div>
    );
}
