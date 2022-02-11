<template lang="">
    <div class="sidebar">
        <h2>Tools</h2>
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
                    :min="1"
                    :max="100"
                    width='150px'
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
                <button v-on:click.prevent="$emit('on-clear', 'unvisited')">Clear Board</button>
            </div>
        </form>
        <form>
            <h2>General Settings</h2>
            <div class="option">
                <label for="renderSpeed">Simulation Speed: </label>
                <select 
                    class="drop-down"
                    id="renderSpeed"
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
            <div class="option">
                <label for="live-mode">Live Mode:</label>
                <PillToggleSwitchVue
                    id="live-mode"
                    @on-toggle="$emit('on-toggle-live-mode', $event)"
                    :initialValue="false"
                />
            </div>
            <div class="option">
                <label for="grid-view">Toggle Grid:</label>
                <PillToggleSwitchVue
                    id="grid-view"
                    @on-toggle="$emit('on-toggle-grid', $event)"
                    :initialValue="true"
                />
            </div>
            <div class="option">
                <label for="toggle-animations">Toggle Animations:</label>
                <PillToggleSwitchVue
                    id="toggle-animations"
                    @on-toggle="$emit('on-toggle-animation', $event)"
                    :initialValue="true"
                />
            </div>
            
        </form>
        <form>
            <h2>Algorithm Settings</h2>
            <div class="option">
                <label>Maze Generation: </label>
                <select>
                    <option :value='10'>Randomised Prims Algorithm</option>
                </select>
            </div>
            <div class="option">
                <label>Pathfinder: </label>
                <select>
                    <option :value='0'>Breadth First Search</option>
                    <option :value='10'>Depth First Search</option>
                </select>
            </div>
            <div class="option">
                <label>Graph: </label>
                <select></select>
            </div>
            <div class="run-algo">
                <button v-on:click.prevent="$emit('on-generate-maze')">Generate Maze</button>
                <div></div>
                <button v-on:click.prevent="$emit('on-search')">Search</button>
                <div></div>
                <button v-on:click.prevent="$emit('on-stop')">Stop</button>
            </div>
        </form>
    </div>
</template>
<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'
    import PillToggleSwitchVue from './layoutComponents/PillToggleSwitch/PillToggleSwitch.vue'

export default {
    components: {
        VueSlider,
        PillToggleSwitchVue
    },
    data() {
        return {
            weight: 1,
            renderSpeed: 10,
        }
    },
}


</script>
<style lang="scss" scoped>
    $primary: rgb(27, 45, 83);
    .sidebar {
        h2 {
            margin-bottom: 0;
        }
        position: relative;
        width: 280px;
        height: fit-content;
        border-radius: 1rem 0 0 1rem;
        color: rgb(255, 255, 255);
        background-color: $primary;
        box-shadow: 0 0 10px #957DAD;
        padding: 20px;
        form {
            label {
                font-size: 15px;
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
                margin: 7px 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 280px;
                height: fit-content;
                .drop-down {
                    transition: 1 ease;
                }
            }
        }
    }
    .run-algo {
        display: flex;
        margin: 5px auto;
        width: 100%;
        flex-direction: column;
    }
    select {
        width: 140px;
        font-family: var(--font-family);
    }
    button {
        width: 100%;
        height: 30px;
        margin: 5px auto;
        font-family: var(--font-family);
        background-color: #ffffff;
        border-radius: 5px;
    }
</style>