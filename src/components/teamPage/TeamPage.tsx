import React,{useEffect, useState} from 'react';


const teamPage = () => {
    useEffect(()=>{
        userData();
    },[])
    const [name, setName] = useState("");
    const userData = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                console.log("사용자의 정보를 받아오지 못했습니다.")
            }
            const res = await fetch("http://localhost:4000/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setName(data.name);
            } else {
                console.log(res.status)
                console.error("사용자의 정보를 가져오는데 실패하였습니다.")
            }
        }
        catch (e) {
            console.error("네트워크 오류가 발생되었습니다.", e)
        }
    }

    return (
        <div className='pt-10 pl-10'>
            <div className='flex flex-wrap gap-10'>
                <div className='h-56 w-56 rounded-lg text-sm shadow-lg flex flex-col text-center justify-center'>
                    {name} 님의 업무 계획입니다.
                    <div className='border-dashed border-2 p-1 text-sm w-36 ml-9'>
                        엘리스 출장 갑니다.
                    </div>
                    <div className='border-b-2'>
                        오늘 엄마 생일~
                    </div>
                    <div>
                        <ul>
                            <li>이번엔 잘되길</li>
                            <li>수정 힘들어</li>
                            <li>ㅠㅠ</li>
                        </ul>
                    </div>

                </div>
                <div className='h-56 w-56 rounded-lg shadow-lg flex flex-col text-center justify-center'>
                    이수엽 님의 업무 계획입니다.
                </div>
                <div className='h-56 w-56 rounded-lg shadow-lg flex flex-col text-center justify-center'>
                    이희재 님의 업무 계획입니다.
                </div>
                <div className='h-56 w-56 rounded-lg shadow-lg flex flex-col text-center justify-center'>
                    김지언 님의 업무 계획입니다.
                </div>
                <div className='h-56 w-56 rounded-lg shadow-lg flex flex-col text-center justify-center'>
                    최준영 님의 업무 계획입니다.
                </div>
                <div className='h-56 w-56 rounded-lg shadow-lg flex flex-col text-center justify-center'>
                    한지수 님의 업무 계획입니다.
                </div>
            </div>
        </div>


    )
}

export default teamPage
