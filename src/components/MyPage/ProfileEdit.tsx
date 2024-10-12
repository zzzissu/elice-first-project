import React from 'react'

const ProfileEdit = () => {
    return (
        <div>
            <div className='EditSiteTotal flex flex-col justify-center mt-20'>
                <div className='EditSite text-2xl flex flex-row justify-center'>
                    <div className='leftEditSite w-[50%] flex flex-col items-center'>
                        <div className='upSiteName w-[80%] flex flex-col'>
                            이름
                            <div className='mt-3 bg-gray-100 h-14 rounded-lg shadow-lg pl-4 flex flex-row items-center'>
                                하정우
                            </div>
                        </div>

                        <div className='upSiteNum w-[80%] flex flex-col pt-10'>
                            연락처
                            <input className='mt-3 bg-gray-200 h-14 rounded-lg shadow-lg pl-4' placeholder='010-2936-7314' />
                        </div>

                        <div className='middleSiteContectNum w-[80%] flex flex-col pt-10'>
                            생년월일
                            <div className='mt-3 bg-gray-100 h-14 rounded-lg shadow-lg pl-4 flex flex-row items-center '>
                                1992.07.29
                            </div>
                        </div>
                    </div>


                    <div className='rightEditSite text-2xl w-[50%] flex flex-col items-center'>

                        <div className='middleSiteBirth w-[80%] flex flex-col '>
                            부서
                            <div className='mt-3 bg-gray-100 h-14 rounded-lg shadow-lg pl-4 flex flex-row items-center '>
                                프론트엔드 개발팀
                            </div>
                        </div>
                        <div className='bottomSiteWorkSite w-[80%] flex flex-col pt-10'>
                            직급
                            <div className='mt-3 bg-gray-100 h-14 rounded-lg shadow-lg pl-4 flex flex-row items-center '>
                                사원
                            </div>
                        </div>

                    </div>
                </div>
                <div className="btnSite flex justify-center items-center">
                    <button className='flex justify-center items-center align-middle bg-blue-700 text-white font-bold text-xl w-56 h-14 rounded-lg shadow-lg mt-28'>Update</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileEdit
