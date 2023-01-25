<template>
  <div class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
      <tr>
        <th v-for="(item,index) in content.headers"
            :class="[getThClass(index)]"
            :key="item" scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
          {{ item }}
        </th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="(row,trIndex) in content.rows" :key="trIndex" :class="[getTrClass(trIndex)]">
        <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
          {{ row[0] }}
          <dl class="font-normal lg:hidden" v-if="row.length > 1">
            <dt v-for="(item, dtIndex) in row.slice(1)"
                :key="dtIndex"
                :class="[getDtClass(dtIndex)]"
                class="truncate text-gray-700">{{content.headers[dtIndex+1]}}: {{ item }}
            </dt>
          </dl>
        </td>
        <td v-for="(item,index) in row.slice(1)"
            :key="index"
            :class="[getTdClass(index)]"
            class="px-3 py-4 text-sm text-gray-500 lg:table-cell">
          {{ item }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "GsrCmsTable",
  props: {
    content: {
      type: Object,
      default: () => {
      },
      required: true
    },
    striped: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * @desc Get tr classes
     * @param index
     * @returns {string}
     */
    getTrClass(index) {
      let classes = ''
      if (this.striped) {
        classes = index % 2 ? ' bg-gray-50' : null
      }

      return classes;
    },
    /**
     * @desc Get td classes
     * @param index
     * @returns {string|*}
     */
    getTdClass(index) {
      let classes = ''
      switch (index) {
        case 0:
          classes = 'hidden lg:table-cell'
          break;
        case 1:
          classes = 'hidden md:table-cell'
          break;
        case 2:
          classes = 'hidden sm:table-cell'
          break;
        default:
          classes = 'hidden sm:table-cell'
      }

      return classes;
    },
    /**
     * @desc Get dt classes
     * @param index
     * @returns {string|*}
     */
    getDtClass(index) {
      let classes = ''
      switch (index) {
        case 0:
          classes = 'lg:hidden'
          break;
        case 1:
          classes = 'md:hidden'
          break;
        case 2:
          classes = 'sm:hidden'
          break;
        default:
          classes = 'sm:hidden'
      }
      return classes;
    },
    /**
     * @desc Get th classes
     * @param index
     * @returns {string}
     */
    getThClass(index) {
      let classes = ''
      switch (index) {
        case 0:
          classes = 'sm:pl-6'
          break;
        case 1:
          classes = 'hidden lg:table-cell'
          break;
        case 2:
          classes = 'hidden md:table-cell'
          break;
        case 3:
          classes = 'hidden sm:table-cell'
          break;
        default:
          classes = 'hidden sm:table-cell'
      }

      return classes
    },
  }
}
</script>

<style lang="scss" scoped>
.gsr-cms-text {
  line-height: 2;
  color: #524e4e;
}

:deep() {
  ul, ol {
    margin: 20px 0 20px 0;
  }

  ul li, ol li {
    list-style: none;
    position: relative;
    padding: 4px 0 2px 20px;
  }

  ul li::before, ol li::before {
    content: '*';
    position: absolute;
    top: 6px;
    left: 0;
  }
}
</style>
