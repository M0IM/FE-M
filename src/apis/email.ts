import axiosInstance from './axiosInstance.ts';

// 의견 및 문의 메일 보내기
const postInquireEmail = async ({
  content,
  replyEmail,
}: {
  content: string;
  replyEmail: string;
}) => {
  const {data} = await axiosInstance.post(`/api/v1/auth/inquiries`, {
    content,
    replyEmail,
  });

  return data.result;
};

export {postInquireEmail};
