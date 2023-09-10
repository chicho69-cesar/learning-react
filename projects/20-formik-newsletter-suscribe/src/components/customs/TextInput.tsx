import { useField, FieldHookConfig } from 'formik'

interface Props {
  label: string
}

type TextInputProps = Props & FieldHookConfig<any>

export default function TextInput({ label, ...props }: TextInputProps) {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      
      <input
        className={`
          text-input
          ${(meta.touched && meta.error) && 'input-error'}
        `}
        {...field}
        {...(props as any)}
      />

      {meta.touched && meta.error && (
        <div className='error'>
          {meta.error}
        </div>
      )}
    </>
  )
}
