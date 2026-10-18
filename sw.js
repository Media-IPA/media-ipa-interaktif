const CACHE_NAME = 'ward-ipa-cache-v3';

const CORE_ASSETS = [
  './',
  './index.html',
  './tugas.css',
  './tugas.js',
  './manifest.json',
  './assets/icon-192.svg',
  './assets/icon-512.svg',
  './assets/fontawesome/css/all.min.css',
  // Kelas 7 Utama & Akses Guru
  './KELAS 7/index.html',
  './KELAS 7/style.css',
  './KELAS 7/app.js',
  './KELAS 7/fullscreen.js',
  './KELAS 7/akses-guru/index.html',
  './KELAS 7/akses-guru/app.js',
  // Kelas 7 Assets & Images
  './KELAS 7/assets/q_mikroskop.png',
  './KELAS 7/assets/q_suhu.png',
  './KELAS 7/assets/q_tata_surya.png',
  './KELAS 7/assets/images/gelas_ukur.png',
  './KELAS 7/assets/images/jangka_sorong.png',
  './KELAS 7/assets/images/jenis_termometer.png',
  './KELAS 7/assets/images/mikrometer_sekrup.png',
  './KELAS 7/assets/images/mistar_penggaris.png',
  './KELAS 7/assets/images/neraca_digital.png',
  './KELAS 7/assets/images/neraca_lengan.png',
  './KELAS 7/assets/images/stopwatch_analog.png',
  './KELAS 7/assets/images/stopwatch_digital.png',
  './KELAS 7/assets/images/suhu_konsep.png',
  // Kelas 7 Bab 1
  './KELAS 7/bab1/index.html',
  './KELAS 7/bab1/evaluasi_bab1.html',
  './KELAS 7/bab1/kuis_konversi_lkpd.html',
  './KELAS 7/bab1/kuis_materi.html',
  './KELAS 7/bab1/kuis_satuan_besaran.html',
  './KELAS 7/bab1/lkpd_besaran_satuan.html',
  './KELAS 7/bab1/lkpd_jangkasorong.html',
  './KELAS 7/bab1/lkpd_neraca_digital.html',
  './KELAS 7/bab1/simulasi_jangkasorong.html',
  './KELAS 7/bab1/simulasi_konversi.html',
  './KELAS 7/bab1/simulasi_massajenis.html',
  './KELAS 7/bab1/simulasi_mikrometer.html',
  './KELAS 7/bab1/simulasi_neraca.html',
  './KELAS 7/bab1/simulasi_volume.html',
  './KELAS 7/bab1/BESARAN DAN SATUAN/lkpd.png',
  './KELAS 7/bab1/Jangka sorong/lkpd_jangka_sorong_bg.jpg',
  // Kelas 7 Bab 2
  './KELAS 7/bab2/index.html',
  './KELAS 7/bab2/kuis_kompetisi.html',
  './KELAS 7/bab2/lkpd_wujud_zat.html',
  './KELAS 7/bab2/Misi Pulau Wujud Zat (4 Kelompok).html',
  './KELAS 7/bab2/img/gas.png',
  './KELAS 7/bab2/img/liquid.png',
  './KELAS 7/bab2/img/solid.png',
  // Kelas 7 Bab 3
  './KELAS 7/bab3/index.html',
  './KELAS 7/bab3/bimetal_sensor.png',
  './KELAS 7/bab3/pemuaian_rel_kereta.png',
  './KELAS 7/bab3/lkpd_interaktif.html',
  './KELAS 7/bab3/lkpd_manual.html',
  './KELAS 7/bab3/lkpd_pemuaian_interaktif.html',
  './KELAS 7/bab3/lkpd_pemuaian_manual.html',
  './KELAS 7/bab3/simulasi_masalah_pemuaian.html',
  './KELAS 7/bab3/simulasi_pemuaian.html',
  './KELAS 7/bab3/simulasi_pemuaian_luas.html',
  './KELAS 7/bab3/simulasi_pemuaian_volume.html',
  './KELAS 7/bab3/simulasi_suhu.html',
  // Kelas 7 Bab 4
  './KELAS 7/bab4/index.html',
  './KELAS 7/bab4/kuis_tebak_gaya_cetak.html',
  './KELAS 7/bab4/kuis_tebak_gaya_digital.html',
  './KELAS 7/bab4/latihan_soal_digital.html',
  './KELAS 7/bab4/lkpd_digital.html',
  './KELAS 7/bab4/lkpd_gerak_cetak.html',
  './KELAS 7/bab4/lkpd_gerak_digital.html',
  './KELAS 7/bab4/lkpd_manual.html',
  './KELAS 7/bab4/lkpd_newton_cetak.html',
  './KELAS 7/bab4/lkpd_newton_digital.html',
  './KELAS 7/bab4/simulasi_resultan.html',
  './KELAS 7/bab4/images/dinamometer.png',
  './KELAS 7/bab4/images/efek_gaya.png',
  './KELAS 7/bab4/images/gaya_normal.png',
  './KELAS 7/bab4/images/jenis_gaya.png',
  './KELAS 7/bab4/images/pilihan_vektor_1.png',
  './KELAS 7/bab4/images/pilihan_vektor_2.png',
  './KELAS 7/bab4/images/pilihan_vektor_3.png',
  './KELAS 7/bab4/images/resultan_berlawanan.png',
  './KELAS 7/bab4/images/resultan_searah.png',
  './KELAS 7/bab4/images/soal_lkpd_1.png',
  './KELAS 7/bab4/images/soal_lkpd_2.png',
  './KELAS 7/bab4/images/soal_lkpd_3.png',
  // Kelas 7 Bab 5
  './KELAS 7/bab5/index.html',
  './KELAS 7/bab5/lkpd-c-cetak.html',
  './KELAS 7/bab5/lkpd-c-digital.html',
  './KELAS 7/bab5/lkpd-cetak.html',
  './KELAS 7/bab5/lkpd-de-cetak.html',
  './KELAS 7/bab5/lkpd-de-digital.html',
  './KELAS 7/bab5/lkpd-digital.html',
  './KELAS 7/bab5/assets/living_characteristics.png',
  './KELAS 7/bab5/assets/living_vs_nonliving.png',
  './KELAS 7/bab5/assets/microscope.png',
  './KELAS 7/bab5/assets/monera.png',
  './KELAS 7/bab5/assets/plantae.png',
  './KELAS 7/bab5/assets/protista.png',
  './KELAS 7/bab5/assets/taxonomy_hierarchy.png',
  // Kelas 7 Bab 6
  './KELAS 7/bab6/index.html',
  // Kelas 7 Bab 7
  './KELAS 7/bab7/index.html',
  './KELAS 7/bab7/lkpd-cetak.html',
  './KELAS 7/bab7/lkpd-digital.html',
  './KELAS 7/bab7/lkpd.html',
  './KELAS 7/bab7/simulasi3d.css',
  './KELAS 7/bab7/simulasi3d.html',
  './KELAS 7/bab7/simulasi3d.js',
  './KELAS 7/bab7/simulasi_bentuk_bumi.html',
  './KELAS 7/bab7/simulasi_fase_bulan.html',
  './KELAS 7/bab7/simulasi_gerhana_bulan.html',
  './KELAS 7/bab7/simulasi_gerhana_matahari.html',
  './KELAS 7/bab7/simulasi_pasang_surut.html',
  './KELAS 7/bab7/simulasi_revolusi_bumi.html',
  './KELAS 7/bab7/simulasi_rotasi_bumi.html',
  // Kelas 8 & Kelas 9
  './KELAS 8/index.html',
  './KELAS 8/style.css',
  './KELAS 8/app.js',
  './KELAS 8/ekskresi.js',
  './KELAS 8/pdf_data.js',
  './KELAS 9/index.html',
  './KELAS 9/lkpd_pertemuan2.html',
  './KELAS 9/pdf_data.js'
];

