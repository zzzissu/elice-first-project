import React from 'react'

const MailRead = () => {
    return (
        <div className='flex flex-col w-full'>
            <div>
                <ul className='flex justify-between font-sans w-[90%] text-xl font-bold pt-14 pl-32'>
                    <li>보낸사람</li>
                    <li>제목</li>
                    <li>일자</li>
                </ul>
            </div>
        </div>
    )
}

export default MailRead
