export const filtersHandler = {
  mounted() {
    this.fromQuery();
  },
  methods: {
    /**
     * @desc Get query parameters
     */
    fromQuery() {
      this.__query = {...this.$route.query};
      this.__queryToFilters();
    },
    /**
     * @desc Convert query string to filters data
     * @returns {string}
     */
    toQuery(silently,except) {
      return this.__filtersToQuery(silently,except);
    },
    /**
     * @desc Reset filters
     */
    resetFilters() {
      if (this.filters) {

        for (let key of Object.keys(this.filters)) {

          const keysWhitelist = ['page', 'per_page'];

          if (keysWhitelist.includes(key)) {
            continue;
          }

          if (Array.isArray(key)) {
            this.filters[key] = [];
          }
          else {
            this.filters[key] = '';
          }
        }
      }
    },
    /**
     * @access private
     * @desc Build query from filters
     * @param silently Check if needed to update route query string or less
     * @param except Check if needed to avoid some keys to put in query string
     * @returns {string}
     * @private
     */
    __filtersToQuery(silently,except) {
      if (this.filters) {
        let queryString = '';
        let queryDict = {};
        for (let [key, value] of Object.entries(this.filters)) {

          if(except.includes(key)){
            continue
          }

          // Validate array/object empty
          if (typeof value === 'object' && !value.length) continue;

          if (value) {
            queryString += `${ key }=${ value }&`;
            queryDict[key] = value;
          }
        }
        // Remove the last & from query
        queryString = queryString.slice(0, -1);

        if(!silently) {
          this.__updateRouter(queryDict,queryString);
        }
        return queryString;
      }
    },
    /**
     * @desc Get data from query string
     * @private
     */
    __queryToFilters() {
      if (this.filters) {
        for (let key of Object.keys(this.filters)) {
          if (Object.prototype.hasOwnProperty.call(this.__query, key)) {
            // Check if filters value is an array an transform to it
            if (Array.isArray(this.filters[key]) && !Array.isArray(this.__query[key])) {
              this.filters[key] = this.__query[key].split(',');
            }
            else {
              this.filters[key] = this.__query[key];
            }
          }
        }
      }
    },
    /**
     * @access private
     * @desc Update router query string
     * @private
     * @param queryDict
     * @param queryString
     */
    __updateRouter(queryDict,queryString) {
      //console.log(this.$route)
      //this.$router.replace({name: this.$route.name, query: queryDict,params:this.$route.params})

      this.$nextTick(() => {
        history.pushState(
          {},
          null,
          this.$route.path + queryString !== "" ? '?' + queryString :''
        )
      });
    },
  },
};
