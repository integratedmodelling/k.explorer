import Vue from 'vue';
import { axiosInstance } from 'plugins/axios';

const url = `${process.env.WS_BASE_URL}${process.env.REST_UPLOAD}`;
const maxSize = process.env.REST_UPLOAD_MAX_SIZE;

const maxUploadUnit = maxSize.substr(maxSize.length - 2);
const exponent = maxUploadUnit === 'KB' ? 1 : maxUploadUnit === 'MB' ? 2 : maxUploadUnit === 'GB' ? 3 : maxUploadUnit === 'PB' ? 4 : 0;
const maxUploadSize = parseInt(maxSize.substring(0, maxSize.length - 2), 10) * (1024 ** exponent);

/*
  Determines if the drag and drop functionality is in the
  window
*/
function determineDragAndDropCapable() {
  /*
    Create a test element to see if certain events
    are present that let us do drag and drop.
  */
  const div = document.createElement('div');

  /*
    Check to see if the `draggable` event is in the element
    or the `ondragstart` and `ondrop` events are in the element. If
    they are, then we have what we need for dragging and dropping files.

    We also check to see if the window has `FormData` and `FileReader` objects
    present so we can do our AJAX uploading
  */
  return (('draggable' in div)
    || ('ondragstart' in div && 'ondrop' in div))
    && 'FormData' in window
    && 'FileReader' in window;
}

export default Vue.directive('upload', {
  inserted(el, binding) {
    /*
      If drag and drop capable, then we continue to bind events to our elements.
    */
    if (determineDragAndDropCapable()) {
      let file = null;
      const onUploadProgress = (binding.value && binding.value.onUploadProgress && typeof binding.value.onUploadProgress === 'function') ? binding.value.onUploadProgress : () => {};
      const onUploadEnd = (binding.value && binding.value.onUploadEnd && typeof binding.value.onUploadEnd === 'function') ? binding.value.onUploadEnd : () => { console.debug('Upload complete'); };
      const onUploadError = (binding.value && binding.value.onUploadError && typeof binding.value.onUploadError === 'function') ? binding.value.onUploadError : (error) => { console.error(JSON.stringify(error, null, 4)); };
      const refId = binding.value.refId || null;

      /*
        Listen to all of the drag events and bind an event listener to each
        for the fileform.
      */
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((evt) => {
        /*
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
        */
        el.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      });
      /*
        Add an event listener for drop to the form
      */
      el.addEventListener('drop', (e) => {
        /*
          Capture the files from the drop event and add them to our local files
          array.
        */
        [file] = e.dataTransfer.files;
        if (file === null) {
          return;
        }
        if (file.size > maxUploadSize) {
          onUploadError(`File is too large, max sixe is ${maxSize}`);
          file = null;
          return;
        }
        /*
          Initialize the form data
        */
        const formData = new FormData();

        /*
          Iterate over any file sent over appending the files
          to the form data.
        */
        formData.append('file', file);
        formData.append('refId', refId);

        /*
          Make the request to the POST /file-drag-drop-instant URL
        */
        axiosInstance.post(url,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress(progressEvent) {
              onUploadProgress(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total), 10));
            },
          }).then(() => {
          onUploadEnd(file !== null ? file.name : null);
          file = null;
        }).catch((error) => {
          onUploadError(error, file !== null ? file.name : null);
          file = null;
        });
      });
    }
  },
});
