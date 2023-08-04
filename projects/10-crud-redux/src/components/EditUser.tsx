import React, { useState } from 'react'
import { Badge, Button, Card, TextInput, Title } from '@tremor/react'

import { useAppSelector } from '../hooks/store'
import { useUIActions } from '../hooks/useUIActions'
import { useUserActions } from '../hooks/useUserActions';

export const EditUser = () => {
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  /* Accedemos al estado de la slice de UI */
  const ui = useAppSelector((state) => state.ui)
  /* Accedemos a una acción definida para UI */
  const { stablishIsAddingUser } = useUIActions()
  /* Accedemos a una acción definida para User  */
  const { editUser } = useUserActions()

  const { userToEdit } = ui

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const newName = formData.get('name') as string
    const newEmail = formData.get('email') as string
    const newGitHub = formData.get('github') as string

    if (!newName || !newEmail || !newGitHub) {
      setResult('ko')
    }

    editUser({
      id: userToEdit?.id!,
      email: newEmail,
      github: newGitHub,
      name: newName,
    })
    setResult('ok')

    form.reset()
    stablishIsAddingUser(true)
  }

  return (
    <Card style={{ marginTop: '16px' }}>
      <Title>Edit User</Title>

      <form onSubmit={handleSubmit}>
        <TextInput name='name' defaultValue={userToEdit?.name} placeholder='Nuevo nombre' />
        <TextInput name='email' defaultValue={userToEdit?.email} placeholder='Nuevo email' />
        <TextInput name='github' defaultValue={userToEdit?.github} placeholder='Nuevo usuario de GitHub' />

        <div 
          style={{ 
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Button type='submit'>
            Guardar cambios
          </Button>

          <Button type='button' onClick={() => stablishIsAddingUser(true)}>
            Cancelar
          </Button>

          <span>
            {result === 'ok' && (
              <Badge color='green' style={{ marginLeft: '8px' }}>
                Usuario actualizado correctamente
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
