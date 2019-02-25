import * as React from 'react'

interface PresenterProps {
  open?: boolean
  title: string
  toggleOpen: (b: boolean) => void
  children: React.ReactNode
}

declare const Presenter: React.ComponentType<PresenterProps>;

export default Presenter;
