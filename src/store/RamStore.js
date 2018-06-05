import { decorate, observable, flow, action } from "mobx";

class RamStore {
    list = [];
    uploaded = false;
    sortList = false;

    uploadListFromServer = flow(function*() {

        this.uploaded = false;
        this.list = [];

        try {
            const res = yield window.fetch('http://api.timurn1w.beget.tech/api/getRamList')
            const json = yield res.json()

            this.uploaded = true;
            this.list = json;
        }
        catch (e) {
            this.uploaded = true;
        }
    });

    uploadSortDownListFromServer = flow(function*() {  //flow - генератор
        this.sortList = false;
        this.uploaded = false;
        this.list = [];   //берем из внешнего пространства list

        try {
            const res = yield fetch('http://api.timurn1w.beget.tech/api/getRamListSortValueDown')   //в res кладем фетч, yield чтобы данные успели загрузиться
            const json = yield res.json() //все в json

            this.uploaded = true;
            this.list = json;
            this.sortList = true;
        }
        catch (e) {
            this.uploaded = true;
        }
    });


    uploadSortUpListFromServer = flow(function*() {  //flow - генератор
        this.sortList = true;
        this.uploaded = false;
        this.list = [];   //берем из внешнего пространства list

        try {
            const res = yield fetch('http://api.timurn1w.beget.tech/api/getRamListSortValueUp')   //в res кладем фетч, yield чтобы данные успели загрузиться
            const json = yield res.json() //все в json

            this.uploaded = true;
            this.list = json;
            this.sortList = false;
        }
        catch (e) {
            this.uploaded = true;

        }
    });

    sendToServer = flow(function*(data) {
        if(typeof data.value === 'string'){
            data.value = data.value.replace(/\s/g, '');
        }
        this.uploaded = false;

        var url = '';
        if (data.id) {
            url = 'http://api.timurn1w.beget.tech/api/updateRam/' + data.id
        }
        else {
            url = 'http://api.timurn1w.beget.tech/api/createRam'
        }

        try {
            var res = yield window.fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    //'token': userStore.token
                }
            })
            res = yield window.fetch('http://api.timurn1w.beget.tech/api/getRamList')
            var json = yield res.json()


            this.uploaded = true;
            this.list = json;
        }
        catch (e) {
            this.uploaded = true;
        }
    });

    deleteItem = flow(function*(data) {

        this.uploaded = false;

        try {
            var res = yield window.fetch('http://api.timurn1w.beget.tech/api/deleteRam/' + data.id, {
                method: 'POST'
            })
            res = yield window.fetch('http://api.timurn1w.beget.tech/api/getRamList')
            var json = yield res.json()

            this.uploaded = true;
            this.list = json;
        }
        catch (e) {
            this.uploaded = true;
        }
    });
}

export default decorate(RamStore, {
    list: observable.ref,
    uploaded: observable,
    sortList: observable,
    uploadSortDownListFromServer: action.bound,
    uploadSortUpListFromServer: action.bound,
    uploadListFromServer: action.bound,
    sendToServer: action.bound,
    deleteItem: action.bound
})
