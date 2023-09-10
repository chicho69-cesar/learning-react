import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { UserInfo } from '../types.d'

/* function validate(values: UserInfo) {
  const errors: Partial<UserInfo> = {}

  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
} */

export default function SignupForm() {
  /* El hook de useFormik nos permite usar formik de una forma imperativa, es decir,
  agregando y creando los componentes y haciendo de bind de los eventos del formulario
  por nuestra cuenta, usando los componentes de formularios tradicionales */
  const formik = useFormik<UserInfo>({
    // Valores iniciales del formulario
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    // Evento submit
    onSubmit: (values: UserInfo) => {
      alert(JSON.stringify(values, null, 2))
    },
    // validate, // Función que valida los campos del formulario
    // Esquema de validación usando la librería yup
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    })
  })

  return (
    <form onSubmit={formik.handleSubmit}> {/* Evento de submit de formik */}
      <label htmlFor='firstName'>First Name</label>
      <input
        type='text'
        id='firstName'
        // name='firstName' // El nombre debe ser al de initialValues
        // onChange={formik.handleChange} // Evento del change del input
        // onBlur={formik.handleBlur} // Evento del blur del input
        // value={formik.values.firstName} // Valor del input dado por formik
        {...formik.getFieldProps('firstName')} // Lo mismo que las cuatro 4 props de arriba
      />
      {/* First is for real time feedback && second is for submission feedback */}
      {(formik.touched.firstName && formik.errors.firstName) && (
        <div>{formik.errors.firstName}</div> /* Errores del campo firstName */
      )}

      <label htmlFor='lastName'>Last Name</label>
      <input
        type='text'
        id='lastName'
        {...formik.getFieldProps('lastName')}
      />
      {(formik.touched.lastName && formik.errors.lastName) && (
        <div>{formik.errors.lastName}</div>
      )}

      <label htmlFor='email'>Email Address</label>
      <input
        type='email'
        id='email'
        {...formik.getFieldProps('email')}
      />
      {(formik.touched.email && formik.errors.email) && (
        <div>{formik.errors.email}</div>
      )}

      <button type='submit'>
        Submit
      </button>
    </form>
  )
}
