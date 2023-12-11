export default function FormTextArea({ ...props }) {
  return (
    <textarea
      name='message'
      id='message'
      rows={4}
      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 outline-none rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
      placeholder='Quería comentar que...'
    />
  )
}
