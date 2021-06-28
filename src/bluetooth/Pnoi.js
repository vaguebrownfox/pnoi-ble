class Pnoi {
	constructor() {
		this.device = null;
		this.onDisconnected = this.onDisconnected.bind(this);
	}

	request() {
		let options = {
			filters: [
				{
					name: "LE_Pnoi",
					services: [0xcafe],
				},
			],
			optionalServices: [0xace0, 0xfad0],
		};
		return navigator.bluetooth.requestDevice(options).then((device) => {
			this.device = device;
			this.device.addEventListener(
				"gattserverdisconnected",
				this.onDisconnected
			);
		});
	}

	connect(setDeviceState) {
		if (!this.device) {
			return Promise.reject("Device is not connected.");
		}
		this.setDeviceState = setDeviceState;
		return this.device.gatt.connect();
	}

	recordControl(command) {
		var temp = Buffer.alloc(1);
		temp.writeUInt8(command);
		return this.device.gatt
			.getPrimaryService(0xace0)
			.then((service) => service.getCharacteristic(0xace1))
			.then((characteristic) => characteristic.writeValue(temp));
	}

	startProximityNotifications(listener) {
		return this.device.gatt
			.getPrimaryService(0xfad0)
			.then((service) => service.getCharacteristic(0xfad1))
			.then((characteristic) => characteristic.startNotifications())
			.then((characteristic) =>
				characteristic.addEventListener(
					"characteristicvaluechanged",
					listener
				)
			);
	}

	stopProximityNotifications(listener) {
		return this.device.gatt
			.getPrimaryService(0xfad0)
			.then((service) => service.getCharacteristic(0xfad1))
			.then((characteristic) => characteristic.stopNotifications())
			.then((characteristic) =>
				characteristic.removeEventListener(
					"characteristicvaluechanged",
					listener
				)
			);
	}

	disconnect() {
		if (!this.device) {
			return Promise.reject("Device is not connected.");
		}
		return this.device.gatt.disconnect();
	}

	onDisconnected() {
		console.log("Device is disconnected.");
		this.setDeviceState(null);
		this.device = null;
	}
}

export const pnoi = new Pnoi();
