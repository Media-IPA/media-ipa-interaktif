// --- DATA PLANET ---
// Data skala disesuaikan agar bisa dilihat di layar, bukan skala aslinya.
const planetsData = [
    {
        id: "merkurius", name: "Merkurius", color: 0xa8a29e, radius: 1.2, distance: 15,
        rotationSpeed: 0.01, revolutionSpeed: 0.04,
        subtitle: "Planet Terkecil & Terdekat", distanceStr: "57,9 juta km", rotationStr: "59 hari", revolutionStr: "88 hari", tempStr: "-173°C s/d 427°C",
        fact: "Meskipun paling dekat dengan Matahari, Merkurius bukanlah planet terpanas karena tidak memiliki atmosfer untuk menahan panas."
    },
    {
        id: "venus", name: "Venus", color: 0fed7aa, radius: 1.8, distance: 22,
        rotationSpeed: -0.008, revolutionSpeed: 0.03,
        subtitle: "Planet Terpanas", distanceStr: "108,2 juta km", rotationStr: "243 hari", revolutionStr: "225 hari", tempStr: "462°C",
        fact: "Venus berotasi dari timur ke barat (berlawanan arah dengan sebagian besar planet), sehingga matahari terbit dari barat di Venus."
    },
    {
        id: "bumi", name: "Bumi", color: 0x3b82f6, radius: 2, distance: 30,
        rotationSpeed: 0.02, revolutionSpeed: 0.025,
        subtitle: "Planet Biru Kita", distanceStr: "149,6 juta km", rotationStr: "24 jam", revolutionStr: "365,25 hari", tempStr: "-88°C s/d 58°C",
        fact: "Satu-satunya planet di tata surya yang diketahui memiliki kehidupan dan memiliki air dalam wujud cair di permukaannya."
    },
    {
        id: "mars", name: "Mars", color: 0xef4444, radius: 1.5, distance: 38,
        rotationSpeed: 0.019, revolutionSpeed: 0.02,
        subtitle: "Planet Merah", distanceStr: "227,9 juta km", rotationStr: "24,6 jam", revolutionStr: "687 hari", tempStr: "-153°C s/d 20°C",
        fact: "Warna merah Mars berasal dari oksida besi (karat) di permukaannya. Mars memiliki gunung berapi tertinggi di tata surya bernama Olympus Mons."
    },
    {
        id: "yupiter", name: "Yupiter", color: 0xd97706, radius: 4.5, distance: 55,
        rotationSpeed: 0.04, revolutionSpeed: 0.01,
        subtitle: "Raksasa Gas", distanceStr: "778,5 juta km", rotationStr: "9,9 jam", revolutionStr: "11,9 tahun", tempStr: "-110°C (puncak awan)",
        fact: "Planet terbesar di tata surya. Memiliki Bintik Merah Raksasa yang merupakan badai raksasa yang telah berlangsung ratusan tahun."
    },
    {
        id: "saturnus", name: "Saturnus", color: 0xfde68a, radius: 3.5, distance: 75,
        rotationSpeed: 0.038, revolutionSpeed: 0.008,
        hasRings: true, ringColor: 0xebd999, ringInner: 4.5, ringOuter: 7.5,
        subtitle: "Planet Bercincin", distanceStr: "1,4 miliar km", rotationStr: "10,7 jam", revolutionStr: "29,5 tahun", tempStr: "-140°C",
        fact: "Cincin Saturnus yang menakjubkan terbuat dari miliaran bongkahan es dan batuan yang ukurannya bervariasi dari debu hingga sebesar gunung."
    },
    {
        id: "uranus", name: "Uranus", color: 0x38bdf8, radius: 2.8, distance: 92,
        rotationSpeed: -0.025, revolutionSpeed: 0.006,
        hasRings: true, ringColor: 0xbae6fd, ringInner: 3.5, ringOuter: 4.5, ringRotation: Math.PI / 2,
        subtitle: "Planet Es Raksasa", distanceStr: "2,9 miliar km", rotationStr: "17,2 jam", revolutionStr: "84 tahun", tempStr: "-195°C",
        fact: "Sumbu rotasi Uranus miring hampir 90 derajat, sehingga ia mengorbit matahari dengan posisi seperti 'menggelinding'."
    },
    {
        id: "neptunus", name: "Neptunus", color: 0x2563eb, radius: 2.7, distance: 108,
        rotationSpeed: 0.026, revolutionSpeed: 0.005,
        subtitle: "Planet Terluar", distanceStr: "4,5 miliar km", rotationStr: "16,1 jam", revolutionStr: "165 tahun", tempStr: "-200°C",
        fact: "Planet yang memiliki angin terkencang di tata surya, kecepatannya bisa mencapai lebih dari 2.000 km/jam."
    }
];

