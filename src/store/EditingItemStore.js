import { decorate, observable, action } from "mobx"
import {flow} from "mobx"

class EditingItemStore {

    editingCpu = {};
    editingGpu = {};
    editingRam = {};
    editingBp = {};
    editingMb = {};
    editingSo = {};
    editingSsd = {};

    setEditingCpu = (item) => {
        this.editingCpu = item;
    };
    setEditingGpu = (item) => {
        this.editingGpu = item;
    };
    setEditingRam = (item) => {
        this.editingRam = item;
    };
    setEditingBp = (item) => {
        this.editingBp = item;
    };
    setEditingMb = (item) => {
        this.editingMb = item;
    };
    setEditingSo = (item) => {
        this.editingSo = item;
    };
    setEditingSsd = (item) => {
        this.editingSsd = item;
    };




    uploadFile = flow(function*(event, item) {
        const fileUrl = Date.now();
        try {
            yield fetch(`http://api.timurn1w.beget.tech/api/uploadFile/${fileUrl}`, {
                method: 'POST',
                body: event.target.files[0]
            });
            item.image = fileUrl;
        }
        catch (e) {}
    });

}



export default decorate(EditingItemStore, {
    validate: observable,
    editingCpu: observable,
    editingGpu: observable,
    editingRam: observable,
    editingBp: observable,
    editingMb: observable,
    editingSo: observable,
    editingSsd: observable,
    uploadFile: action.bound,
    setEditingCpu: action,
    setEditingGpu: action,
    setEditingRam: action,
    setEditingBp: action,
    setEditingMb: action,
    setEditingSo: action,
    setEditingSsd: action,
})