import { Link, Outlet, useLocation } from 'react-router-dom';
import { Paths } from '../components/constants/Paths';
const AuthPage = () => {
    const location = useLocation();

    return (
        <div className="sectionDevide flex flex-col">
            <div className="nevBar h-20 w-[80%] flex flex-row font-medium items-center ml-16">
                <ul className="flex flex-row text-xl gap-20 font-medium">
                    <li>
                        <Link
                            to={Paths.annualApplication}
                            className={`${
                                location.pathname === Paths.annualApplication
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            연차신청서
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={Paths.workingOutside}
                            className={`${
                                location.pathname === Paths.workingOutside
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            외근신청서
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={Paths.businessReport}
                            className={`${
                                location.pathname === Paths.businessReport
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            업무보고서
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="border-t-2">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthPage;
