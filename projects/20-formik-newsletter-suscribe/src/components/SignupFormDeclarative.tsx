import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'

import type { UserInfo } from '../types.d'

export default function SignupForm() {
  return (
    /* Mediante el componente de Formik podemos hacer lo mismo que con useFormik pero
    de una forma mas declarativa. */
    <Formik
      // Valores iniciales
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      // Evento submit del form
      onSubmit={(values: UserInfo) => {
        alert(JSON.stringify(values, null, 2))
      }}
      // Esquema de validaciones
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
    >
      {/* Component Form de formik para usar un formulario con componentes 
      declarativos de formik */}
      <Form>
        <label htmlFor='firstName'>First Name</label>
        <Field type='text' name='firstName' /> {/* Elemento de formulario de formik por default es type='text' */}
        <ErrorMessage name='firstName' /> {/* Mensaje de error dado por el esquema de validaciones de formik */}

        <label htmlFor='lastName'>First Name</label>
        <Field type='text' name='lastName' />
        <ErrorMessage name='lastName' />

        <label htmlFor='email'>First Name</label>
        <Field type='email' name='email' />
        <ErrorMessage name='email' />

        <button type='submit'>
          Submit
        </button>
      </Form>
    </Formik>
  )
}
