import axios from 'axios';
import djv from 'djv';

// eslint-disable-next-line new-cap
const djvEnv = new djv({ version: 'draft-04' });

axios.get(`${process.env.WS_BASE_URL}${process.env.WSERVICE_URL}/schema`)
  .then(({ data }) => {
    console.log(`DATA: ${typeof data}`);
    if (typeof data === 'object') {
    // eslint-disable-next-line no-restricted-syntax
      for (const [key, schema] of Object.entries(data)) {
        djvEnv.addSchema(key, schema);
        console.log(`Added schema ${key}`);
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });

// leave the export, even if you don't use it
export default ({ Vue }) => {
  Vue.prototype.$djvEnv = djvEnv;
};

export { djvEnv };
