import React from 'react'

const MailRead = () => {
    return (
        <div className="w-full">
            <table className="min-w-full border-collapse border-b-2 border-gray-300 mt-5">
                <thead>
                    <tr className="bg-blue-50">
                        <th className="border-b-2 border-gray-300 p-2 w-1/6">보낸사람</th>
                        <th className="border-b-2 border-gray-300 p-2 w-3/6">내용</th>
                        <th className="border-b-2 border-gray-300 p-2 w-1/6">날짜</th>
                        <th className="border-b-2 border-gray-300 p-2 w-1/6">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="h-14">
                        <td className="border-b-2 border-gray-300 p-2 text-center">김정현</td>
                        <td className="border-b-2 border-gray-300 p-2 text-center">정우씨...</td>
                        <td className="border-b-2 border-gray-300 p-2 text-center">24.10.15</td>
                        <td className="border-b-2 border-gray-300 p-2 text-center align-middle">
                            <button className='bg-red-500 text-white p-2 rounded-lg'>삭제</button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}

export default MailRead
