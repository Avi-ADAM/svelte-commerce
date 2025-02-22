<style>
.success-animation {
	margin: 150px auto;
}

.checkmark {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	display: block;
	stroke-width: 4;
	stroke: #4bb71b;
	stroke-miterlimit: 10;
	box-shadow: inset 0px 0px 0px #4bb71b;
	animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
	position: relative;
	top: 5px;
	right: 5px;
	margin: 0 auto;
}

.checkmark__circle {
	stroke-dasharray: 166;
	stroke-dashoffset: 166;
	stroke-width: 4;
	stroke-miterlimit: 10;
	stroke: #4bb71b;
	fill: #fff;
	animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
	transform-origin: 50% 50%;
	stroke-dasharray: 48;
	stroke-dashoffset: 48;
	animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
	100% {
		stroke-dashoffset: 0;
	}
}

@keyframes scale {
	0%,
	100% {
		transform: none;
	}

	50% {
		transform: scale3d(1.1, 1.1, 1);
	}
}

@keyframes fill {
	100% {
		box-shadow: inset 0px 0px 0px 30px #4bb71b;
	}
}
</style>

<script>
import { Confetti } from 'svelte-confetti'
import { currency, date } from '$lib/utils'
import { fireGTagEvent } from '$lib/utils/gTag'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import LazyImg from '$lib/components/Image/LazyImg.svelte'
import PrimaryButton from '$lib/ui/PrimaryButton.svelte'
import SEO from '$lib/components/SEO/index.svelte'
import WhiteButton from '$lib/ui/WhiteButton.svelte'

export let data

const seoProps = {
	title: 'Payment Success ',
	metadescription: 'Payment Success '
}

onMount(async () => {
	fireGTagEvent('purchase', data.order)
})
</script>

<SEO {...seoProps} />

