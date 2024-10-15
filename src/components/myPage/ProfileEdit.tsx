import React, { useState } from 'react'
import FormModal from '../modal/FormModal';


const ProfileEdit = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const isFormValid = phoneNumber.trim() !== ''

    return (
        <div>
            <div className='EditSiteTotal flex flex-col justify-center mt-10'>
                <div className='EditSite text-base flex flex-row justify-center'>
                    <div className='leftEditSite w-[50%] flex flex-col items-center'>
                        <div className='upSiteName w-[80%] flex flex-col'>
                            이름
                            <div className='mt-1 bg-gray-100 h-10 rounded-lg pl-4 flex flex-row items-center'>
                                하정우
                            </div>
                        </div>

                        <div className='upSiteNum w-[80%] flex flex-col pt-5'>
                            연락처
                            <input
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
                                1992.07.29
                            </div>
                        </div>
                    </div>


                    <div className='rightEditSite text-base w-[50%] flex flex-col items-center'>

                        <div className='middleSiteBirth w-[80%] flex flex-col '>
                            부서
                            <div className='mt-1 bg-gray-100 h-10 rounded-lg shadow-lg pl-4 flex flex-row items-center '>
                                프론트엔드 개발팀
                            </div>
                        </div>
                        <div className='bottomSiteWorkSite w-[80%] flex flex-col pt-5'>
                            직급
                            <div className='mt-3 bg-gray-100 h-10 rounded-lg shadow-lg pl-4 flex flex-row items-center '>
                                사원
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
                <div className="text-sm">업데이트 되었습니다.</div>
            </FormModal>
        </div>
    )
}

export default ProfileEdit
