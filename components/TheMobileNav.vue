<template>
  <transition name="nav-menu" :duration="500" appear>
    <div class="z-30 fixed inset-0">
      <div
        class="absolute w-full h-screen flex flex-col left-0 bg-primary-lightest overflow-y-scroll"
      >
        <!-- Navigation Links -->
        <div class="flex flex-grow flex-row justify-center items-center">
          <transition-group
            name="nav-menu-link"
            tag="ul"
            appear
            class="text-center text-4xl font-semibold"
            :style="{ '--length': menuItems.length }"
          >
            <li
              v-for="(item, index) in menuItems"
              :key="'mobileNavItem' + index"
              :style="{ '--i': index }"
            >
              <NuxtLink :to="localePath(resolveUrl(item))" class="sw-nav-link">
                {{ item.name }}
              </NuxtLink>
            </li>
          </transition-group>
        </div>

        <!-- Misc. Links -->
        <div
          ref="miscLinks"
          class="
            bottom-0
            w-full
            flex flex-wrap
            border-b border-primary-light
            md:px-10 md:pb-6 md:border-b-0 md:justify-center
          "
        >
          <button class="sw-nav-button" @click.prevent="$emit('click-search')">
            <BaseIcon icon="uil:search" size="sm" /><span class="ml-3">{{
              $t('navigation.search')
            }}</span>
          </button>
          <NuxtLink
            class="sw-nav-button"
            :to="localePath(customerLoggedIn ? '/account/orders/' : '/account/login/')"
          >
            <BaseIcon icon="uil:user" size="sm" /><span class="ml-3">{{
              $t('navigation.account')
            }}</span>
          </NuxtLink>
          <LocaleSelect v-if="$i18n.locales.length > 1" class="sw-nav-button" appearance="popup" />
          <CurrencySelect
            v-if="currency"
            :currency="currency"
            class="sw-nav-button z-10"
            appearance="popup"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheMobileNav',

  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapState(['customerLoggedIn', 'currency']),
  },

  methods: {
    checkIfLoggedIn() {
      if (this.customerLoggedIn) {
        this.$emit('click-close')
        this.$router.push(this.localePath('/account/'))
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.sw-nav-button {
  @apply w-1/2 h-14 flex flex-row flex-grow justify-center items-center border-primary-light rounded-none
         md:w-40 md:border md:flex-grow-0 md:rounded md:m-1;

  &:nth-child(odd) {
    @apply border-r border-t;
  }

  &:nth-child(even) {
    @apply border-t;
  }
}

.sw-nav-link {
  &:focus,
  &.nuxt-link-active {
    @apply shadow-none text-accent-default border-accent-default;
  }
}

.nav-menu-enter-active {
  @apply transition-all duration-500 ease-in-out;
}

.nav-menu-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.nav-menu-enter,
.nav-menu-leave-to {
  @apply opacity-0;
}

.nav-menu-enter-to,
.nav-menu-leave {
  @apply opacity-100;
}

.nav-menu-link-enter-active,
.nav-menu-link-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.nav-menu-link-enter,
.nav-menu-link-leave-to {
  @apply opacity-0 transform translate-y-4;
}

.nav-menu-link-enter-to,
.nav-menu-link-leave {
  @apply opacity-100 transform translate-y-0;
  transition-delay: calc(50ms * var(--i));
}
</style>