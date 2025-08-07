<template>
  <div class="toggle-preview-wrapper">
    <input
      v-model="isChecked"
      id="previewSwitch"
      type="checkbox"
      class="toggle-input"
      aria-label="Preview Form"
    />
    <label for="previewSwitch" class="toggle-label">
      <span class="toggle-text">فرم پیش نمایش</span>
      <span class="toggle-switch"></span>
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isChecked = ref(false);
</script>

<style scoped>
.toggle-preview-wrapper {
  display: flex;
  transition: all 0.15s;
}

.toggle-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  top: 50%;
  transform: translateY(-50%);
}

.toggle-label {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  color: white;
  flex-shrink: 0;
}

.toggle-text {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  width: 2.5rem;
  height: 17px;
  margin-bottom: 1px;
  border-radius: 9999px;
  background-color: #e2e3e9;
}

.toggle-input:checked + .toggle-label .toggle-switch::before {
  transform: translateX(1.25rem);
}

.toggle-switch::before {
  content: '';
  position: absolute;
  top: -5.5px;
  left: -5px;
  width: 1.7rem;
  height: 1.7rem;
  background-color: white;
  border-radius: 9999px;
  transition: transform 0.2s;
}

@media (max-width: 640px) {
  .toggle-text {
    display: none;
  }

  .toggle-preview-wrapper {
    display: none;
  }

  .toggle-label {
    display: none;
  }
}

</style>
