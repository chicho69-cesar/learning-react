import * as Yup from 'yup'

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  notificationType: Yup.string()
    .oneOf(
      ['daily', 'weekly'],
      'Invalid notification type'
    )
    .required('Required'),
  acceptedTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions.')
    .required('Required'),
  jobType: Yup.string()
    .oneOf(
      ['designer', 'development', 'product', 'other'],
      'Invalid job type'
    )
    .required('Required'),
})
