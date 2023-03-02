import { useState } from 'react'

export default function Password ({ setter }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <label htmlFor='password' className='flex flex-col space-y-2'>
      <span className='text-lg font-semibold'>Mot de passe</span>
      <span className='flex relative items-center'>
        <svg
          onClick={() => setShowPassword(!showPassword)}
          className='h-6 w-6 text-gray-500 dark:text-gray-400 hover:cursor-pointer absolute right-0 mr-2 p-1'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5ZM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm-3-5c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3Z'
            fillRule='evenodd'
            clipRule='evenodd'
          />
        </svg>

        <input
          required
          onChange={(e) => setter(prevState => ({ ...prevState, password: e.target.value }))}
          type={showPassword ? 'text' : 'password'}
          name='password'
          className='w-full rounded-lg shadow focus:border-b-2 border-[#6fb463] bg-white dark:bg-black p-2 outline-none'
        />
      </span>
    </label>
  )
}
