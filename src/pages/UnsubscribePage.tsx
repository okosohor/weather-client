import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import axios, { AxiosError } from 'axios';

export default function UnsubscribePage() {
  const { token } = useParams<{ token: string }>();
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  async function confirm() {
    if (token) {
      try {
        const res = await API.unsubscribe(token);
        setResponse(res);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const typedError = error as AxiosError<{ message: string }>;
          setError(typedError.response?.data?.message || 'Server error');
        } else {
          setError('Unknown error');
        }
      }
    }
  }

  useEffect(() => {
    console.log(token);
    if (!token) {
      
      setError('Token not found');
    } else {confirm();}
  }, [token]);
  return (
    <div className="h-screen w-full  flex items-center justify-center bg-gradient-to-br from-violet-500 to-blue-500">
      <div className="h-3/4 w-1/3 min-w-[400px] rounded-2xl bg-white border-2 border-violet-900 items-center flex flex-col gap-6 p-6">
        <h1 className="text-gray-600 text-3xl ">Unsubscribe page</h1>
        {response && <h1 className="text-green-600 mt-6 text-3xl ">{response}</h1>}
        {error && <h1 className="text-red-600 mt-6 text-3xl ">{error}</h1>}
      </div>
    </div>
  );
}
