<template>
    <div class="layoutvue">
        <header>
            <div class="title">
                <NuxtLink class="nuxt-link" to="/">
                    <p class="title-text">DORTS</p>
                </NuxtLink>
            </div>
        </header>
        <slot />
    </div>
</template>
<style scoped>
.layoutvue {
    height: 100%;
}
header {
    display: flex;
    height: 8vh;
    align-items: center;
}
.title {
    width: fit-content;
}
.title-text {
    margin-left: 2rem;
    font-size: 2rem;
    font-weight: bold;
    color: black;
}
.nuxt-link {
    text-decoration: none;
    width: fit-content;
}
</style>
