<script setup>

</script>

<template>
    <div class="content">
        <font-awesome-icon class="copied-icon" icon="fa-solid fa-check" />
        <p>コピー完了</p>
    </div>
</template>

<style scoped>
/* コンテンツ全体 */
.content {
    width: 30vw;
    height: 10vh;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}
.content p {
    width: fit-content;
    height: 2em;
    line-height: 2em;
}
.copied-icon {
    margin-right: 20px;
}
</style>
