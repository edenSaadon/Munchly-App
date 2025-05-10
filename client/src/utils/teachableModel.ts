// // utils/teachableModel.js

// const tf = require('@tensorflow/tfjs-node');
// const path = require('path');
// let tmModel = null;

// async function loadTeachableModel() {
//   if (!tmModel) {
//     const modelPath = require('../../assets/models/model.json');
//     tmModel = await tf.loadLayersModel(`file://${modelPath}`);
//     console.log('✅ Teachable model loaded');
//   }
//   return tmModel;
// }

// async function classifyWithTeachableModel(imageBuffer) {
//   await loadTeachableModel();

//   const imageTensor = tf.node.decodeImage(imageBuffer, 3)
//     .resizeNearestNeighbor([224, 224])
//     .toFloat()
//     .div(255.0)
//     .expandDims();

//   const predictions = await tmModel.predict(imageTensor).data();
//   const labels = require('../teachableM/labels.json');

//   return Array.from(predictions)
//     .map((prob, i) => ({ label: labels[i], probability: prob }))
//     .filter(p => p.probability > 0.5)
//     .map(p => p.label);
// }

// module.exports = { classifyWithTeachableModel };


// // ✅ client/src/utils/teachableModel.js

// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
// import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

// let model = null;

// export async function loadTeachableModel() {
//   if (model) return model;

//   await tf.ready();

//   // ודאי שהקבצים האלה באמת ב־client/assets/models/
//   const modelJson = require('../../assets/models/model.json');
//   const modelWeights = [require('../../assets/models/group1-shard1of1.bin')];

//   model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));
//   console.log('✅ Teachable model loaded on client');
//   return model;
// }

// export async function classifyImage(tensor) {
//   const model = await loadTeachableModel();
//   const predictions = await model.predict(tensor).data();

//   const labels = require('../../assets/models/labels.json');
//   return Array.from(predictions)
//     .map((prob, i) => ({ label: labels[i], probability: prob }))
//     .filter(p => p.probability > 0.5)
//     .map(p => p.label);
// }
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';

// let tmModel: tf.LayersModel | null = null;

// export async function loadTeachableModel() {
//   if (!tmModel) {
//     await tf.ready();
//     const modelJson = require('../../assets/models/model.json');
//     const modelWeights = require('../../assets/models/weights.bin');
//     tmModel = await tf.loadLayersModel(
//       tf.io.browserFiles([modelJson, modelWeights])
//     );
//     console.log('✅ Teachable model loaded');
//   }
//   return tmModel;
// }

// export async function classifyWithTeachableModel(imageBuffer: Uint8Array): Promise<string[]> {
//   const model = await loadTeachableModel(); // בטוח לא null כאן

//   const imageTensor = tf.tensor3d(imageBuffer, [224, 224, 3], 'int32')
//     .expandDims(0)
//     .div(tf.scalar(255));

//   const prediction = model.predict(imageTensor) as tf.Tensor;
//   const probabilities = prediction.dataSync();

//   const labels = require('../../assets/models/labels.json');

//   return Array.from(probabilities)
//     .map((prob, i) => ({ label: labels[i], probability: prob }))
//     .filter(p => p.probability > 0.5)
//     .map(p => p.label);
// }

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

let tmModel: tf.LayersModel | null = null;

export async function loadTeachableModel() {
  if (!tmModel) {
    await tf.ready();

    const modelJson = require('../../assets/models/model.json');
    const modelWeights = require('../../assets/models/weights.bin');

    tmModel = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
    console.log('✅ Teachable model loaded');
  }
  return tmModel;
}

export async function classifyWithTeachableModel(imageBuffer: Uint8Array): Promise<string[]> {
  const model = await loadTeachableModel();

  const imageTensor = tf.tensor3d(imageBuffer, [224, 224, 3], 'int32')
    .expandDims(0)
    .div(tf.scalar(255));

  const prediction = model.predict(imageTensor) as tf.Tensor;
  const probabilities = prediction.dataSync();

  const labels = require('../../assets/models/labels.json');

  return Array.from(probabilities)
    .map((prob, i) => ({ label: labels[i], probability: prob }))
    .filter(p => p.probability > 0.5)
    .map(p => p.label);
}
