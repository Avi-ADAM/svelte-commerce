<script>
import LazyImg from '$lib/components/Image/LazyImg.svelte'

export let banners

// console.log('banners', banners)

$: pickedBanners = banners?.filter((b) => {
	return b._id?.type === 'picked' && b._id?.title !== 'DEAL ZONE'
})

$: pickedBannersForDeals = banners?.filter((b) => {
	return b._id?.type === 'picked' && b._id?.title === 'DEAL ZONE'
})
</script>

<div class="flex flex-col gap-5 sm:gap-10">
	{#if pickedBannersForDeals?.length}
		<div class="flex flex-col gap-5 sm:gap-10">
			{#each pickedBannersForDeals as b}
				<div>
					<h2
						class="p-3 py-5 text-center font-serif text-xl font-medium uppercase tracking-wider sm:px-10 sm:text-2xl md:py-10 md:text-3xl xl:text-4xl">
						{b._id?.title}
					</h2>

					{#if b.data?.length}
						<div class="max-w-screen overflow-x-auto scrollbar-none lg:hidden">
							<div role="banner" class="flex flex-row items-start">
								{#each b.data as banner, bx}
									{#if banner.img}
										<a href="{banner.link}" class="block flex-shrink-0" data-sveltekit-preload-data>
											<LazyImg
												src="{banner.img}"
												alt="banner{bx}"
												height="430"
												width="375"
												class="h-[430px] w-[375px] object-contain object-top" />
										</a>
									{/if}
								{/each}
							</div>
						</div>

						<div role="banner" class="hidden grid-cols-7 lg:grid">
							{#each b.data as banner, bx}
								{#if banner.img}
									<a href="{banner.link}" class="col-span-1" data-sveltekit-preload-data>
										<LazyImg
											src="{banner.img}"
											alt="banner{bx}"
											height="430"
											width="375"
											class="h-auto w-[375px] object-contain object-top" />
									</a>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	{#if pickedBanners?.length}
		<div class="flex flex-col gap-5 sm:gap-10">
			{#each pickedBanners as b}
				<div>
					<h2
						class="p-3 py-5 text-center font-serif text-xl font-medium uppercase tracking-wider sm:px-10 sm:text-2xl md:py-10 md:text-3xl xl:text-4xl">
						{b._id?.title}
					</h2>

					{#if b.data?.length}
						<div class="max-w-screen overflow-x-auto scrollbar-none lg:hidden">
							<div role="banner" class="flex flex-row items-start">
								{#each b.data as banner, bx}
									{#if banner.img}
										<a href="{banner.link}" class="block flex-shrink-0" data-sveltekit-preload-data>
											<LazyImg
												src="{banner.img}"
												alt="banner{bx}"
												height="430"
												width="375"
												class="h-[430px] w-[375px] object-contain object-top" />
										</a>
									{/if}
								{/each}
							</div>
						</div>

						<div role="banner" class="hidden grid-cols-7 lg:grid">
							{#each b.data as banner, bx}
								{#if banner.img}
									<a href="{banner.link}" class="col-span-1" data-sveltekit-preload-data>
										<LazyImg
											src="{banner.img}"
											alt="banner{bx}"
											height="430"
											width="375"
											class="h-auto w-[375px] object-contain object-top" />
									</a>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
