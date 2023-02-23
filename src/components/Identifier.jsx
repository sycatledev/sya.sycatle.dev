export default function Identifier({ setter }) {
  return (
    <label for="identifier" class="flex flex-col space-y-2">
      <span class="text-lg font-semibold">
        Pseudonyme / Adresse électronique
      </span>
      <input
        required
        onChange={(e) => setter(e.target.value)}
        type="text"
        name="identifier"
        class="rounded-lg shadow focus:border-b-2 border-[#6fb463] bg-white dark:bg-black p-2 outline-none"
      />
    </label>
  );
}
