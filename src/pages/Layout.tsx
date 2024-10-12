import React from 'react'
import Nav from '../components/nav/Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex'>
      <Nav />
      <div className='w-[100%]'>


        <div className='flex flex-col w-auto h-auto'>
          <div className="flex flex-col w-auto h-auto">
            <header>
              <div className="h-24 w-auto bg-blue-700 flex justify-between items-center">
                <div className="text-3xl text-white font-medium font-sans pl-8">Project</div>
                <div className="flex flex-row">
                  <div
                    style={{
                      backgroundImage: `url('/assets/Group 18.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    className="z-10 h-12 w-12 mr-3"
                  />
                  <div className="text-xl text-white pt-3 font-sans mr-12">최준영</div>
                </div>
              </div>
            </header>

            {/* 회사사진*/}
            <div
              style={{
                backgroundImage: `url('/assets/office-3438241_1280.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="h-64 w-auto relative"
            />
            <div className='flex items-center max-h-screen bg-sky-50'>
              <div className='sectionDevide flex w-full'>
                <div className="leftSide relative -top-12 h-full">

                  {/* 프로필 사진*/}
                  <div className="flex flex-col items-center h-72 w-80 ml-20 bg-white rounded-lg shadow-2xl">
                    <div style={{
                      backgroundImage: `url('/assets/Group 18.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: "center"
                    }}
                      className='mt-5 h-40 w-40'>

                      <div style={{
                        backgroundImage: `url('/assets/Group 17.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: "center"
                      }}
                        className='h-12 w-12 ml-28 mt-28' />
                    </div>
                    <div className='text-2xl pt-3'>하정우</div>
                    <div className='text-sm pt-2'>프론트엔드 개발팀</div>
                  </div>

                  {/* 결재칸*/}
                  <div className='rounded-lg shadow-lg border w-80 ml-20 h-16 text-xl bg-white mt-4 flex items-center font-medium'>
                    <div className="rounded-full bg-blue-700 h-3 w-3 mr-3 ml-7" />
                    결재중
                    <div className="text-xl text-blue-700 ml-36">5</div>
                  </div>

                  <div className='rounded-lg shadow-lg border w-80 ml-20 h-16 text-xl bg-white mt-4 flex items-center font-medium'>
                    <div className="rounded-full bg-green-700 h-3 w-3 mr-3 ml-7" />
                    결재완료
                    <div className="text-xl text-green-700 ml-28">10</div>
                  </div>

                  <div className='rounded-lg shadow-lg border w-80 ml-20 h-16 text-xl bg-white mt-4 flex items-center font-medium'>
                    <div className="rounded-full bg-red-700 h-3 w-3 mr-3 ml-7" />
                    반려
                    <div className="text-xl text-red-700 ml-40">2</div>
                  </div>

                  <div className='rounded-lg shadow-lg border w-80 ml-20 h-16 text-xl bg-white mt-4 flex items-center font-medium'>
                    <div className="rounded-full bg-purple-700 h-3 w-3 mr-3 ml-7" />
                    연차
                    <div className="text-xl text-purple-700 ml-40">5</div>
                  </div>

                  <div className='rounded-lg shadow-lg border h-72 w-80 ml-20 mt-4 text-xl flex bg-white  flex-col justify-center items-center font-bold'>
                    <div className=' text-center'>
                      당신의 일정을 알려주세요
                    </div>
                    <button className='flex flex-row justify-between text-center align-middle items-center pl-4 mt-6 border-2 rounded-lg shadow-lg w-60 h-16'>현재 자리중
                      <div className='w-6 h-6 mr-6'
                        style={{ backgroundImage: `url('/assets/tri.png')`, backgroundSize: 'cover', backgroundPosition: "center" }}>
                      </div>
                    </button>
                    <input
                      type='textarea'
                      className='border-2 mt-3 h-14 text-center'
                      placeholder='출장중일때만 활성화' />

                  </div>


                </div>
                <div className='rightSide relative w-[100%] -top-12 ml-20 '> 
                    <div className='flex flex-col w-[90%] h-full bg-white rounded-lg shadow-lg'>
                        
                      <Outlet/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
