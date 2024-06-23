import request from "request";

export const reCaptchaVerification = async (req, res, next) => {
    const redirectPage = (req.originalUrl).split('/');
    const page = redirectPage[redirectPage.length-1];

    if (!req.body['g-recaptcha-response']) {
        req.flash('error', "Validate captcha first.");
        return (page == 'create') ? res.redirect('/api/user/sign-up'):res.redirect('/api/user/sign-in');
    }
    const verificationUrl = `${process.env.CAPTCHA_VERIFICATION_URL}secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}`;
    
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (!body.success) {
            req.flash('error', "Error in Captcha Verification. Please try again.");
            return (page == 'create') ? res.redirect('/api/user/sign-up'):res.redirect('/api/user/sign-in');
        }
        next();
    });
}