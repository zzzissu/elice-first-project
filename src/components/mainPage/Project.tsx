import React from 'react'

const Project = () => {
    return (
        <div className='flex'>
            {/* 왼쪽세션*/}
            <div className='flex flex-col w-[25%] pl-14 pt-10'>
                <div className='font-sans text-2xl font-semibold'>알림</div>
                <div className='flex flex-col border h-80 w-[100%] bg-indigo-50/100 mt-2 rounded-lg shadow-lg'>
                    <h2 className='font-sans text-lg font-normal text-center pt-5'>팀별 페이지 피드백 알람 여기에 표시
                    </h2>
                    {/*불러온 데이터*/}
                </div>
                <div className='flex justify-between'>
                    <div className='font-sans text-2xl font-semibold pt-10'>공지사항</div>
                    <button className='text-blue-700 font-bold pt-14'>
                        +글쓰기
                    </button>
                </div>
                <div className='flex flex-col border bg-indigo-50/100 h-80 w-[100%] mt-2 rounded-lg shadow-lg'>
                    <h2 className='font-sans text-lg font-normal mb-4 text-center pt-5'>팀별 페이지 피드백 알람 여기에 표시
                    </h2>
                    {/*불러온 데이터*/}
                </div>
            </div>

            {/* 오른쪽세션*/}
            <div className='flex flex-col ml-12 w-[75%]'>
                <div className='font-sans text-2xl font-semibold pt-10 pl-12'>팀별페이지</div>
                <div className='flex flex-col border h-80 w-[75%] bg-indigo-50/100 mt-2 rounded-lg shadow-lg ml-12'>
                    <h2 className='font-sans text-lg font-normal mb-4 text-center pt-5'>팀별 페이지 피드백 알람 여기에 표시
                    </h2>
                    {/*불러온 데이터*/}
                </div>
                <div className='font-sans text-2xl font-semibold pt-10 pl-12'>개인페이지</div>
                <div className='flex flex-col border h-80 w-[75%] bg-indigo-50/100 mt-2 rounded-lg shadow-lg ml-12'>
                    {/*불러온 데이터*/}
                    <h2 className='font-sans text-lg font-normal mb-4 text-center pt-5'>팀별 페이지 피드백 알람 여기에 표시
                    </h2>
                </div>

            </div>

        </div>
    )
}

export default Project
