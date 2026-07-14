const fs = require('fs');
const path = require('path');
const trPath = path.join(__dirname, 'messages/tr.json');
const enPath = path.join(__dirname, 'messages/en.json');

const trData = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const newTRChat = {
  ...trData.Chat,
  "sector_1_name": "Üretim/Fabrika",
  "sector_1_q": "Üretim hattında kayıplarımız var, ERP sistemimiz hantal. Dijitalleşme bize ne katar?",
  "sector_1_a": "Kağıt üzerinde üretim takibi size her ay %15 fire ve zaman kaybettiriyor. Özel yazdığımız IoT destekli üretim takip yazılımıyla, makine duruşlarını anlık görür, verimsizliği sıfırlarsınız. Hantal paket programlara mahkum değilsiniz; tamamen operasyonunuza özel, hızlı ve esnek bir dijital omurga inşa ediyoruz.",
  "sector_1_f1_label": "Mevcut ERP'ye entegre olabilir miyiz?",
  "sector_1_f1_q": "Halihazırda kullandığımız eski bir ERP var. Buna entegre olabilir mi?",
  "sector_1_f1_a": "Kesinlikle. Eski sistemlerinizi çöpe atmak zorunda değilsiniz. API köprüleri kurarak, bizim yazdığımız modern arayüzü sizin hantal sisteminize bağlıyoruz. Veri kaybı yaşamazken, 2026 yılına uygun şimşek hızında bir yönetim paneline kavuşuyorsunuz.",
  "sector_1_f2_label": "Sahadaki işçiler karmaşık ekranları kullanamıyor",
  "sector_1_f2_q": "Sahadaki işçiler karmaşık ekranları kullanamıyor, ne yapmalıyız?",
  "sector_1_f2_a": "Tam da bu yüzden paket yazılımlardan uzak durmalısınız. Saha personeli için sadece 2 büyük butondan oluşan, sıfır hata toleranslı ve tablet uyumlu özel ekranlar tasarlıyoruz. Eğitime bile gerek kalmadan herkes anında kullanmaya başlıyor.",

  "sector_2_name": "Turizm",
  "sector_2_q": "Sezonluk dalgalanmaları ve rezervasyonları yönetmek çok zor.",
  "sector_2_a": "Sizin için özel geliştirdiğimiz yapay zeka destekli rezervasyon yönetim sistemimizle, boşlukları minimize ediyor ve karlılığınızı artırıyoruz. Müşterileriniz doğrudan sisteminiz üzerinden komisyonsuz rezervasyon yapabilir.",
  "sector_2_f1_label": "Komisyon ödemekten nasıl kurtuluruz?",
  "sector_2_f1_q": "Platformlara çok yüksek komisyon ödüyoruz.",
  "sector_2_f1_a": "Kendi dijital markanızı yaratarak, Google reklamları ve SEO ile doğrudan müşteriye ulaşırsınız. Kendi web sitenizden gelen her rezervasyon sıfır komisyon demektir.",
  "sector_2_f2_label": "Çok dil desteği olacak mı?",
  "sector_2_f2_q": "Yabancı müşterilerimiz çok, dil bariyerini nasıl aşarız?",
  "sector_2_f2_a": "Sistemlerimiz otomatik çoklu dil desteğiyle çalışır. Müşteri tarayıcısının dilini algılayıp anında kendi dilinde kusursuz bir deneyim sunarız.",

  "sector_3_name": "Otelcilik",
  "sector_3_q": "Müşteri memnuniyetini artırıp sadık müşteriler yaratmak istiyoruz.",
  "sector_3_a": "Misafirlerinizin otele girişten çıkışa kadar tüm ihtiyaçlarını mobilden tek tıkla çözebileceği dijital otel yönetim sistemleri kuruyoruz. Restoran siparişi, oda servisi ve temizlik talebi her şey dijitalleşiyor.",
  "sector_3_f1_label": "Entegrasyon nasıl olacak?",
  "sector_3_f1_q": "Mevcut otel programımızla uyumlu mu?",
  "sector_3_f1_a": "Evet, API entegrasyonuyla mevcut yapınıza ve otel yönetim sistemlerinize tam uyumlu, pürüzsüz çalışır.",
  "sector_3_f2_label": "Misafir uygulamayı indirmek zorunda mı?",
  "sector_3_f2_q": "Misafirler tatilde uygulama indirmek istemeyebilir.",
  "sector_3_f2_a": "Geliştirdiğimiz PWA (Progressive Web App) teknolojisiyle indirmeye gerek kalmadan, odadaki QR kod üzerinden anında kullanım başlar.",

  "sector_4_name": "Gayrimenkul",
  "sector_4_q": "İlan sitelerine avuç dolusu para döküyoruz. Bunun bir çıkışı var mı?",
  "sector_4_a": "Elbette var. Komisyonlar ve ilan ücretleriyle o platformlara çalışıyorsunuz. Biz size niş bir alan adı, gelişmiş harita entegrasyonu ve SEO altyapısı olan kendi portföy mülkünüzü kuruyoruz. Kendi dijital mülkünüzü yaratarak dışa bağımlılığınızı bitiriyorsunuz.",
  "sector_4_f1_label": "İnsanlar bizi nasıl bulacak?",
  "sector_4_f1_q": "Müşteriler ilan platformları yerine neden bizim sitemize gelsin?",
  "sector_4_f1_a": "Sizi sadece adınızla değil, hedef kelimelerde Google'da 1. sıraya taşıyoruz. Kalıcı SEO mimarimiz sayesinde reklam bütçesi yakmadan, müşteri doğrudan size ulaşıyor.",
  "sector_4_f2_label": "Sitenin yönetimi zor mu?",
  "sector_4_f2_q": "İlan girmek ve güncellemek zor oluyor mu?",
  "sector_4_f2_a": "Size özel yazdığımız yönetim paneli sayesinde telefondan bile 10 saniye içinde ilan girip, fotoğraf kırpıp anında yayına alabilirsiniz. Hiçbir teknik bilgiye ihtiyacınız olmayacak.",

  "sector_5_name": "İnşaat",
  "sector_5_q": "Şantiye takibi, malzeme yönetimi ve taşeron hesapları çok karışıyor.",
  "sector_5_a": "Tüm şantiye operasyonlarınızı tek ekrandan anlık olarak izleyebileceğiniz özel SaaS yazılımları geliştiriyoruz. Hangi malzeme nereye gitti, hangi taşeron ne kadar hakediş aldı, hepsini cebinizden takip edin.",
  "sector_5_f1_label": "Sahadan veri girişi zor mu?",
  "sector_5_f1_q": "Mühendisler ve ustabaşıları sürekli sahadalar, bilgisayar başında değiller.",
  "sector_5_f1_a": "Tamamen mobil uyumlu saha formlarımız sayesinde akıllı telefonlarından saniyeler içinde fotoğraf ve not ekleyebilirler. Veriler anında merkeze düşer.",
  "sector_5_f2_label": "Finansal raporlama sağlıyor mu?",
  "sector_5_f2_q": "Projenin kâr/zarar durumunu anlık görebilir miyiz?",
  "sector_5_f2_a": "Gelişmiş finans modülümüzle bütçe ve gerçekleşen maliyetleri anlık olarak, canlı grafiklerle takip edebilirsiniz.",

  "sector_6_name": "Restorant/Cafe",
  "sector_6_q": "Paket servis komisyonları çok yüksek ve sadık müşteri yaratamıyoruz.",
  "sector_6_a": "Yemek platformlarına ödediğiniz %30 komisyonlarla kendi kârınızı eritiyorsunuz. Sizin markanıza özel sipariş altyapısı ve WhatsApp bot entegrasyonu kurduğumuzda, komisyonsuz satış yapıyor ve müşterinizin verisine sahip oluyorsunuz.",
  "sector_6_f1_label": "Müşteriyi kendi sitemize nasıl çekeriz?",
  "sector_6_f1_q": "Müşteri platform yerine neden bizim sitemizi kullansın?",
  "sector_6_f1_a": "Platformlardan ilk siparişleri alır, ancak paketin içine koyduğumuz sitemize özel indirimli QR kodlarla müşteriyi kendi sisteminize çekersiniz. İkinci sipariş tamamen sizin sisteminizden, sıfır komisyonla gerçekleşir.",
  "sector_6_f2_label": "Yoğun saatlerde sistem çöker mi?",
  "sector_6_f2_q": "Cuma akşamları çok yoğun oluyoruz, sistem kaldırır mı?",
  "sector_6_f2_a": "Sistemlerimizi anlık trafik artışlarında otomatik ölçeklenen global bulut altyapılarına kuruyoruz. Saniyenin altında tepki süresini garanti ediyoruz.",

  "sector_7_name": "Sağlık",
  "sector_7_q": "Hasta kayıtları, randevular ve tahlil sonuçları arasında kayboluyoruz.",
  "sector_7_a": "Hastalarınızın kendi randevularını alabileceği, geçmiş tahlillerini görebileceği ve size mesaj atabileceği güvenli bir hasta portalı kuruyoruz. Kliniklerde operasyon süresi %50 kısalıyor.",
  "sector_7_f1_label": "KVKK ve güvenlik nasıl?",
  "sector_7_f1_q": "Hasta verilerinin güvenliğini nasıl sağlıyorsunuz?",
  "sector_7_f1_a": "Uçtan uca şifreleme ve KVKK tam uyumlu izole bulut altyapılarıyla maksimum veri güvenliği ve mahremiyet sağlıyoruz.",
  "sector_7_f2_label": "Online görüşme mümkün mü?",
  "sector_7_f2_q": "Hastalarla uzaktan görüntülü görüşme yapabilir miyiz?",
  "sector_7_f2_a": "Kendi platformunuza entegre güvenli WebRTC altyapımızla, 3. parti yazılımlara ihtiyaç duymadan doğrudan sistem üzerinden online danışmanlık verebilirsiniz.",

  "sector_8_name": "Acenteler",
  "sector_8_q": "Yüzlerce müşteri, poliçe/bilet ve yenileme tarihlerini takip edemiyoruz.",
  "sector_8_a": "Acentelere özel CRM otomasyonumuzla, yenileme tarihlerini sistem otomatik takip eder, günü yaklaşana SMS/Email gönderir. Manuel takibi bırakıp tamamen satışa odaklanırsınız.",
  "sector_8_f1_label": "Otomatik bildirimler nasıl çalışır?",
  "sector_8_f1_q": "Müşteriye bildirimler otomatik mi gider?",
  "sector_8_f1_a": "Evet, WhatsApp, SMS veya E-posta üzerinden kişiselleştirilmiş şablonlarla otomatik hatırlatmalar saniyesinde iletilir.",
  "sector_8_f2_label": "Alt acente yönetimi var mı?",
  "sector_8_f2_q": "Bize bağlı alt acenteleri takip edebilir miyiz?",
  "sector_8_f2_a": "Gelişmiş yetkilendirme modülüyle alt acentelerinize özel paneller verebilir, satışları ve komisyonları otomatik hesaplayabilirsiniz."
};

