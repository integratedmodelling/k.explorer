import axios from 'axios';
import Djv from 'djv';

/**
 * djv json schema validator wrapper
 * [Github page]{@link https://github.com/korzio/djv}
 * TODO: now all schema are loaded at same time. Analyze possibility to load on demand
 */
export default class {
  /**
   * Constuctor of djv enviroment object
   * @param url URL of schema(s) definition
   * @param opt {{initIt, draft}} if initIt true (default) schema(s) is(are) loaded on creation
   *            draft indicate if draft-04 is needed (default)
   */
  constructor(url, opt = { draft: 'draft-04' }) {
    if (url === undefined || url === '') {
      throw Error('URL is mandatory');
    }

    this.djvEnv = new Djv({ version: opt.draft });
    this.initialized = false;
    this.url = url;
    this.initTimeout = null;
    console.debug('Load schema(s) on creation');
    // Better way will be not start until a connection exists?
    // wait 2 seconds for server to end starting
    this.initTimeout = setTimeout(this.init(url), 2000);
  }

  /**
   * Validate a json vs a defined schema
   * @param json json to validate
   * @param schema schema for validation
   * @returns {*} original json if valid, null otherwise
   * If djv is not read, validation is not executed and everythings is ok
   * TODO: really is not so good
   */
  validateJsonSchema(json, schema) {
    if (!this.initialized) {
      console.info('djvEnv not read');
      return false;
    }
    if (this.djvEnv.resolve(schema)) {
      const valError = this.djvEnv.validate(schema, json);
      if (typeof valError === 'undefined') {
        console.debug('Validation ok');
        return true;
      }
      throw Error(valError);
    }
    throw Error(`Schema not found: ${schema}`);
  }


  /**
   * Init validator loading schema(s)
   * @param url url of schema(s)
   * TODO: implements loading on demand
   */
  init(url = this.url) {
    if (!this.initialized) {
      axios.get(url)
        .then(({ data }) => {
          if (typeof data === 'object') {
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, schema] of Object.entries(data)) {
              this.djvEnv.addSchema(key, schema);
              console.info(`Added schema ${key}`);
            }
            this.initialized = true;
          } else {
            throw Error('Error asking for JsonSchema(s): no data');
          }
        })
        .catch((error) => {
          console.log(error);
          clearTimeout(this.initTimeout);
          // try other time in 5 seconds
          this.initTimeout = setTimeout(() => {
            this.init();
            console.info('Trying to connect to donwload schema(s)');
          }, 5000);
          // throw new Error(`Error initializing validator: ${error}`);
        });
    }
  }
}
