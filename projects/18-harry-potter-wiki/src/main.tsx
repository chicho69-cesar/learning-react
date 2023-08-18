import './index.scss'

import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr';

import App from './App.tsx'
import { fetcher } from './helpers/fetcher.ts';

const root = ReactDOM.createRoot(document.getElementById('root')! as HTMLElement)

root.render(
  <RecoilRoot>
    <SWRConfig value={{ fetcher }}>
      <App />
    </SWRConfig>
  </RecoilRoot>
)