// --- SCENE SETUP ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
// Gunakan fog untuk memberikan efek kedalaman ruang angkasa
scene.fog = new THREE.FogExp2(0x000000, 0.002);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 80, 150);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// Aktifkan shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 300;
controls.minDistance = 10;

// --- LIGHTING ---
// Cahaya ambien redup untuk bagian planet yang membelakangi matahari
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Cahaya utama dari Matahari
const sunLight = new THREE.PointLight(0xffffff, 2, 300);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
scene.add(sunLight);

// --- CELESTIAL BODIES ---
const celestialBodies = [];
const orbits = [];

// Matahari
const sunGeo = new THREE.SphereGeometry(8, 64, 64);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Glow Matahari
const glowGeo = new THREE.SphereGeometry(8.5, 32, 32);
const glowMat = new THREE.MeshBasicMaterial({ 
    color: 0xf59e0b, 
    transparent: true, 
    opacity: 0.3,
    blending: THREE.AdditiveBlending
});
const sunGlow = new THREE.Mesh(glowGeo, glowMat);
scene.add(sunGlow);

// Buat Planet
const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

planetsData.forEach(data => {
    // Material planet (Standard agar bisa menerima bayangan dan cahaya)
    const material = new THREE.MeshStandardMaterial({ 
        color: data.color,
        roughness: 0.6,
        metalness: 0.1
    });

    const planetMesh = new THREE.Mesh(sphereGeo, material);
    planetMesh.scale.set(data.radius, data.radius, data.radius);
    planetMesh.castShadow = true;
    planetMesh.receiveShadow = true;
    planetMesh.userData = data; // Simpan data untuk raycaster

    // Grup untuk revolusi (Pivot point di tengah matahari)
    const pivot = new THREE.Group();
    scene.add(pivot);
    
    planetMesh.position.x = data.distance;
    pivot.add(planetMesh);

    // Cincin
    if (data.hasRings) {
        const ringGeo = new THREE.RingGeometry(data.ringInner, data.ringOuter, 64);
        const ringMat = new THREE.MeshStandardMaterial({ 
            color: data.ringColor, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2; // Flat
        if(data.ringRotation) {
            ring.rotation.y = data.ringRotation;
        }
        ring.receiveShadow = true;
        ring.castShadow = true;
        planetMesh.add(ring);
    }

    celestialBodies.push({
        mesh: planetMesh,
        pivot: pivot,
        data: data
    });

    // Buat Garis Orbit
    const orbitGeo = new THREE.RingGeometry(data.distance - 0.2, data.distance + 0.2, 128);
    const orbitMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.15 
    });
    const orbitPath = new THREE.Mesh(orbitGeo, orbitMat);
    orbitPath.rotation.x = Math.PI / 2;
    scene.add(orbitPath);
    orbits.push(orbitPath);

    // Tambah icon ke UI Bottom Bar
    const selectorBtn = document.createElement('button');
    selectorBtn.className = 'selector-btn';
    selectorBtn.onclick = () => focusOnPlanet(data.id);
    selectorBtn.innerHTML = `
        <div class="selector-icon" style="background-color: #${data.color.toString(16).padStart(6, '0')}"></div>
        <span>${data.name}</span>
    `;
    document.getElementById('planet-selector').appendChild(selectorBtn);
});

// Bidang Ekliptika
const eclipticGeo = new THREE.CircleGeometry(120, 64);
const eclipticMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.05,
    side: THREE.DoubleSide
});
const eclipticPlane = new THREE.Mesh(eclipticGeo, eclipticMat);
eclipticPlane.rotation.x = Math.PI / 2;
eclipticPlane.visible = false;
scene.add(eclipticPlane);

// Bintang Latar Belakang (Particles)
const starsGeo = new THREE.BufferGeometry();
const starsCount = 3000;
const posArray = new Float32Array(starsCount * 3);

for(let i = 0; i < starsCount * 3; i++) {
    // Distribusi bola
    posArray[i] = (Math.random() - 0.5) * 600; 
}
starsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const starsMat = new THREE.PointsMaterial({
    size: 0.5,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8
});
const starsMesh = new THREE.Points(starsGeo, starsMat);
scene.add(starsMesh);

// --- INTERACTION & UI LOGIC ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let isPlaying = true;
let focusedBody = null;

// Sembunyikan Loading setelah inisialisasi
setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
}, 1000);

// Raycaster Click Event
window.addEventListener('click', (event) => {
    // Jangan proses klik jika klik di atas UI
    if(event.target.closest('.ui-container') && !event.target.closest('#canvas-container')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Cek intersect dengan planet
    const intersects = raycaster.intersectObjects(celestialBodies.map(cb => cb.mesh));

    if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        focusOnPlanet(clickedMesh.userData.id);
    }
});

