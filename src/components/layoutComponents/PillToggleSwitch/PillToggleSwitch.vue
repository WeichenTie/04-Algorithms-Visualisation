<template>
  <div>
    <span
      class="toggle-wrapper"
      role="checkbox"
      @click="toggle"
    >
      <span
        class="toggle-background"
        :class="backgroundStyles"
      />
      <span
        class="toggle-indicator"
        :style="indicatorStyles" 
      />
    </span>
  </div>
</template>
<script>
export default {
    data() {
        return {
            value: true,
        }
    },
    computed: {
        backgroundStyles() {
            return {
                'gold-mid': this.value,
                'gray-lighter': !this.value
            };
        },
    indicatorStyles() {
        return { transform: this.value ? 'translateX(14px)' : 'translateX(0)' };
    }
  },
    methods: {
        toggle() {
            this.value = !this.value;
            this.$emit('on-toggle', this.value);
        }
    }
};
</script>
<style lang="scss">
    .gold-mid{
        background-color: salmon;
    }

    .gray-lighter{
        background-color: #c2c2c2;
    }

    .toggle-wrapper {
        margin: auto 0;
        display: block;
        position: relative;
        cursor: pointer;
        width: 32px;
        height: 18px;
        border-radius: 9999px;
    }

    .toggle-wrapper:focus {
        outline: 0;
    }

    .toggle-background {
        display: inline-block;
        border-radius: 9999px;
        height: 100%;
        width: 100%;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: background-color .4s ease;
    }

    .toggle-indicator {
        position: absolute;
        height: 14px;
        width: 14px;
        left: 2px;
        bottom: 2px;
        background-color: #ffffff;
        border-radius: 9999px;
        box-shadow:  0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform .4s ease;
    }
</style>