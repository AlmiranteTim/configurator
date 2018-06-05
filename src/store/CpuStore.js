import { decorate, observable, flow, action } from "mobx";

class CpuStore {
    
    list = [];
    uploaded = false;
    sortList = false;

    uploadListFromServer = flow(function*() {  //flow - генератор

        this.uploaded = false;
        this.list = [];   //берем из внешнего пространства list

        try {
            const res = yield fetch('http://api.timurn1w.beget.tech/api/getCpuList')   //в res кладем фетч, yield чтобы данные успели загрузиться
            const json = yield res.json() //все в json

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
            const res = yield fetch('http://api.timurn1w.beget.tech/api/getCpuListSortValueDown')   //в res кладем фетч, yield чтобы данные успели загрузиться
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
            const res = yield fetch('http://api.timurn1w.beget.tech/api/getCpuListSortValueUp')   //в res кладем фетч, yield чтобы данные успели загрузиться
            const json = yield res.json() //все в json

            this.uploaded = true;
            this.list = json;
            this.sortList = false;
        }
        catch (e) {
            this.uploaded = true;

        }
    });

    sendToServer = flow(function*(data) {  //data это то, что мы отправяем на сервер
        this.uploaded = false;
        if(typeof data.value === 'string'){
            data.value = data.value.replace(/\s/g, '');
        }

        var url = '';
        if (data.id) { //если есть id  то апдейтим
            url = 'http://api.timurn1w.beget.tech/api/updateCpu/' + data.id  //data.id - ссылка на то, что апдейтим
        }
        else {
            url = 'http://api.timurn1w.beget.tech/api/createCpu' // если нет id , то создаем
        }
        try {
            var res = yield fetch(url, {
                method: 'POST',
                body: JSON.stringify(data), //data это то, что мы вводим в поля и отпрлявем
                headers: { //посылаем как json файл
                    'Content-Type': 'application/json',
                    //'token': userStore.token
                }
            });

            res = yield fetch('http://api.timurn1w.beget.tech/api/getCpuList')//выводим cpuList
            var json = yield res.json()

            this.uploaded = true;
            this.list = json;
        }
        catch (e) {
            this.uploaded = true;
        }
    });

    deleteItem = flow(function*(data) { //data обьект одного компонента в CpuList

        this.uploaded = false;

        try {
            var res = yield fetch('http://api.timurn1w.beget.tech/api/deleteCpu/' + data.id, { //удаляем компонент по id
                method: 'POST'
            })
            res = yield fetch('http://api.timurn1w.beget.tech/api/getCpuList')
            var json = yield res.json()


            this.uploaded = true;
            this.list = json;
        }
        catch (e) {
            this.uploaded = true;
        }
    });
}



export default decorate(CpuStore, {

    list: observable.ref,
    uploaded: observable,
    sortList: observable,
    uploadSortDownListFromServer: action.bound,
    uploadSortUpListFromServer: action.bound,
    uploadListFromServer: action.bound,
    sendToServer: action.bound,
    deleteItem: action.bound
})
