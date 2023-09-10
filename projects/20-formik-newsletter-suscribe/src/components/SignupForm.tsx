import { Formik, Form } from 'formik'

import type { UserInfo } from '../types.d'
import Checkbox from './customs/Checkbox'
import Select from './customs/Select'
import TextInput from './customs/TextInput'
import { validationSchema } from '../validations/signup.validations'

export default function SignupForm() {
  return (
    <>
      <h1>Suscribete!!!</h1>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false,
          jobType: '',
        }}
        onSubmit={(values: UserInfo, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form>
            <TextInput
              label='First Name'
              name='firstName'
              type='text'
              placeholder='John'
            />

            <TextInput
              label='Last Name'
              name='lastName'
              type='text'
              placeholder='Doe'
            />

            <TextInput
              label='Email Address'
              name='email'
              type='email'
              placeholder='john@gmail.com'
            />

            <Select label='Job Type' name='jobType'>
              <option value=''>Select a job type</option>
              <option value='designer'>Designer</option>
              <option value='development'>Development</option>
              <option value='product'>Product Manager</option>
              <option value='other'>Other</option>
            </Select>

            <Checkbox name='acceptedTerms'>
              <>
                I accept the terms and conditions
              </>
            </Checkbox>

            <div>
              <button type='reset'>
                Reset
              </button>

              <button type='submit' disabled={formik.isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
