import React, { useEffect, useState } from 'react'
import FormModal from '../modal/FormModal';


const ProfileEdit = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");

    //사용자의 정보을 가져오는 함수 호출
    useEffect(() => {
        fetchUserData();
    }, [])

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error("인증 토큰이 없습니다. 로그인 상태를 확인하세요.");
                return;
            }
            const res = await fetch("http://localhost:4000/api/users", {
                method: "GET",
                headers: { "Content-Type": "application/json" ,
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setName(data.name);
                setPhoneNumber(data.phone);
                setBirth(data.birth)
                setDepartment(data.department);
                setPosition(data.position);
            } else {
                console.error("사용자의 정보를 가져오는데 실패하였습니다.")
            }
        } catch (e) {
            console.log("네트워크 오류가 발생하였습니다.111")
        }
    }

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const isFormValid = phoneNumber.trim() !== ''

    const handleUpdatePhoneNumber = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber}),
            });

            if (res.ok) {
                const result = await res.json();
                setIsModalOpen(false);
            } else {
                console.error("전화번호를 가져오는데 실패하였습니다.")
            }
        } catch (e) {
            console.log("네트워크 오류가 발생하였습니다.")
        }
    }

    return (
        <div>
            <div className='EditSiteTotal flex flex-col justify-center mt-10'>
                <div className='EditSite text-base flex flex-row justify-center'>
                    <div className='leftEditSite w-[50%] flex flex-col items-center'>
                        <div className='upSiteName w-[80%] flex flex-col'>
                            이름
                            <div className='mt-1 bg-gray-100 h-10 rounded-lg pl-4 flex flex-row items-center'>
                                {name}
                            </div>
                        </div>

                        <div className='upSiteNum w-[80%] flex flex-col pt-5'>
                            연락처
                            <input
                            placeholder='전화번호를 입력해주세요'
                                className='mt-3 bg-gray-200 h-10 rounded-lg pl-4'
                                type='text'
                                value={phoneNumber}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (/^[0-9+-]*$/.test(inputValue)) {
                                        setPhoneNumber(inputValue);
                                    }
                                }}
                            />
                        </div>

                        <div className='middleSiteContectNum w-[80%] flex flex-col pt-5'>
                            생년월일
                            <div className='mt-3 bg-gray-100 h-10 rounded-lg pl-4 flex flex-row items-center '>
                                {birth}
                            </div>
                        </div>
                    </div>


                    <div className='rightEditSite text-base w-[50%] flex flex-col items-center'>

                        <div className='middleSiteBirth w-[80%] flex flex-col '>
                            부서
                            <div className='mt-1 bg-gray-100 h-10 rounded-lg shadow-lg pl-4 flex flex-row items-center '>
                                {department}
                            </div>
                        </div>
                        <div className='bottomSiteWorkSite w-[80%] flex flex-col pt-5'>
                            직급
                            <div className='mt-3 bg-gray-100 h-10 rounded-lg shadow-lg pl-4 flex flex-row items-center '>
                                {position}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="btnSite flex justify-center items-center">
                    <button
                        disabled={!isFormValid}
                        onClick={handleModalOpen}
                        className='flex justify-center items-center align-middle bg-mainColor text-white font-bold text-lg p-4 rounded-lg shadow-lg mt-20'>Update</button>
                </div>
            </div>
            <FormModal isOpen={isModalOpen} onClose={handleModalClose}>
                <div className="text-sm">
                    업데이트 되었습니다.
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleUpdatePhoneNumber}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </FormModal>
        </div>
    )
}

export default ProfileEdit


