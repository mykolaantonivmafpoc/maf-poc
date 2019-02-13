// A simple singleton service to hold the user logged in
//    (and avoid connecting too many components to the store)

class AuthService {
  user = null;

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return (this.user && this.user.authdata);
  }
}

export default new AuthService();
