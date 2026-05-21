export type Locale    = 'en' | 'ar'
export type Currency  = 'AED' | 'TND'

export interface Translations {
  nav: {
    home:        string
    shop:        string
    newArrivals: string
    bags:        string
    accessories: string
    about:       string
    adminSpace:  string
    perfumes:    string
  }
  announcement: string
  search: {
    placeholder: string
  }
  product: {
    addToCart:    string
    outOfStock:   string
    limitedStock: string
    newBadge:     string
    viewProduct:  string
    wishlist:     string
    added:        string
    updated:      string
  }
  cart: {
    title:       string
    empty:       string
    emptyHint:   string
    browse:      string
    checkout:    string
    total:       string
    remove:      string
    items:       string
  }
  categories: {
    title:    string
    subtitle: string
    explore:  string
    pieces:   string
  }
  home: {
    heroTitle:         string
    heroSubtitle:      string
    heroCta:           string
    heroCtaSecondary:  string
    featuredTitle:     string
    featuredSubtitle:  string
    newCollection:     string
    bestSellers:       string
    weeklyPromo:       string
    flashSale:         string
    viewAll:           string
  }
  footer: {
    tagline:             string
    newsletterTitle:     string
    newsletterSubtitle:  string
    placeholder:         string
    subscribe:           string
    quickLinks:          string
    legal:               string
    rights:              string
    whatsappCta:         string
    privacy:             string
    terms:               string
  }
  currency: {
    label: string
    aed:   string
    tnd:   string
  }
  language: {
    label:   string
    english: string
    arabic:  string
  }
}