{#if data.order}
	<div class="min-h-screen w-full  px-3 py-5 sm:p-10 " dir="rtl">
		<div class="container mx-auto max-w-6xl">
			<div>
				<div class="mb-5 sm:mb-10">
					<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
						<circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"></circle>

						<path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
					</svg>
				</div>

				{#if data.order}
					<h2 class="mb-2 text-center text-2xl font-bold sm:text-3xl">
						{#if data.order?.seatsBooked}
							תודה רבה!
						{:else}
							תודה רבה על הזמנתך
						{/if}
					</h2>
				{/if}

				<p class="mb-5 text-center text-sm">
					מייל אישור נשלח לכתובת המייל שציינת
				</p>

				<ul class="mx-auto mb-5 flex max-w-max flex-col gap-2 sm:mb-10">
					<li class="flex items-start gap-2 text-sm">
						<h6 class="flex w-36 flex-shrink-0 items-center justify-between gap-1">
							<span>מספר הזמנה</span> <span>:</span>
						</h6>

						<b>
							{data.order?.orderNo}
						</b>
					</li>

					<li class="flex items-start gap-2 text-sm">
						<h6 class="flex w-36 flex-shrink-0 items-center justify-between gap-1">
							<span>הוזמן בתאריך</span> <span>:</span>
						</h6>

						<b>
							{date(data.order?.createdAt)}
						</b>
					</li>

					<li class="flex items-start gap-2 text-sm">
						<h6 class="flex w-36 flex-shrink-0 items-center justify-between gap-1">
							<span>סטטוס תשלום</span> <span>:</span>
						</h6>

						<spn class="uppercase" class:text-green-500="{data.order?.paymentStatus === 'paid'}">
							<b>
								{data.order?.paymentStatus}
							</b>
						</spn>
					</li>

					<li class="flex items-start gap-2 text-sm">
						<h6 class="flex w-36 flex-shrink-0 items-center justify-between gap-1">
							<span>שיטת תשלום</span> <span>:</span>
						</h6>

						<spn class="uppercase">
							<b>
								{data.order?.paymentMode}
							</b>
						</spn>
					</li>

					{#if data.order?.paymentGateway}
						<li class="flex items-start gap-2 text-sm">
							<h6 class="flex w-36 flex-shrink-0 items-center justify-between gap-1">
								<span>ספק תשלום</span> <span>:</span>
							</h6>

							<spn class="first-letter:uppercase">
								<b>
									{data.order?.paymentGateway}
								</b>
							</spn>
						</li>
					{/if}
				</ul>

				<div class="mb-5 flex flex-wrap items-center justify-center gap-2 sm:mb-10 sm:gap-5">
					{#if data.order?.seatsBooked}
						<a
							href="/my/orders?page=1#BusTickets"
							rel="noopener"
							aria-label="Click to view the booking details">
							<PrimaryButton type="button">הצגת ההזמנה</PrimaryButton>
						</a>
					{:else}
						<a
							href="/my/orders"
							rel="noopener"
							aria-label="Click to view the order details"
							data-sveltekit-preload-data>
							<PrimaryButton type="button"> הצגת ההזמנה</PrimaryButton>
						</a>
					{/if}

					<a href="/" rel="noopener" aria-label="Click to route home" data-sveltekit-preload-data>
						<WhiteButton type="button">להמשיך ולקנות</WhiteButton>
					</a>
				</div>
			</div>

			<div
				class="mx-auto max-w-7xl gap-5 sm:flex sm:items-start sm:justify-center sm:gap-10 md:gap-20">
				<div class="sm:w-1/2">
					{#if data.order?.items?.length > 0}
						<div class="mb-5">
							<h6
								class="border-b border-dashed border-gray-400 pb-2 text-base font-bold sm:text-lg">
								פרטי המוצר
							</h6>

							<div class="itmes-start flex flex-col">
								{#each data.order?.items as item, ix}
									<!-- data-sveltekit-reload added because in production it does not work-->
									<a
										href="/product/{item.slug}"
										aria-label="Click to view the product details"
										data-sveltekit-reload
										class="group flex w-full flex-row justify-between py-4
										{ix != data.order?.items.length - 1 ? 'border-b' : ''}">
										<div class="flex w-full flex-row gap-4">
											<div>
												<LazyImg
													src="{item.isCustomized ? item.customizedImg : item.img}"
													alt=""
													width="80"
													class="h-auto w-20 object-contain" />
											</div>

											<div class="w-4/5 flex-1 lg:w-10/12">
												<!-- {#if store.isFnb && item.vendor}
												<b class="mb-2 text-sm">
													{item.vendor.businessName}
												</b>
											{:else if item.brandName}
												<b class="mb-2 text-sm">
													{item.brandName}
												</b>
											{/if} -->

												<div class="mb-2 flex items-start gap-2">
													<!-- data-sveltekit-reload added because in production it does not work-->
													<div class="flex w-full justify-between gap-2">
														<a
															href="/product/{item.slug}"
															aria-label="Click to view the product details"
															data-sveltekit-reload
															class="flex-1 text-sm text-gray-500 group-hover:underline">
															{item.name}
														</a>

														{#if $page?.data?.store?.isFnb && item.foodType}
															<div>
																{#if item.foodType === 'veg'}
																	<img src="/product/veg.png" alt="veg" class="h-5 w-5" />
																{:else if item.foodType === 'nonveg'}
																	<img src="/product/non-veg.png" alt="non veg" class="h-5 w-5" />
																{/if}
															</div>
														{/if}
													</div>
												</div>

												<div class="mb-2 flex w-full flex-wrap gap-4 text-sm">
													<div class="flex items-center gap-2 whitespace-nowrap">
														<span class="font-medium text-gray-500">Qty :</span>

														<b>{item.qty}</b>
													</div>

													<div class="flex items-center gap-2 whitespace-nowrap">
														<span class="font-medium text-gray-500">Price :</span>

														<b>{currency(item.price)}</b>
													</div>
												</div>

												<!-- Options -->

												{#if item?.usedOptions?.length}
													<div class="mt-2 flex flex-col gap-2 text-xs">
														{#each item?.usedOptions as option}
															{#if option?.val?.length && option?.val !== undefined && option?.val != ''}
																<div class="flex flex-wrap gap-2">
																	<h6>{option.name}:</h6>
																	{#each option.val as v}
																		{#if v}
																			<div class="font-bold">
																				{v}
																			</div>
																		{/if}
																	{/each}
																</div>
															{/if}
														{/each}
													</div>
												{/if}
											</div>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}
<!----
					{#if data.order?.seats?.length > 0}
						<div class="mb-5">
							<h6
								class="mb-4 border-b border-dashed border-gray-400 pb-2 text-base font-semibold sm:text-lg">
							פרטי ההזמנה
							</h6>

							<div class="itmes-start flex flex-col divide-y text-sm">
								{#each data.order?.seats as seat}
									<div class="flex flex-col gap-2 py-4">
										<span><b>Seat Number : &nbsp; </b> {seat.seatNo} </span>

										<span>
											<b>Seat Type : &nbsp; </b>

											{#if seat.seatType === 'horizontal_sleeper'}
												Sleeper
											{:else}
												Seater
											{/if}
										</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}-->
				</div>

				<div class="flex flex-col gap-4 sm:w-1/2">
					{#if data.order && data.order?.address}
						<div class="text-sm">
							<h6
								class="mb-4 border-b border-dashed border-gray-400 pb-2 text-base font-semibold sm:text-lg">
								פרטי המשלוח
							</h6>

							<div class="text-sm text-gray-600">
								{#if data.order?.address.firstName}
									<h5 class="mb-2 text-base font-semibold capitalize tracking-wide">
										{data.order?.address.firstName}

										{data.order?.address.lastName}
									</h5>
								{/if}

								<div class="s flex flex-wrap">
									{#if data.order?.address.address}
										<div>
											{data.order?.address.address},
										</div>
									{/if}

									{#if data.order?.address.city}
										<div>
											{data.order?.address.city},
										</div>
									{/if}
											<!----
									{#if data.order?.address.country}
										<div>
											{data.order?.address.country}
										</div>
									{/if}
									-->
									{#if data.order?.address.zip}
										<div>
											{data.order?.address.zip}
										</div>
									{/if}
								</div>

								{#if data.order?.address.phone || data.order?.address.userPhone}
									<div>
										<b>נייד:</b>

										<span>{data.order?.address.phone || data.order?.userPhone}</span>
									</div>
								{/if}

								{#if data.order?.address.email}
									<div>
										<b>מייל:</b>

										<span>{data.order?.address.email}</span>
									</div>
								{/if}
							</div>
						</div>
					{/if}

					{#if data.order && data.order?.amount}
						<div class="text-sm">
							<h6
								class="mb-4 border-b border-dashed border-gray-400 pb-2 text-base font-semibold sm:text-lg">
								פרטי תשלום 
							</h6>

							<div class="flex max-w-max flex-col items-start gap-2">
								{#if data.order?.amount.subtotal}
									<div class="flex items-center">
										<h6 class="mr-2 w-20">סך הכל</h6>

										<span>: &nbsp; {currency(data.order?.amount.subtotal)} </span>
									</div>
								{/if}

								{#if data.order?.amount.discount}
									<div class="flex items-center">
										<h6 class="mr-2 w-20">הנחה</h6>

										<span>: &nbsp; {currency(data.order?.amount.discount)} </span>
									</div>
								{/if}

								{#if data.order?.amount.shipping}
									<div class="flex items-center">
										<h6 class="mr-2 w-20">משלוח</h6>

										<span>: &nbsp; {currency(data.order?.amount.shipping)} </span>
									</div>
								{/if}

								{#if data.order?.amount.total}
									<hr class="w-full border-t border-gray-300" />

									<div class="flex items-center text-base font-bold">
										<h6 class="mr-2 w-20">סך הכל</h6>

										<span>: &nbsp; {currency(data.order?.amount.total)} </span>
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<div
	style="position: fixed; top: -50px; left: 0; height: 100vh; width: 100vw; display: flex; justify-content: center; overflow: hidden; pointer-events: none;">
	<Confetti
		x="{[-5, 5]}"
		y="{[0, 0.1]}"
		delay="{[50, 2000]}"
		duration="2000"
		amount="500"
		fallDistance="100vh" />
</div>
