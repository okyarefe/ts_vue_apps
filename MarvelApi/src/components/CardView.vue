<template>
  <article
    class="p-4 bg-white rounded-lg shadow-xl place-content-center text-slate-800 flex flex-col-reverse"
  >
    <header class="h-1/2">
      <h1 class="pb-5 text-m font-semibold bg-re">
        <slot name="header"></slot>
      </h1>
    </header>
    <slot></slot>
  </article>
</template>
