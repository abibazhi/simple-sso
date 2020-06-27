const url = require("url");
const axios = require("axios");
const { URL } = url;
const { verifyJwtToken } = require("./jwt_verify");
// const validReferOrigin = "http://sso.ankuranand.com:3010";
// const ssoServerJWTURL = "http://sso.ankuranand.com:3010/simplesso/verifytoken";
// const validReferOrigin = "http://daxumi.cn:3010";
// const ssoServerJWTURL = "http://daxumi.cn:3010/simplesso/verifytoken";

const validReferOrigin = "https://daxumi.cn/";
const ssoServerJWTURL = "https://daxumi.cn/simplesso/verifytoken";

const ssoRedirect = () => {
  return async function(req, res, next) {
    // check if the req has the queryParameter as ssoToken
    // and who is the referer.
    console.log('checkSSORedirect0...');
    const { ssoToken } = req.query;
    if (ssoToken != null) {
      // to remove the ssoToken in query parameter redirect.
      const redirectURL = url.parse(req.url).pathname;
      console.log('checkSSORedirect1...');
      try {
        const response = await axios.get(
          `${ssoServerJWTURL}?ssoToken=${ssoToken}`,
          {
            headers: {
              Authorization: "Bearer 1g0jJwGmRQhJwvwNOrY4i90kD0m"
            }
          }
        );
        const { token } = response.data;
        const decoded = await verifyJwtToken(token);
        console.log('checkSSORedirect2...decoded,token',decoded,token);
        // now that we have the decoded jwt, use the,
        // global-session-id as the session id so that
        // the logout can be implemented with the global session.
        req.session.user = decoded;
      } catch (err) {
        return next(err);
      }
      console.log('checkSSORedirect3...'+`${redirectURL}`)
      return res.redirect(`${redirectURL}`);
    } else console.log('checkSSORedirect4,ssotoken is null')

    return next();
  };
};

module.exports = ssoRedirect;
