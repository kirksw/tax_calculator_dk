<script lang="ts">
    let clazz: string = "";
    export { clazz as class };
    export let desc: string;
    export let value: String;
    export let add: string = "Per month";
    export let unit: string = "kr";
</script>

<div class="field">
    <div class="top">{desc}</div>
    <div class="value">{value}<span>{unit}</span></div>
    <div class="bottom">{add}</div>
</div>

<style>
    .field {
        padding: 5px;

        background: #eee;
        width: 220px;
        height: 80px;

        display: flex;
        flex-direction: column;
        justify-content: center;

        flex-grow: 50;
    }

    .top {
        color: grey;
        font-size: 0.75rem;
    }

    .value {
        color: black;
        font-size: 1.75rem;
    }

    .bottom {
        color: grey;
        font-size: 0.75rem;
    }
</style>
