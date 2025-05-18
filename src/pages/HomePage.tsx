import { useState } from 'react';
import Button from 'ui/Button';
import Input from 'ui/Input';
import API, { WeatherResponse } from '../api';
import axios, { AxiosError } from 'axios';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [weatherCity, setWeatherCity] = useState('');
  const [period, setPeriod] = useState<'hourly' | 'daily'>('daily');
  const [weatherError, setWeatherError] = useState('');
  const [weather, setWeather] = useState<WeatherResponse | undefined>(undefined);
  const [subscribeError, setSubscribeError] = useState('')
  const [subscribeResponse, setSubscibeResponse] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  async function handleGetWeather() {
    setWeatherError('');
    setWeather(undefined);
    try {
      const res = await API.getWeather(weatherCity);
      setWeather(res)
      console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const typedError = error as AxiosError<{ message: string }>;
        setWeatherError(typedError.response?.data?.message || 'Server error');
      } else {
        setWeatherError('Unknown error');
      }
    }
  }

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubscribeError('');
    setSubscibeResponse('');
    try {
      const res = await API.subscribe({email, frequency:period, city});
      setSubscibeResponse(res || 'success')
      console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const typedError = error as AxiosError<{ message: string }>;
        setSubscribeError(typedError.response?.data?.message || 'Server error');
      } else {
        setSubscribeError('Unknown error');
      }
    }
  }

  return (
    <div className="h-screen w-full  flex items-center justify-center bg-gradient-to-br from-violet-500 to-blue-500">
      <div className="h-3/4 w-1/3 min-w-[400px] rounded-2xl bg-white border-2 border-violet-900 items-center flex flex-col gap-6 p-6">
        <h1 className="mb-1 text-4xl font-bold text-gray-600">Weather service</h1>
        {subscribeError && <span className="text-sm absolute top-[185px] text-red-600">{subscribeError}</span>}
        {subscribeResponse && <span className="text-sm absolute top-[185px] text-green-600">{subscribeResponse}</span>}
        <form onSubmit={handleSubscribe} className="flex mt-6 flex-col gap-6">
          <Input name="Email" value={email} type="email" handleChange={setEmail} />
          <Input name="City" value={city} type="text" handleChange={setCity} />

          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <input
                checked={period === 'daily'}
                id="default-radio-1"
                type="radio"
                value={period}
                onChange={e => setPeriod('daily')}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 ">
                Every day email
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={period === 'hourly'}
                id="default-radio-2"
                type="radio"
                value={period}
                onChange={e => setPeriod('hourly')}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 ">
                Every hour email
              </label>
            </div>
          </div>
          <Button text="subscribe" type="submit" />
        </form>

        <div className="flex flex-col pt-4 gap-4 border-gray-400 border-t-2">
          <Input name="City" value={weatherCity} type="email" handleChange={setWeatherCity} />
          <Button text="get weather" handleClick={handleGetWeather} />
          {weatherError && <span className="mt-2 text-sm text-red-500">{weatherError}</span>}
          {weather && (
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">temperature: {weather.temperature}</span>
              <span className="text-sm text-gray-600">humidity: {weather.humidity}</span>
              <span className="text-sm text-gray-600">description: {weather.description}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
