import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface ReduxProps {
  component: React.ComponentType
  onMount: (o: object) => void
  onUnmount: (o: object) => void
  dispatch: () => void
}

type PresenterProps = ReduxProps & ReactRouter.RouteComponentProps<{ [key: string]: string }>

function makeDataFetchingContainer(RouteComponent: React.ComponentType, mount, unmount): React.ComponentClass {
  class DataFetcher extends React.Component<PresenterProps, {}> {
    static displayName: string

    componentDidMount() {
      const { onMount, match } = this.props;

      onMount( match ? match.params : null );
    }

    componentWillUnmount() {
      const { onUnmount, match } = this.props;

      onUnmount( match ? match.params : null );
    }

    // Ideally, this component doesn't update and Redux handles everything
    //   However, React Router needs to be aware of updates https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
    //   Counter point: https://github.com/ReactTraining/react-router/issues/4671#issuecomment-312851364
    // shouldComponentUpdate() {
    //   return false;
    // }

    render() {
      return <RouteComponent />;
    }
  };

  function mapDispatchToProps(dispatch) {
    return {
      onMount: bindActionCreators(mount, dispatch),
      onUnmount: bindActionCreators(unmount, dispatch)
    };
  }

  const prefix = RouteComponent.displayName || 'Unknown';
  DataFetcher.displayName = `${prefix}DataFetcher`;

  const Main = connect(null, mapDispatchToProps)(DataFetcher);

  return Main;
}

export default makeDataFetchingContainer;
