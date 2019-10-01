/**
 * The help slides
 * The JSON is an array of slides. Each slide has this schema:
 * {
 *    title: String or HTML
 *    stack: { // stack contains an internal sub-presentation. If we only need an image, use image attribute instead
 *      layers: [ // array of images/texts that compose the sub-presentation
 *        image: the image name and extension. Must be in the statics/help folder
 *        imageAlt: the alt attribute of image. If doesn't exists, we use title and next text
 *        imageHAlign: left|center|right (center),
 *        imageVAlign: top|middle|bottom (middle),
 *        imagePosition: css absolute style as JSON objert { top:XX, right: XX etc } (priority)
 *        imageWidth: css size
 *        imageHeight: css size
 *        title: the main text of slide (String or HTML)
 *        text: the text of slide (String or HTML)
 *        textHAlign: left|center|right (center),
 *        textVAlign: top|middle|bottom (middle)
 *        textWidth: the width of the div
 *        textPosition: css absolute style (priority)
 *        duration: specific duration for this slide. If not indicated, the stack duration is used
 *      ]
 *      duration: the default duration of layers (ms)
 *      animated: true|false (false)
 *      infinite: true|false (if true and the last layer is reached, restart automatically the presentation, if false go to next main slide) (false)
 *      autostart: if not, the animation start clicking on it
 *    }
 * }
 * Is possible to insert links to a slide using an html container (span or div for example) with class internal-link and an attribute rel that indicat the slide and layer to go to
 * The format is slide-layer zero based, so 0-2 indicate the first slide and the third layer
 */

export default [
  {
    title: 'Welcome to Aries <i class="klab-font klab-aries-logo"></i><span class="internal-link" rel="0-0">Set a context</span>, <span class="internal-link" rel="0-1">search</span> and <span class="internal-link" rel="0-2">see the results</span>',
    stack: {
      layers: [{
        image: {
          url: 'sample1.1.png',
          alt: 'Other thing here',
          // hAlign: 'right',
          // vAlign: 'top',
          // position: { left: '20px', bottom: '10em' },
          // width: '100%',
          // style: { border: '1px solid yellow' },

        },
        title: 'This is a title',
        text: '<ul><li>Search for a georgaphical context</li><li>Search for a georgaphical context</li><li>Search for a georgaphical context</li></ul>',
        textAlign: 'center',
        textDiv: {
          hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          // width: '100%',
          // height: '100px',
          style: { 'background-color': 'green' },
        },
        duration: 4000,
      }, {
        image: {
          url: 'sample1.2.png',
          alt: 'Other thing here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'Search for a georgaphical context',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 4000,
      }, {
        image: {
          url: 'sample1.3.png',
          alt: 'Other thing here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'Search for a georgaphical context',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 4000,
      }, {
        image: {
          url: 'sample2.1.png',
          alt: 'Other thing here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'Ask the elephant to observe a concept in the current context',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 4000,
      }, {
        image: {
          url: 'sample2.2.png',
          alt: 'Other thing here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'Ask the elephant to observe a concept in the current context',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 4000,
      }, {
        image: {
          url: 'sample2.3.png',
          alt: 'Other thing here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'Ask the elephant to observe a concept in the current context',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 4000,
      }, {
        image: {
          url: 'sample3.1.png',
          alt: 'Other thing here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'Ask the elephant to observe a concept in the current context',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 4000,
      }],
      duration: 10000,
      animated: false,
      infinite: false,
    },
  }, {
    title: 'Setting the Context',
    stack: {
      layers: [{
        image: {
          url: 'searchCM.gif',
          alt: 'Put something here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '80%',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'Search for a region',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          width: '100%',
          // height: '100px',
          style: { 'border-top': '1px solid #000' },
        },
        duration: 2800,
      }, {
        image: {
          url: 'drawCM.gif',
          alt: 'Put something here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '80%',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'Draw a geographical context',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          width: '100%',
          // height: '100px',
          style: { 'border-top': '1px solid #000' },
        },
        duration: 5600,
      }, {
        image: {
          url: 'NavigateC.gif',
          alt: 'Put something here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          width: '80%',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'Move around and zoom in and out to set your geographical context',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          width: '100%',
          // height: '100px',
          style: { 'border-top': '1px solid #000' },
        },
        duration: 8800,
      }],
      duration: 2000,
      animated: false,
      infinite: false,
    },
  }, {
    title: 'Third',
    stack: {
      layers: [{
        image: {
          url: 'sample3.1.png',
          alt: 'Put something here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '150%',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: '',
        text: 'The last of last',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          width: '100%',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 2800,
      }],
      duration: 2000,
      animated: false,
      infinite: false,
    },
  },
];
