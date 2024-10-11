interface ErrorMessageProps {
    messages: string[]; // 에러 메시지 배열(가독성을 위해 배열로 관리)
}

function ErrorMessage({ messages }: ErrorMessageProps) {
    if (messages.length === 0) return null; // 메시지가 없으면 아무것도 표시하지 않음

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                {messages.map((message, index) => (
                <p key={index}>❗❗ {message}</p>
                ))}
        </div>
    );
};

// 필수 입력칸에 입력하지 않으면 경고문구 띄우기
export const validateSignUp = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    consent: boolean
) => {
    const errors: string[] = [];

    if (!username) {
        errors.push('이름을 입력해주세요.');
    }
    if (!email) {
        errors.push('이메일을 입력해주세요.');
    }
    if (!password) {
        errors.push('비밀번호를 입력해주세요.');
    }
    if (password !== confirmPassword) {
        errors.push('비밀번호가 일치하지 않습니다.');
    }
    if (!consent) {
        errors.push('개인정보 활용 동의가 필요합니다.');
    }

    return errors;
};

export default ErrorMessage;
