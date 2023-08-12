class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.trimmedData = [];
        this.nonSilentData = [];
        this.lastNonSilentSample = 0;

        this.port.onmessage = (event) => {
            this.decibelThreshold = event.data.decibelThreshold;
        };
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0][0]; // Assuming mono input
        const output = outputs[0][0];

        for (let i = 0; i < input.length; i++) {
            if (Math.abs(input[i]) >= this.decibelThreshold) {
                this.nonSilentData.push(input[i]);
                this.lastNonSilentSample = i;
            }
        }

        // Copy non-silent audio data to the output buffer
        for (let i = 0; i <= this.lastNonSilentSample; i++) {
            output[i] = this.nonSilentData[i];
        }

        // Send trimmed data back to the main thread
        this.trimmedData = new Float32Array(output.subarray(0, this.lastNonSilentSample + 1));
        this.port.postMessage({ trimmedData: this.trimmedData });

        return true;
    }
}

registerProcessor('audio-processor', AudioProcessor);
