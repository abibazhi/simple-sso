const isAuthenticated = (req, res, next) => {
  // simple check to see if the user is authenicated or not,
  // if not redirect the user to the SSO Server for Login
  // pass the redirect URL as current URL
  // serviceURL is where the sso should redirect in case of valid user
  //const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
  // const redirectURL = `https://${req.headers.host}${req.path}`;
  // 这个req.path是/，而不是we，怎么回事情，还不知道？！
  const redirectURL = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  // const redirectURL = `https://${req.headers.host}${req.originalUrl}`;
  // console.log(req.url)
  // console.log(req.originalUrl)
  // console.log(redirectURL)
  // console.log('135')
  if (req.session.user == null) {
    return res.redirect(
      `https://daxumi.cn/simplesso/login?serviceURL=${redirectURL}`
      //`http://daxumi.cn:3010/simplesso/login?serviceURL=${redirectURL}`
      // `http://sso.ankuranand.com:3010/simplesso/login?serviceURL=${redirectURL}`
    );
  }
  console.log("isAuthenticated认证检查，通过！")
  next();
};

module.exports = isAuthenticated;
