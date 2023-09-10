import { useField, FieldHookConfig } from 'formik'

interface Props {
  children: JSX.Element | string
}

/* Creamos el tipo para las props que se necesita en un custom formik element,
usando las props que nosotros queremos mas las obligatorias de FieldHookConfig */
type CheckboxProps = Props & FieldHookConfig<any>

export default function Checkbox({ children, ...props }: CheckboxProps) {
  /* Creamos nuestro custom field usando el hook useField, el cual acepta las props
  de un elemento de formulario html y devuelve un array con las propiedades del 
  elemento (field) y una con los valores pasados por formik (meta) */
  const [field, meta] = useField({ ...props, type: 'checkbox' })

  return (
    <div>
      <label className='checkbox-input'>
        <input
          type='checkbox'
          {...field} // Es necesario pasar le las props del field
          {...(props as any)} // Le pasamos las props pasadas desde la llamada al componente
        />

        {children}
      </label>

      {/* Hacemos bind de los errores en el evento blur del formulario (touched)
      y los errores del evento submit (error) */}
      {meta.touched && meta.error && (
        <div className='error'>
          {meta.error}
        </div>
      )}
    </div>
  )
}
