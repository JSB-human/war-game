"use client"
import { useState } from 'react';

async function getAiData(aiMessage:any) {
  const url = `/api/llama?aiMessage=${aiMessage}`;
  try {
    const response =  await fetch(url);
    const datas = response;
    return datas;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default function Aichat() {
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const fetchData = async () => {
    try {
      const res = await getAiData(inputValue)

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setResponse(data.message.content);
      setMessage(inputValue);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // 데이터를 가져오는 동안 로딩 표시를 종료
    }
  };

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      fetchData();
      setInputValue('');
      event.preventDefault();
    }
  };

  return (
    <>
        <div className =""></div>
            <p className='w-[533px] border-2 border-black text-2xl text-center'>대화창</p>
            <textarea value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="말을 걸어보세요."
                    className="border-2 border-gray-500 w-[533px] h-[50px] text-white bg-black"
                    
                    />
            <button onClick={fetchData}></button>
        <div className="border-2 w-[533px] h-[130px]">
            <p className="text-xl">대화기록</p>
            <hr/>
            <div className ="" ><pre className="pre-container">나 : {isLoading ? 'Loading...' : (message ? message : '...')}</pre></div>
            <div className ="" ><pre className="pre-container">상대 : {isLoading ? 'Loading...' : (response ? response : '...')}</pre></div>
        </div>
    </>
  );
}