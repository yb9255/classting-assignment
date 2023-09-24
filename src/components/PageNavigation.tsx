import { styled } from 'styled-components';

type Props = {
  totalPageCount: number;
  currentPage: number;
  onNext: () => void;
  onPrev: () => void;
};

function PageNavigation({
  totalPageCount,
  currentPage,
  onNext,
  onPrev,
}: Props) {
  return (
    <PageNavigationContainer>
      <Cell onClick={onPrev}>{'<'}</Cell>
      <PageCount>{`${currentPage} / ${totalPageCount}`}</PageCount>
      <Cell onClick={onNext}>{'>'}</Cell>
    </PageNavigationContainer>
  );
}

const PageNavigationContainer = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  height: 56px;
  justify-content: center;
  border-radius: 10px;
`;

const PageCount = styled.div`
  font-size: 24px;
  text-align: center;
  width: 100px;
`;

const Cell = styled.button`
  align-items: center;
  display: flex;
  height: 56px;
  justify-content: center;
  width: 56px;
  border: none;
`;

export default PageNavigation;
