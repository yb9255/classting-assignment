import { useDispatch } from 'react-redux';
import StyledLink from '../StyledLink';
import { initError } from '../../redux/questions/reducer';

function Error() {
  const dispatch = useDispatch();

  return (
    <>
      <h2>ERROR!</h2>
      <StyledLink to="/" onClick={() => dispatch(initError())}>
        돌아가기
      </StyledLink>
    </>
  );
}

export default Error;
