import { provider } from '$lib/config'
import type { Error } from '$lib/types'
import { getAPI } from '$lib/utils/api'
import { getBigCommerceApi, getBySid, getWooCommerceApi } from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import { error } from '@sveltejs/kit'

export const fetchFooterCategories = async ({
	origin,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let data: []
	console.log(provider,`categories?store=${storeId}&megamenu=true&limit=6&page=0&level=0`)

		switch (provider) {
			case 'litekart':
				if (server) {
					data = await getBySid(
						`categories?store=${storeId}&megamenu=true&limit=6&page=0&level=0`,
						sid
					)
					console.log(`categories?store=${storeId}&megamenu=true&limit=6&page=0&level=0`,data)

				} else {
					data = await getAPI(
						`categories?store=${storeId}&megamenu=true&limit=6&page=0&level=0`,
						origin
					)
					console.log(`categories?store=${storeId}&megamenu=true&limit=6&page=0&level=0`,data)
				}
				// must return link:string, slug:string(optional) name:string, new:boolean
				break
			case 'bigcommerce':
				data = await getBigCommerceApi(`categories`, {}, sid)
				break
			case 'woocommerce':
				data = await getWooCommerceApi(`categories`, {}, sid)
				break
		}
		return data || []
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const fetchCategory = async ({ origin, id, server = false, sid = null }: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				if (server) {
					res = await getBySid(`category/${id}`, sid)
				} else {
					res = await getAPI(`category/${id}`, origin)
				}
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`categories`, {}, sid)
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`categories`, {}, sid)
				break
		}
		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const fetchAllCategories = async ({
	origin,
	storeId,
	server = false,
	sid = null,
	featured = false
}: any) => {
	try {
		let res: any = {}
		let data, pageSize, currentPage
		switch (provider) {
			case 'litekart':
				let catQ = `categories?store=${storeId}`
				if (featured) {
					catQ += `${catQ}&featured=true`
				}
				if (server) {
					res = await getBySid(catQ, sid)
				} else {
					res = await getAPI(catQ, origin)
				}
				data = res.data
				pageSize = res.pageSize
				currentPage = res.currentPage
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`categories`, {}, sid)
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`categories`, {}, sid)
				break
		}
		return { data, pageSize, currentPage }
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const fetchAllProductsOfCategories = async ({
	origin,
	storeId,
	server = false,
	sid = null,
	featured = false
}: any) => {
	try {
		let res: any = {}
		let products = []
		let productsCount = 0
		let currentPage = 0
		let facets = {}
		let err = null
		switch (provider) {
			case 'litekart':
				let catQ = `categories?store=${storeId}`
				if (featured) {
					catQ += `catQ&featured=true`
				}
				if (server) {
					res = await getBySid(catQ, sid)
				} else {
					res = await getAPI(catQ, origin)
				}
				products = res?.data || []
				productsCount = res?.count
				currentPage = res?.page
				facets = res?.facets?.all_aggs
				err = !products ? 'No result Not Found' : null
				// must return link:string, slug:string(optional) name:string, new:boolean
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`categories`, {}, sid)
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`categories`, {}, sid)
				break
		}
		return { products, productsCount, currentPage, facets, err }
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const fetchMegamenuData = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let data: []
		switch (provider) {
			case 'litekart':
				if (server) {
					data = await getBySid(`categories/megamenu?megamenu=true&store=${storeId}`, sid)
				} else {
					data = await getAPI(`categories/megamenu?megamenu=true&store=${storeId}`, origin)
				}
				// must return link:string, slug:string(optional) name:string, new:boolean
				break
			case 'bigcommerce':
				data = await getBigCommerceApi(`banners`, {}, sid)
				break
			case 'woocommerce':
				data = await getWooCommerceApi(`banners`, {}, sid)
				break
		}
		return data || []
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}
