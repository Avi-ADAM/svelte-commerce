import { env } from '$env/dynamic/public'

export * from './website'
export const authorInfo = {
	author: 'Swadesh Behera',
	facebookAuthorPage: `https://www.facebook.com/codenx`,
	facebookPageName: 'codenx',
	githubPage: 'itswadesh',
	linkedinProfile: 'itswadesh',
	telegramUsername: 'itswadesh',
	twitterUsername: 'itswadesh'
}
export const currency = { symbol: '₪', code: 'ILS' }
export const adminUrl = 'https://admin.litekart.in'
export const dimentionUnit = 'cm'
export const loginUrl = '/auth/login'
export const weightUnit = 'g'
export const currencyCode = 'ILS'
export const currencySymbol = '₪'
export const DOMAIN = env.PUBLIC_DOMAIN
export const entity = '1lev1'
export const HTTP_ENDPOINT = env.PUBLIC_HTTP_ENDPOINT || 'https://api.litekart.in'
export const IMAGE_CDN_URL = 'https://ik.imagekit.io/3wzatecz51w3i'
export const mediaqueries = {
	xs: '(min-width: 480px)',
	sm: '(min-width: 640px)',
	md: '(min-width: 768px)',
	lg: '(min-width: 1024px)',
	xl: '(min-width: 1280px)',
	'2xl': '(min-width: 1536px)',
	landscape: '(orientation: landscape) and (max-height: 499px)',
	tiny: '(orientation: portrait) and (max-height: 599px)',
	dark: '(prefers-color-scheme: dark)',
	noanimations: '(prefers-reduced-motion: reduce)'
}
export const searchbarText = 'חיפוש מוצרים, מותגים וקטגוריות'
export const siteShortTitle = 'Litekart' // used as SchemaOrg siteTitleAlt
export const siteTitle = 'Litekart'
export const sorts = [
	{ name: 'מומלצים', val: null },
	{ name: `חדשים`, val: '-updatedAt' },
	{ name: 'מחיר: גבוה לנמוך ', val: '-price' },
	{ name: 'מחיר: זול ליקר ', val: 'price' },
	/*{ name: 'Discount: High to Low ', val: '-discount' },
	{ name: 'Discount: Low to High ', val: 'discount' },*/
	{ name: `שם: א-ת`, val: 'name' },
	{ name: `שם: ת-א`, val: '-name' } // { name: 'Most Viewed', val: '-views' }
]
export const WWW_URL = env.PUBLIC_WWW_URL
export const listOfPagesWithoutBackButton = [
	'/',
	'/categories',
	'/new-arrivals',
	'/my/wishlist',
	'/my',
	'/payment/success'
]

export const BIG_COMMERCE_CLIENT_ID =
	env.PUBLIC_BIG_COMMERCE_CLIENT_ID || 'nybaukoetx98bdjo5vshh0edr3xsz42'
export const BIG_COMMERCE_CLIENT_SECRET =
	env.PUBLIC_BIG_COMMERCE_CLIENT_SECRET ||
	'09c194121a7dbf059735671991015c2e208cdfe8dfa1f74f63edc9b2353e9720'
export const BIG_COMMERCE_ACCESS_TOKEN =
	env.PUBLIC_BIG_COMMERCE_ACCESS_TOKEN || 'evgagyg76wcxcg9uauodegpc1eybfzx'
export const BIG_COMMERCE_STORE_HASH = env.PUBLIC_BIG_COMMERCE_STORE_HASH || 'ftelcymxrh'

export const bigcommerceHeaders = {
	'X-Auth-Token': BIG_COMMERCE_ACCESS_TOKEN,
	'Content-Type': 'application/json',
	Accept: 'application/json'
}

export const BIG_COMMERCE_BASE_URL = `https://api.bigcommerce.com/stores/${BIG_COMMERCE_STORE_HASH}/v3/catalog`
export const MEDUSAJS_BASE_URL = `${env.PUBLIC_MEDUSAJS_API_URL}/store`

export const WOO_COMMERCE_KEY =
	env.PUBLIC_WOO_COMMERCE_KEY || 'ck_22a412b11bc3045bders7ederrda24d5b6d5245'
export const WOO_COMMERCE_SECRET =
	env.PUBLIC_WOO_COMMERCE_SECRET || 'cs_98fcss4a9feaf84908197d1fdere30786c38749'
export const WOO_COMMERCE_STORE_LINK =
	env.PUBLIC_WOO_COMMERCE_STORE_LINK || 'https://test.litekart.in'

export const woocommerceHeaders = {
	username: WOO_COMMERCE_KEY,
	password: WOO_COMMERCE_SECRET,
	'Content-Type': 'application/json',
	Accept: 'application/json'
}
export const provider: string = 'litekart'
//export const provider: string = 'strapi-graphql'
// export const provider: string = 'woocommerce'
// export const provider: string = 'bigcommerce'
