import React from 'react';
import styled, { css } from 'styled-components';
import NavBar from './NavBar';

type Props = {
  layoutType?: 'default' | 'main';
  children: React.ReactNode;
};

function Layout({ layoutType = 'default', children }: Props) {
  return (
    <Container layoutType={layoutType}>
      {layoutType === 'default' && <NavBar />}
      {children}
    </Container>
  );
}

const defaultLayoutCss = css``;

const mainLayoutCss = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.main<{ layoutType: 'default' | 'main' }>`
  ${({ layoutType }) =>
    layoutType === 'default' ? defaultLayoutCss : mainLayoutCss}
`;

export default Layout;
