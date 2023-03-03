import Identifier from './Identifier'
import Password from './Password'
import logo from '../../assets/sya_logo.jpg'
import { login } from '../../api/security'

export default function Login ({ user, setIsLogin, setMessages, setUser }) {
  const handleLogin = () => {
    login(user)
      .end(function (error, res) {
        // We process the data received

        if (error) throw error

        const data = JSON.parse(res.text) // The JSON data is converted into data that can be understood by Javascript
        if (Number(data.status) === 200) {
          setUser({ username: '', password: '' })
          setIsLogin(true) // Removal of the modal

          setMessages([
            {
              // Sending the initialized message
              content: `Bonjour, ${data.user.username}. 👋🏻 Comment puis-je vous aider aujourd'hui?`,
              classes: ['font-bold', 'text-xl', 'lg:text-2xl'],
              background: false,
              isQuestion: false
            }
          ])
        }
      })
  }

  return (
    <div className='grid fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-lg z-[9998] duration-200'>
      <div className='w-full h-full lg:h-full lg:min-h-fit lg:max-h-[33rem] lg:w-full lg:max-w-xl p-4 rounded shadow m-auto duration-500 items-center align-middle bg-zinc-50/90 dark:bg-zinc-900/70 backdrop-blur-lg'>
        <div className='p-2 lg:p-6 space-y-4 m-auto items-center h-full'>
          <img
            className='h-20 w-20 mx-auto rounded-full'
            src={logo}
            alt='SYA'
          />
          <h1 className='font-bold text-center text-2xl'>Bon retour 🦾</h1>

          <p className='text-sm text-gray-500 dark:text-gray-400 font-thin'>
            Connexion avec votre compte{' '}
            <span className='text-[#6fb463]'>sycatle.dev</span>
          </p>

          <Identifier setUser={setUser} />
          <Password setUser={setUser} />

          <div className='flex flex-col-reverse lg:flex-row space-y-4 items-center lg:justify-between'>
            <a
              href='https://sycatle.dev'
              className='text-gray-500 dark:text-gray-400 text-sm hover:underline my-2'
            >
              Retourner sur sycatle.dev
            </a>
            <button
              onClick={handleLogin}
              className='flex font-normal p-3 bg-[#6fb463] shadow hover:bg-[#4f8f44] lg:shadow-lg rounded'
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
