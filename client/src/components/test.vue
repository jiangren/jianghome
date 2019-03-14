<template>
    <div class="test">
        <button type="button" @click="getJson">从后端取json</button>
        <div class="showJson">{{json}}</div>
    </div>
</template>

<script>
import {store} from './vuex'
export default {
    computed: {
        json () {
            return store.state.json;
        }
    },
    methods: {
        getJson () {
            store.dispatch('getJson');
        }
    }
}
</script>

<style scoped>
    .showJson{
        width:500px;
        margin:10px auto;
        min-height:500px;
        background-color: palegreen;
    }
</style>
