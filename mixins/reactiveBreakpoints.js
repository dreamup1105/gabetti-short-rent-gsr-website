import { theme } from '@/tailwind.config';

export const reactiveBreakpoints = {
  data() {
    return {
      width: null,
      breakpoints: {},
    }
  },
  methods: {
    /**
     * @desc Take the tailwind breakpoints and convert them to the number
     * @returns {object}
     */
    breakpointsToNumber() {
      const br = {...theme.screens}
      Object.keys(br).forEach(key => {
        br[key] = parseInt(br[key]);
      });
      return br
    }
  },
  beforeMount()  {
    this.$nextTick(() => {
      this.breakpoints = this.breakpointsToNumber()
      const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
          this.width = parseInt(entry.contentRect.width);
        }
      });
      resizeObserver.observe(document.querySelector('html'));
    })
  }
}
