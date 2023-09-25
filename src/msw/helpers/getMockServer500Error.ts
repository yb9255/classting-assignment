import { rest } from 'msw';
import { server } from '../server';
import { DB_API_URL } from '../../constants';

function getMockServer500Error() {
  server.resetHandlers(
    rest.get(DB_API_URL, (_, response, context) => {
      return response(context.status(500));
    })
  );
}

export default getMockServer500Error;
