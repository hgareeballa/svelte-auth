const clientId = import.meta.env.VITE_CLIENT_ID
const secret = import.meta.env.VITE_CLIENT_SECRET
const tokenURL = 'https://github.com/login/oauth/access_token'
const userURL = 'https://api.github.com/user'

export async function get(req) {
    //get tocket ID
    const code = req.query.get('code')
    const token = await getToken(code)

    //getUser
    const user = await getUser(token)
    req.locals.user = user.login

    return {
        status: 302,
        headers: {
            location: '/'
        }
    }
}

function getToken(code) {
    return fetch(tokenURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: secret,
            code
        })
    }).then(r => r.json())
        .then(r => r.access_token)
}


function getUser(token) {
    return fetch(userURL, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(r => r.json())

}