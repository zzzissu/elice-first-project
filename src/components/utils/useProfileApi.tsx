import { useEffect, useState } from 'react';
import { errorHandler } from './errorHandler';

interface Profile {
    name: string;
    department: string;
}

export const useUserApi = () => {
    const [profile, setProfile] = useState<Profile>({ name: '', department: '' });

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:4000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('사용자 정보 가져오기 실패');
                }
                return response.json();
            })
            .then((data: Profile) => {
                setProfile({ name: data.name, department: data.department }); // 사용자 정보 상태에 저장
            })
            .catch((error) => {
                errorHandler(error); // 에러가 발생할 때만 errorHandler 호출
            });
    }, [token]);

    return profile; // 프로필 데이터를 다른 컴포넌트에서 사용할수 있도록 전달하기위해 반환
};
