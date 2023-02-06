<!DOCTYPE html>
<html lang="fr" class="scroll-smooth <?= isset($_COOKIE['theme']) && $_COOKIE['theme'] == "dark" ? "dark" : "" ?>">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sya</title>

    <script src="./assets/js/App.js" type="module" defer></script>
    <script src="./assets/js/Cookies.js" defer></script>
    <script src="./assets/js/Theme.js" defer></script>
    <script src="./assets/js/Nav.js" defer></script>

    <script src="https://cdn.tailwindcss.com"></script>

    <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
    <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>

    <script>
        tailwind.config = {
            darkMode: 'class'
        }
    </script>
</head>
<body class="bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white duration-300">
    <main class="mx-auto mt-auto max-w-7xl py-16 space-y-8 text-xl min-h-screen"> 
        <header id="header" class="fixed top-0 left-0 font-semibold p-2 lg:p-4 text-black backdrop-blur-lg bg-zinc-50/70 dark:bg-zinc-900/70 dark:text-white w-full duration-300">
            <div class="flex max-w-7xl mx-auto p-2 items-center">
                <div class="inline-flex items-center space-x-2 z-40">
                    <svg class="h-12 w-12 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" zoomAndPan="magnify" viewBox="0 0 375 374.999991" preserveAspectRatio="xMidYMid meet" version="1.0" data-arp-injected="true"><defs><clipPath id="f7eadf1f08"><path d="M 40.511719 40.511719 L 334.511719 40.511719 L 334.511719 334.511719 L 40.511719 334.511719 Z M 40.511719 40.511719 " clip-rule="nonzero"></path></clipPath></defs><g clip-path="url(#f7eadf1f08)"><path d="M 261.558594 142.507812 C 257.972656 136.644531 253.6875 131.136719 248.789062 126.324219 C 233.128906 110.667969 211.4375 100.957031 187.554688 100.957031 C 163.675781 100.957031 141.980469 110.667969 126.324219 126.324219 C 116.964844 135.683594 109.792969 147.144531 105.417969 159.914062 L 201.902344 178.808594 L 208.8125 180.121094 L 285.964844 195.167969 L 296.546875 197.265625 C 294.1875 223.59375 282.554688 247.214844 264.972656 264.882812 C 245.203125 284.652344 217.820312 296.898438 187.644531 296.898438 C 148.105469 296.898438 111.980469 281.851562 84.773438 257.273438 L 84.773438 257.183594 C 107.867188 291.300781 146.355469 311.769531 187.644531 311.769531 C 221.933594 311.769531 252.988281 297.859375 275.46875 275.378906 C 297.949219 252.898438 311.855469 221.847656 311.855469 187.554688 C 311.855469 185.019531 311.769531 182.570312 311.683594 180.121094 L 296.546875 177.148438 L 273.019531 172.511719 L 195.253906 157.289062 L 331.539062 157.289062 C 333.550781 167 334.601562 177.148438 334.601562 187.46875 C 334.601562 228.058594 318.15625 264.796875 291.5625 291.386719 C 264.972656 317.980469 228.230469 334.425781 187.644531 334.425781 C 147.054688 334.425781 110.316406 317.980469 83.726562 291.386719 C 67.453125 275.117188 54.945312 255 47.683594 232.519531 C 67.628906 232.519531 87.574219 232.519531 107.519531 232.519531 L 113.640625 232.519531 C 117.226562 238.378906 121.511719 243.890625 126.410156 248.699219 C 142.070312 264.359375 163.761719 274.066406 187.644531 274.066406 C 211.523438 274.066406 233.21875 264.359375 248.875 248.699219 C 258.234375 239.339844 265.40625 227.882812 269.695312 215.109375 L 179.070312 197.441406 L 166.300781 194.902344 L 89.148438 179.859375 L 78.5625 177.757812 C 80.839844 151.429688 92.558594 127.8125 110.140625 110.140625 C 129.910156 90.371094 157.289062 78.125 187.46875 78.125 C 227.007812 78.125 263.132812 93.171875 290.339844 117.753906 C 285.878906 111.191406 280.890625 105.15625 275.378906 99.644531 C 252.898438 77.164062 221.847656 63.253906 187.554688 63.253906 C 153.265625 63.253906 122.214844 77.164062 99.730469 99.644531 C 77.25 122.125 63.34375 153.179688 63.34375 187.46875 C 63.34375 190.003906 63.429688 192.453125 63.519531 194.902344 L 78.652344 197.878906 L 102.183594 202.515625 L 179.945312 217.734375 C 134.546875 217.734375 89.0625 217.734375 43.660156 217.734375 C 41.648438 208.023438 40.601562 197.878906 40.601562 187.554688 C 40.601562 146.96875 57.046875 110.230469 83.636719 83.636719 C 110.230469 57.046875 146.96875 40.601562 187.554688 40.601562 C 228.144531 40.601562 264.882812 57.046875 291.476562 83.636719 C 307.746094 99.90625 320.253906 120.027344 327.515625 142.507812 C 305.558594 142.507812 283.515625 142.507812 261.558594 142.507812 Z M 261.558594 142.507812 " fill-opacity="1" fill-rule="nonzero"></path></g></svg>
                </div>
                <div class="flex ml-auto items-center space-x-2">
                    <button id="theme-button" class="flex items-center border fill-black dark:fill-white hover:fill-white dark:hover:fill-black hover:bg-black dark:hover:bg-white rounded-full p-2 lg:p-3 duration-300 group" onclick="toggleTheme()">
                        <svg class="w-6 h-6 inline-flex items-center"><path id="theme-icon" fill-rule="evenodd" clip-rule="evenodd"  d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3Zm0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5ZM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1Zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1ZM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1Zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1ZM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .38-.39.39-1.03 0-1.41L5.99 4.58Zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06Zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.41 0l1.06-1.06ZM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.41 0l1.06-1.06Z"></path></svg>
                    </button>
                    <button id="disconnect-button" class="flex items-center border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300 group">
                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.08 15.59 16.67 13H7v-2h9.67l-2.59-2.59L15.5 7l5 5-5 5-1.42-1.41ZM19 3a2 2 0 0 1 2 2v4.67l-2-2V5H5v14h14v-2.67l2-2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h14Z"></path></svg>
                    </button>
                </div>
            </div>
        </header>

        <?= $content ?>

        <footer>
            <span class="hidden lg:inline-flex fixed right-0 bottom-0 p-2 mt-auto text-sm font-normal items-center">
                Développé par <a href="https://sycatle.dev" target="__blank" class="hover:underline hover:text-lime-600 ml-1">sycatle.dev</a>
            </span>
        </footer>
    </main>
</body>
</html>