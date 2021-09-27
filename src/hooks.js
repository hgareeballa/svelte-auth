
import cookie from 'cookie'
export const handle = async ({ request, resolve }) => {
    const cookies = cookie.parse(request.headers.cookie || { user: null })
    console.log({ user: cookies.user });

    //do before
    request.locals.user = cookies.user
    const response = await resolve(request)
    //do after

    response.headers['set-cookie'] = `user=${request.locals.user || ''}; Path=/; HttpOnly`
    return response
}

export const getSession = (req) => {
    console.log('Get Session User:', req.locals.user);
    return {
        user: req.locals.user
    }
}