export const imageHelper = {
  data() {
    return {
      imageIsLoaded: false
    }
  },
  methods: {
    /**
     * @desc Determine when an image is loaded
     * @returns {boolean}
     */
    onImageLoad() {
      this.imageIsLoaded = true
    },
    /**
     * @desc Take the domain path out of the image URL
     * @param imgURL absolute Image URL
     * @parm dev boolean determine whether it is for development or production
     * @returns {string}
     */
    pathURL(imgURL, dev = true) {
      if (dev) {
          const devImageURL = 'https://gabettishortrent.fra1.digitaloceanspaces.com/'
          const replaceDevAPI = imgURL.replace("https://api-staging.gabettishortrent.com/storage/", devImageURL)
          return replaceDevAPI.replace(devImageURL, "")
      }

      return imgURL.replace("https://gabettishortrent.fra1.digitaloceanspaces.com/", "")
    },
    /**
     * @desc Generate a LQIP version of the image using twicpics API
     * @param imgURL absolute Image URL
     * @returns {string}
     */
    blurImageURL(imgURL) {
      return 'https://gabettishortrent.twic.pics/' + this.pathURL(imgURL) + '?twic=v1/output=preview'

    },
  }
}
