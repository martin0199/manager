const TOKEN = 'Authorization'
const auth = {
  getToken: () => sessionStorage.getItem(TOKEN),
  setToken: token => sessionStorage.setItem(TOKEN, token),
  removeToken: () => sessionStorage.removeItem(TOKEN)
}

export default auth
