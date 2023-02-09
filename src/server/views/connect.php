<?php header('Content-Type: text/html; charset=utf-8'); ?>
<form method="post" id="login-form" class="p-2 lg:p-6 space-y-4 m-auto items-center h-full">
    <img class="h-20 w-20 mx-auto rounded-full" src="./assets/img/sya_logo.jpg" alt="SYA">
    <h1 class="font-bold text-center text-2xl">Bon retour 🦾</h1>

    <p class="text-sm text-gray-500 dark:text-gray-400 font-thin">Connexion avec votre compte <span class="text-[#6fb463]">sycatle.dev</span></p>

    <label for="identifier" class="flex flex-col space-y-2">
        <span class="text-lg font-semibold">Pseudonyme / Adresse électronique</span>
        <input required type="text" name="identifier" id="identifier" class="rounded-lg shadow focus:border-b-2 border-[#6fb463] bg-white dark:bg-black p-2 outline-none">
    </label>
    <label for="password" class="flex flex-col space-y-2">
        <span class="text-lg font-semibold">Mot de passe</span>
        <span class="flex relative items-center">
            <svg onclick="this.setAttribute('type', this.getAttribute('type') == 'password' ? 'text' : 'password')" class="h-6 w-6 text-gray-500 dark:text-gray-400 hover:cursor-pointer absolute right-0 mr-2 p-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5ZM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm-3-5c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3Z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            <input required type="password" name="password" id="password" class="w-full rounded-lg shadow focus:border-b-2 border-[#6fb463] bg-white dark:bg-black p-2 outline-none">
        </span>
    </label>

    <div class="flex flex-col-reverse lg:flex-row space-y-4 items-center lg:justify-between">
        <a href="https://sycatle.dev" class="text-gray-500 dark:text-gray-400 text-sm hover:underline my-2">Retourner sur sycatle.dev</a>
        <button type="submit" class="flex font-normal p-3 bg-[#6fb463] shadow hover:bg-[#4f8f44] lg:shadow-lg rounded">Se connecter</button>
    </div>
</form>