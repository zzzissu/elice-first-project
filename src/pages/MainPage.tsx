import React from 'react';

function MainPage() {
    return (
      <div className='flex flex-col w-auto h-auto'>
          <header>
              <div className="h-24 w-auto bg-blue-700 flex justify-between items-center">
                  <div className='text-3xl text-white font-medium pl-8'>
                      Project
                  </div>
                  <div className='flex flex-row'>
                      <div style={{ backgroundImage: `url('/assets/Group 18.png')`, backgroundSize: 'cover', backgroundPosition: "center" }}
                          className='z-10 h-12 w-12 mr-3' />
                      <div className='text-xl text-white pt-3 mr-12'>
                          하정우
                      </div>
                  </div>
              </div>
          </header>
          {/* 회사사진, 전체 백그라운드 색*/}
            <div style={{ backgroundImage: `url('/assets/office-3438241_1280.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                className='h-80 w-auto relative' />
                <div className=' bg-indigo-100/100 min-h-screen'> </div>
          {/* 왼쪽세션*/}
                <div className='flex flex-col border h-[885px] w-[501px] bg-white absolute top-[316px] left-[486px] ml-12 rounded-lg shadow-lg'>
                   <div className='font-sans text-2xl font-semibold relative top-[42px] left-[61px]'>알림</div>
                       <div className='flex flex-col justify-start border h-[322px] w-[385px] bg-indigo-50/100 absolute top-[89px] ml-12 rounded-lg shadow-lg'>
                          {/*불러온 데이터*/}
                          <h2 className='font-sans text-lg font-normal mb-4 relative top-[20px] left-[20px]'>팀별 페이지 피드백 알람 여기에 표시
                          </h2>
                       </div>
                    <div className='font-sans text-2xl font-semibold relative top-[420px] left-[61px]'>공지사항</div>
                    <div className='font-sans text-5m font-normal  text-blue-700 relative top-[392px] left-[380px]'>글쓰기</div>
                       <div className='flex flex-col justify-start border h-[322px] w-[385px] bg-indigo-50/100 absolute top-[502px] ml-12 rounded-lg shadow-lg'>
                         {/*불러온 데이터*/}
                         <h2 className='font-sans text-lg font-normal mb-4 relative top-[20px] left-[20px]'>팀별 페이지 피드백 알람 여기에 표시
                        </h2>
                       </div>  
                </div>
            {/* 오른쪽세션*/}
                <div className='flex flex-col border h-[885px] w-[791px] bg-white absolute top-[316px] left-[999px] ml-12 rounded-lg shadow-lg'>
                   <div className='font-sans text-2xl font-semibold relative top-[42px] left-[61px]'>팀별페이지</div>
                       <div className='flex flex-col justify-start border h-[322px] w-[667px] bg-indigo-50/100 absolute top-[89px] ml-12 rounded-lg shadow-lg'>
                            {/*불러온 데이터*/}
                            <h2 className='font-sans text-lg font-normal mb-4 relative top-[20px] left-[20px]'>팀별 페이지 피드백 알람 여기에 표시
                            </h2>
                       </div>
                    <div className='font-sans text-2xl font-semibold relative top-[420px] left-[61px]'>개인페이지</div>
                       <div className='flex flex-col justify-start border h-[322px] w-[667px] bg-indigo-50/100 absolute top-[502px] ml-12 rounded-lg shadow-lg'>
                            {/*불러온 데이터*/}
                            <h2 className='font-sans text-lg font-normal mb-4 relative top-[20px] left-[20px]'>팀별 페이지 피드백 알람 여기에 표시
                            </h2>
                       </div>  
                </div>
      </div> 
  );
  

}

export default MainPage;