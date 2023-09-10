import { useField, FieldHookConfig } from 'formik'

interface Props {
  children: JSX.Element | string
}

type RadioProps = Props & FieldHookConfig<any>

export default function Radio({ children, ...props }: RadioProps) {
  /* Nuestro componente sera de tipo radio */
  const [field, meta] = useField({ ...props, type: 'radio' })

  return (
    <div>
      <label className='radio-input'>
        <input
          type='radio'
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
