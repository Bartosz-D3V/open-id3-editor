import * as React from 'react';
import styled from 'styled-components';

export const standardContainer = <P extends object>(Component: React.ComponentType<P>) => {
  const ComponentWrapper = styled(Component)`
    background-color: white;
    width: 100%;
  `;

  return class StandardContainer extends React.Component<P> {
    public render(): JSX.Element {
      return <ComponentWrapper {...this.props} />;
    }
  };
};
