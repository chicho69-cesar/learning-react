import { useField, FieldHookConfig } from 'formik'

interface Props {
  label: string
}

type SelectProps = Props & FieldHookConfig<any>

export default function Select({ label, ...props }: SelectProps) {
  const [field, meta] = useField(props)

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>

      <select
        {...field}
        {...(props as any)}
      />

      {meta.touched && meta.error && (
        <div className='error'>
          {meta.error}
        </div>
      )}
    </div>
  )
}
