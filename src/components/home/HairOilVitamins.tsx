'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Leaf } from 'lucide-react'
import { useLocaleStore } from '@/store/localeStore'
import type { Locale } from '@/locales/types'

type VitaminData = { code: string; name: string; alias: string; benefit: string; sources: string; color: string; glow: string }
type PlantData   = { name: string; latin: string; origin: string; flag: string; india: boolean; icon: string; benefit: string; color: string }

const VITAMINS: Record<Locale, VitaminData[]> = {
  en: [
    { code:'A',  name:'Vitamin A',  alias:'Retinol',        benefit:'Stimulates hair growth and nourishes the scalp in depth for thicker hair.',                                   sources:'Carrot oil · Shea butter · Rosehip oil',          color:'#e6a23c', glow:'rgba(230,162,60,0.18)'  },
    { code:'B5', name:'Vitamin B5', alias:'Panthenol',      benefit:'Strengthens the hair fiber from within, reduces breakage and adds flexibility and shine.',                    sources:'Avocado oil · Natural lecithin · Wheat germ oil', color:'#67b86a', glow:'rgba(103,184,106,0.16)' },
    { code:'B7', name:'Vitamin B7', alias:'Biotin',         benefit:'Strengthens keratin and actively fights hair loss. Essential for regrowth.',                                  sources:'Castor oil · Sweet almond oil · Walnut oil',       color:'#C9A96E', glow:'rgba(201,169,110,0.20)' },
    { code:'C',  name:'Vitamin C',  alias:'Ascorbic Acid',  benefit:'Powerful antioxidant that stimulates collagen production and protects hair follicles.',                       sources:'Baobab oil · Sea buckthorn oil · Pomegranate',    color:'#e8855a', glow:'rgba(232,133,90,0.16)'  },
    { code:'D',  name:'Vitamin D',  alias:'Calciferol',     benefit:'Activates dormant hair follicles and regulates the growth cycle for dense hair.',                            sources:'Hemp oil · Flaxseed oil · Sesame oil',            color:'#7ab8d4', glow:'rgba(122,184,212,0.16)' },
    { code:'E',  name:'Vitamin E',  alias:'Tocopherol',     benefit:'Deep hydration, natural radiance and protection from external aggressions. Hair anti-aging.',                sources:'Argan oil · Jojoba oil · Hazelnut oil',           color:'#C9A96E', glow:'rgba(201,169,110,0.22)' },
  ],
  ar: [
    { code:'A',  name:'فيتامين أ',  alias:'ريتينول',        benefit:'يحفز نمو الشعر ويغذي فروة الرأس بعمق للحصول على شعر أكثر كثافة.',                                           sources:'زيت الجزر · زبدة الشيا · زيت ثمر الورد',         color:'#e6a23c', glow:'rgba(230,162,60,0.18)'  },
    { code:'B5', name:'فيتامين ب5', alias:'بانثينول',       benefit:'يقوي ألياف الشعر من الداخل ويقلل من التقصف ويمنح المرونة والبريق.',                                         sources:'زيت الأفوكادو · الليسيثين الطبيعي · زيت جرم القمح', color:'#67b86a', glow:'rgba(103,184,106,0.16)' },
    { code:'B7', name:'فيتامين ب7', alias:'بيوتين',         benefit:'يقوي الكيراتين ويحارب تساقط الشعر بفاعلية. ضروري لإعادة النمو.',                                             sources:'زيت الخروع · زيت اللوز الحلو · زيت الجوز',       color:'#C9A96E', glow:'rgba(201,169,110,0.20)' },
    { code:'C',  name:'فيتامين ج',  alias:'حمض الأسكوربيك', benefit:'مضاد أكسدة قوي يحفز إنتاج الكولاجين ويحمي بصيلات الشعر.',                                                  sources:'زيت البأبأ · زيت نبق البحر · مستخلص الرمان',     color:'#e8855a', glow:'rgba(232,133,90,0.16)'  },
    { code:'D',  name:'فيتامين د',  alias:'كالسيفيرول',     benefit:'ينشط بصيلات الشعر الخاملة وينظم دورة النمو للحصول على شعر كثيف.',                                           sources:'زيت القنب · زيت بذر الكتان · زيت السمسم',        color:'#7ab8d4', glow:'rgba(122,184,212,0.16)' },
    { code:'E',  name:'فيتامين هـ', alias:'توكوفيرول',      benefit:'ترطيب عميق وإشراق طبيعي وحماية من العوامل الخارجية. مضاد لشيخوخة الشعر.',                                  sources:'زيت الأرغان · زيت الجوجوبا · زيت البندق',        color:'#C9A96E', glow:'rgba(201,169,110,0.22)' },
  ],
}

