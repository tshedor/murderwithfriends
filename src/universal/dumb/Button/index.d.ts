import * as React from 'react';

interface PresenterProps {
  component?: React.ComponentClass
  path?: string
  inverted?: boolean
  large?: boolean
  small?: boolean
  className?: string
  iconName?: string
  children?: React.ReactNode
  value?: string
}

declare const Presenter: React.ComponentType<PresenterProps>

export default Presenter
