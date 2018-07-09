// This is inspired heavily by https://github.com/apollographql/apollo-client/blob/master/docs/source/recipes/recompose.md

import * as React from 'react'
import { branch, renderComponent, withProps } from 'recompose'
import { graphql, compose } from 'react-apollo'

import Loading from '+dumb/Loading'

const reportNonBreakingError = (propName = 'data') =>
  branch(
    props => props[propName] && props[propName].error,
    withProps(props => { error: props[propName].error })
  );

export const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component)
  );

interface EnhanceProps {
  loadingProp?: string
  errorProp?: string
}

const enhance = (composables: void | void[], component: React.ComponentType, props: EnhanceProps = {}) => {
  const { loadingProp, errorProp } = props;

  let composeArgs = [
    renderWhileLoading(Loading, loadingProp),
    reportNonBreakingError(errorProp)
  ];

  Array.prototype.unshift.apply(composeArgs, [].concat(composables));

  return compose(composeArgs)(component);
}

export default enhance;
