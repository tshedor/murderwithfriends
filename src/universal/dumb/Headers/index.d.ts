import * as React from 'react'

interface PageTitleProps {
  title: string
  className?: string
  children?: React.ReactNode
}

export declare const PageTitle: React.ComponentType<PageTitleProps>;

interface HelperProps {
  children: React.ReactNode
}

export declare const Helper: React.ComponentType<HelperProps>;
