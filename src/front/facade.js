import axios from 'axios';
import pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js';

const baseURL = `${process.env.API_URL}${location.pathname}/api/`;
const revAxios = axios.create({
  baseURL
});

export default class RevFacade {
  static getSpaces(name) {
    let url = `spaces`;
    if (name != null) {
      url += `/${encodeURIComponent(name)}`;
    }
    return revAxios.get(url);
  }

  static getTags() {
    return revAxios.get('tags');
  }

  static getDocuments(spaceId) {
    const url = `documents/${spaceId}`;
    return revAxios.get(url);
  }

  static getContent(docId) {
    const url = `${baseURL}contents/${docId}`;
    return pdfjsLib.getDocument(url);
  }

  static postTag(fData) {
    return revAxios.post('tags', fData);
  }

  static postSpace(fData) {
    return revAxios.post('spaces', fData);
  }

  static postDocument(fData) {
    return revAxios.post('documents', fData);
  }
}
