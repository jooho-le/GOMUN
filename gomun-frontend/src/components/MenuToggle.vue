<script setup lang="ts">
const props = defineProps<{ modelValue?: boolean }>()
const emit = defineEmits<{ (e:'update:modelValue', v:boolean): void }>()
function toggle() { emit('update:modelValue', !props.modelValue) }
</script>

<template>
  <button class="menu-toggle" :class="{ clicked: modelValue }" @click="toggle" aria-label="Menu" title="Menu">
    <span></span>
  </button>
  
</template>

<style scoped>
* { box-sizing: border-box }
.menu-toggle {
  border: none;
  width: 3.25rem; height: 3.25rem;
  border: 0.3rem solid #000;
  background: #fff;
  display: inline-flex; flex-direction: column; align-items: center; justify-content: center;
  border-radius: .375rem; cursor: pointer; transition: .125s ease;
}
.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
  display: block; width: 1.9rem; height: .25rem; border-radius: 99em; background: #000; transition: .5s ease;
}
.menu-toggle span { position: relative }
.menu-toggle span::before { content: ""; position: absolute; top: .5rem; left: 0 }
.menu-toggle span::after { content: ""; position: absolute; bottom: .5rem; left: 0 }

.menu-toggle.clicked { background: #000 }
.menu-toggle.clicked span { background: #fff; transform: rotate(45deg) }
.menu-toggle.clicked span::before { background: #fff; transform: rotate(90deg) translate(-.5rem) }
.menu-toggle.clicked span::after { background: #fff; transform: rotate(90deg) translate(.5rem); opacity: 0 }
</style>
