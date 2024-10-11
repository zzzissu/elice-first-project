import React from 'react'

const Schedule = () => {
  return (
    <div className='sectionDevide flex flex-row items-center justify-center'>
      {/*왼쪽 구역 */}
      <div className='leftSite w-[50%]'>
        <div className='border-2 h-[650px] w-[85%] mt-16 ml-16 rounded-lg shadow-lg'>
          <div className='flex flex-row justify-between pt-10'>
            <div className='text-2xl ml-10'>
              개인 일정을 작성해 주세요
            </div>
            <button className='w-16 h-12 mr-6 -mt-2 rounded-md'
              style={{ backgroundImage: `url('/assets/plus.png')`, backgroundSize: 'cover', backgroundPosition: "center" }} />
          </div>
        </div>



      </div>
      {/*오른쪽 구역 */}
      <div className='rightSite w-[50%]'>
        <div className='border-2 h-[650px] w-[85%] mt-16 ml-10 rounded-lg shadow-lg'>
          <div className='flex flex-row justify-between pt-10'>
            <div className='text-2xl ml-10'>
              업무 일정을 작성해 주세요
            </div>
            <button className='w-16 h-12 mr-6 -mt-2 rounded-md'
              style={{ backgroundImage: `url('/assets/plus.png')`, backgroundSize: 'cover', backgroundPosition: "center" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