const EXTERNAL_CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-regular-400.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  'https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',
  'https://unpkg.com/lucide@latest',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'
];

// Helper: Cache local & CDN items resiliently with normalized Request keys
async function cacheAssetsResiliently(cache, localUrls, cdnUrls) {
  // 1. Cache same-origin local files using normalized URL Requests (handles spaces like "KELAS 7")
  await Promise.allSettled(
    localUrls.map(async (url) => {
      try {
        const encodedUrl = encodeURI(url);
        const req = new Request(encodedUrl, { cache: 'reload' });
        const res = await fetch(req);
        if (res && res.status === 200) {
          await cache.put(req, res);
        }
      } catch (_) {}
    })
  );

  // 2. Cache external CDN libraries (supports both CORS and no-cors opaque scripts like cdn.tailwindcss.com)
  await Promise.allSettled(
    cdnUrls.map(async (url) => {
      try {
        const res = await fetch(url, { mode: 'no-cors' });
        if (res && (res.status === 200 || res.type === 'opaque' || res.type === 'cors')) {
          await cache.put(url, res);
        }
      } catch (_) {}
    })
  );
}

// Install Event: Pre-cache all core & CDN assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[ServiceWorker] Caching App Shell, All Simulations & Offline CDN Assets');
      await cacheAssetsResiliently(cache, CORE_ASSETS, EXTERNAL_CDN_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up older cache versions and immediately claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Clearing Old Cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Listen for manual update/sync messages from client pages
self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data.type === 'SYNC_OFFLINE_CACHE') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        await cacheAssetsResiliently(cache, CORE_ASSETS, EXTERNAL_CDN_ASSETS);
        const clients = await self.clients.matchAll();
        clients.forEach((client) => client.postMessage({ type: 'CACHE_SYNCED', timestamp: Date.now() }));
      })
    );
  }
});

