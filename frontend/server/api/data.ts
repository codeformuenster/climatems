export default defineEventHandler((event: any) => {
    const name = getRouterParam(event, 'name')
  
    return `Hello, ${name}!`
  })