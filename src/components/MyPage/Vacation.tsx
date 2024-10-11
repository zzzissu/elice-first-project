import React from 'react'
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import TotalVacation from './TotalVacation';
import UsedVacation from './UsedVacation';
import RemainVacation from './RemainVacation';


const Vacation = () => {
  return (
    <div className='sectionDevide '>
      {/*휴가 버튼 구역 */}
      <div className='flex flex-col justify-center items-center'>
        <div className='upSideSite h-52 w-full border-b-2 flex flex-row items-center justify-center'>
          <button className='text-xl font-bold border-2 h-36 w-80 rounded-lg shadow-lg mr-10'>
            <Link to='TotalVacation'>
              전체 연차
              <div className='mt-3'>
                16
              </div>
            </Link>
          </button>
          <button className='text-xl font-bold border-2 h-36 w-80 rounded-lg shadow-lg mr-10'>
            <Link to='UsedVacation'>
              사용 연차
              <div className='mt-3 text-red-700'>
                6
              </div>
            </Link>
          </button>
          <button className='text-xl font-bold border-2 h-36 w-80 rounded-lg shadow-lg mr-10'>
            <Link to='RemainVacation'>
              남은 연차
              <div className='mt-3 text-green-400'>
                10
              </div>
            </Link>
          </button>
        </div>
      </div>

      {/*휴가 디테일 구역 */}
      <div className='downSideSite'>
        <Routes>
          <Route path='TotalVacation' element={<TotalVacation />} />
          <Route path='UsedVacation' element={<UsedVacation />} />
          <Route path='RemainVacation/*' element={<RemainVacation />} />
        </Routes>
      </div>

    </div>
  )
}

export default Vacation
