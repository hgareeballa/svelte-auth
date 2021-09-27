export const get = async (req) => {
    req.locals.user = null
    return {
        status: 302,
        headers: {
            location: '/'
        }
    }
}