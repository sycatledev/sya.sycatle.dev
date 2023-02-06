<?php ob_start(); ?>

<div id="results" class="px-1 flex flex-col space-y-2"></div>

<!-- <button class="bottom-button fixed bottom-16 right-0 p-2">bottom</button> -->

<nav id="buttons" class="fixed bottom-0 font-semibold py-2 lg:py-4 text-black backdrop-blur-lg bg-zinc-50/70 dark:bg-zinc-900/70 dark:text-white w-full translate-y-full opacity-0 duration-300">
    <div class="main-carousel p-2 max-w-7xl w-full" data-flickity='{ "prevNextButtons": false, "pageDots": false, "cellAlign": "left", "contain": true, "freeScroll": true }'>
        <button id="meteo-button" class="carousel-cell mx-1 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300">Météo ☀️</button>
        <button id="quote-button" class="carousel-cell mx-1 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300">Citations ✨</button>
        <button id="crypto-button" class="carousel-cell mx-1 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300">Cryptos 📈</button>
        <button id="refresh-button" class="carousel-cell mx-1 inline-flex items-center border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300 group">
            <span>Réinitialiser</span>    
            <svg class="h-6 w-6 ml-1 group-hover:animate-spin" fill="currentColor" viewBox="0 0 24 24"><path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"></path></svg>
        </button>
    </div>
</nav>

<?php $content = ob_get_clean(); require("./src/server/views/template.php") ?>