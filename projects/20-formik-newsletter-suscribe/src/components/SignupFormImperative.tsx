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
  const formik = useFormik<UserInfo>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: (values: UserInfo) => {
      alert(JSON.stringify(values, null, 2))
    },
    // validate
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
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='firstName'>First Name</label>
      <input
        type='text'
        id='firstName'
        // name='firstName'
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.firstName}
        {...formik.getFieldProps('firstName')} // The same as above
      />
      {/* First is for real time feedback && second is for submission feedback */}
      {(formik.touched.firstName && formik.errors.firstName) && (
        <div>{formik.errors.firstName}</div>
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
