import React from 'react';

export function withRef(Component) {
  class WithRef extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;

      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return <WithRef {...props} forwardedRef={ref} />;
  });
}
