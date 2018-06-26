import * as React from 'react'

interface PresenterProps {
  onClose: () => void
  showClose?: boolean
  className: string
  children: React.ReactNode
}

declare const Presenter: React.ComponentType<PresenterProps>;

export default Presenter;
