import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'

import type { UserInfo } from '../types.d'

export default function SignupForm() {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={(values: UserInfo) => {
        alert(JSON.stringify(values, null, 2))
      }}
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
      <Form>
        <label htmlFor='firstName'>First Name</label>
        <Field type='text' name='firstName' />
        <ErrorMessage name='firstName' />

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
