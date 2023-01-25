<template>
  <section ref="faqAccordionRef" class="gsr-faq-accordion">
    <div class="gsr-faq-accordion__inner-wrapper max-w-screen-2xl">
      <div v-if="hasNavigation" class="gsr-left-column">
        <ul class="gsr-categories-list">
          <li
            v-for="(category, i) in categories" :key="`category-${i}`"
            @click="makeActiveCategory(category, i)"
          >
						<span :class="generateCategoryClasses(category)">
							<span v-html="category" />
						</span>
          </li>
        </ul>
      </div>
      <div class="gsr-right-column">
        <transition name="gsr-fade-top" mode="out-in">
          <div v-if="showAccordion" class="gsr-accordion-list">
            <div
              v-for="(item, i) in categoryItems"
              :key="`accordion-item-${i}`"
              class="gsr-accordion-list__item"
              :class="generateQuestionClasses(i)"
              @click="makeActive(i)"
            >
              <div class="gsr-accordion-list__item__title-wrapper">
                <span class="gsr-accordion__title-text" v-html="$sanitize(item[questionProperty])" />
                <i class="gsr-icon-down-arrow transition-all duration-200" />
              </div>
              <GsrCollapseTransition dimension="height">
                <div v-if="i === activeQuestionIndex" class="gsr-accordion-list__item__body-wrapper">
                  <slot v-bind="item">
                    <div class="gsr-accordion__value" v-html="$sanitize(item[answerProperty])" />
                  </slot>
                </div>
              </GsrCollapseTransition>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import GsrCollapseTransition from '@/components/transitions/GsrCollapseTransition';

export default {
  name: 'VueFaqAccordion',

  components: { GsrCollapseTransition },

  props: {
    /**
     * Array of items
     * Object style {questionProperty: string, answerProperty: string, tabName: string}
     * You can change object keys names using other props (questionProperty, answerProperty, tabName)
     */
    items: {
      type: Array,
      required: true,
    },
    /**
     * Key name of object in items array for specifying title of question
     */
    questionProperty: {
      type: String,
      default: 'title',
    },
    /**
     * Key name of object in items array for specifying content text of open question
     */
    answerProperty: {
      type: String,
      default: 'value',
    },
    /**
     * Key name of object in items array for specifying navigation tab name
     */
    tabName: {
      type: String,
      default: 'category',
    },
    /**
     * Color for hover and active tab/question
     * possible values: 'red', '#F00', 'rgb(255, 0, 0)'
     */
    activeColor: {
      type: String,
      default: '#D50000',
    },
    /**
     * Color for borders
     */
    borderColor: {
      type: String,
      default: '#9E9E9E',
    },
    /**
     * Color for fonts
     */
    fontColor: {
      type: String,
      default: '#000000',
    },
  },

  data() {
    return {
      activeTab: '',
      activeQuestionIndex: null,
      showAccordion: true,
    };
  },

  computed: {
    categories() {
      const uniqueCategories = this.items
        .map(item => item[this.tabName])
        .filter((category, index, categories) => categories.indexOf(category) === index);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.activeTab = uniqueCategories[0];
      return uniqueCategories;
    },
    categoryItems() {
      return this.items
        .filter(item => item[this.tabName] === this.activeTab);
    },
    hasNavigation() {
      return !!this.categories[0];
    },
  },
  methods: {
    makeActive(itemIndex) {
      this.activeQuestionIndex = this.activeQuestionIndex === itemIndex ? null : itemIndex;
      this.$emit('itemSelect', { itemIndex });
    },
    generateQuestionClasses(questionIndex) {
      return [
        this.activeQuestionIndex === questionIndex
          ? 'gsr-accordion-list__item__active'
          : null,
      ];
    },
    makeActiveCategory(category, categoryIndex) {
      if (this.activeTab === category) {
        return;
      }

      this.showAccordion = false;
      this.activeTab = category;
      this.activeQuestionIndex = null;
      setTimeout(() => {
        this.$emit('categorySelect', { categoryIndex });
        this.showAccordion = true;
      }, 300);
    },
    generateCategoryClasses(category) {
      return [
        this.activeTab === category
          ? 'gsr-active'
          : null,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-faq-accordion {
  @apply p-4 w-full flex justify-center;

  &__inner-wrapper {
    @apply m-auto w-full flex flex-col;

    @screen md {
      @apply flex-row;
    }

    .gsr-left-column {
      @apply w-full transition-all duration-200 ease-in-out relative;

      @screen md {
        width: 40%;
        @apply pr-10;
      }

      .gsr-categories-list {
        li {
          @apply mb-4 cursor-pointer text-center;

          span {
            @apply text-3xl font-bold transition-all duration-200;

            &.gsr-active {
              color: $secondary-green
            }
          }

          &:hover {
            span {
              color: $secondary-green;
            }
          }

          @screen md {
            @apply text-right;
          }
        }
      }
    }

    .gsr-right-column {
      @apply w-full;

      @screen md {
        width: 60%;
      }

      .gsr-accordion-list {
        &__item {
          @apply bg-gray-200 mb-4 p-6 cursor-pointer transition-all duration-200;
          &__title-wrapper {
            font-size: 1.05rem;
            @apply flex flex-row text-gray-600 justify-between items-center font-medium;
          }

          &__body-wrapper {
            @apply pt-6 text-gray-600;
          }

          &__active {
            @apply bg-white;
            .gsr-accordion-list__item__title-wrapper {
              color: $primary-dark;

              i {
                @apply transform rotate-180;
              }
            }
          }
        }
      }
    }
  }
}
</style>
