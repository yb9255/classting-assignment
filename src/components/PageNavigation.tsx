import { styled } from 'styled-components';
import StyledButton from './StyledButton';

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
      <StyledButton onClick={onPrev}>{'<'}</StyledButton>
      <PageCount>{`${currentPage} / ${totalPageCount}`}</PageCount>
      <StyledButton onClick={onNext}>{'>'}</StyledButton>
    </PageNavigationContainer>
  );
}

const PageNavigationContainer = styled.div`
  align-items: center;
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

export default PageNavigation;
