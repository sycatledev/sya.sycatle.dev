<?php ob_start(); ?>

<section class="grid place-items-center">

    <form id="login-form" class="flex flex-col px-10 space-y-4 my-auto">
        <label for="identifier" class="flex flex-col space-y-2">
            <span>Identifiant</span>
            <input type="text" name="identifier" id="identifier" class="rounded shadow bg-black border p-2" placeholder="Identifiant">
        </label>
        <label for="password" class="flex flex-col space-y-2">
            <span>Mot de passe</span>
            <input type="password" name="password" id="password" class="rounded shadow bg-black border p-2" placeholder="Mot de passe">
        </label>

        <button type="submit" class="flex border hover:bg-white hover:text-black rounded-full p-3 duration-300">Connexion</button>
    </form>

</section>

<?php $content = ob_get_clean(); require("./src/server/views/template.php") ?>