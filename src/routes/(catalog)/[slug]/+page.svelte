<style>
@media (min-width: 1024px) {
	.top-rem-map {
		top: 85px;
	}
}
.frosted-black {
	backdrop-filter: blur(5px);
	background-color: hsla(0, 0%, 0%, 0.8);
}
.height {
	max-height: 85vh;
}
</style>

<script>
import { currency, dateOnly, toast } from '$lib/utils'
import { fade } from 'svelte/transition'
import { goto, invalidateAll } from '$app/navigation'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { sorts } from '$lib/config'
import Breadcrumb from '$lib/components/Breadcrumb.svelte'
import DesktopFilter from '$lib/components/DesktopFilter.svelte'
import DummyProductCard from '$lib/DummyProductCard.svelte'
import MobileFilter from '$lib/components/MobileFilter.svelte'
import MobileFooter from '$lib/MobileFooter.svelte'
import noNoDataAvailable from '$lib/assets/no/no-data-availible.png'
import Pagination from '$lib/components/Pagination.svelte'
import PrimaryButton from '$lib/ui/PrimaryButton.svelte'
import ProductCard from '$lib/ProductCard.svelte'
import ProductNav from '$lib/ProductNav.svelte'
import SEO from '$lib/components/SEO/index.svelte'
import { fetchNextPageProducts } from '$lib/services/ProductService'

export let data

// console.log('data = ', data)
// console.log('data = ', data.category)
// console.log('Products = ', products)
// console.log('Count = ', count)
// console.log('Facets = ', facets)

let seoProps = {
	// addressCountry: 'India',
	// addressLocality: 'Semiliguda, Koraput',
	// addressRegion: 'Odisha',
	// alternateJsonHref: '',
	// alternateXml: { title: '', href: '' },
	brand: $page.data.store?.title,
	breadcrumbs: data.category?.children,
	caption: $page.data.store?.title,
	category: data.category?.name,
	contentUrl: $page.data.store?.logo,
	createdAt: `${data.category?.createdAt || '_'}`,
	// depth: { unitCode: '', value: '' },
	email: `${$page?.data?.store?.email}`,
	// entityMeta: '',
	// facebookPage: '',
	// gtin: '',
	// height: '',
	id: $page?.url?.href,
	image: `${data.category?.img}`,
	logo: $page.data.store?.logo,
	ogSquareImage: { url: '', width: 56, height: 56 },
	openingHours: ['Monday,Tuesday,Wednesday,Thursday,Friday,Saturday 10:00-20:00'],
	// popularity: data.category?.popularity,
	// postalCode: '764036',
	// price: data.category?.price,
	// priceRange: `${data.category?.price}-${data.category?.mrp}`,
	// ratingCount: 1,
	// ratingValue: +data.category?.ratings + 1,
	// sku: data.category?.sku,
	// streetAddress: 'Padmajyoti Marg, Nandapur Road',
	timeToRead: 0,
	updatedAt: `${data.category?.updatedAt || '_'}`,
	// weight: { unitCode: '', value: '' },
	// width: { unitCode: '', value: '' },
	// wlwmanifestXmlHref: '',
	metadescription: data.category?.metaDescription,
	// article: false,
	canonical: `${$page?.url.href}`,
	datePublished: `${data.category?.publishedAt || '_'}`,
	description: ` ${data.category?.description}`,
	dnsPrefetch: `//cdn.jsdelivr.net`,
	// entityMeta: null,
	featuredImage: {
		url: `${data.category?.img}`,
		width: 675,
		height: 380,
		caption: data.category?.name
	},
	keywords: $page.data.store?.keywords,
	lastUpdated: `${data.category?.updatedAt || '_'}`,
	msapplicationTileImage: `${data.category?.img}`,
	ogImage: { url: $page.data.store?.logo, width: 128, height: 56 },
	ogImageSecureUrl: `${$page?.data?.store?.logo}`,
	ogImageType: 'image/jpeg',
	ogSiteName: `${$page.data.origin}/sitemap/sitemap.xml`,
	productAvailability: `${data.category?.stock}`,
	productBrand: `${data.category?.brandName || $page.data.store?.title}`,
	productName: `${data.category?.name}`,
	// productPriceAmount: `${data.category?.price}`,
	productPriceCurrency: `${$page?.data?.store?.currencyCode}`,
	slug: `${data.category?.slug}`,
	// timeToRead: 0,
	title: `${data.category?.name}`,
	twitterImage: { url: `${data.category?.img}` }
}

