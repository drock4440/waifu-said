import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('loggedInUser');
      return true;
    }
    return false;
  }

  getToken() {
    const user = localStorage.getItem('loggedInUser');
    const token = user? JSON.parse(user).token : null;
    return token;
  }

  login(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
  }
}

export default new AuthService();
