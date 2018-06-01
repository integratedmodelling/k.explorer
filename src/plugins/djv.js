import JsonSchemaValidator from 'shared/JsonSchemaValidator';

// eslint-disable-next-line new-cap
const djvValidator = new JsonSchemaValidator(`${process.env.WS_BASE_URL}${process.env.WSERVICE_URL}/schema`);

// leave the export, even if you don't use it
export default ({ Vue }) => {
  Vue.prototype.$djvEnv = djvValidator;
};

export { djvValidator };
