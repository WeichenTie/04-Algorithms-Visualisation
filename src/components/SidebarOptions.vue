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
                    v-on:change="$emit('on-brush-select', 'wall')">
            </div>
            <div class="option">
                <label for="weight-brush">Weight</label>
                <input type="number" id="weight-value" name="weight-value" min="0" max="100">
                <input
                    type="radio"
                    name="brush"
                    id="weight-brush"
                    class="brush-button"
                    v-on:change="$emit('on-brush-select', 'weight')">
            </div>
            <div class="option">
                <label for="flag-brush">Flag</label>
                <input
                    type="radio"
                    name="brush"
                    id="flag-brush"
                    class="brush-button"
                    v-on:change="$emit('on-brush-select', 'flag')">
            </div>
            <div class="option">
                <label for="eraser-brush">Eraser</label>
                <input
                    type="radio"
                    name="brush"
                    id="eraser-brush"
                    class="brush-button"
                    v-on:change="$emit('on-brush-select', 'eraser')">
                
            </div>
            <button v-on:click.prevent="handleSubmit">Run</button>
            <button v-on:click.prevent="handleSubmit">Stop</button>
        </form>
    </div>
</template>
<script>
export default {
    props: {
        

    },
    data() {
        return {
            value:""
        }
    },
}


</script>
<style lang="scss">
    $primary: #6743ee;
    .sidebar {
        width: 400px;
        color: var(--main-colour);
        background-color: rgb(255, 255, 255);
        box-shadow: 0 0 5px black;
        padding: 20px;
        form {
            label {
                font-size: 1.5em;
            }
            input[type=radio] {
                box-shadow: inset 0 0 0 1px grey;
                width: 20px;
                height: 20px;
                padding: 0;
                margin: 0;
                appearance: none;
                transition: box-shadow 150ms cubic-bezier(.95,.15,.5,1.25);
                cursor: pointer;
                border-radius: 100px;
                &:checked {
                    box-shadow: inset 0 0 0 6px $primary;
                }


            }
            .option {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 200px;
                height: 30px;
            }
        }
    }
</style>