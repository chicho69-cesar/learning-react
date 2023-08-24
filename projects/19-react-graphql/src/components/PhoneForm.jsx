import styles from './PhoneForm.module.css'

import { useEditPersonPhone } from '../hooks/use-persons'

export default function PhoneForm({ notifyError }) {
  const { editPhone } = useEditPersonPhone({ notifyError })

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const { name, phone } = Object.fromEntries(formData)

    editPhone({ variables: {
      name, 
      phone,
    }})

    event.target.reset()
  }

  return (
    <div>
      <h2 className={styles.title}>Edit person number</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input type='text' className={styles.input} name='name' placeholder='Nombre...' />
        <input type='text' className={styles.input} name='phone' placeholder='Teléfono...' />

        <button type='submit'>
          Editar teléfono
        </button>
      </form>
    </div>
  )
}
