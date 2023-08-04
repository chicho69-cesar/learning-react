import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  /* Aplicando esta técnica en el debounce cada que cambie el estado del debounce
  se va a volver a crear el timeout por lo que no se va a establecer el valor
  final del texto hasta que no pase el delay sin cambiar el valor del debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

/*
línea del tiempo de cómo se comporta el usuario:

0ms -> user type - 'h' -> value
  useEffect ... L7
150ms -> user type 'he' -> value
  clear useEffect - L11
  useEffect ... L7
300ms -> user type 'hel'  -> value
  clear useEffect - L11
  useEffect ... L7
400ms -> user type 'hell'  -> value
  clear useEffect - L11
  useEffect ... L7
900ms -> L8 -> setDebouncedValue('hell') -> debounceValue L14
*/