function focusOnPlanet(id) {
    const target = celestialBodies.find(cb => cb.data.id === id);
    if(!target) return;

    focusedBody = target;
    
    // Pause revolusi tapi biarkan rotasi untuk efek sinematik
    isPlaying = false;
    document.getElementById('toggle-play').innerHTML = '<i class="fa-solid fa-play"></i>';
    document.getElementById('toggle-play').classList.remove('active');

    // Dapatkan posisi dunia planet saat ini
    const targetPos = new THREE.Vector3();
    target.mesh.getWorldPosition(targetPos);

    // Hitung posisi kamera baru (agak serong dan berjarak)
    const distance = target.data.radius * 4;
    const camPos = new THREE.Vector3(
        targetPos.x + distance,
        targetPos.y + distance/2,
        targetPos.z + distance
    );

    // Animasi kamera dengan GSAP
    gsap.to(camera.position, {
        x: camPos.x,
        y: camPos.y,
        z: camPos.z,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
            controls.target.copy(targetPos);
            controls.update();
        }
    });

    showModal(target.data);
}

function showModal(data) {
    const modal = document.getElementById('planet-modal');
    document.getElementById('modal-title').textContent = data.name;
    document.getElementById('modal-subtitle').textContent = data.subtitle;
    document.getElementById('modal-distance').textContent = data.distanceStr;
    document.getElementById('modal-rotation').textContent = data.rotationStr;
    document.getElementById('modal-revolution').textContent = data.revolutionStr;
    document.getElementById('modal-temp').textContent = data.tempStr;
    document.getElementById('modal-fact').textContent = data.fact;
    
    modal.classList.remove('hidden');
}

function hideModal() {
    document.getElementById('planet-modal').classList.add('hidden');
    focusedBody = null;
}

// UI Listeners
document.getElementById('close-modal').addEventListener('click', hideModal);

document.getElementById('toggle-play').addEventListener('click', (e) => {
    isPlaying = !isPlaying;
    const btn = e.currentTarget;
    if(isPlaying) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        hideModal(); // Sembunyikan modal jika play dilanjutkan
    } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

document.getElementById('toggle-orbits').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.classList.toggle('active');
    const isVisible = btn.classList.contains('active');
    orbits.forEach(o => o.visible = isVisible);
});

document.getElementById('toggle-ecliptic').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.classList.toggle('active');
    eclipticPlane.visible = btn.classList.contains('active');
});

document.getElementById('reset-camera').addEventListener('click', () => {
    hideModal();
    isPlaying = true;
    document.getElementById('toggle-play').classList.add('active');
    document.getElementById('toggle-play').innerHTML = '<i class="fa-solid fa-pause"></i>';
    
    gsap.to(camera.position, {
        x: 0, y: 80, z: 150,
        duration: 1.5,
        ease: "power2.inOut"
    });
    gsap.to(controls.target, {
        x: 0, y: 0, z: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => controls.update()
    });
});

document.getElementById('btn-rotate').addEventListener('click', () => {
    if(focusedBody) {
        // Rotasi manual (1 putaran ekstra cepat)
        gsap.to(focusedBody.mesh.rotation, {
            y: focusedBody.mesh.rotation.y + Math.PI * 2,
            duration: 2,
            ease: "power1.inOut"
        });
    }
});

document.getElementById('btn-zoom').addEventListener('click', () => {
    if(focusedBody) {
        const targetPos = new THREE.Vector3();
        focusedBody.mesh.getWorldPosition(targetPos);
        const distance = focusedBody.data.radius * 2; // Zoom lebih dekat
        const camPos = new THREE.Vector3(
            targetPos.x + distance,
            targetPos.y,
            targetPos.z + distance
        );
        gsap.to(camera.position, {
            x: camPos.x, y: camPos.y, z: camPos.z,
            duration: 1, ease: "power2.inOut"
        });
    }
});

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- ANIMATION LOOP ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();

    // Rotasi Matahari
    sun.rotation.y += 0.005;

    // Gerak Planet
    celestialBodies.forEach(cb => {
        // Rotasi pada sumbu sendiri (selalu berjalan meski dipause agar terlihat hidup)
        cb.mesh.rotation.y += cb.data.rotationSpeed;

        // Revolusi mengelilingi matahari
        if(isPlaying) {
            cb.pivot.rotation.y += cb.data.revolutionSpeed;
        }
    });

    // Update target kamera saat mode fokus
    if(focusedBody && !isPlaying) {
        const targetPos = new THREE.Vector3();
        focusedBody.mesh.getWorldPosition(targetPos);
        controls.target.lerp(targetPos, 0.1);
    }

    // Rotasi awan bintang perlahan
    starsMesh.rotation.y -= 0.0001;

    controls.update();
    renderer.render(scene, camera);
}

animate();
