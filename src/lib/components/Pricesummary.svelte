<script lang="ts">
import { spring } from 'svelte/motion'
import { createEventDispatcher } from 'svelte'
import { currency } from '$lib/utils'
import { goto } from '$app/navigation'
import PrimaryButton from '$lib/ui/PrimaryButton.svelte'

const dispatch = createEventDispatcher()

export let cart,
	nextpage = null,
	text = 'לתשלום וסיום הזמנה',
	loading = false,
	disabled = false,
	hideCheckoutButton = false,
	showNextIcon = false

function modulo(n, m) {
	// handle negative numbers
	return ((n % m) + m) % m
}

function submit() {
	dispatch('submit')
}
</script>

{#if cart}
	<section class="my-5 border-t  border-gray-200 py-5">
		<h5 class="text-xl font-bold capitalize tracking-wide">
			<span>סיכום ההזמנה</span>

			<span class="text-sm font-medium">
				({cart.qty}
				{#if cart.qty > 1} פריטים {:else} פריט {/if})
			</span>
		</h5>

		<h6 class="mt-1 text-xs tracking-wider text-gray-400">כולל מע"מ</h6>

		<div class="mt-3">
			<div class="mt-2 flex items-center justify-between font-medium">
				<h4>סך הכל</h4>

				<h4>{cart.formattedAmount?.subtotal || '-'}</h4>
			</div>

			{#if cart?.savings > 0}
				<div class="mt-2 flex items-center justify-between font-medium text-green-500">
					<h4>חסכת בהזמנה זו</h4>

					<h4>
						{currency(cart?.savings)}
					</h4>
				</div>
			{/if}

			<div class="mt-2 flex items-center justify-between font-medium">
				<h4>הנחה</h4>

				<h4 class="text-green-500">
					{#if cart?.discount?.amount > 0}
						- {currency(cart?.discount?.amount)}
					{:else}
						0
					{/if}
				</h4>
			</div>

			<div class="mt-2 flex items-center justify-between font-medium">
				<h4>מע"מ</h4>

				<h4>{cart?.formattedAmount?.tax || '-'}</h4>
			</div>

			<div class="mt-2 flex items-center justify-between font-medium">
				<h4>משלוח</h4>

				<h4>
					{#if cart.shipping?.charge < 1}
						<span class="text-green-500">חינם!</span>
					{:else}
						{currency(cart.shipping?.charge)}
					{/if}
				</h4>
			</div>

			<!-- <p class="d mt-1 text-xs tracking-wider text-gray-400">
				Free shipping on orders of ₹999 or more. For first purchase,
				<a href="##" aria-label="Click to see all available offers" class="underline hover:text-primary-500">See Offer</a>
			</p> -->
		</div>

		<hr class="my-5 border-t border-dashed border-gray-200" />

		{#if cart.subtotal}
			<div class="my-2 mb-5 flex items-center justify-between text-lg font-bold ">
				<h4>סך הכל</h4>

				{cart.formattedAmount?.total}
			</div>
		{/if}
		<div class="hidden md:block">
			{#if cart.qty > 0 && !hideCheckoutButton}
				{#if nextpage}
					<PrimaryButton
						class="group w-full uppercase"
						loading="{loading}"
						disabled="{disabled}"
						on:click="{() => goto(`${nextpage}`)}">
						<span>{text}</span>

						{#if showNextIcon}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 transform transition duration-700 group-hover:translate-x-2"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"></path>
							</svg>
						{/if}
					</PrimaryButton>
				{:else}
					<PrimaryButton
						type="submit"
						class="w-full uppercase"
						loading="{loading}"
						disabled="{disabled}"
						on:click="{submit}">
						<span>{text}</span>

						{#if showNextIcon}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 transform transition duration-700 group-hover:translate-x-2"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"></path>
							</svg>
						{/if}
					</PrimaryButton>
				{/if}
			{/if}
		</div>

		<div class="fixed inset-x-0 bottom-0 z-50 block w-full md:hidden">
			{#if cart.qty > 0 && !hideCheckoutButton}
				{#if nextpage}
					<PrimaryButton
						roundedNone
						class="w-full uppercase"
						loading="{loading}"
						disabled="{disabled}"
						on:click="{() => goto(`${nextpage}`)}">
						<span>{text}</span>

						{#if showNextIcon}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 transform transition duration-700 group-hover:translate-x-2"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"></path>
							</svg>
						{/if}
					</PrimaryButton>
				{:else}
					<PrimaryButton
						roundedNone
						type="submit"
						class="w-full uppercase"
						loading="{loading}"
						disabled="{disabled}"
						on:click="{submit}">
						<span>{text}</span>

						{#if showNextIcon}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 transform transition duration-700 group-hover:translate-x-2"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"></path>
							</svg>
						{/if}
					</PrimaryButton>
				{/if}
			{/if}
		</div>
	</section>
{/if}
