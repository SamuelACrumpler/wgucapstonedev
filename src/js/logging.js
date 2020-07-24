export function checkSession(){
    if (localStorage.getItem("isLoggedIn") === 'false' || !localStorage.getItem("isLoggedIn")) {
        this.props.history.push('/')
    }
}

