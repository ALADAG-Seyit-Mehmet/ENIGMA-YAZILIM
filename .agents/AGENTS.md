# Proje Mimarisi, Diller ve İlişkileri

Bu proje (Enigma Yazılım), en güncel modern web teknolojilerini bir araya getiren bir mimariye sahiptir. Kod yazarken ve analiz yaparken aşağıdaki dil/teknoloji ilişkilerine DİKKAT EDİLMELİDİR:

## 1. Temel Diller ve Kullanım Şekilleri
*   **TypeScript (TSX):** Projenin kalbidir. Tüm Next.js sayfaları ve React bileşenleri TypeScript ile yazılmıştır. Tip güvenliği (type safety) ön plandadır.
*   **CSS (Tailwind v4):** Tasarım ve stil katmanı tamamen Tailwind CSS v4 üzerinden yönetilmektedir. Klasik CSS dosyaları sadece temel yapılandırmalar (`@theme inline` değişkenleri, global animasyonlar vb.) için `globals.css` içinde kullanılır.
*   **GSAP & Lenis (JavaScript Animasyonları):** Akıcı sayfa kaydırma (smooth scroll) ve kaydırmaya bağlı karmaşık animasyonlar (ScrollTrigger) için kullanılırlar. Bu kütüphaneler DOM'u doğrudan manipüle ettiği için yalnızca `"use client"` direktifine sahip bileşenlerde çalışırlar.

## 2. Teknolojiler Arası İlişkiler ve Kritik Kurallar
*   **Server vs. Client Bileşenleri:** Next.js App Router yapısı gereği, standart bileşenler Sunucu Bileşeni (Server Component) olarak çalışır. Ancak GSAP animasyonları, `useState`, `useRef`, veya DOM etkileşimleri içeren her bileşen (örneğin `SplitSection`, `SolutionsClient`) mutlak surette dosya başında `"use client";` etiketi barındırmalıdır.
*   **Tailwind v4 + Next.js Turbopack Çakışması (Kritik Önlem):** Tailwind v4, sınıfları anlık olarak dinamik tarar. Next.js Turbopack dev sunucusu (`npm run dev`) aktifken, eğer bir bileşene projede daha önce HİÇ kullanılmamış yepyeni bir Tailwind sınıfı (örneğin `p-16` veya `mt-24`) eklerseniz, Turbopack önbelleği bunu hemen CSS'e derlemeyebilir. 
    *   **Çözüm Yolu:** Çalışan bir dev ortamında CSS değişikliği yaparken, sayfanın anında tepki vermesi için projede zaten kullanıldığını bildiğiniz sınıfları (örneğin `p-6 md:p-10`) kullanmaya çalışın. Aksi halde yeni sınıfların etki etmesi için Next.js sunucusunun veya tarayıcının tamamen yeniden başlatılması/yenilenmesi gerektiğini unutmayın.
