import React, { useState } from 'react'
import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'

export function CreateNewUser () {
  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      setResult('ko')
    }

    addUser({ name, email, github })
    setResult('ok')

    form.reset()
  }

  return (
    <Card style={{ marginTop: '16px' }}>
      <Title>Create New User</Title>

      <form onSubmit={handleSubmit}>
        <TextInput name='name' placeholder='Aquí el nombre' />
        <TextInput name='email' placeholder='Aquí el email' />
        <TextInput name='github' placeholder='Aquí el usuario de GitHub' />

        <div>
          <Button type='submit' style={{ marginTop: '16px' }}>
            Crear usuario
          </Button>

          <span>
            {result === 'ok' && (
              <Badge color='green' style={{ marginLeft: '8px' }}>
                Usuario guardado correctamente
              </Badge>
            )}

            {result === 'ko' && (
              <Badge color='red' style={{ marginLeft: '8px' }}>
                Error en los campos
              </Badge>
            )}
          </span>
        </div>
      </form>
    </Card>
  )
}
