import { rest } from 'msw';
import { server } from '../server';
import { DB_API_URL } from '../../constants';

function getMockEmptyData() {
  server.resetHandlers(
    rest.get(DB_API_URL, (_, response, context) => {
      return response(
        context.json({
          response_code: 1,
          results: [],
        })
      );
    })
  );
}

export default getMockEmptyData;
