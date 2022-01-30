import './socialSignin.css';
import jwt_decode from 'jwt-decode';


window.decodeJwtResponse = function (credential) {
    return jwt_decode(credential);
}

const scripts = [
    'https://connect.facebook.net/en_US/sdk.js',
    'https://accounts.google.com/gsi/client',
    'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'
];

function loadScripts() {
    let fragment = document.createDocumentFragment();
    for (const src of scripts) {
        let script = document.createElement('script');
        script.defer = true;
        script.async = true;
        script.type = 'text/javascript';
        script.src = src;

        fragment.appendChild(script);
    }
    document.body.appendChild(fragment);
}

loadScripts();


window.handleCredentialResponse = function (response) {
    console.log(response);
    const responsePayload = decodeJwtResponse(response.credential);
    console.log(responsePayload);
    document.getElementById('user_email').textContent = responsePayload.email;
    document.getElementById('user_name').textContent = `${responsePayload.given_name} ${responsePayload.family_name}`
    console.log("Encoded JWT ID token: " + response.credential);
}
window.onload = function () {
    function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
        console.log('statusChangeCallback');
        // console.log(response);                   // The current login status of the person.
        if (response.status === 'connected') {   // Logged into your webpage and Facebook.
            testAPI();
        }
    }


    function checkLoginState() {               // Called when a person is finished with the Login Button.
        FB.getLoginStatus(function (response) {   // See the onlogin handler
            statusChangeCallback(response);
        });
    }

    window.checkLoginState = checkLoginState;


    window.fbAsyncInit = function () {
        FB.init({
            appId: '436330514840254',
            cookie: true,                     // Enable cookies to allow the server to access the session.
            xfbml: true,                     // Parse social plugins on this webpage.
            version: 'v12.0'           // Use this Graph API version for this call.
        });


        FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
            statusChangeCallback(response);        // Returns the login status.
        });
    };

    function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            console.log(response);
            console.log('Successful login for: ' + response.name);
            document.getElementById('user_email').textContent = response.email;
            document.getElementById('user_name').textContent = response.name;
        },{fields: ['email, name']});
    }

    google.accounts.id.initialize({
        client_id: "1080048136020-1ue44mn6aopjfde6qbjev8fii2kb712q.apps.googleusercontent.com",
        callback: handleCredentialResponse,

    });
    google.accounts.id.renderButton(
        document.getElementById("googleSignin"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    //google.accounts.id.prompt(); // also display the One Tap dialog

    AppleID.auth.init({
        clientId: 'com.iforex.trader',
        scope: 'name email',
        redirectURI: 'https://local.iforex.com',
        usePopup: true //or false defaults to false
    });
}

