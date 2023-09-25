import { rest } from 'msw';
import { server } from '../server';
import { DB_API_URL } from '../../constants';

function getMockClient400Error() {
  server.resetHandlers(
    rest.get(DB_API_URL, (_, response, context) => {
      return response(
        context.json({
          response_code: 2,
          results: [],
        })
      );
    })
  );
}

export default getMockClient400Error;
