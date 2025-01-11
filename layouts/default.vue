<template>
    <div>
        <Nav></Nav>
        <slot/>
        <UNotifications />

    </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Inoai Bridge',
  meta: [
    { name: 'bridge', content: 'Inoai Bridge Excellent Bridge round the blockchain '}
  ],
  bodyAttrs: {
    class: 'bridge'
  },

})
</script>
