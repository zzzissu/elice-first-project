import React from 'react'
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import UseVa from './UseVa'
import NowVa from './NowVa';
import FutureVa from './FutureVa';

const RemainVacation = () => {
    return (
        <div className='sectionDevide w-[80%] flex flex-row'>
            {/*남은연차 확인 구역 */}
            <div className='rightSite w-[45%] flex flex-col border-r-2'>
                <div className='text-2xl font-bold mt-10 ml-10 text-center'>
                    하정우님의 남은 연차는 10개입니다.
                </div>
                <div className='btnSection flex flex-col items-center'>
                    <button className='text-xl font-bold border-2 h-32 w-56 rounded-lg shadow-lg mr-10 mt-5'>
                        <Link to='UseVa'>
                            연차 사용하기
                        </Link>
                    </button>
                    <button className='text-xl font-bold border-2 h-32 w-56 rounded-lg shadow-lg mr-10 mt-5'>
                        <Link to='NowVa'>
                            현재 휴가자
                        </Link>
                    </button>
                    <button className='text-xl font-bold border-2 h-32 w-56 rounded-lg shadow-lg mr-10 mt-5'>
                        <Link to='FutureVa'>
                            사내 연차 사용일정
                        </Link>
                    </button>
                </div>
            </div>

            {/*남은연차 디테일 구역 */}
            <div className='leftSide'>
                <Routes>
                    <Route path='UseVa' element={<UseVa />} />
                    <Route path='NowVa' element={<NowVa />} />
                    <Route path='FutureVa' element={<FutureVa />} />
                </Routes>

            </div>
        </div>
    )
}

export default RemainVacation