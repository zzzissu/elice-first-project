import React from 'react'

const ProfileEdit = () => {
    return (
        <div>
            <div className='EditSite w-full'>
                <div className='upSite text-2xl flex flex-row justify-center mt-20'>
                    <div className='upSiteName w-[40%] flex flex-col'>
                        이름
                        <input className='mt-3 bg-gray-200 h-14 rounded-lg shadow-lg pl-4' placeholder='하정우'/>
                    </div>
                    <div className='upSiteNum w-[40%] flex flex-col ml-16 '>
                        사원번호
                        <input className='mt-3 bg-gray-200 h-14 rounded-lg shadow-lg pl-4' placeholder='12341234'/>
                    </div>
                </div>

                <div className='middleSite text-2xl flex flex-row justify-center mt-11'>
                    <div className='middleSiteContectNum w-[40%] flex flex-col'>
                        연락처
                        <input className='mt-3 bg-gray-200 h-14 rounded-lg shadow-lg pl-4' placeholder='010-2936-7314'/>
                    </div>
                    <div className='middleSiteBirth w-[40%] flex flex-col ml-16'>
                        생년월일
                        <input className='mt-3 bg-gray-200 h-14 rounded-lg shadow-lg pl-4' placeholder='92.07.29'/>
                    </div>
                </div>

                <div className='bottomSite text-2xl flex flex-row justify-center mt-11'>
                    <div className='bottomSiteWorkSite w-[40%] flex flex-col'>
                        부서
                        <input className='mt-3 bg-gray-200 h-14 rounded-lg shadow-lg pl-4' placeholder='프론트앤드 개발팀'/>
                    </div>
                    <div className='bottomSitePosition w-[40%] flex flex-col ml-16'>
                        직급
                        <input className='mt-3 bg-gray-200 h-14 rounded-lg shadow-lg pl-4' placeholder='사원'/>
                    </div>
                </div>
            </div>

            <div className="btnSite flex justify-center items-center">
                <button className='flex justify-center items-center align-middle bg-blue-700 text-white font-bold text-xl w-56 h-14 rounded-lg shadow-lg mt-28'>Update</button>
            </div>
        </div>
    )
}

export default ProfileEdit
