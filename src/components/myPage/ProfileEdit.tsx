import React, { useEffect, useState } from 'react';
import FormModal from '../modal/FormModal';
import DeleteModal from '../modal/DeleteModal';

const ProfileEdit = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');

    //사용자의 정보을 가져오는 함수 호출
    useEffect(() => {
        fetchUserData();
    }, []);

    const userDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('인증 토큰이 없습니다. 로그인 상태를 확인하세요.');
                return;
            }
            const res = await fetch('http://34.22.95.156:3004/api/users/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                console.error('삭제실패하였습니다.', res.status);
                return;
            }
            alert('삭제되었습니다.');
            window.location.href = '/login';
        } catch (e) {
            console.error('오류가 발생되었습니다.', e);
        }
    };

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('인증 토큰이 없습니다. 로그인 상태를 확인하세요.');
                return;
            }
            const res = await fetch('http://34.22.95.156:3004/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setName(data.name);
                setPhone(data.phone);
                setBirth(data.birth);
                setDepartment(data.department);
                setPosition(data.position);
            } else {
                console.log(res.status);
                console.error('사용자의 정보를 가져오는데 실패하였습니다.');
            }
        } catch (e) {
            console.log('네트워크 오류가 발생하였습니다.', e);
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDeleteModalOpen = () => {
        setIsDeleteModalOpen(true);
    };
    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    };

    const isFormValid = phone.trim() !== '';

    const handleUpdatePhoneNumber = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://34.22.95.156:3004/api/profile/phone', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ phone }),
            });

            if (!res.ok) {
                throw new Error('전화번호 업데이트 실패');
            }

            const data = await res.json(); // 응답 데이터를 JSON으로 변환
            setIsModalOpen(false); // 성공 시 모달을 닫음
        } catch (error) {
            console.error('Error: ', error); // 에러 콘솔에 출력
        }
    };
    return (
        <div>
            <div className="EditSiteTotal flex flex-col justify-center mt-10">
                <div className="EditSite text-base flex flex-row justify-center">
                    <div className="leftEditSite w-[50%] flex flex-col items-center">
                        <div className="upSiteName w-[80%] flex flex-col">
                            이름
                            <div className="mt-1 bg-gray-100 h-10 rounded-lg pl-4 flex flex-row items-center">
                                {name}
                            </div>
                        </div>

                        <div className="upSiteNum w-[80%] flex flex-col pt-5">
                            연락처
                            <input
                                placeholder="전화번호를 입력해주세요"
                                className="mt-3 bg-gray-200 h-10 rounded-lg pl-4"
                                type="text"
                                value={phone}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (/^[0-9+-]*$/.test(inputValue)) {
                                        setPhone(inputValue);
                                    }
                                }}
                            />
                        </div>
                        <div className="middleSiteContectNum w-[80%] flex flex-col pt-5">
                            생년월일
                            <div className="mt-3 bg-gray-100 h-10 rounded-lg pl-4 flex flex-row items-center ">
                                {new Date(birth).toLocaleDateString('en-CA')}
                            </div>
                        </div>
                    </div>
                    <div className="rightEditSite text-base w-[50%] flex flex-col items-center">
                        <div className="middleSiteBirth w-[80%] flex flex-col ">
                            부서
                            <div className="mt-1 bg-gray-100 h-10 rounded-lg shadow-lg pl-4 flex flex-row items-center ">
                                {department}
                            </div>
                        </div>
                        <div className="bottomSiteWorkSite w-[80%] flex flex-col pt-5">
                            직급
                            <div className="mt-3 bg-gray-100 h-10 rounded-lg shadow-lg pl-4 flex flex-row items-center ">
                                {position}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btnSite flex justify-center items-center">
                    <button
                        disabled={!isFormValid}
                        onClick={handleModalOpen}
                        className="flex justify-center items-center align-middle bg-mainColor text-white font-bold text-lg p-4 rounded-lg shadow-lg mt-20"
                    >
                        Update
                    </button>
                </div>
                <button onClick={handleDeleteModalOpen} className="flex text-gray-400 w-20 h-auto justify-end ">
                    회원탈퇴
                </button>
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
            <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} onDelete={userDelete} />
        </div>
    );
};
export default ProfileEdit;
