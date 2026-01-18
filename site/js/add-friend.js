const resultDiv = document.getElementById("result");
const qrRegionId = "reader";
const html5QrCode = new Html5Qrcode(qrRegionId);

const config = { fps: 10, qrbox: 250 };

const btn = document.getElementById('scanButton');

btn.addEventListener('click', async () => {
    Html5Qrcode.getCameras()
        .then((devices) => {
            if (devices && devices.length) {
                const cameraId = devices[0].id;
                html5QrCode.start(
                    cameraId,
                    config,
                    async (decodedText, decodedResult) => {
                        try {
                            const data = JSON.parse(decodedText);
                            const { email, date } = data;

                            // check if datetime valid (within 1 min but put 1 hr for ease of testing)
                            const qrTime = new Date(date);
                            const now = new Date();
                            const diffMs = Math.abs(now - qrTime);
                            const diffHours = diffMs / (1000 * 60 * 60);

                            if (diffHours <= 1) {
                                const res = await fetch("/api/request", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ email, date }),
                                });

                                if (res.ok) {
                                    resultDiv.innerText = `QR code accepted: ${email}`;
                                } else {
                                    resultDiv.innerText = "Failed to submit data";
                                }
                            } else {
                                resultDiv.innerText = "QR code expired, please generate a new one";
                            }

                        } catch (err) {
                            console.error("Failed to process QR code:", err);
                            resultDiv.innerText = "Invalid QR code";
                        } finally {
                            html5QrCode.stop();
                        }
                    },
                    (errorMessage) => {
                        console.log(`QR scan error: ${errorMessage}`);
                    }
                );
            } else {
                resultDiv.innerText = "No camera found";
            }
        })
        .catch((err) => {
            console.error("Error getting cameras: ", err);
            resultDiv.innerText = "Error accessing camera";
        });
});