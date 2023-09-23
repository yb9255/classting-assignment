import React from 'react';
import styled, { css } from 'styled-components';
import NavBar from './NavBar';

type Props = {
  layoutType?: 'default' | 'main';
  children: React.ReactNode;
};

function Layout({ layoutType = 'default', children }: Props) {
  return (
    <Container $layoutType={layoutType}>
      {layoutType === 'default' && <NavBar />}
      {children}
    </Container>
  );
}

const mainLayoutCss = css`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
`;

const defaultLayoutCss = css`
  width: 100vw;
  height: 100vh;
  padding: 30px;
  box-sizing: border-box;
`;

const Container = styled.main<{ $layoutType: 'default' | 'main' }>`
  ${({ $layoutType }) =>
    $layoutType === 'default' ? defaultLayoutCss : mainLayoutCss}
`;

export default Layout;