let showFilter = false
let showSort = false
let hidden = true
let showOnPx = 600
let y

$: innerWidth = 0

function goTop() {
	// scroll to the top
	window.scroll({ top: 0, behavior: 'smooth' })
}

function scrollContainer() {
	return document.documentElement || document.body
}

function handleOnScroll() {
	if (!scrollContainer()) {
		return
	}

	if (scrollContainer().scrollTop > showOnPx) {
		hidden = false
	} else {
		hidden = true
	}
}

async function sortNow(s) {
	let u = new URL($page.url)

	if (s == 'null' || s == null || s == undefined || s == 'undefined') {
		u.searchParams.delete('sort')
	} else {
		await u.searchParams.set('sort', s)
	}
	// await invalidateAll()
	goto(u.toString())
	window.scroll({ top: 0, behavior: 'smooth' })

	// await goto(`/search?${$page.url.searchParams.toString()}`)
}

let currentPage = 1

async function loadNextPage() {
	let nextPage = currentPage + 1
	$page.url.searchParams.delete('page')
	const searchParams = $page.url.searchParams.toString()
	try {
		data.isLoading = true
		const res = await fetchNextPageProducts({
			categorySlug: data.category?.slug,
			origin: $page?.data?.origin,
			storeId: $page?.data?.store?.id,
			nextPage,
			searchParams
		})
		const nextPageData = res.nextPageData
		data.products = data?.products?.concat(nextPageData)
		data.count = res?.count
		data.facets = res?.facets
		data.err = !res?.estimatedTotalHits ? 'No result Not Found' : null
		currentPage = currentPage + 1
	} catch (e) {
		toast(e, 'error')
	} finally {
		data.isLoading = false
	}
}

async function refreshData() {}

onMount(() => {
	if (!$page?.data?.isDesktop) {
		const intersectionObserver = new IntersectionObserver((entries) => {
			if (entries[0].intersectionRatio <= 0) return
			// load more content;
			loadNextPage()
		})
		intersectionObserver.observe(document.querySelector('.more'))
	}
})

async function goCheckbox(item) {
	if (item === $page.url.searchParams.get('tags')) {
		$page.url.searchParams.set('tags', '')
	} else {
		$page.url.searchParams.set('tags', item)
		$page.url.searchParams.set('page', '1')
	}
	await goto($page.url.toString())
	await invalidateAll()
}
</script>

<SEO {...seoProps} />

<svelte:window bind:scrollY="{y}" bind:innerWidth="{innerWidth}" on:scroll="{handleOnScroll}" />

