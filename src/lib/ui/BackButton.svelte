<script>
import { goto } from '$app/navigation'

export let to = '',
	whiteText = false

let clazz = ''
export { clazz as class }

function go() {
	if (to) {
		goto(to)
	} else {
		goto(history.back() || '/')
	}
}
</script>

<section class="max-w-max {clazz}">
	<button
		class="flex max-w-max transform items-center transition duration-300 focus:outline-none hover:-translate-x-1 
		{whiteText ? 'text-gray-200 hover:text-white' : 'text-blue-600 hover:text-blue-800'}"
		on:click="{go}">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"
			></path>
		</svg>

		<span>חזרה</span>
	</button>
</section>
