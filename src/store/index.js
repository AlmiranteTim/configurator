import CpuStore from "./CpuStore";
import GpuStore from "./GpuStore";
import RamStore from "./RamStore";
import BpStore from "./BpStore";
import MbStore from "./MbStore";
import SoStore from "./SoStore";
import SsdStore from "./SsdStore";
import UserStore from "./UserStore";
import EditingItemStore from "./EditingItemStore";
import SelectedItemsStore from "./SelectedItemsStore";

var Store = {
    cpuStore: new CpuStore(),
    gpuStore: new GpuStore(),
    ramStore: new RamStore(),
    userStore: new UserStore(),
    bpStore: new BpStore(),
    mbStore: new MbStore(),
    soStore: new SoStore(),
    ssdStore: new SsdStore(),
    editingItemStore: new EditingItemStore(),
    selectedItemsStore: new SelectedItemsStore()
}

let store = window.store = Store;

export default store;