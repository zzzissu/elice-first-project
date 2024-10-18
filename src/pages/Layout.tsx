import React, { useState, useEffect } from 'react';
import Nav from '../components/nav/Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [profileImg, setProfileImg] = useState<string>('/assets/Group 18.png');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [name, setName] = useState("");
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
  

    useEffect(() => {
        userData();
    }, [])

    // 알림 상태설정

    //정보 가져오기
    const userData = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:4000/api/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.status);
                    throw new Error("정보를 가져오지 못했습니다.");
                }
            })
            .then((data) => {
                setName(data.name);
                setDepartment(data.department);
                setPosition(data.position);
            })
            .catch((error) => {
                console.error('정보조회 중 오류 발생:', error);
            });
    }
    //사진 저장후 나타나기
    const savePicture = (file: File) => {
        if (!file) {
            console.error("업로드할 파일이 없습니다.");
            return;
        }
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append("profileImage", file)
        fetch("http://localhost:4000/api/profile/image", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("사진조회 오류");
                } return response.json();
            })
            .then((data) => {
                console.log("사진자료 전송 성공", data);
                if (data.profileImageUrl) {
                    setProfileImg(data.profileImageUrl);
                }
            })
            .catch((error) => {
                console.error('사진자료 전송 중 오류 발생:', error);
            });
    }
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setSelectedFile(selectedFile);
            const imageUrl = URL.createObjectURL(selectedFile);
            setProfileImg(imageUrl);
            savePicture(selectedFile);
        }
    };

    //상태저장
    const saveState = (state : string) => {
        const token = localStorage.getItem('token');
        fetch("http://localhost:4000/api/state", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                state: state
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("상태조회 오류");
                } return response.json();
            })
            .then((data) => {
                console.log("상태 전송 성공", data);
            })
            .catch((error) => {
                console.error('상태전송 중 오류 발생:', error);
            });
    }

    //상태메세지 저장
    const saveMessage = (statusMessage:string)=>{
        const token = localStorage.getItem('token');
        fetch("http://localhost:4000/api/state/message", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({
                statusMessage: statusMessage
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("상태메세지 전송 오류");
            } return response.json();
        })
        .then((data) => {
            console.log("상태 전송 성공", data);
            alert("출장지가 저장되었습니다.")
        })
        .catch((error) => {
            console.error('상태전송 중 오류 발생:', error);
        });
    }


    
    useEffect(() => {
        if (selectedOption) {
            saveState(selectedOption);
        }
        if (selectedOption !== '출장중') {
            setInputValue('');
        }
    }, [selectedOption]);
    return (
        <div className="flex">
            <Nav />
            <div className="w-[100%] min-w-[1280px]">
                <div className="flex flex-col w-auto h-auto">
                    <div className="flex flex-col w-auto h-auto">
                        <header>
                            <div className="h-20 w-auto bg-blue-700 flex justify-between items-center">
                                <div className="text-3xl text-white font-medium font-sans pl-8">Project</div>
                                <div className="flex flex-row">
                                    <div
                                        style={{
                                            backgroundImage: `url('/assets/ring.png')`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                        }}
                                        className='z-10 h-12 w-12 mr-3 rounded-full'>

                                    </div>
                                    <div
                                        style={{
                                            backgroundImage: `url("${profileImg}")`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                        className="z-10 h-12 w-12 mr-3 rounded-full"
                                    />
                                    <div className="text-xl text-white pt-3 font-sans mr-12">{name}</div>
                                </div>
                            </div>
                        </header>

                        {/* 회사사진 */}
                        <div
                            style={{
                                backgroundImage: `url('/assets/office-3438241_1280.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            className="h-56 w-auto relative"
                        />
                        <div className="flex items-center max-h-screen bg-sky-50">
                            <div className="sectionDevide flex w-full">
                                <div className="leftSide relative -top-12 h-full">
                                    {/* 프로필 사진 */}
                                    <div className="flex flex-col items-center h-44 w-56 ml-20 bg-white rounded-lg shadow-2xl">
                                        <div
                                            style={{
                                                backgroundImage: `url("${profileImg}")`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                            className="mt-5 h-20 w-20 rounded-full"
                                        >
                                            <label htmlFor="imageUpload">
                                                <div
                                                    style={{
                                                        backgroundImage: `url('/assets/Group 17.png')`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                    }}
                                                    className="h-8 w-8 ml-12 mt-14 cursor-pointer"
                                                />
                                            </label>
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                accept="image/png, image/jpeg"
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange}
                                            />
                                        </div>

                                        <div className="text-xl pt-2">{name}</div>
                                        <div className=" pt-1 text-xs">{department} {position}</div>
                                    </div>

                                    {/* 결재칸 */}
                                    <div className="rounded-lg shadow-lg border w-56 h-8 ml-20 bg-white mt-3 flex items-center justify-between font-medium">
                                        <div className="rounded-full bg-blue-700 h-3 w-3 ml-4" />
                                        <div className="flex-grow ml-4 text-sm">결재중</div>
                                        <div className="text-base text-blue-700 mr-4">5</div>
                                    </div>

                                    <div className="rounded-lg shadow-lg border w-56 ml-20 h-8 bg-white mt-2 flex items-center justify-between font-medium">
                                        <div className="rounded-full bg-green-700 h-3 w-3 ml-4" />
                                        <div className="flex-grow ml-4 text-sm">결재완료</div>
                                        <div className="text-base text-green-700 mr-4">10</div>
                                    </div>

                                    <div className="rounded-lg shadow-lg border w-56 ml-20 h-8 bg-white mt-2 flex items-center justify-between font-medium">
                                        <div className="rounded-full bg-red-700 h-3 w-3 ml-4" />
                                        <div className="flex-grow ml-4 text-sm">반려</div>
                                        <div className="text-base text-red-700 mr-4">3</div>
                                    </div>

                                    <div className="rounded-lg shadow-lg border w-56 ml-20 h-8 bg-white mt-2 flex items-center justify-between font-medium">
                                        <div className="rounded-full bg-purple-700 h-3 w-3 ml-4" />
                                        <div className="flex-grow ml-4 text-sm">연차</div>
                                        <div className="text-base text-purple-700 mr-4">10</div>
                                    </div>

                                    <div className="rounded-lg shadow-lg border h-64 w-56 ml-20 mt-2 flex bg-white flex-col justify-center items-center font-bold">
                                        <div className="text-center">당신의 상태를 알려주세요</div>
                                        <button className="flex flex-row text-center align-middle items-center border-2 mt-3 rounded-lg shadow-lg">
                                            <form action="" className="w-full m-1 text-sm">
                                                <select name="situation" onChange={handleSelectChange}>
                                                    <option value="현재자리중">현재자리중</option>
                                                    <option value="출장중">출장중</option>
                                                    <option value="휴가중">휴가중</option>
                                                    <option value="자리비움">자리비움</option>
                                                </select>
                                            </form>
                                        </button>

                                        <input
                                            type="textarea"
                                            className="border-2 mt-2 w-44 text-center text-sm"
                                            placeholder="출장중일때만 활성화"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            disabled={selectedOption !== '출장중'}
                                        />

                                        <div className="flex justify-end w-full">
                                            <button
                                                className="bg-mainColor text-white rounded-lg shadow-lg h-8 w-12 mr-6 mt-3"
                                                onClick={()=>saveMessage(inputValue)}
                                                disabled={inputValue.trim() === '' || selectedOption !== "출장중"}
                                            >
                                                저장
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightSide relative w-[100%] -top-12 ml-20">
                                    <div className="flex flex-col w-[90%] h-[100%] bg-white rounded-lg shadow-lg">
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
