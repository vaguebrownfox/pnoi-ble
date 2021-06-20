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
					services: [0xcdcd],
				},
			],
			optionalServices: [0xfff0],
		};
		return navigator.bluetooth.requestDevice(options).then((device) => {
			this.device = device;
			this.device.addEventListener(
				"gattserverdisconnected",
				this.onDisconnected
			);
		});
	}

	connect() {
		if (!this.device) {
			return Promise.reject("Device is not connected.");
		}
		return this.device.gatt.connect();
	}

	startProximityNotifications(listener) {
		return this.device.gatt
			.getPrimaryService(0xfff0)
			.then((service) => service.getCharacteristic(0xfff5))
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
			.getPrimaryService(0xfff0)
			.then((service) => service.getCharacteristic(0xfff5))
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
		this.device = null;
	}
}

export const pnoi = new Pnoi();
