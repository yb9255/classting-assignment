import { useDispatch } from 'react-redux';
import StyledLink from '../StyledLink';
import { initError } from '../../redux/questions/reducer';

function Error() {
  const dispatch = useDispatch();

  return (
    <>
      <h2>ERROR!</h2>
      <div onClick={() => dispatch(initError())}>
        <StyledLink to="/">돌아가기</StyledLink>
      </div>
    </>
  );
}

export default Error;
