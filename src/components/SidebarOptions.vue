<template lang="">
    <div class="sidebar">
        <h2>Settings</h2>
        <form>
            <div class="option">
                <label for="wall-brush">Wall</label>
                <input 
                    type="radio"
                    name="brush" 
                    id="wall-brush" 
                    class="brush-button"
                    checked
                    @change="$emit('on-brush-select', 'wall')">
            </div>
            <div class="option">
                <label for="weight-brush">Weight</label>
                <VueSlider 
                    v-model="weight"
                    width='100px'
                    @change="$emit('on-weight-change', Number(weight))"/>
                <input
                    type="radio"
                    name="brush"
                    id="weight-brush"
                    class="brush-button"
                    @change="$emit('on-brush-select', 'weight')">
            </div>
            <div class="option">
                <label for="flag-brush">Flag</label>
                <input
                    type="radio"
                    name="brush"
                    id="flag-brush"
                    class="brush-button"
                    @change="$emit('on-brush-select', 'flag')">
            </div>
            <div class="option">
                <label for="start-node-brush">Start Node</label>
                <input
                    type="radio"
                    name="brush"
                    id="start-node-brush"
                    class="brush-button"
                    @change="$emit('on-brush-select', 'start-node')">
            </div>
            <div class="option">
                <label for="end-node-brush">End Node</label>
                <input
                    type="radio"
                    name="brush"
                    id="end-node-brush"
                    class="brush-button"
                    @change="$emit('on-brush-select', 'end-node')">
            </div>
            <div class="option">
                <label for="eraser-brush">Eraser</label>
                <input
                    type="radio"
                    name="brush"
                    id="eraser-brush"
                    class="brush-button"
                    @change="$emit('on-brush-select', 'unvisited')">
            </div>
            <div class="option">
                <label for="drag-brush">Drag Tool</label>
                <input
                    type="radio"
                    name="brush"
                    id="drag-brush"
                    class="brush-button"
                    @change="$emit('on-brush-select', 'drag')">
            </div>
            <div class="option">
                <label for="renderSpeed">Simulation Speed</label>
                <select 
                    v-model="renderSpeed"
                    @change="$emit('on-render-speed-change',renderSpeed)">
                    <option :value='0'>Instant</option>
                    <option :value='10'>Faster</option>
                    <option :value='50'>Fast</option>
                    <option :value='100'>Normal</option>
                    <option :value='500'>Slow</option>
                    <option :value='-1'>Step</option>
                </select>
            </div>
            <button v-on:click.prevent="$emit('on-run')">Run</button>
            <button v-on:click.prevent="$emit('on-stop')">Stop</button>
            <button v-on:click.prevent="$emit('on-clear', 'unvisited')">Clear</button>
            <button v-on:click.prevent="$emit('on-search')">Search</button>
        </form>
    </div>
</template>
<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'

export default {
    components: {
        VueSlider
    },
    data() {
        return {
            weight: 1,
            renderSpeed: 10,
        }
    },
}


</script>
<style lang="scss">
    $primary: #6743ee;
    .sidebar {
        position: relative;
        width: 250px;
        height: fit-content;
        border-radius: 1rem 0 0 1rem;
        color: rgb(255, 255, 255);
        background-color: rgb(27, 45, 83);
        box-shadow: 0 0 10px #957DAD;
        padding: 20px;
        form {
            label {
                font-size: 1em;
            }
            input[type=radio] {
                box-shadow: inset 0 0 0 1px rgb(255, 255, 255);
                width: 20px;
                height: 20px;
                padding: 0;
                margin: 0;
                appearance: none;
                transition: box-shadow 150ms cubic-bezier(.95,.15,.5,1.25);
                cursor: pointer;
                border-radius: 100px;
                &:checked {
                    box-shadow: inset 0 0 0 6px rgb(255, 255, 255);
                }
            }
            .option {
                margin: 5px 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 240px;
                height: fit-content;
            }
        }
    }
</style>