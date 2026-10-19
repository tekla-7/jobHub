import jwt from "jsonwebtoken";

const KEY = process.env.JWT_SECRET;
const REFRESH_KEY = process.env.JWT_REFRESH_SECRET;
export const createJSONToken = (id) => {
    return jwt.sign({id}, KEY, {expiresIn: '1d'});
}
export const createJSONRefreshToken = (id) => {
    return jwt.sign({id},  REFRESH_KEY, {expiresIn: '7d'});
}
export const validateJSONToken = token => {
    return jwt.verify(token,KEY);
}
export const validateJSONRefreshToken = token => {
    return jwt.verify(token,REFRESH_KEY);
}