const PLANTS: Record<Locale, PlantData[]> = {
  en: [
    { name:'Amla',       latin:'Emblica officinalis',    origin:'India',       flag:'🇮🇳', india:true,  icon:'🫐', benefit:'Hair superfood — exceptional vitamin C concentration. Strengthens each strand from the root and prevents premature greying.', color:'#7cb87e' },
    { name:'Bhringraj',  latin:'Eclipta alba',           origin:'India',       flag:'🇮🇳', india:true,  icon:'🌿', benefit:'Called "king of hair herbs" in Ayurveda. Actively stimulates regrowth and reduces hair loss naturally and durably.',            color:'#5aab5c' },
    { name:'Brahmi',     latin:'Bacopa monnieri',        origin:'India',       flag:'🇮🇳', india:true,  icon:'🍃', benefit:'Sacred Ayurvedic plant. Nourishes roots deeply, reduces stress-related hair loss and strengthens the hair fiber.',              color:'#82b87e' },
    { name:'Neem',       latin:'Azadirachta indica',     origin:'India',       flag:'🇮🇳', india:true,  icon:'🌱', benefit:'Powerful antibacterial and antifungal. Purifies the scalp, eliminates dandruff and creates an ideal environment for regrowth.', color:'#6aaf6a' },
    { name:'Hibiscus',   latin:'Hibiscus rosa-sinensis', origin:'India',       flag:'🇮🇳', india:true,  icon:'🌺', benefit:'Extraordinary natural conditioner. Provides intense shine, suppleness and effectively combats hair loss.',                        color:'#d4648a' },
    { name:'Fenugreek',  latin:'Trigonella foenum',      origin:'India',       flag:'🇮🇳', india:true,  icon:'🌾', benefit:'Rich in protein and lecithin. Strengthens fragile hair, combats hair loss and coats each strand for natural lasting volume.',   color:'#c9a84c' },
    { name:'Castor',     latin:'Ricinus communis',       origin:'India',       flag:'🇮🇳', india:true,  icon:'🫙', benefit:'The ultimate regrowth oil, used for millennia in India. Stimulates follicles, visibly thickens and lengthens hair.',             color:'#a08050' },
    { name:'Argan',      latin:'Argania spinosa',        origin:'Morocco',     flag:'🇲🇦', india:false, icon:'✨', benefit:'Liquid gold from Morocco. Intense hydration, silky shine and thermal protection. Repairs split ends deeply.',                    color:'#C9A96E' },
    { name:'Jojoba',     latin:'Simmondsia chinensis',   origin:'Desert',      flag:'🌵', india:false, icon:'💧', benefit:'Its composition close to natural sebum regulates scalp oil production. Hydrates without weighing down.',                         color:'#d4b86a' },
    { name:'Pomegranate',latin:'Punica granatum',        origin:'Orient',      flag:'🌍', india:false, icon:'🍎', benefit:'Powerful antioxidant that protects hair from oxidative stress. Reveals natural shine and prolongs colour in dyed hair.',          color:'#c04a6a' },
    { name:'Coconut',    latin:'Cocos nucifera',         origin:'Tropical',    flag:'🌴', india:false, icon:'🥥', benefit:'Penetrates deeply into the hair fiber for intense nutrition from within. Protects against protein damage and reduces breakage.',  color:'#b8906e' },
    { name:'Calendula',  latin:'Calendula officinalis',  origin:'Mediterranean',flag:'🌊',india:false, icon:'🌼', benefit:'Natural soothing and anti-inflammatory. Calms irritated scalps, regulates sebum production and nourishes dry hair.',              color:'#e0b040' },
  ],
  ar: [
    { name:'أمالا',     latin:'Emblica officinalis',    origin:'الهند',            flag:'🇮🇳', india:true,  icon:'🫐', benefit:'غذاء خارق للشعر — تركيز استثنائي من فيتامين ج الطبيعي. يقوي كل خصلة من الجذر ويمنع الشيب المبكر.',            color:'#7cb87e' },
    { name:'بهرينجراج', latin:'Eclipta alba',           origin:'الهند',            flag:'🇮🇳', india:true,  icon:'🌿', benefit:'يُلقّب بـ"ملك أعشاب الشعر" في الأيورفيدا. يحفز إعادة النمو بفاعلية ويقلل التساقط بشكل طبيعي ودائم.',          color:'#5aab5c' },
    { name:'براهمي',    latin:'Bacopa monnieri',        origin:'الهند',            flag:'🇮🇳', india:true,  icon:'🍃', benefit:'نبتة مقدسة في الأيورفيدا. تغذي الجذور بعمق وتقلل التساقط الناتج عن التوتر وتقوي ألياف الشعر.',               color:'#82b87e' },
    { name:'نيم',       latin:'Azadirachta indica',     origin:'الهند',            flag:'🇮🇳', india:true,  icon:'🌱', benefit:'مضاد قوي للبكتيريا والفطريات. ينقي فروة الرأس ويزيل القشرة ويهيئ بيئة مثالية لإعادة النمو.',                 color:'#6aaf6a' },
    { name:'الكركديه',  latin:'Hibiscus rosa-sinensis', origin:'الهند',            flag:'🇮🇳', india:true,  icon:'🌺', benefit:'مكيف طبيعي استثنائي. يمنح بريقاً مكثفاً ومرونة ويحارب تساقط الشعر بفاعلية.',                                color:'#d4648a' },
    { name:'الحلبة',    latin:'Trigonella foenum',      origin:'الهند',            flag:'🇮🇳', india:true,  icon:'🌾', benefit:'غني بالبروتين والليسيثين. يقوي الشعر الهش ويحارب التساقط ويغلف كل خصلة لحجم طبيعي دائم.',                   color:'#c9a84c' },
    { name:'الخروع',    latin:'Ricinus communis',       origin:'الهند',            flag:'🇮🇳', india:true,  icon:'🫙', benefit:'زيت إعادة النمو الأمثل المستخدم منذ آلاف السنين في الهند. يحفز البصيلات ويكثف الشعر ويطوله بشكل ملحوظ.',     color:'#a08050' },
    { name:'الأرغان',   latin:'Argania spinosa',        origin:'المغرب',           flag:'🇲🇦', india:false, icon:'✨', benefit:'الذهب السائل من المغرب. ترطيب مكثف وبريق حريري وحماية حرارية. يرمم الأطراف التالفة بعمق.',                   color:'#C9A96E' },
    { name:'الجوجوبا',  latin:'Simmondsia chinensis',   origin:'الصحراء',          flag:'🌵', india:false, icon:'💧', benefit:'تركيبته القريبة من الزهم الطبيعي تنظم إنتاج الدهون في فروة الرأس. يرطب دون ثقل.',                           color:'#d4b86a' },
    { name:'الرمان',    latin:'Punica granatum',        origin:'الشرق',            flag:'🌍', india:false, icon:'🍎', benefit:'مضاد أكسدة قوي يحمي الشعر من الإجهاد التأكسدي. يكشف البريق الطبيعي ويطيل عمر لون الشعر المصبوغ.',            color:'#c04a6a' },
    { name:'جوز الهند', latin:'Cocos nucifera',         origin:'المناطق الاستوائية',flag:'🌴',india:false, icon:'🥥', benefit:'يتغلغل بعمق في ألياف الشعر للتغذية المكثفة من الداخل. يحمي من تلف البروتين ويقلل التقصف.',                  color:'#b8906e' },
    { name:'القطيفة',   latin:'Calendula officinalis',  origin:'البحر المتوسط',    flag:'🌊', india:false, icon:'🌼', benefit:'مهدئ ومضاد للالتهابات طبيعي. يهدئ فروات الرأس المتهيجة وينظم إنتاج الزهم ويغذي الشعر الجاف.',               color:'#e0b040' },
  ],
}

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

