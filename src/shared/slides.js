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

export default [{
  title: 'First with a link to <span class="internal-link" rel="0-0">first</span>, <span class="internal-link" rel="0-1">second</span> and <span class="internal-link" rel="0-2">third</span> ',
  stack: {
    layers: [{
      image: 'slide1.1.jpg',
      imageAlign: 'left',
      title: 'Loren',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta, nibh eu laoreet dignissim, eros urna accumsan velit, nec ullamcorper lectus massa id ipsum. Donec mattis metus porta metus dapibus, a consectetur mi aliquet. Mauris risus elit, pharetra nec lectus vel, faucibus rhoncus elit. Suspendisse ac ex et sapien fringilla vehicula. In consequat tellus eu lorem scelerisque sodales. In erat erat, fermentum semper pretium sit amet, sagittis id nisi.',
      textPosition: 'right',
      textWidth: '200px',
      duration: 1000,
    }, {
      image: 'slide1.2.jpg',
      imageAlign: 'right',
      title: 'Ipsum',
      text: 'Vestibulum pellentesque aliquet mi quis lacinia. Nam dignissim ex efficitur, ultrices lorem vitae, dapibus nisi. Duis vitae mi et ipsum finibus vestibulum ut et libero. Proin fermentum elit a massa feugiat, vitae aliquet nulla dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
      textPosition: 'left',
      textAlign: 'center',
      textWidth: '15%',
      duration: 5000,
    }, {
      image: 'slide1.3.jpg',
      imageAlign: 'center',
      text: 'Aliquam ac mattis metus. Nulla pulvinar finibus urna nec suscipit. Duis non sem interdum, iaculis erat at, lacinia tortor. Nullam quis nulla et est pulvinar sollicitudin vel quis magna. Suspendisse sed urna odio. Mauris a pretium ante. Etiam pulvinar ipsum nec lectus tincidunt malesuada.',
      textPosition: 'bottom',
      duration: 2000,
    }],
    duration: 10000,
    animated: true,
    infinite: true,
  },
}, {
  title: 'Second',
  stack: {
    layers: [{
      image: 'slide2.1.jpg',
      text: 'This is the second first layer',
    }, {
      image: 'slide2.2.jpg',
      text: 'This is the second second layer',
    }],
    duration: 2000,
    animated: false,
  },
}, {
  title: 'Third',
  stack: [],
  image: 'slide3.jpg',
}];
