/**
 * Я только на 20% имею представление как это работает, но это
 * решает проблему конкатенации файлов на низком уровне,
 * принимает массив blobs и конвертит его в один wav файл
 * Дефолтное решение с мнгновенной конвертацией массима blob не работает
 * файл не рабочий.
 */
export const concatenateAudioBlobs = async (blobs) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Decode all the audio data
    const buffers = await Promise.all(blobs.map(blob => {
        return blob.arrayBuffer().then(data => audioContext.decodeAudioData(data));
    }));

    // Determine the length of the combined buffer
    const outputLength = buffers.reduce((sum, buffer) => sum + buffer.length, 0);
    const outputSampleRate = buffers[0].sampleRate;

    // Create an OfflineAudioContext for mixing
    const offlineContext = new OfflineAudioContext(1, outputLength, outputSampleRate);
    const outputBuffer = offlineContext.createBuffer(1, outputLength, outputSampleRate);

    let offset = 0;
    buffers.forEach(buffer => {
        outputBuffer.getChannelData(0).set(buffer.getChannelData(0), offset);
        offset += buffer.length;
    });

    // Render the combined audio buffer
    const source = offlineContext.createBufferSource();
    source.buffer = outputBuffer;
    source.connect(offlineContext.destination);
    source.start();

    const renderedBuffer = await offlineContext.startRendering();

    // Convert the rendered buffer to a Blob
    const wavBlob = audioBufferToWavBlob(renderedBuffer);

    return wavBlob;
};

const audioBufferToWavBlob = (buffer) => {
    const numOfChan = buffer.numberOfChannels,
        length = buffer.length * numOfChan * 2 + 44,
        bufferLength = buffer.length,
        sampleRate = buffer.sampleRate;

    const bufferData = new ArrayBuffer(length);
    const view = new DataView(bufferData);

    // RIFF identifier 'RIFF'
    writeUTFBytes(view, 0, 'RIFF');
    // file length minus RIFF identifier length and file description length
    view.setUint32(4, length - 8, true);
    // RIFF type 'WAVE'
    writeUTFBytes(view, 8, 'WAVE');
    // format chunk identifier 'fmt '
    writeUTFBytes(view, 12, 'fmt ');
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, 1, true);
    // channel count
    view.setUint16(22, numOfChan, true);
    // sample rate
    view.setUint32(24, sampleRate, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * 2 * numOfChan, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, numOfChan * 2, true);
    // bits per sample
    view.setUint16(34, 16, true);
    // data chunk identifier 'data'
    writeUTFBytes(view, 36, 'data');
    // data chunk length
    view.setUint32(40, bufferLength * numOfChan * 2, true);

    // write the PCM samples
    let offset = 44;
    for (let i = 0; i < bufferLength; i++) {
        for (let channel = 0; channel < numOfChan; channel++) {
            const sample = buffer.getChannelData(channel)[i] * 0x7fff;
            view.setInt16(offset, sample < 0 ? sample : sample, true);
            offset += 2;
        }
    }

    return new Blob([view], { type: 'audio/wav' });
};

const writeUTFBytes = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
};