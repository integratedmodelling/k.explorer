import { QDialog, QCollapsible } from 'quasar';

export default {
  ALERT: {
    component: QDialog,
  },
  MAIN: (component) => {
    const ret = {
      type: 'div',
      attributes: {
        staticClass: 'kcv-main-container',
        class: `kcv-dir-${component.direction}`,
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        style: {
          ...(component.style && { ...component.style }),
          ...component.mainPanelStyle,
        },
        ...(component.name && { ref: component.name }),
      },
    };
    return ret;
  },
  TEXT: (component) => {
    let style = {};
    if (component.style) {
      style = {
        ...component.style,
      };
    }
    if (component.attributes) {
      if (component.attributes.height) {
        style.height = component.attributes.height;
      }
      if (component.attributes.width) {
        style.width = component.attributes.width;
      }
    }
    return {
      type: component.collapse ? QCollapsible : 'div',
      attributes: {
        staticClass: 'kcv-text',
        attrs: {
          id: component.id,
        },
        props: {
          opened: true,
        },
        style,
        domProps: {
          innerHTML: component.content,
        },
      },
      // content: '',
    };
  },
  UNKNOWN: component => ({
    type: 'p',
    attributes: {
      attrs: {
        id: component.id,
      },
    },
    content: component.type,
  }),
};