<ProductNav me="{$page?.data?.me}" cart="{$page?.data?.cart}" store="{$page?.data?.store}">
	<div class="flex max-w-max flex-col items-start gap-1">
		<h2 class="w-28 truncate font-semibold capitalize leading-4">{data.category?.name}</h2>

		<p class="text-xs">
			{data.count}

			{#if data.count > 1}
				Items
			{:else}
				Item
			{/if}
		</p>
	</div>
</ProductNav>

<div class="{showFilter || showSort ? 'h-[93vh] overflow-hidden' : 'h-full min-h-screen'}">
	{#if !hidden && innerWidth <= 1024}
		<button
			transition:fade="{{ duration: 500 }}"
			aria-label="Click to go to top"
			class="fixed top-28 left-[50%] z-40 -ml-14 flex w-28 transform items-center justify-center gap-1 rounded-full bg-black bg-opacity-60 py-1 px-3 text-xs uppercase text-white transition duration-300 focus:outline-none hover:bg-opacity-80 active:scale-90 sm:top-36"
			on:click="{goTop}">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="h-3 w-3">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
				></path>
			</svg>

			<span class="flex-1">{data.products?.length} / {data.count}</span>
		</button>
	{/if}

	<div class="mb-10 flex w-full flex-col sm:mb-20 lg:flex-row lg:gap-10 lg:p-10">
		{#if data.facets}
			<DesktopFilter
				facets="{data.facets}"
				query="{data.query}"
				class="sticky top-24 hidden lg:block"
				on:clearAll="{refreshData}" />

			<MobileFilter
				facets="{data.facets}"
				bind:showFilter="{showFilter}"
				bind:showSort="{showSort}"
				class="sticky top-14 z-40 block sm:top-20 lg:hidden"
				on:clearAll="{refreshData}" />
		{/if}

		<div class="w-full sm:px-10 lg:px-0">
			{#if data.products?.length > 0}
				<div class="mb-5 w-full sm:mb-10 lg:mb-20">
					<div
						class="mb-5 hidden flex-wrap items-center justify-between gap-4 px-3 sm:px-0 lg:flex">
						<h1 class="flex flex-wrap items-center gap-2">
							<span class="text-xl font-bold capitalize md:text-2xl"> {data.category?.name} </span>

							-

							<p>
								<span class="text-xl font-bold capitalize md:text-2xl">
									{data.count}
								</span>

								<span>
									{#if data.count > 1}
										Items
									{:else}
										Item
									{/if}
								</span>
							</p>
						</h1>

						<div class="flex flex-wrap items-center justify-between">
							<label class="flex items-center gap-2">
								<span>Sort : </span>

								<select
									bind:value="{data.sort}"
									class="max-w-max border-b bg-transparent py-1 pr-2 font-semibold focus:border-primary-500 focus:outline-none hover:border-primary-500"
									on:change="{() => sortNow(data.sort)}">
									{#each sorts as s}
										<option value="{s.val}">{s.name}</option>
									{/each}
								</select>
							</label>
						</div>
					</div>

					{#if data.facets.all_aggs.style_tags?.all?.buckets?.length}
						<div
							class="w-screen overflow-x-auto scrollbar-none lg:mb-5 lg:w-full lg:overflow-x-hidden">
							<div class="inline-flex gap-2 p-3 lg:flex lg:flex-wrap lg:p-0">
								{#each data.facets.all_aggs.style_tags.all.buckets || [] as t}
									{#if t}
										<button
											class="block whitespace-nowrap rounded-full border bg-white py-1 px-3 text-xs font-medium uppercase transition duration-300 focus:outline-none hover:border-primary-500 hover:text-primary-500"
											on:click="{() => goCheckbox(t.key)}">
											{t.key} ({t.doc_count})
										</button>
									{/if}
								{/each}
							</div>
						</div>
					{/if}

					{#if data.category?.topDescription}
						<div class="prose prose-sm mb-5 max-w-none px-3 text-justify sm:px-0">
							{@html data.category?.topDescription}
						</div>
					{/if}

					<ul
						class="grid w-full grid-cols-2 items-start border-t sm:flex sm:flex-wrap sm:justify-between sm:gap-3 sm:border-t-0 lg:gap-6">
						{#each data.products as p, ix}
							<li>
								<ProductCard product="{p}" />
							</li>

							{#if ix % 40 === 39 && data.facets.all_aggs.tags?.all?.buckets?.length}
								<div class="col-span-2 w-screen overflow-x-auto bg-primary-100 scrollbar-none">
									<div class="flex items-center gap-6 p-4">
										<div class="flex-shrink-0">
											<span class="text-lg text-gray-500">Filter by</span>

											<br />

											<span class="text-2xl font-bold">Tags</span>
										</div>

										<ul class="flex w-[40rem] flex-shrink-0 flex-wrap gap-2">
											{#each data.facets.all_aggs.tags.all.buckets || [] as t}
												{#if t}
													<button
														class="capitalizefocus:outline-none max-w-max rounded-md bg-white py-2 px-4 text-sm font-semibold"
														on:click="{() => goCheckbox(t.key)}">
														{t.key}
													</button>
												{/if}
											{/each}

											<!-- <li class="flex items-center whitespace-nowrap">
										<span>More Options</span>

										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											class="w-5 h-5">
											<path
												fill-rule="evenodd"
												d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
												clip-rule="evenodd"></path>
										</svg>
									</li> -->
										</ul>
									</div>
								</div>
							{/if}
						{/each}

						{#each { length: 7 } as _}
							<li class="hidden sm:block">
								<DummyProductCard />
							</li>
						{/each}
					</ul>
				</div>
			{:else}
				<div
					class="mb-5 flex w-full items-center justify-center px-3 sm:mb-10 sm:px-0 lg:mb-20"
					style="height: 60vh;">
					<div class="m-10 flex flex-col items-center justify-center text-center">
						<h2 class="mb-10 text-xl capitalize sm:text-2xl lg:text-3xl">
							{#if data.searchData}You searched for "{data.searchData}"{/if}
						</h2>

						<div class="mb-5">
							<img
								src="{noNoDataAvailable}"
								alt="no data availible"
								class="h-20 w-20 object-contain text-xs" />
						</div>

						<h2>We couldn't find any matches!</h2>

						<p class="mb-5 text-center text-xs text-gray-500">
							Please check the spelling or try searching something else
						</p>

						<PrimaryButton class="text-sm" on:click="{() => goto('/')}">Back to Home</PrimaryButton>
					</div>
				</div>
			{/if}

			{#if !$page?.data?.isDesktop}
				<div class="more">{data.isLoading ? 'loading...' : ''}</div>
			{:else}
				<Pagination
					count="{Math.ceil((data?.count || 1) / data.pageSize)}"
					current="{data?.currentPage || 1}" />
			{/if}
		</div>
	</div>

	<!-- CATEGORY DESCRIPTION -->

	{#if data.category?.description}
		<div class="w-full justify-center bg-gray-50 px-3 py-10 sm:px-10 sm:py-20">
			<div
				class="container mx-auto grid max-w-6xl grid-cols-1 gap-10 text-sm sm:gap-20 md:grid-cols-6">
				<div class="prose prose-sm col-span-1 max-w-none text-justify md:col-span-3 lg:col-span-4">
					{@html data.category?.description}
				</div>

				<div class="col-span-1 md:col-span-3 lg:col-span-2">
					<h2 class="mb-5 text-center text-base font-bold uppercase tracking-wide">
						{data.category?.name} price list
					</h2>

					<ul class="flex flex-col gap-2">
						<li class="grid grid-cols-6 items-center gap-5 font-semibold uppercase">
							<span class="col-span-5">{data.category?.name}</span>

							<span class="col-span-1">Price <br /> (Rs)</span>
						</li>
						{#if data?.products}
							{#each data.products as p, px}
								{#if p && px < 10}
									<li>
										<a
											href="/product/{p.slug}"
											aria-label="Click to route product details page"
											class="grid grid-cols-6 gap-5">
											<span class="col-span-5 text-justify">{p.name}</span>

											<span class="col-span-1 whitespace-nowrap">
												{currency(p.price, $page.data?.store?.currencySymbol)}
											</span>
										</a>
									</li>
								{/if}
							{/each}
						{/if}

						{#if data?.products && data?.products[0] && data?.products[0]?.updatedAt}
							<li class="font-semibold">
								<i>Data last updated on {dateOnly(data.products[0]?.updatedAt)}</i>
							</li>
						{/if}
					</ul>
				</div>
			</div>
		</div>
	{/if}

	<div class="block sm:hidden">
		<MobileFooter />
	</div>
</div>
