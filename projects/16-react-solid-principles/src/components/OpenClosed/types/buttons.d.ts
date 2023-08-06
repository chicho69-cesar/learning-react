import React from 'react'

export type Props = {
  title: string
  type: 'default' | 'withLinkButton' | 'withNormalButton'
  href?: string
  buttonText?: string
  onClick?: () => void
}

export type TitleProps = {
  title: string
  children?: React.ReactElement
}

export type TitleWithLinkProps = {
  title: string
  href?: string
  buttonText?: string
}

export type TitleWithButtonProps = {
  title: string
  buttonText?: string
  onClick?: () => void
}

export type TitleWithEmojiProps = {
  title: string
  emoji?: string
}
