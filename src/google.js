//import * as jose from 'jose';
import jwt_decode from 'jwt-decode';


window.decodeJwtResponse = function(credential) {
   return jwt_decode(credential);
}