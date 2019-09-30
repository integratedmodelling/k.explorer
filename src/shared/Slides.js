/**
 * The help slides
 * The JSON is an array of slides. Each slide has this schema:
 * {
 *    title: String or HTML
 *    stack: { // stack contains an internal sub-presentation. If we only need an image, use image attribute instead
 *      layers: [ // array of images/texts that compose the sub-presentation
 *        image: the image name and extension. Must be in the statics/help folder
 *        imageAlign: left|center|right
 *        title: the main text of slide (String or HTML)
 *        text: the text of slide (String or HTML)
 *        textPosition: top|bottom|left|right
 *        textWidth: if is left or rith positioned, the width of the div. If top or bottom, full width is used
 *        duration: specific duration for this slide. If not indicated, the stack duration is used
 *      ]
 *      duration: the default duration of layers (ms)
 *      animated: true|false
 *      infinite: true|false (when the last layer is reached, restart automatically the presentation)
 *      autostart: if not, the animation start clicking on it
 *    }
 *    image: if the slide is only one image, put the url. The final url is calculated using 'statics/help/[image name with extension],
 * }
 * Is possible to insert links to a slide using an html container (span or div for example) with class internal-link and an attribute rel that indicat the slide and layer to go to
 * The format is slide-layer zero based, so 0-2 indicate the first slide and the third layer
 */

export default [
  {
    title: 'Welcome to <i class="klab-font klab-aries-logo"></i>ries. <span class="internal-link" rel="0-0"> Set a context</span>, <span class="internal-link" rel="0-1">search</span> and <span class="internal-link" rel="0-2">see the results</span>',
    stack: {
      layers: [{
        image: 'demo11.gif',
        imageAlign: 'center',
        text: 'Search for a georgaphical context',
        textPosition: 'bottom',
        duration: 7200,
      }, {
        image: 'demo12.gif',
        imageAlign: 'left',
        text: 'Ask the elephant to observe a concept in the current context',
        textPosition: 'right',
        textWidth: '150px',
        duration: 11700,
      }, {
        image: 'demo13.gif',
        imageAlign: 'left',
        text: 'And visualize results ',
        textPosition: 'right',
        textWidth: '150px',
        duration: 5400,
      }],
      duration: 10000,
      animated: true,
      infinite: false,
    },
  }, {
    title: 'Setting the Context',
    stack: {
      layers: [{
        image: 'searchC.gif',
        imageAlign: 'center',
        text: 'Search for a region',
        textAlign: 'center',
        textPosition: 'bottom',
        duration: 2800,
      }, {
        image: 'drawC.gif',
        imageAlign: 'center',
        text: 'Draw a geographical context',
        textAlign: 'center',
        textPosition: 'bottom',
        duration: 5600,
      }, {
        image: 'NavigateC.gif',
        imageAlign: 'right',
        text: 'Move around and zoom in and out to set your geographical context',
        textAlign: 'center',
        textPosition: 'bottom',
        duration: 8800,
      }],
      duration: 2000,
      animated: true,
    },
  }, {
    title: 'Third',
    stack: [],
    image: 'slide3.jpg',
  },
];
