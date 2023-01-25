<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center">
      <li v-for="(item, index) in items" :key="index">
        <div class="flex items-center">
          <svg-icon class="h-3 w-3 mx-3" name="arrow-right" v-if="index !== 0"/>
          <nuxt-link v-if="index !== items.length-1"
            :to="localePath('/'+item.link)"
            class="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            :class="{'text-gray-400 dark:text-gray-500':index === items.length-1}"
          >
            {{ item.label }}
          </nuxt-link>
          <span class="text-sm font-medium text-gray-400 dark:text-gray-400 dark:hover:text-white" v-else>
            {{ item.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
