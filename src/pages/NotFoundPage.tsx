import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-sky-50">
            {/* 404 이미지 */}
            <img
                src="/assets/404_icon.png"
                alt="404 Not Found"
                className="w-64 h-64 mb-8"
            />

            {/* 안내 문구 */}
            <h1 className="text-2xl font-bold mb-4 text-mainColor">찾을 수 없는 페이지입니다.</h1>
            <p className="text-center text-gray-500 mb-6 font-bold">
                요청하신 페이지가 사라졌거나, 잘못된 경로로 접속하셨습니다 :)
            </p>

            {/* 메인으로 가는 버튼 */}
            <button
                onClick={handleGoHome}
                className="text-md font-bold bg-mainColor text-white rounded-[10px] m-2.5 p-3 px-6 mt-6"
            >
                메인으로 가기
            </button>
        </div>
    );
};

export default NotFoundPage;
