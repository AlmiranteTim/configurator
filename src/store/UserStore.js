import { decorate, observable, flow, action } from "mobx"

class UserStore {
    username = localStorage.getItem('timurApp.username') || "";
    token = localStorage.getItem('timurApp.token') || "";
    editMode = false;
    showLoginModal = false;
    tokenUploading = false;
    tokenError = '';



    toggleEditMode = () => {
        this.editMode = !this.editMode;
    };

    openLoginModal = () => {
        this.showLoginModal = true;
    };

    closeLoginModal = () => {
        this.showLoginModal = false;
    };

    toogleTokenUploading = () => {
        this.tokenUploading = !this.tokenUploading;
    };

    logout = () => {
        this.username = "";
        this.token = "";
        this.editMode = false;
        this.tokenError = '';
        localStorage.removeItem('timurApp.username');
        localStorage.removeItem('timurApp.token');
    };


    login = flow(function*(user) {

        this.tokenUploading = true;
        this.tokenError = '';

        try {
            const res = yield window.fetch('http://api.timurn1w.beget.tech/api/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            })
            const json = yield res.json()

            this.username = user.username;
            this.token = json;
            this.tokenUploading = false;
            this.showLoginModal = false;
            localStorage.setItem('timurApp.username', this.username);
            localStorage.setItem('timurApp.token', this.token);


        }
        catch (e) {
            this.tokenUploading = false;
            this.tokenError = 'Неверный логин или пароль';
        }
    });


}

export default decorate(UserStore, {
    username: observable,
    token: observable,
    editMode: observable,
    showLoginModal: observable,
    tokenUploading: observable,
    tokenError: observable,
    toggleEditMode: action,
    openLoginModal: action,
    closeLoginModal: action,
    toogleTokenUploading: action,
    logout: action,
})
