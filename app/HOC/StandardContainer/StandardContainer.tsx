import * as React from 'react';

export const standardContainer = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  const style = {
    backgroundColor: 'white',
    width: '100%',
  };

  return class StandardContainer extends React.Component<P> {
    public render(): JSX.Element {
      return <Component style={style} {...this.props} />;
    }
  };
};