const newENChat = {
  ...enData.Chat,
  "sector_1_name": "Production/Factory",
  "sector_1_q": "We have losses on the production line, our ERP system is clunky. What does digitalization bring us?",
  "sector_1_a": "Paper-based production tracking causes you to lose 15% in waste and time every month. With our custom IoT-supported production tracking software, you can see machine downtimes instantly and eliminate inefficiency.",
  "sector_1_f1_label": "Can we integrate into our current ERP?",
  "sector_1_f1_q": "We have an old ERP that we currently use. Can it be integrated into this?",
  "sector_1_f1_a": "Absolutely. You don't have to throw away your old systems. By building API bridges, we connect the modern interface we wrote to your clunky system.",
  "sector_1_f2_label": "Workers on the field can't use complex screens",
  "sector_1_f2_q": "Workers on the field can't use complex screens, what should we do?",
  "sector_1_f2_a": "That's exactly why you should stay away from packaged software. We design special screens for field personnel that consist of only 2 large buttons, zero fault tolerant, and tablet compatible.",

  "sector_2_name": "Tourism",
  "sector_2_q": "Managing seasonal fluctuations and bookings is very difficult.",
  "sector_2_a": "With our AI-supported reservation management system developed specifically for you, we minimize gaps and increase your profitability.",
  "sector_2_f1_label": "How do we get rid of paying commissions?",
  "sector_2_f1_q": "We pay very high commissions to platforms.",
  "sector_2_f1_a": "By creating your own digital brand, you reach the customer directly with Google ads and SEO. Every booking from your own website means zero commission.",
  "sector_2_f2_label": "Will there be multi-language support?",
  "sector_2_f2_q": "We have many foreign customers, how do we overcome the language barrier?",
  "sector_2_f2_a": "Our systems work with automatic multi-language support. We detect the customer's browser language and instantly provide a flawless experience in their own language.",

  "sector_3_name": "Hotel Management",
  "sector_3_q": "We want to increase customer satisfaction and create loyal customers.",
  "sector_3_a": "We build digital hotel management systems where your guests can solve all their needs from check-in to check-out with a single click from their mobile phones.",
  "sector_3_f1_label": "How will the integration be?",
  "sector_3_f1_q": "Is it compatible with our current hotel program?",
  "sector_3_f1_a": "Yes, with API integration, it works seamlessly and fully compatible with your current structure and hotel management systems.",
  "sector_3_f2_label": "Does the guest have to download the app?",
  "sector_3_f2_q": "Guests may not want to download an app on vacation.",
  "sector_3_f2_a": "With the PWA (Progressive Web App) technology we developed, usage starts instantly via the QR code in the room without the need to download.",

  "sector_4_name": "Real Estate",
  "sector_4_q": "We pour a lot of money into listing sites. Is there a way out of this?",
  "sector_4_a": "Of course there is. You work for those platforms with commissions and listing fees. We build you your own portfolio property with a niche domain name, advanced map integration, and SEO infrastructure.",
  "sector_4_f1_label": "How will people find us?",
  "sector_4_f1_q": "Why should customers come to our site instead of listing platforms?",
  "sector_4_f1_a": "We carry you to the 1st rank on Google not only with your name but also with target keywords. Thanks to our permanent SEO architecture, the customer reaches you directly without burning your ad budget.",
  "sector_4_f2_label": "Is the site management difficult?",
  "sector_4_f2_q": "Is it difficult to enter and update listings?",
  "sector_4_f2_a": "Thanks to the management panel we wrote specifically for you, you can enter listings in 10 seconds, crop photos, and publish them instantly, even from your phone.",

  "sector_5_name": "Construction",
  "sector_5_q": "Construction site tracking, material management, and subcontractor accounts are getting very confusing.",
  "sector_5_a": "We develop custom SaaS software where you can monitor all your construction site operations instantly from a single screen. Follow up on which material went where, how much progress payment which subcontractor received, all from your pocket.",
  "sector_5_f1_label": "Is data entry from the field difficult?",
  "sector_5_f1_q": "Engineers and foremen are constantly in the field, not in front of the computer.",
  "sector_5_f1_a": "Thanks to our fully mobile-compatible field forms, they can add photos and notes in seconds from their smartphones. Data drops into the center instantly.",
  "sector_5_f2_label": "Does it provide financial reporting?",
  "sector_5_f2_q": "Can we see the profit/loss status of the project instantly?",
  "sector_5_f2_a": "With our advanced financial module, you can monitor your budget and realized costs instantly with live graphics.",

  "sector_6_name": "Restaurant/Cafe",
  "sector_6_q": "Delivery commissions are very high and we can't create loyal customers.",
  "sector_6_a": "You are melting your own profit with the 30% commissions you pay to food platforms. When we establish a special order infrastructure and WhatsApp bot integration for your brand, you make commission-free sales.",
  "sector_6_f1_label": "How do we attract the customer to our own site?",
  "sector_6_f1_q": "Why should the customer use our site instead of the platform?",
  "sector_6_f1_a": "You get the first orders from the platforms, but you draw the customer to your own system with the discounted QR codes we put in the package.",
  "sector_6_f2_label": "Can it handle busy hours?",
  "sector_6_f2_q": "We are very busy on Friday nights, can the system handle it?",
  "sector_6_f2_a": "We install our systems on global cloud infrastructures that automatically scale during instant traffic increases. We guarantee response times of less than a second.",

  "sector_7_name": "Healthcare",
  "sector_7_q": "We get lost among patient records, appointments, and test results.",
  "sector_7_a": "We build a secure patient portal where your patients can book their own appointments, view past tests, and send you messages. Operation time in clinics is reduced by 50%.",
  "sector_7_f1_label": "What about GDPR and security?",
  "sector_7_f1_q": "How do you ensure the security of patient data?",
  "sector_7_f1_a": "We provide maximum data security and privacy with end-to-end encryption and fully GDPR-compliant isolated cloud infrastructures.",
  "sector_7_f2_label": "Is online consultation possible?",
  "sector_7_f2_q": "Can we make remote video calls with patients?",
  "sector_7_f2_a": "With our secure WebRTC infrastructure integrated into your own platform, you can provide online consulting directly through the system without needing 3rd party software.",

  "sector_8_name": "Agencies",
  "sector_8_q": "We can't keep track of hundreds of customers, policies/tickets, and renewal dates.",
  "sector_8_a": "With our agency-specific CRM automation, the system automatically tracks renewal dates and sends SMS/Email when the day approaches. You leave manual tracking and focus entirely on sales.",
  "sector_8_f1_label": "How do automatic notifications work?",
  "sector_8_f1_q": "Do notifications go to the customer automatically?",
  "sector_8_f1_a": "Yes, personalized automatic reminders are delivered in seconds via WhatsApp, SMS, or Email.",
  "sector_8_f2_label": "Is there sub-agency management?",
  "sector_8_f2_q": "Can we track the sub-agencies affiliated with us?",
  "sector_8_f2_a": "With the advanced authorization module, you can give special panels to your sub-agencies and calculate sales and commissions automatically."
};

// Clean up old keys (up to 20 just in case)
for (let i = 1; i <= 20; i++) {
  const prefix = `sector_${i}_`;
  for (const k of Object.keys(trData.Chat)) {
    if (k.startsWith(prefix)) delete trData.Chat[k];
  }
  for (const k of Object.keys(enData.Chat)) {
    if (k.startsWith(prefix)) delete enData.Chat[k];
  }
}

trData.Chat = newTRChat;
enData.Chat = newENChat;

fs.writeFileSync(trPath, JSON.stringify(trData, null, 2) + '\n');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n');

console.log("Chat localization files updated successfully.");
