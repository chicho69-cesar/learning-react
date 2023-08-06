import React from 'react'

const ButtonSizes = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '40px',
} as const

type ButtonProps = {
  children: React.ReactNode
  color?: string
  size: keyof typeof ButtonSizes
}

function Button({ children, color = 'black', size }: ButtonProps) {
  const buttonSize = ButtonSizes[size]

  return (
    <button style={{ backgroundColor: color, fontSize: buttonSize }}>
      {children}
    </button>
  )
}

type ColorizedButtonsProps = Omit<ButtonProps, 'color'>

function RedButton({ children, size }: ColorizedButtonsProps) {
  return <Button color='red' size={size}>{children}</Button>
}

function GreenButton({ children, size }: ColorizedButtonsProps) {
  return <Button color='green' size={size}>{children}</Button>
}

function BlueButton({ children, size }: ColorizedButtonsProps) {
  return <Button color='blue' size={size}>{children}</Button>
}

export default function LiskovSubstitution() {
  return (
    <div>
      <RedButton size='md'>Rojo</RedButton>
      <GreenButton size='md'>Verde</GreenButton>
      <BlueButton size='md'>Azul</BlueButton>
      <Button size='md'>Default</Button>
    </div>
  )
}
