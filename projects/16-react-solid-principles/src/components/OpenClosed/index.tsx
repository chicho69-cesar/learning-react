import { Fragment } from 'react'
import { TitleWithLink } from './components/TitleWithLink'
import { TitleWithButton } from './components/TitleWithButton'
import { TitleWithEmoji } from './components/TitleWithEmoji'

export default function OpenClosed() {
  return (
    <Fragment>
      <TitleWithLink
        title='Link Button'
        buttonText='Aloha!'
        href='https://www.midu.dev'
      />

      <TitleWithButton
        title='Normal Button'
        buttonText='Aloha!'
        onClick={() => console.log('Aloha!')}
      />

      <TitleWithEmoji
        title='Emoji Title'
        emoji='✌'
      />
    </Fragment>
  )
}
