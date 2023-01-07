<script lang="ts">
    let clazz: string = "";
    export { clazz as class };
    export let desc: string;
    export let value: String;
    export let add: string = "Per month";
    export let unit: string = "kr";
</script>

<div class="field {clazz}">
    <div class="desc pad">{desc}</div>
    <div class="value pad">{value}<span>{unit}</span></div>
    <div class="add pad">{add}</div>
</div>

<style>
    .field {
        background: #eee;
        width: 220px;
        height: 80px;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .pad {
        padding-left: 5px;
        text-align: left;
    }

    .desc {
        color: grey;
        font-size: 1rem;
    }

    .value {
        color: black;
        font-size: 2rem;
    }

    .value span {
        font-size: 1rem;
    }

    .add {
        color: grey;
        font-size: 1rem;
    }

    .small {
        flex-grow: 10;
    }

    .normal {
        flex-grow: 50;
    }

    .expand {
        flex-grow: 100;
    }
</style>
