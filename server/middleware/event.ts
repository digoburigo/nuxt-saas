export default defineEventHandler(async (event) => {
  event.context.node = event.node;
});

declare module 'h3' {
  interface H3EventContext {
    node: H3Event['node'];
  }
}
