document.getElementById('startScanButton').addEventListener('click', scanAndSendBluetoothDevices);

async function scanAndSendBluetoothDevices() {
    const devicesList = [];

    try {
        // Start scanning for Bluetooth devices
        console.log("Starting Bluetooth scan...");

        // Start scanning with specific filters
        const request = navigator.bluetooth.requestDevice({
            acceptAllDevices: true,  // Accept any Bluetooth device
            optionalServices: []     // Do not require any services to avoid pairing
        });

        // Listen to device found events
        const device = await request;  // Wait for the user to select a device

        // After selecting a device, display it
        const deviceInfo = {
            name: device.name || "Unknown",  // Use "Unknown" if no name is found
            address: device.id,             // Device unique ID (MAC address)
            frequency: 2.4,                 // Approximate Bluetooth frequency (GHz)
        };

        // Add the device to our devices list
        devicesList.push(deviceInfo);
        displayDevices(devicesList);  // Display the found device(s)

    } catch (error) {
        console.log('Error scanning Bluetooth devices:', error);
    }
}

function displayDevices(devicesList) {
    const devicesDiv = document.getElementById('devices');
    devicesDiv.innerHTML = '';  // Clear previous results

    // Loop through the list of devices and display each one
    devicesList.forEach(device => {
        const deviceElement = document.createElement('div');
        deviceElement.textContent = `Name: ${device.name}, Address: ${device.address}`;
        devicesDiv.appendChild(deviceElement);
    });
}


