export default function checkToken(req, res, next) {
    // check
    if(req.url.toLowerCase().trim() == '/user/login'.toLowerCase().trim()
            || req.url == '/user/register'){
            next()
            return
            }
}