/**
 * The help slides
 * The JSON is an array of slides. Each slide has this schema:
 * {
 *    title: String or HTML
 *    stack: { // stack contains an internal sub-presentation. If we only need an image, use image attribute instead
 *      layers: [{ // the sub presentation
 *        image: { // the image that could be shown
 *          url: [the url relative to statics/help/],
 *          alt: [the alt attribute of image], // appear when hover. Default is the title of text of the layer
 *          hAlign: 'right|center|left', // horizontal alineation. Default 'center'
 *          vAlign: 'top|middle|bottom', // vertical alineation. Default 'middle'
 *          position: { [top,right,bottom,left] }, // specific position in CSS style. If set, hAlign and vAlign are ignored
 *          width: '', // width in one of CSS units. Default original image size or fit if bigger
 *          height: '', // height in one of CSS units. Default original image size or fit if bigger
 *          style: {}, // custom CSS style relative to image div
 *        },
 *        title: '', // title of text div. Could be HTML
 *        text: '', // content of text div. Could be HTML.
 *        textAlign: '', // the text align INTO the text div
 *        textDiv: {
 *          hAlign: 'right|center|left', // horizontal alineation. Default 'center'
 *          vAlign: 'top|middle|bottom', // vertical alineation. Default 'middle'
 *          position: { [top,right,bottom,left] }, // specific position in CSS style. If set, hAlign and vAlign are ignored
 *          width: '', // width in one of CSS units. Default 100%
 *          height: '', // height in one of CSS units. Default 100%
 *          style: {}, // custom CSS style relative to text div
 *        },
 *        duration: [ms], custom duration of this layer
 *      }, {
 *      ...
 *      }],
 *      duration: the default duration of layers (ms) if not indicated
 *      animated: true|false (false)
 *      infinite: true|false (if true and the last layer is reached, restart automatically the presentation, if false go to next main slide) (false)
 *      autostart: if not, the animation start clicking on it
 *    }
 * }
 * NOTICE:
 * Is possible to insert links to a slide into text or title field, using an html container (span or div for example) with class internal-link and an attribute rel that indicat the slide and layer to go to
 * The format is slide-layer zero based, so 0-2 indicate the first slide and the third layer
 */

export default [
  {
    title: 'Welcome to Aries <i class="klab-font klab-aries-logo"></i><span class="internal-link" rel="0-0">Set a context</span>, <span class="internal-link" rel="0-1">search</span> and <span class="internal-link" rel="0-2">see the results</span>',
    stack: {
      layers: [{
        image: {
          url: 'img11.gif',
          vAlign: 'top',
        },
        title: 'Set a Context',
        textAlign: 'center',
        textDiv: {
          hAlign: 'center',
          vAlign: 'bottom',
        },
        duration: 9900,
      }, {
        image: {
          url: 'img12.gif',
          vAlign: 'top',
        },
        title: 'Observe a concept',
        textAlign: 'center',
        textDiv: {
          hAlign: 'center',
          vAlign: 'bottom',
        },
        duration: 12600,
      }, {
        image: {
          url: 'img13.gif',
          vAlign: 'top',
        },
        title: 'See results',
        textAlign: 'center',
        textDiv: {
          hAlign: 'center',
          vAlign: 'bottom',
        },
        duration: 4500,
      }],
      animated: true,
      infinite: false,
    },
  }, {
    title: '3 Ways to choose the context:  <span class="internal-link" rel="1-0">Search</span>, <span class="internal-link" rel="1-1">Draw</span> and <span class="internal-link" rel="1-2">Zoom In and Out</span>',
    stack: {
      layers: [{
        image: {
          url: 'img21.gif',
          vAlign: 'top',
        },
        title: 'Search for a region',
        textAlign: 'center',
        textDiv: {
          vAlign: 'bottom',
        },
        duration: 9900,
      }, {
        image: {
          url: 'img22.gif',
          vAlign: 'top',
        },
        title: 'Draw a geographical context',
        textAlign: 'center',
        textDiv: {
          vAlign: 'bottom',
        },
        duration: 10800,
      }, {
        image: {
          url: 'img23.gif',
          vAlign: 'top',
        },
        title: 'Move around and zoom to set your geographical context',
        text: '',
        textAlign: 'center',
        textDiv: {
          vAlign: 'bottom',
        },
        duration: 5600,
      }],
      duration: 2000,
      animated: true,
      infinite: false,
    },
  }, {
    title: 'Search in k.LAB',
    stack: {
      layers: [{
        image: {
          url: 'img31.gif',
          vAlign: 'top',
        },
        title: 'You can type your queries in the search bar',
        textAlign: 'center',
        textDiv: {
          vAlign: 'bottom',
          width: '100%',
        },
        duration: 3600,
      }, {
        image: {
          url: 'img32.gif',
          vAlign: 'top',
        },
        title: 'or press space bar to select predefined queries',
        textAlign: 'center',
        textDiv: {
          vAlign: 'bottom',
        },
        duration: 8800,
      }],
      animated: true,
      infinite: false,
    },
  },
];
