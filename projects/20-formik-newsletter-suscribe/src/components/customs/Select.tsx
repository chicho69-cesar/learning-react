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

      {/* Creamos un elemento select y los options serán pasados como la propiedad
      children a traves de las props del tipo SelectProps */}
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
