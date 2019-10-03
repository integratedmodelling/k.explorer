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
          url: 'img11.gif',
          alt: 'Other thing here',
          // hAlign: 'right',
          // vAlign: 'top',
          // position: { left: '20px', bottom: '10em' },
          // width: '100%',
          // style: { border: '1px solid yellow' },

        },
        title: 'Set a Context',
        // text: '<ul><li>Search for a geographical context</li><li>Search for a geographical context</li><li>Search for a geographical context</li></ul>',
        textAlign: 'center',
        textDiv: {
          hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          // width: '100%',
          // height: '100px',
          // style: { 'background-color': 'green' },
        },
        duration: 9900,
      }, {
        image: {
          url: 'img12.gif',
          alt: 'Other thing here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: 'Observe a concept',
        text: '',
        textAlign: 'center',
        textDiv: {
          hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 12600,
      }, {
        image: {
          url: 'img13.gif',
          alt: 'Other thing here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: 'See results',
        text: '',
        textAlign: 'center',
        textDiv: {
          hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          // width: '100px',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 4500,
      }],
      duration: 10000,
      animated: false,
      infinite: false,
    },
  }, {
    title: '3 Ways to choose the context:  <span class="internal-link" rel="1-0">Search</span>, <span class="internal-link" rel="1-1">Draw</span> and <span class="internal-link" rel="1-2">Zoom In and Out</span>',
    stack: {
      layers: [{
        image: {
          url: 'img21.gif',
          alt: 'Put something here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '80%',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: 'Search for a region',
        text: '',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          // width: '100%',
          // height: '100px',
          style: { 'border-top': '1px solid #000' },
        },
        duration: 9900,
      }, {
        image: {
          url: 'img22.gif',
          alt: 'Put something here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '80%',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: 'Draw a geographical context',
        text: '',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          // width: '100%',
          // height: '100px',
          style: { 'border-top': '1px solid #000' },
        },
        duration: 10800,
      }, {
        image: {
          url: 'img23.gif',
          alt: 'Put something here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '80%',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: 'Move around and zoom to set your geographical context',
        text: '',
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
          url: 'img31.gif',
          alt: 'Put something here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '150%',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: 'You can type your queries in the search bar',
        text: '',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          width: '100%',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 3600,
      }, {
        image: {
          url: 'img32.gif',
          alt: 'Put something here',
          // hAlign: 'center',
          // vAlign: 'middle',
          // position: { left: '0', bottom: '0' },
          // width: '150%',
          // height: '100px',
          // style: { border: '1px solid #000' },

        },
        title: 'or press space bar to select predefined queries',
        text: '',
        textAlign: 'center',
        textDiv: {
          // hAlign: 'center',
          vAlign: 'bottom',
          // position: { left: '0', bottom: '0' },
          width: '100%',
          // height: '100px',
          // style: { border: '1px solid #000' },
        },
        duration: 8800,
      }],
      duration: 2000,
      animated: false,
      infinite: false,
    },
  },
];
