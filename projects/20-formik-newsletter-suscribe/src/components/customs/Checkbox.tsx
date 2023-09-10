import { useField, FieldHookConfig } from 'formik'

interface Props {
  children: JSX.Element
}

type CheckboxProps = Props & FieldHookConfig<any>

export default function Checkbox({ children, ...props }: CheckboxProps) {
  const [field, meta] = useField({ ...props, type: 'checkbox' })

  return (
    <div>
      <label className='checkbox-input'>
        <input
          type='checkbox'
          {...field}
          {...(props as any)}
        />

        {children}
      </label>

      {meta.touched && meta.error && (
        <div className='error'>
          {meta.error}
        </div>
      )}
    </div>
  )
}
