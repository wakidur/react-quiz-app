import { UsersDB } from "../utilities/dataStore";
import { setItemToLocalStorage } from "../utilities/localStorage";

export const auth = (email, password) => {
    const existUser = UsersDB.find((x) => x.email === email && x.password === password);
    if (existUser) {
        setItemToLocalStorage('authUserInfo', {email, id: existUser._id, role: existUser.role});
        return true;
    }
    return false;

}