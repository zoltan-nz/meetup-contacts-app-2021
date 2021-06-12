import { rest, RestHandler } from 'msw';

export const getStatic: RestHandler = rest.get('/static/media/*', async (req, res, ctx) => {
  const originalResponse = await ctx.fetch(req);
  const originalResponseData = await originalResponse.arrayBuffer();

  ctx.set('Cache-Control', 'public, max-age=604800, immutable');
  return res(ctx.status(200), ctx.body(originalResponseData));
});
