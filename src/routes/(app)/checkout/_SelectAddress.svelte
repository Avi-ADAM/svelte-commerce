<script>
import { goto } from '$app/navigation'
import Error from '$lib/components/Error.svelte'
import AddressSkeleton from './_AddressSkeleton.svelte'
import { createEventDispatcher } from 'svelte'
import { del } from '$lib/utils/api'
import { page } from '$app/stores'
const dispatch = createEventDispatcher()

export let address, selectedAddress, loading

let removing = false,
	err

async function remove(id) {
	if (confirm('האם להסיר? פעולה זו אינה הפיכה')) {
		try {
			removing = true
			await del(`addresses/${id}?store=${$page.data.store?.id}`, $page.data.origin)
			await dispatch('deleteAddress', id)
		} catch (e) {
			err = e
		} finally {
			removing = false
		}
	}
}

async function addressChanged(id) {
	dispatch('addressChanged', id)
}
</script>

<Error err="{err}" />

{#if loading}
	<AddressSkeleton />
{:else if address}
	<div class="border-b p-4 sm:p-6" dir="rtl">
		<label class="flex w-full cursor-pointer flex-row gap-2 sm:gap-4">
			<input
				bind:group="{selectedAddress}"
				type="radio"
				value="{address._id}"
				name="group"
				class="mt-1.5 h-4 w-4 focus:outline-none focus:ring-0 focus:ring-offset-0"
				on:change="{() => addressChanged(address._id)}" />

			<div class="flex w-full cursor-pointer flex-col gap-2 font-light">
				<h5 class="flex-1 font-semibold capitalize tracking-wide md:text-lg">
					{address.firstName}
					{address.lastName}
				</h5>

				<div class="flex flex-wrap items-start text-sm md:flex-nowrap">
					<h5 class="w-20 font-semibold">כתובת</h5>

					<p class="flex flex-1 flex-wrap items-center">
						:
						{#if address.address}
							{address.address}
						{/if}
						{#if address.locality}
							, {address.locality}
						{/if}
						{#if address.city}
							, {address.city}
						{/if}
					<!----	{#if address.state}
							, {address.state}
						{/if}
						{#if address.country}
							, {address.country}
						{/if}-->
					</p>
				</div>

				<div class="flex flex-wrap items-start text-sm md:flex-nowrap">
					<h5 class="w-20 font-semibold">מיקוד</h5>

					<p class="flex flex-1 flex-col">
						: {address.zip}
					</p>
				</div>

				<div class="flex flex-wrap items-start text-sm md:flex-nowrap">
					<h5 class="w-20 font-semibold">טלפון</h5>

					<p class="flex flex-1 flex-col">
						: {address.phone}
					</p>
				</div>

				<div class="flex flex-wrap items-start text-sm md:flex-nowrap">
					<h5 class="w-20 font-semibold">מייל</h5>

					<p class="flex flex-1 flex-col">
						: {address.email}
					</p>
				</div>
			</div>
		</label>

		<div class="ml-6 mt-5 flex items-center gap-5 text-sm sm:ml-8">
			<button
				type="button"
				class="w-full rounded-md border border-primary-500 py-2 px-4 font-semibold tracking-wide text-primary-500 shadow-md transition duration-300 focus:outline-none hover:bg-primary-500 hover:text-white"
				on:click="{() => goto(`/checkout/add-address?id=${address._id}`)}">
				עריכה
			</button>

			<button
				type="button"
				class="w-full rounded-md border border-transparent bg-transparent py-2 px-4 font-semibold tracking-wide text-gray-500 transition duration-300 focus:outline-none hover:border-gray-500 hover:bg-gray-500 hover:text-white hover:shadow-md"
				on:click="{() => remove(address._id)}">
				{#if removing}
					<div class="flex justify-center">
						<svg
							style="height: 20px; width: 20px"
							class="-ms-1 animate-spin text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				{:else}
					<span>הסרה</span>
				{/if}
			</button>
		</div>
	</div>
{/if}
