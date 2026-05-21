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
    addToCart:       string
    outOfStock:      string
    limitedStock:    string
    newBadge:        string
    viewProduct:     string
    wishlist:        string
    added:           string
    updated:         string
    share:           string
    quantity:        string
    reviews:         string
    stockAvailable:  string
    stockLimited:    string
    youMightAlsoLike: string
    similarProducts:  string
    delivery:        string
    returns:         string
    securePayment:   string
    orderWhatsApp:   string
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
    // Trust section
    trustShippingTitle: string
    trustShippingSub:   string
    trustPaymentTitle:  string
    trustPaymentSub:    string
    trustPackageTitle:  string
    trustPackageSub:    string
    trustSupportTitle:  string
    trustSupportSub:    string
    // Brand story
    storyTag:           string
    storyTitle:         string
    storyTitleGold:     string
    storyP1:            string
    storyP2:            string
    storyCta:           string
    // Dress collection
    dressCollectionTag:   string
    dressCollectionTitle: string
    dressLimitedEdition:  string
    dressHauteCouture:    string
    dressTunisCollection: string
    dressOriental:        string
    dressDiscover:        string
  }
  about: {
    heroBadge:     string
    heroTitle:     string
    heroSubtitle:  string
    heroScroll:    string
    originsTag:    string
    originsTitle:  string
    originsP1:     string
    originsP2:     string
    originsP3:     string
    statsLabel1:   string
    statsLabel2:   string
    statsLabel3:   string
    statsLabel4:   string
    statsFounded:  string
    engTag:        string
    engTitle:      string
    eng1Title:     string
    eng1Text:      string
    eng2Title:     string
    eng2Text:      string
    eng3Title:     string
    eng3Text:      string
    eng4Title:     string
    eng4Text:      string
    eng5Title:     string
    eng5Text:      string
    eng6Title:     string
    eng6Text:      string
    visionTag:     string
    visionTitle:   string
    visionP1:      string
    visionP2:      string
    visionP3:      string
    ctaTitle:      string
    ctaText:       string
    ctaShop:       string
    ctaHome:       string
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
