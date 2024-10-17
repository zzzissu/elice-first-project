export const errorHandler = (error: any) => {
    const status = error.status; // 401, 403, 404, 500

    if (status === 401) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
    }

    if (status === 403) {
        alert('권한이 없습니다.');
        window.location.href = '/login';
    }

    if (status === 500) {
        alert('서버에 문제가 발생했습니다.');
    }
};
