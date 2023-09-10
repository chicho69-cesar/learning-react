import { Formik, Form } from 'formik'

import type { UserInfo } from '../types.d'
import Checkbox from './customs/Checkbox'
import Radio from './customs/Radio'
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
          notificationType: '',
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
        {/* Formik puede recibir un como children un componente Form o una función que 
        recibe como argumento el parámetro formik, el cual es un objeto que contiene
        todas las propiedades que nos interesan del formulario, y esta función regresa
        el componente Form que se renderizara */}
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

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Radio name='notificationType' value='daily'>
                Daily
              </Radio>

              <Radio name='notificationType' value='weekly'>
                Weekly
              </Radio>
            </div>

            <Checkbox name='acceptedTerms'>
              I accept the terms and conditions
            </Checkbox>

            <div>
              {/* El reset manda llamar a la función formik.handleReset */}
              <button type='reset'>
                Reset
              </button>

              {/* El submit manda llamar a la función formik.handleSubmit */}
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
