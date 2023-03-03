export default function Identifier ({ setUser }) {
  return (
    <label htmlFor='identifier' className='flex flex-col space-y-2'>
      <span className='text-lg font-semibold'>
        Pseudonyme / Adresse électronique
      </span>
      <input
        required
        onChange={(e) => setUser(prevState => ({ ...prevState, username: e.target.value }))}
        type='text'
        name='identifier'
        className='rounded-lg shadow focus:border-b-2 border-[#6fb463] bg-white dark:bg-black p-2 outline-none'
      />
    </label>
  )
}
