import styles from './PersonForm.module.css'

import { useCreatePerson } from '../hooks/use-persons'

export default function PersonForm() {
  const { addPerson } = useCreatePerson()

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const { name, phone, street, city } = Object.fromEntries(formData)

    addPerson({ variables: {
      name,
      phone,
      street,
      city,
    }})

    event.target.reset()
  }

  return (
    <div>
      <h2 className={styles.title}>Create a new person</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input type='text' className={styles.input} name='name' placeholder='Nombre...' />
        <input type='text' className={styles.input} name='phone' placeholder='Teléfono...' />
        <input type='text' className={styles.input} name='street' placeholder='Calle...' />
        <input type='text' className={styles.input} name='city' placeholder='Ciudad...' />

        <button type='submit'>
          Agregar persona
        </button>
      </form>
    </div>
  )
}
