<script setup lang="ts">
import { PURODUCT_NAME } from "@/const/donatsu";
</script>

<template>
  <main>
    <section class="content-wrap">
      <div class="container">
        <h1 class="app-title">{{ PURODUCT_NAME }}</h1>
        <nav class="contents-nav">
          <RouterLink to="/daily-report">
            <Button class="p-button-lg content-button" label="日報作成" />
          </RouterLink>
          <RouterLink to="/start-notification">
            <Button
              class="p-button-lg content-button"
              label="作業開始文言作成"
            />
          </RouterLink>
        </nav>
      </div>
    </section>
    <footer>
      <div class="sub-icons">
        <RouterLink to="/settings">
          <Button icon="pi pi-cog" />
        </RouterLink>
        <Button icon="pi pi-github" />
      </div>
    </footer>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content-wrap {
  margin: 0;
  display: grid;
  place-items: center;
}

.container {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 20px;
}

.app-title {
  color: black;
  font-size: 5rem;
  margin-right: 20px;
  padding: 10px;
}

.contents-nav {
  display: flex;
  flex-direction: column;
}

.content-button {
  margin: 10px 0;
  width: 15rem;
  height: 5rem;
}

footer {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.sub-icons {
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
