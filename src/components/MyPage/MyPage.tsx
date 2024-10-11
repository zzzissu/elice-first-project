import React, { useState } from 'react';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import Schedule from './Schedule';
import Vacation from './Vacation';

const MyPage = () => {
  const [activeLink, setActiveLink] = useState('/ProfileEdit');
  const handleLinkClick = (Link: string) => {
    setActiveLink(Link)
  }

  return (
    <div className='flex flex-col w-auto h-auto'>
      <header>
        <div className="h-28 w-auto bg-blue-700 flex justify-between items-center">
          <div className='text-3xl text-white font-medium pl-8'>
            Project
          </div>
          <div className='flex flex-row'>
            <div style={{ backgroundImage: `url('/assets/Group 18 1.png')`, backgroundSize: 'cover', backgroundPosition: "center" }}
              className='z-10 h-12 w-12 mr-3' />
            <div className='text-xl text-white pt-3 mr-12'>
              하정우
            </div>
          </div>
        </div>
      </header>

      {/* 회사사진*/}
      <div style={{ backgroundImage: `url('/assets/backSide.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        className='h-80 w-auto relative' />

      {/* 프로필 사진 - 결재정보와 같이 묶었음*/}
      <div className='flex flex-row relative'>
        <div>
          <div className='flex flex-col text-center justify-center items-center border h-72 w-80 bg-white absolute -top-12 ml-12 rounded-lg shadow-lg'>
            <div style={{ backgroundImage: `url('/assets/Group 18 1.png')`, backgroundSize: 'cover', backgroundPosition: "center" }}
              className='h-40 w-40'>
              <div style={{ backgroundImage: `url('/assets/Group 17.png')`, backgroundSize: 'cover', backgroundPosition: "center" }}
                className='z-10 h-12 w-12 ml-28 mt-28' />
            </div>
            <div className='text-2xl pt-3'>하정우</div>
            <div className='text-sm pt-2'>프론트엔드 개발팀</div>
          </div>
          {/* 결재 정보 */}
          <div className='rounded-lg shadow-lg border h-16 w-80 ml-12 z-10 mt-64 text-xl flex items-center font-medium'>
            <div className="rounded-full bg-blue-700 h-3 w-3 mr-3 ml-7" />
            결재중
            <div className="text-xl text-blue-700 ml-36">5</div>
          </div>
          <div className='rounded-lg shadow-lg border h-16 w-80 ml-12 z-10 mt-3 text-xl flex items-center font-medium'>
            <div className="rounded-full bg-green-700 h-3 w-3 mr-3 ml-7" />
            결재완료
            <div className="text-xl text-green-700 ml-28">10</div>
          </div>
          <div className='rounded-lg shadow-lg border h-16 w-80 ml-12 z-10 mt-3 text-xl flex items-center font-medium'>
            <div className="rounded-full bg-red-700 h-3 w-3 mr-3 ml-7" />
            반려
            <div className="text-xl text-red-700 ml-40">2</div>
          </div>
          <div className='rounded-lg shadow-lg border h-16 w-80 ml-12 z-10 mt-3 text-xl flex items-center font-medium'>
            <div className="rounded-full bg-purple-700 h-3 w-3 mr-3 ml-7" />
            연차
            <div className="text-xl text-purple-700 ml-40">5</div>
          </div>
          <div className='rounded-lg shadow-lg border h-72 w-80 ml-12 z-10 mt-3 text-xl flex flex-col justify-center items-center font-bold'>
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
          placeholder='출장중일때만 활성화'/>

        </div>


      </div>

      {/* 오른쪽 섹션 */}
      <div className="relative w-[70%] ml-8 -top-12">
        <div className='flex flex-col h-[100%] w-full bg-white rounded-lg shadow-lg'>

          {/* 오른쪽 섹션 Nav */}
          <div className='h-24 w-[80%] flex flex-row font-medium items-center ml-28'>
            <ul className='flex flex-row text-2xl gap-20 font-medium'>
              <li>
                <Link
                  to='ProfileEdit'
                  onClick={() => handleLinkClick('ProfileEdit')}
                  className={`${activeLink === 'ProfileEdit' ? 'border-blue-700 text-black border-b-8 pb-4' : 'text-gray-400'
                    }`}
                >
                  프로필 편집
                </Link>
              </li>
              <li>
                <Link to='Schedule'
                  onClick={() => handleLinkClick('Schedule')}
                  className={`${activeLink === 'Schedule' ? 'border-blue-700 text-black border-b-8 pb-4' : 'text-gray-400'}`}>
                  일정
                </Link>
              </li>
              <li>
                <Link to='Vacation'
                  onClick={() => handleLinkClick('Vacation')}
                  className={`${activeLink === 'Vacation' ? 'border-blue-700 text-black border-b-8 pb-4' : 'text-gray-400'}`}>
                  휴가 일정
                </Link>
              </li>
            </ul>
          </div>

          {/* 오른쪽 섹션 Main */}
          <div className='border-t-2 h-[800px] flex-grow'>
            <div className='h-max'>
              <Routes>
                <Route path='ProfileEdit' element={<ProfileEdit />} />
                <Route path='Schedule' element={<Schedule />} />
                <Route path='Vacation/*' element={<Vacation />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div >
  )
}

export default MyPage
