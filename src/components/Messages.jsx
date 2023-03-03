import { TypeAnimation } from 'react-type-animation'
import logo from '../assets/sya_logo.jpg'

export default function Messages ({ messages, username }) {
  return (
    <div className='px-1 flex flex-col space-y-2'>
      {messages
        .slice(0)
        .reverse()
        .map((message, index) =>
          message.isQuestion
            ? (
              <div
                key={index}
                className='flex flex-col relative space-y-1 p-2 rounded'
              >
                <div className='group flex relative items-center space-x-2 p-2 rounded'>
                  <img
                    src={`https://eu.ui-avatars.com/api/?name=${username}`}
                    className='flex h-8 w-8 lg:h-10 lg:w-10 rounded-full duration-200 items-center'
                  />

                  <p>{message.content}</p>

                  <div className='hidden absolute right-0 top-0 text-sm p-1 lg:group-hover:flex font-thin text-gray-400'>
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
              )
            : (
              <div
                key={index}
                className={[
                  'group',
                  'flex',
                  'relative',
                  'items-center',
                  'space-x-2',
                  'p-2',
                  'rounded',
                  ...(message.background
                    ? ['bg-zinc-100', 'dark:bg-zinc-800']
                    : []),
                  ...message.classes
                ].join(' ')}
              >
                <div className='flex items-center space-x-2'>
                  <img
                    src={logo}
                    className='flex flex-col h-8 w-8 lg:h-10 lg:w-10 rounded-full mb-auto duration-200 group-hover:shadow-lg'
                  />
                </div>

                <TypeAnimation
                  sequence={[message.content]}
                  speed={50}
                  cursor={false}
                  wrapper='div'
                />

                <div className='hidden absolute right-0 top-0 text-sm p-1 lg:group-hover:flex lg:group-hover: font-thin text-gray-400'>
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
              )
        )}
    </div>
  )
}
