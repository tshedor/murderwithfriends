import * as React from 'react'

interface PresenterProps {
  component: React.ReactNode
  onMount: () => void
  onUnmount: () => void
}

export default class extends React.Component<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  componentDidMount() {
    this.props.onMount();
  }

  componentDidUnmount() {
    this.props.onUnmount();
  }

  componentShouldUpdate() {
    return false;
  }

  render() {
    const { component: Component } = this.props;

    return <Component />;
  }
};