// Fetch Event: Network-First with fresh check for app files (auto-update when online),
// and automatic caching for all local + CDN assets (icons, fonts, 3D scripts, images).
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const reqUrl = new URL(event.request.url);

  // Skip YouTube / Sketchfab external video embeds from SW caching
  if (
    reqUrl.hostname.includes('youtube.com') ||
    reqUrl.hostname.includes('sketchfab.com')
  ) {
    return;
  }

  const isSameOrigin = reqUrl.origin === self.location.origin;

  // Network-First strategy: Always fetch latest update when online, fallback to cache when offline
  event.respondWith(
    (async () => {
      try {
        // Only pass { cache: 'no-cache' } for same-origin code files so cross-origin no-cors scripts don't fail
        const isCodeFile =
          isSameOrigin &&
          (/\.(html|js|css|json)$/i.test(reqUrl.pathname) || reqUrl.pathname.endsWith('/'));

        const networkResponse = isCodeFile
          ? await fetch(event.request, { cache: 'no-cache' })
          : await fetch(event.request);

        if (
          networkResponse &&
          (networkResponse.status === 200 ||
            networkResponse.type === 'opaque' ||
            networkResponse.type === 'cors')
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      } catch (err) {
        // Offline Fallback: Match exact request, URL string, or ignore query params
        const cachedResponse =
          (await caches.match(event.request)) ||
          (await caches.match(event.request.url)) ||
          (await caches.match(event.request, { ignoreSearch: true }));

        if (cachedResponse) {
          return cachedResponse;
        }

        // Fallback to local offline FontAwesome CSS if CDN FontAwesome was not cached
        if (reqUrl.href.includes('font-awesome') && reqUrl.pathname.endsWith('.css')) {
          const localFa = await caches.match(new URL('./assets/fontawesome/css/all.min.css', self.location.origin).href);
          if (localFa) return localFa;
        }

        throw err;
      }
    })()
  );
});

