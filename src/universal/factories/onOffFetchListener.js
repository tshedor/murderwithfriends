function offIterator(item) {
  return item.ref.off(item.eventType || 'value', item.callback)
}

function onIterator(item) {
  return item.ref.on(item.eventType || 'value', item.callback)
}

const makeOnOffListener = (generateListeners) => {
  let on_listeners = [];

  const onMount = props => (dispatch, getState) => {
    on_listeners.forEach(offIterator);

    on_listeners = generateListeners.call(null, dispatch, props);

    on_listeners.forEach(onIterator);
  }

  const onUnmount = () => (dispatch) => {
    on_listeners.forEach(onIterator);
  }

  return { onMount, onUnmount };
}

export default makeOnOffListener;
