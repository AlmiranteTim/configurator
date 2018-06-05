import { decorate, observable, action, computed } from "mobx"



class SelectedItemsStore {



    selectedCpu = {};
    selectedGpu = {};
    selectedRam = {};
    selectedBp = {};
    selectedMb = {};
    selectedSo = {};
    selectedSsd = {};

    addedCpu = {};
    addedGpu = {};
    addedRam = {};
    addedBp = {};
    addedMb = {};
    addedSo = {};
    addedSsd = {};

    get valueSum() {
        var cpuValue = parseInt(this.addedCpu.value , 10) || 0;
        var gpuValue = parseInt(this.addedGpu.value, 10) || 0;
        var ramValue = parseInt(this.addedRam.value, 10) || 0;
        var bpValue = parseInt(this.addedBp.value, 10) || 0;
        var mbValue = parseInt(this.addedMb.value, 10) || 0;
        var soValue = parseInt(this.addedSo.value, 10) || 0;
        var ssdValue = parseInt(this.addedSsd.value, 10) || 0;
        return cpuValue + gpuValue + ramValue + bpValue + mbValue + soValue + ssdValue;
    };




    get energySum() {
        var cpuEnergy = parseInt(this.addedCpu.heat_Dissipation, 10) || 0;
        var gpuEnergy = parseInt(this.addedGpu.recommended_power_supply, 10) || 0;
        var bpValue = parseInt(this.addedBp.power, 10) || 0;

          return cpuEnergy + gpuEnergy < bpValue || !this.addedBp.power;
    };

    compatibilityCpuMb = () => {
        return !this.addedCpu.socket || !this.addedMb.socket || this.addedCpu.socket === this.addedMb.socket;
    };

    get compatibilityRamMb() {
        return !this.addedRam.memory_type || !this.addedMb.supported_memory || this.addedMb.supported_memory.indexOf(this.addedRam.memory_type) !== -1;
    };

    get compatibilityCpuSo() {
        return !this.addedCpu.socket || !this.addedSo.socket || this.addedSo.socket.indexOf(this.addedCpu.socket)!== -1;

    };

    get NameItemValid () {
        return !this.nameItemValid;
    };
    hideCpuButton = false;
    hideGpuButton = false;
    hideRamButton = false;
    hideBpButton = false;
    hideMbButton = false;
    hideSoButton = false;
    hideSsdButton = false;
    nameItemValid = false;

    setSelectedCpu = (item) => {
        this.selectedCpu = item;
    };
    setSelectedGpu = (item) => {
        this.selectedGpu = item;
    };
    setSelectedRam = (item) => {
        this.selectedRam = item;
    };
    setSelectedBp = (item) => {
        this.selectedBp = item;
    };
    setSelectedMb = (item) => {
        this.selectedMb = item;
    };
    setSelectedSo = (item) => {
        this.selectedSo = item;
    };
    setSelectedSsd = (item) => {
        this.selectedSsd = item;
    };


    addCpu = () => {
        this.addedCpu = this.selectedCpu;
        this.hideCpuButton = true;
        this.compatibilityCpuMb();
    };
    addGpu = () => {
        this.addedGpu = this.selectedGpu;
        this.hideGpuButton = true;
    };
    addRam = () => {
        this.addedRam = this.selectedRam;
        this.hideRamButton = true;
    };
    addBp = () => {
        this.addedBp = this.selectedBp;
        this.hideBpButton = true;
    };
    addMb = () => {
        this.addedMb = this.selectedMb;
        this.hideMbButton = true;
        this.compatibilityCpuMb();
    };
    addSo = () => {
        this.addedSo = this.selectedSo;
        this.hideSoButton = true;
    };
    addSsd = () => {
        this.addedSsd = this.selectedSsd;
        this.hideSsdButton = true;
    };
    HideCpuButton = () => {
        this.hideCpuButton = false;
        this.addedCpu = {};
    };
    HideGpuButton = () => {
        this.hideGpuButton = false;
        this.addedGpu = {};
    };

    HideRamButton = () => {
        this.hideRamButton = false;
        this.addedRam = {};
    };

    HideBpButton = () => {
        this.hideBpButton = false;
        this.addedBp = {};
    };

    HideMbButton = () => {
        this.hideMbButton = false;
        this.addedMb = {};

    };
    HideSoButton = () => {
        this.hideSoButton = false;
        this.addedSo = {};
    };
    HideSsdButton = () => {
        this.hideSsdButton = false;
        this.addedSsd = {};
    };






}

export default decorate(SelectedItemsStore,  {
    selectedCpu: observable.ref,
    selectedGpu: observable.ref,
    selectedRam: observable.ref,
    selectedBp: observable.ref,
    selectedMb: observable.ref,
    selectedSo: observable.ref,
    selectedSsd: observable.ref,
    addedCpu: observable.ref,
    validate: observable.ref,
    addedGpu: observable.ref,
    addedRam: observable.ref,
    addedBp: observable.ref,
    addedMb: observable.ref,
    addedSo: observable.ref,
    addedSsd: observable.ref,
    hideCpuButton: observable.ref,
    hideGpuButton: observable.ref,
    hideRamButton: observable.ref,
    hideBpButton: observable.ref,
    hideMbButton: observable.ref,
    hideSoButton: observable.ref,
    hideSsdButton: observable.ref,
    valueSum: computed,
    energySum:computed,
    HideCpuButton: action,
    HideGpuButton: action,
    HideRamButton: action,
    HideBpButton: action,
    HideMbButton: action,
    HideSoButton: action,
    compatibilityCpuMb: action,
    HideSsdButton: action,
    setSelectedCpu: action,
    setSelectedGpu: action,
    setSelectedRam: action,
    setSelectedBp: action,
    setSelectedMb: action,
    setSelectedSo: action,
    setSelectedSsd: action,
    addCpu: action,
    addGpu: action,
    addRam: action,
    addBp: action,
    addMb: action,
    addSo: action,
    addSsd: action
})