function VitaminCard({ v, index, sourcesLabel }: { v: VitaminData; index: number; sourcesLabel: string }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-white/[0.04] border border-white/10 hover:border-white/25
                 transition-all duration-500 p-6 flex flex-col gap-4 cursor-default overflow-hidden"
      whileHover={{ y: -4, boxShadow: `0 16px 40px ${v.glow}` }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${v.glow}, transparent 65%)` }} />
      <div className="flex items-start justify-between relative z-10">
        <div className="w-12 h-12 flex items-center justify-center font-serif text-xl font-semibold"
          style={{ color: v.color, border: `1px solid ${v.color}55`, background: `${v.color}12` }}>
          {v.code}
        </div>
        <span className="font-serif text-[11px] text-white/15 select-none">0{index + 1}</span>
      </div>
      <div className="relative z-10">
        <h3 className="font-serif text-white text-lg leading-tight mb-0.5">{v.name}</h3>
        <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: v.color }} className="font-sans">{v.alias}</p>
      </div>
      <div className="h-px w-8 transition-all duration-500 group-hover:w-16" style={{ background: v.color, opacity: 0.5 }} />
      <p className="text-cream-300/65 font-sans leading-relaxed relative z-10" style={{ fontSize: 12 }}>{v.benefit}</p>
      <div className="mt-auto relative z-10">
        <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' }} className="text-white/30 font-sans mb-1">{sourcesLabel}</p>
        <p className="text-white/50 font-sans" style={{ fontSize: 11 }}>{v.sources}</p>
      </div>
    </motion.div>
  )
}

function PlantCard({ p, ayurvedaLabel }: { p: PlantData; ayurvedaLabel: string }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden cursor-default"
      style={{
        background: p.india ? 'linear-gradient(135deg, rgba(90,171,92,0.08) 0%, rgba(255,255,255,0.03) 100%)' : 'rgba(255,255,255,0.03)',
        border: p.india ? '1px solid rgba(90,171,92,0.25)' : '1px solid rgba(255,255,255,0.08)',
      }}
      whileHover={{ y: -3, boxShadow: p.india ? '0 12px 32px rgba(90,171,92,0.12)' : '0 12px 32px rgba(0,0,0,0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      {p.india && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 0%, rgba(90,171,92,0.12), transparent 60%)' }} />
      )}
      <div className="p-5 flex flex-col gap-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl select-none" aria-hidden="true">{p.icon}</span>
            <div>
              <h4 className="font-serif text-white leading-none" style={{ fontSize: 15 }}>{p.name}</h4>
              <p className="text-white/30 font-sans italic" style={{ fontSize: 10 }}>{p.latin}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 shrink-0"
            style={{ background: p.india ? 'rgba(90,171,92,0.15)' : 'rgba(255,255,255,0.06)', border: p.india ? '1px solid rgba(90,171,92,0.3)' : '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: 10 }}>{p.flag}</span>
            <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: p.india ? '#7cb87e' : 'rgba(255,255,255,0.4)' }} className="font-sans">{p.origin}</span>
          </div>
        </div>
        <div className="h-px" style={{ background: p.color, opacity: 0.3, width: 24 }} />
        <p className="text-cream-300/60 font-sans leading-relaxed" style={{ fontSize: 11 }}>{p.benefit}</p>
        {p.india && (
          <div className="flex items-center gap-1.5 mt-1">
            <Leaf className="w-2.5 h-2.5" style={{ color: '#7cb87e' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7cb87e' }} className="font-sans">{ayurvedaLabel}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const AYURVEDA_LABEL: Record<Locale, string> = {
  en: 'Ayurveda · India',
  ar: 'أيورفيدا · الهند',
}

export default function HairOilVitamins() {
  const { t, locale } = useLocaleStore()
  const h = t.home
  const vitamins = VITAMINS[locale]
  const plants   = PLANTS[locale]
  const indiaCount = plants.filter(p => p.india).length

  return (
    <section className="py-20 bg-luxury-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 70%)' }} />
      <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-serif select-none pointer-events-none"
        style={{ fontSize: 'clamp(180px, 22vw, 280px)', color: 'rgba(255,255,255,0.015)', lineHeight: 1 }}>
        V
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div className="text-4xl mb-5 select-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true">💧</motion.div>

          <p style={{ fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase' }}
            className="text-gold-400 font-sans mb-4">{h.hairOilTag}</p>

          <h2 className="font-serif text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}>
            {h.hairOilTitle}
            <br />
            <span className="italic text-gold-400">{h.hairOilTitleGold}</span>
          </h2>

          <motion.div className="h-px bg-gold-500 mx-auto my-5"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          />

          <p className="text-cream-300/60 font-sans font-light max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: 14 }}>
            {h.hairOilSubtitle}
          </p>
        </motion.div>

        {/* Vitamins grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20"
          variants={containerVariants} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {vitamins.map((v, i) => (
            <VitaminCard key={v.code} v={v} index={i} sourcesLabel={h.hairOilSourcesLabel} />
          ))}
        </motion.div>

        {/* Separator */}
        <motion.div
          className="flex items-center gap-6 mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3))' }} />
          <Leaf className="w-4 h-4 text-gold-500 opacity-60" />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.3))' }} />
        </motion.div>

        {/* Plants header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-xl">
            <p style={{ fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase' }}
              className="text-gold-400 font-sans mb-3">{h.hairOilBotanicalTag}</p>
            <h2 className="font-serif text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
              {h.hairOilPlantsTitle.replace('{n}', String(indiaCount))}
            </h2>
            <p className="text-cream-300/55 font-sans font-light leading-relaxed" style={{ fontSize: 13 }}>
              {h.hairOilPlantsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <motion.div className="text-center"
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-serif leading-none mb-1"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', color: '#7cb87e' }}>
                {indiaCount}
              </div>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7cb87e', opacity: 0.8 }}
                className="font-sans whitespace-pre-line">{h.hairOilIndiaLabel}</p>
            </motion.div>

            <div className="w-px h-16 bg-white/10" />

            <motion.div className="text-center"
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-serif text-gold-400 leading-none mb-1"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)' }}>
                {plants.length}+
              </div>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}
                className="text-gold-400/70 font-sans whitespace-pre-line">{h.hairOilTotalLabel}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* India highlight band */}
        <motion.div
          className="mb-8 px-5 py-3 flex items-center gap-3"
          style={{ background: 'linear-gradient(to right, rgba(90,171,92,0.10), rgba(90,171,92,0.04), transparent)', borderLeft: '2px solid rgba(90,171,92,0.5)' }}
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <span className="text-lg">🇮🇳</span>
          <p className="text-cream-300/70 font-sans" style={{ fontSize: 12 }}>
            <span style={{ color: '#7cb87e' }} className="font-medium">{h.hairOilIndiaBandTitle}</span>
            {' '}· {h.hairOilIndiaBandText}
          </p>
        </motion.div>

        {/* Plants grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12"
          variants={containerVariants} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {plants.filter(p => p.india).map(p => (
            <PlantCard key={p.name} p={p} ayurvedaLabel={AYURVEDA_LABEL[locale]} />
          ))}
          {plants.filter(p => !p.india).map(p => (
            <PlantCard key={p.name} p={p} ayurvedaLabel={AYURVEDA_LABEL[locale]} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[h.hairOilBadge1, h.hairOilBadge2, h.hairOilBadge3, h.hairOilBadge4, h.hairOilBadge5, h.hairOilBadge6].map((tag) => (
              <span key={tag} className="font-sans text-cream-300/70 border border-white/10"
                style={{ fontSize: 11, padding: '6px 14px', letterSpacing: '0.05em' }}>
                {tag}
              </span>
            ))}
          </div>

          <Link
            href="/shop?category=huile-cheveux"
            className="inline-flex items-center gap-3 bg-gold-500 text-white hover:bg-gold-600 transition-colors duration-300"
            style={{ padding: '14px 40px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'var(--font-inter, sans-serif)', fontWeight: 500 }}
          >
            {h.hairOilCta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
