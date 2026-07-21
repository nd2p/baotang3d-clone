import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const interactableObjects = []; // Mảng chứa các vật thể có thể click

const artifactData = {
    'painting-1': {
        year: 'NĂM 1973',
        title: 'Tổng Bí Thư Lê Duẩn',
        desc: 'Bức chân dung lịch sử của Tổng Bí thư Lê Duẩn - người "kiến trúc sư" xuất sắc của công cuộc kháng chiến. Dưới sự lãnh đạo sáng suốt của ông tại Hội nghị Trung ương 21 (1973), Đảng ta đã kiên định con đường bạo lực cách mạng, giữ vững thế tiến công chiến lược, làm thất bại hoàn toàn âm mưu phá hoại Hiệp định Paris của địch.'
    },
    'painting-2': {
        year: 'THÁNG 10/1973',
        title: 'Sức Mạnh Quân Đoàn Cơ Động',
        desc: 'Sự kiện thành lập Quân đoàn 1 đánh dấu bước trưởng thành vượt bậc về chất của Quân đội Nhân dân Việt Nam. Sự ra đời của các quân đoàn chủ lực cơ động như những "quả đấm thép" khổng lồ, bao gồm đầy đủ các binh chủng hợp thành, đã tạo ra sức mạnh áp đảo, đủ sức tiêu diệt những lực lượng mạnh nhất của địch.'
    },
    'painting-3': {
        year: '1973 - 1974',
        title: 'Huyết Mạch Hậu Cần Trường Sơn',
        desc: 'Hình ảnh tuyến đường ống xăng dầu xuyên rừng núi Trường Sơn - một kỳ tích vô tiền khoáng hậu của bộ đội Hậu cần Việt Nam. Tuyến đường huyết mạch này đã đảm bảo dòng máu năng lượng cuồn cuộn chảy vào tận miền Đông Nam Bộ, tiếp sức cho hàng ngàn xe tăng và pháo binh thần tốc tiến về Sài Gòn.'
    },
    'painting-4': {
        year: '06/01/1975',
        title: 'Đòn Thăm Dò Phước Long',
        desc: 'Cờ giải phóng tung bay trên dinh tỉnh trưởng Phước Long. Chiến thắng vang dội này mang ý nghĩa là một "đòn trinh sát chiến lược" hoàn hảo. Nó bóc trần sự suy yếu không thể cứu vãn của quân ngụy Sài Gòn và thái độ bất lực của Mỹ, khẳng định thời cơ giải phóng miền Nam đã thực sự chín muồi.'
    },
    'painting-5': {
        year: 'CUỐI NĂM 1974',
        title: 'Quyết Tâm Chiến Lược',
        desc: 'Bức ảnh vô giá ghi lại khoảnh khắc các vị lãnh đạo Bộ Chính trị đang căng mắt trên tấm bản đồ tác chiến. Chính tại căn phòng này, một quyết tâm lịch sử đã được hạ đạt: Giải phóng hoàn toàn miền Nam trong hai năm 1975-1976, nhưng chớp thời cơ để giải quyết dứt điểm ngay trong năm 1975.'
    },
    'painting-6': {
        year: 'THÁNG 03/1975',
        title: 'Đòn "Điểm Huyệt" Buôn Ma Thuột',
        desc: 'Quân giải phóng ào ạt tiến vào thị xã Buôn Ma Thuột. Trận đánh xuất thần này đã giáng đòn chí mạng vào tử huyệt Tây Nguyên, làm rung chuyển toàn bộ hệ thống phòng ngự của Việt Nam Cộng hòa, tạo hiệu ứng domino dẫn đến sự tan rã và sụp đổ dây chuyền của toàn bộ quân ngụy.'
    },
    'painting-7': {
        year: '10h45 - 30/04/1975',
        title: 'Xe Tăng 390 Húc Đổ Cổng Dinh',
        desc: 'Hình ảnh biểu tượng bất diệt của cuộc Kháng chiến: Chiếc xe tăng T-54 mang số hiệu 390 dũng mãnh húc tung cánh cổng sắt Dinh Độc Lập. Tiếng động cơ gầm vang và cánh cổng đổ sập chính là hồi chuông báo tử cho chế độ tay sai, mở toang cánh cửa dẫn đến tự do và hòa bình cho đất nước.'
    },
    'painting-8': {
        year: '11h30 - 30/04/1975',
        title: 'Lá Cờ Độc Lập Tung Bay',
        desc: 'Đại đội trưởng Bùi Quang Thận cầm lá cờ Mặt trận Dân tộc Giải phóng sải bước trên nóc Dinh Độc Lập. Khoảnh khắc lá cờ được kéo lên chính thức đánh dấu sự sụp đổ hoàn toàn của chính quyền Sài Gòn. Đất nước vĩnh viễn độc lập, non sông thu về một mối trong niềm vỡ òa của hàng triệu người con Việt Nam.'
    }
};

let discoveredArtifacts = new Set();
const totalArtifacts = 8; // Updated to 8

// --- DOM ELEMENTS ---
const blocker = document.getElementById('blocker');
const instructions = document.getElementById('instructions');
const infoPanel = document.getElementById('info-panel');
const counterDisplay = document.getElementById('found-count');
const closePanelBtn = document.getElementById('close-panel');

// --- THREE.JS SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5); // Light fog for realistic indoor look
scene.fog = new THREE.Fog(0xf5f5f5, 10, 40);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 8); // Start further back, eye height

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
document.getElementById('canvas-container').appendChild(renderer.domElement);

// --- CONTROLS ---
const controls = new PointerLockControls(camera, document.body);

blocker.addEventListener('click', function () {
    controls.lock();
    startMedia();
});

const startTourBtn = document.getElementById('start-tour-btn');
if (startTourBtn) {
    startTourBtn.addEventListener('click', () => {
        if (!isTouchDevice) controls.lock();
        startMedia();
    });
}

controls.addEventListener('lock', function () {
    blocker.style.display = 'none';
});

controls.addEventListener('unlock', function () {
    // Only show blocker if we didn't open the info panel
    if (infoPanel.classList.contains('closed')) {
        blocker.style.display = 'flex';
    }
});

scene.add(controls.getObject());

// --- MOBILE TOUCH DETECTION ---
// Make it a function so it can detect changes if user toggles Chrome DevTools
function checkIsTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia("(pointer: coarse)").matches;
}
let isTouchDevice = checkIsTouchDevice();
if (isTouchDevice) {
    camera.rotation.order = 'YXZ'; // Important for touch look
}

// Re-check on resize (useful for emulator toggling)
window.addEventListener('resize', () => {
    isTouchDevice = checkIsTouchDevice();
    if (isTouchDevice) camera.rotation.order = 'YXZ';
    
    // Update camera and renderer on resize
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Movement variables
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// --- VIRTUAL JOYSTICK LOGIC ---
const joystickBase = document.getElementById('joystick-base');
const joystickStick = document.getElementById('joystick-stick');
const touchLookZone = document.getElementById('touch-look-zone');
const maxJoystickTravel = 30; // pixels

// Always attach touch listeners (they won't fire on non-touch devices anyway)
let joystickIdentifier = null;

joystickBase.addEventListener('touchstart', (e) => {
    e.preventDefault(); // prevent scrolling
    const touch = e.changedTouches[0];
    joystickIdentifier = touch.identifier;
    updateJoystick(touch);
});

joystickBase.addEventListener('touchmove', (e) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === joystickIdentifier) {
            updateJoystick(e.changedTouches[i]);
            break;
        }
    }
});

function handleJoystickEnd(e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === joystickIdentifier) {
            joystickIdentifier = null;
            joystickStick.style.transform = `translate(0px, 0px)`;
            moveForward = false;
            moveBackward = false;
            moveLeft = false;
            moveRight = false;
            break;
        }
    }
}
joystickBase.addEventListener('touchend', handleJoystickEnd);
joystickBase.addEventListener('touchcancel', handleJoystickEnd);

function updateJoystick(touch) {
    const rect = joystickBase.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxJoystickTravel) {
        dx = (dx / distance) * maxJoystickTravel;
        dy = (dy / distance) * maxJoystickTravel;
    }
    
    joystickStick.style.transform = `translate(${dx}px, ${dy}px)`;
    
    // Map to movement flags
    moveForward = dy < -10;
    moveBackward = dy > 10;
    moveLeft = dx < -10;
    moveRight = dx > 10;
}

// --- TOUCH LOOK LOGIC ---
let touchStartX, touchStartY;
let lookSensitivity = 0.005;

touchLookZone.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].pageX;
    touchStartY = e.changedTouches[0].pageY;
});

touchLookZone.addEventListener('touchmove', (e) => {
    const touchX = e.changedTouches[0].pageX;
    const touchY = e.changedTouches[0].pageY;
    
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;
    
    camera.rotation.y -= deltaX * lookSensitivity;
    camera.rotation.x -= deltaY * lookSensitivity;
    
    // Clamp pitch
    const PI_2 = Math.PI / 2;
    camera.rotation.x = Math.max(-PI_2, Math.min(PI_2, camera.rotation.x));
    
    touchStartX = touchX;
    touchStartY = touchY;
});

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let prevTime = performance.now();

const onKeyDown = function (event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW': moveForward = true; break;
        case 'ArrowLeft':
        case 'KeyA': moveLeft = true; break;
        case 'ArrowDown':
        case 'KeyS': moveBackward = true; break;
        case 'ArrowRight':
        case 'KeyD': moveRight = true; break;
    }
};

const onKeyUp = function (event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW': moveForward = false; break;
        case 'ArrowLeft':
        case 'KeyA': moveLeft = false; break;
        case 'ArrowDown':
        case 'KeyS': moveBackward = false; break;
        case 'ArrowRight':
        case 'KeyD': moveRight = false; break;
    }
};

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// --- SCENE BUILDING ---

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Global soft light
scene.add(ambientLight);

// Main spotlight shining on the statue
const spotLight = new THREE.SpotLight(0xffeebb, 2);
spotLight.position.set(0, 10, 2);
spotLight.target.position.set(0, 0, -5);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.5;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);
scene.add(spotLight.target);

// Fill lights for the room
const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 20);
pointLight1.position.set(-8, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 20);
pointLight2.position.set(8, 5, 5);
scene.add(pointLight2);

// Room Dimensions
const roomWidth = 24;
const roomDepth = 30;
const wallHeight = 8;

// 1. Floor (Darker Museum Floor)
const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x2a364a, roughness: 0.2, metalness: 0.1 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// 2. Red Carpet
const carpetGeo = new THREE.PlaneGeometry(4, roomDepth - 4);
const carpetMat = new THREE.MeshStandardMaterial({ color: 0xaa1111, roughness: 0.9 });
const carpet = new THREE.Mesh(carpetGeo, carpetMat);
carpet.rotation.x = -Math.PI / 2;
carpet.position.y = 0.01; // Slightly above floor to prevent z-fighting
carpet.receiveShadow = true;
scene.add(carpet);

// 3. Walls (Warm Cornsilk color)
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xfff8dc, roughness: 1 });

// Back Wall
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, wallHeight), wallMaterial);
backWall.position.set(0, wallHeight/2, -roomDepth/2);
backWall.receiveShadow = true;
scene.add(backWall);

// Front Wall
const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, wallHeight), wallMaterial);
frontWall.position.set(0, wallHeight/2, roomDepth/2);
frontWall.rotation.y = Math.PI;
frontWall.receiveShadow = true;
scene.add(frontWall);

// Left Wall
const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(roomDepth, wallHeight), wallMaterial);
leftWall.position.set(-roomWidth/2, wallHeight/2, 0);
leftWall.rotation.y = Math.PI / 2;
leftWall.receiveShadow = true;
scene.add(leftWall);

// Right Wall
const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(roomDepth, wallHeight), wallMaterial);
rightWall.position.set(roomWidth/2, wallHeight/2, 0);
rightWall.rotation.y = -Math.PI / 2;
rightWall.receiveShadow = true;
scene.add(rightWall);

// Pillars (White and Gold)
const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, wallHeight, 32);
const pillarMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const pillarBaseGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 32);
const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 });

const pillarPositions = [
    [-11, -10], [11, -10], [-11, 0], [11, 0], [-11, 10], [11, 10]
];
pillarPositions.forEach(pos => {
    // Pillar body
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(pos[0], wallHeight/2, pos[1]);
    scene.add(pillar);
    
    // Pillar base
    const base = new THREE.Mesh(pillarBaseGeo, goldMat);
    base.position.set(pos[0], 0.25, pos[1]);
    scene.add(base);
    
    // Pillar top
    const top = new THREE.Mesh(pillarBaseGeo, goldMat);
    top.position.set(pos[0], wallHeight - 0.25, pos[1]);
    scene.add(top);
});

// 4. Ceiling
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomDepth), wallMaterial);
ceiling.position.set(0, wallHeight, 0);
ceiling.rotation.x = Math.PI / 2;
scene.add(ceiling);

// --- EXHIBITION: Paintings on the Walls ---
const textureLoader = new THREE.TextureLoader();

// Helper function to create a text placard
function createPlacard(title, year, desc, position, rotationY) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    // Background
    context.fillStyle = '#fdfbf7';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    context.strokeStyle = '#d4af37'; // Gold
    context.lineWidth = 12;
    context.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
    
    // Text: Title
    context.fillStyle = '#333333';
    context.textAlign = 'center';
    context.font = 'bold 30px Arial';
    context.fillText(title, canvas.width / 2, 70);
    
    // Text: Year
    context.fillStyle = '#aa1111';
    context.font = 'bold 22px Arial';
    context.fillText(year, canvas.width / 2, 110);
    
    // Divider
    context.beginPath();
    context.moveTo(canvas.width / 2 - 50, 130);
    context.lineTo(canvas.width / 2 + 50, 130);
    context.stroke();

    // Text: Description (Wrapped)
    context.fillStyle = '#555555';
    context.textAlign = 'left';
    context.font = '22px Arial';
    
    const words = desc.split(' ');
    let line = '';
    let y = 180;
    const maxWidth = 450;
    const x = 30;
    const lineHeight = 32;
    
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y); // Draw the last line
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    
    const placardGeo = new THREE.PlaneGeometry(1.6, 1.6); // Taller placard to fit text
    const placardMat = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 });
    const placard = new THREE.Mesh(placardGeo, placardMat);
    
    placard.position.copy(position);
    placard.rotation.y = rotationY;
    scene.add(placard);
}

// Helper function to create and place a framed painting
function createPainting(id, imagePath, position, rotationY) {
    const frameWidth = 4;
    const frameHeight = 3;
    
    // Frame mesh
    const frameGeo = new THREE.BoxGeometry(frameWidth + 0.4, frameHeight + 0.4, 0.1);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x4a2511, roughness: 0.7 }); // Dark wood
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.copy(position);
    frame.rotation.y = rotationY;
    scene.add(frame);

    // Painting canvas
    const paintingMap = textureLoader.load(imagePath);
    const paintingGeo = new THREE.PlaneGeometry(frameWidth, frameHeight);
    const paintingMat = new THREE.MeshStandardMaterial({ map: paintingMap, roughness: 0.5 });
    const painting = new THREE.Mesh(paintingGeo, paintingMat);
    
    // Position slightly in front of frame based on rotation
    const canvasOffset = 0.06;
    painting.position.copy(position);
    painting.position.x += Math.sin(rotationY) * canvasOffset;
    painting.position.z += Math.cos(rotationY) * canvasOffset;
    painting.rotation.y = rotationY;
    
    painting.userData = { id: id };
    scene.add(painting);
    interactableObjects.push(painting);

    // Spotlight for the painting
    const paintingLight = new THREE.SpotLight(0xffffff, 1.2);
    paintingLight.position.copy(position);
    paintingLight.position.y += 2.5; // Above the painting
    // Move light slightly away from the wall
    paintingLight.position.x += Math.sin(rotationY) * 3;
    paintingLight.position.z += Math.cos(rotationY) * 3;
    
    paintingLight.target = painting;
    paintingLight.angle = Math.PI / 6;
    paintingLight.penumbra = 0.5;
    scene.add(paintingLight);

    // Create placard to the right of the painting
    const rightOffset = 3.0; // Half frame width + spacing
    const placardPos = position.clone();
    // Shift right along the wall
    placardPos.x += Math.cos(rotationY) * rightOffset;
    placardPos.z -= Math.sin(rotationY) * rightOffset;
    // Lower it so the bottom aligns roughly with the painting bottom
    placardPos.y -= 0.7; 
    // Pull it slightly off the wall like the canvas
    placardPos.x += Math.sin(rotationY) * 0.06;
    placardPos.z += Math.cos(rotationY) * 0.06;
    
    createPlacard(artifactData[id].title, artifactData[id].year, artifactData[id].desc, placardPos, rotationY);
}

// --- Museum Benches (To fill empty center space) ---
const benchSeatGeo = new THREE.BoxGeometry(3, 0.15, 1);
const benchSeatMat = new THREE.MeshStandardMaterial({ color: 0x3d1e0d, roughness: 0.9 }); // Leather/Dark Wood
const benchLegGeo = new THREE.BoxGeometry(0.2, 0.5, 0.8);
const benchLegMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 }); // Black metal

const benchPositions = [-5, 0, 5]; // Z coordinates for 3 benches
benchPositions.forEach(zPos => {
    // Seat
    const seat = new THREE.Mesh(benchSeatGeo, benchSeatMat);
    seat.position.set(0, 0.575, zPos);
    seat.castShadow = true;
    seat.receiveShadow = true;
    scene.add(seat);

    // Left Leg
    const leg1 = new THREE.Mesh(benchLegGeo, benchLegMat);
    leg1.position.set(-1.2, 0.25, zPos);
    leg1.castShadow = true;
    scene.add(leg1);

    // Right Leg
    const leg2 = new THREE.Mesh(benchLegGeo, benchLegMat);
    leg2.position.set(1.2, 0.25, zPos);
    leg2.castShadow = true;
    scene.add(leg2);
});

// 1. Left Wall Painting
createPainting('painting-1', 
    './images/painting-1.png', 
    new THREE.Vector3(-roomWidth/2 + 0.05, 3, -5), // Moved to Z=-5 to avoid pillar at Z=0
    Math.PI / 2
);

// 2. Right Wall Painting
createPainting('painting-2', 
    './images/painting-2.png', 
    new THREE.Vector3(roomWidth/2 - 0.05, 3, -5), // Moved to Z=-5 to avoid pillar at Z=0
    -Math.PI / 2
);

// 3. Back Wall Painting (Left)
createPainting('painting-3', 
    './images/painting-3.png', 
    new THREE.Vector3(-6, 3, -roomDepth/2 + 0.05), 
    0
);

// 4. Back Wall Painting (Right)
createPainting('painting-4', 
    './images/painting-4.png', 
    new THREE.Vector3(6, 3, -roomDepth/2 + 0.05), 
    0
);

// 5. Left Wall Painting (Front)
createPainting('painting-5', 
    './images/painting-5.png', 
    new THREE.Vector3(-roomWidth/2 + 0.05, 3, 5), 
    Math.PI / 2
);

// 6. Right Wall Painting (Front)
createPainting('painting-6', 
    './images/painting-6.png', 
    new THREE.Vector3(roomWidth/2 - 0.05, 3, 5), 
    -Math.PI / 2
);

// 7. Front Wall Painting (Left)
createPainting('painting-7', 
    './images/painting-7.png', 
    new THREE.Vector3(-8.5, 3, roomDepth/2 - 0.05), 
    Math.PI
);

// 8. Front Wall Painting (Right)
createPainting('painting-8', 
    './images/painting-8.png', 
    new THREE.Vector3(8.5, 3, roomDepth/2 - 0.05), 
    Math.PI
);

// --- 3D TV & AUDIO SYSTEM ---
const videoElement = document.getElementById('video-source');
const bgmElement = document.getElementById('bgm-source');

let mediaStarted = false;
function startMedia() {
    if (!mediaStarted) {
        // Need to resume AudioContext in modern browsers
        if (listener.context.state === 'suspended') {
            listener.context.resume();
        }
        videoElement.play().catch(e => console.log('Autoplay prevented', e));
        bgmElement.play().catch(e => console.log('Autoplay prevented', e));
        mediaStarted = true;
    }
}

// Audio Listener attached to camera
const listener = new THREE.AudioListener();
camera.add(listener);
// Global Volume Control: listener is kept at 1.0 (master)
listener.setMasterVolume(1.0);

const bgmSlider = document.getElementById('bgm-slider');
const videoSlider = document.getElementById('video-slider');

bgmSlider.addEventListener('input', (e) => {
    bgmAudio.setVolume(parseFloat(e.target.value));
});

videoSlider.addEventListener('input', (e) => {
    tvAudio.setVolume(parseFloat(e.target.value));
});

// 1. 3D TV Setup
const videoTexture = new THREE.VideoTexture(videoElement);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBAFormat;

const tvWidth = 8;
const tvHeight = 4.5; // 16:9 ratio
const tvGeo = new THREE.PlaneGeometry(tvWidth, tvHeight);
const tvMat = new THREE.MeshBasicMaterial({ map: videoTexture }); // Basic material so it glows in the dark
const tvMesh = new THREE.Mesh(tvGeo, tvMat);
tvMesh.position.set(0, 4, roomDepth/2 - 0.21); // Placed in front of the frame
tvMesh.rotation.y = Math.PI;
scene.add(tvMesh);

const tvFrameGeo = new THREE.BoxGeometry(tvWidth + 0.4, tvHeight + 0.4, 0.2);
const tvFrameMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2 });
const tvFrame = new THREE.Mesh(tvFrameGeo, tvFrameMat);
tvFrame.position.set(0, 4, roomDepth/2 - 0.1);
tvFrame.rotation.y = Math.PI;
scene.add(tvFrame);

// Positional Audio for TV
const tvAudio = new THREE.PositionalAudio(listener);
tvAudio.setMediaElementSource(videoElement);
tvAudio.setRefDistance(5); // Volume starts dropping after 5 units
tvAudio.setMaxDistance(25);
tvAudio.setVolume(0.4); // Default video volume
tvMesh.add(tvAudio);

// 2. Speaker Setup for BGM
const speakerGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32);
const speakerMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });
const speakerMesh = new THREE.Mesh(speakerGeo, speakerMat);
speakerMesh.position.set(0, wallHeight - 0.25, 0); // Mounted on ceiling center
scene.add(speakerMesh);

// Positional Audio for BGM
const bgmAudio = new THREE.PositionalAudio(listener);
bgmAudio.setMediaElementSource(bgmElement);
bgmAudio.setRefDistance(12); // Wider range for BGM
bgmAudio.setMaxDistance(40);
bgmAudio.setVolume(0.2); // Default BGM volume (half of video)
speakerMesh.add(bgmAudio);

// --- INTERACTION (RAYCASTING) ---
const raycaster = new THREE.Raycaster();
const centerPoint = new THREE.Vector2(0, 0); // Center of screen

function performRaycast() {
    raycaster.setFromCamera(centerPoint, camera);
    
    // Check intersection with our interactable objects array
    const intersects = raycaster.intersectObjects(interactableObjects);
    
    if (intersects.length > 0) {
        const artifactId = intersects[0].object.userData.id;
        const data = artifactData[artifactId];
        
        if (data) {
            // Populate info panel
            document.getElementById('panel-year').textContent = data.year;
            document.getElementById('panel-title').textContent = data.title;
            document.getElementById('panel-desc').textContent = data.desc;
            
            // Show panel
            infoPanel.classList.remove('closed');
            if (!isTouchDevice) document.exitPointerLock(); 
            
            // Track progress
            if (!discoveredArtifacts.has(artifactId)) {
                discoveredArtifacts.add(artifactId);
                counterDisplay.textContent = discoveredArtifacts.size;
            }
        }
    }
}

// PC Click
document.addEventListener('click', (e) => {
    // Only trigger if locked (playing) and not clicking UI elements
    if (controls.isLocked && e.target !== closePanelBtn) {
        performRaycast();
    }
});

// Mobile Tap (Always attach, won't fire on PC)
let touchStartTime = 0;
touchLookZone.addEventListener('touchstart', () => {
    touchStartTime = Date.now();
});
touchLookZone.addEventListener('touchend', (e) => {
    // If it's a quick tap (less than 200ms) and no big movement, raycast
    if (Date.now() - touchStartTime < 200) {
         // ensure info panel isn't open
         if (infoPanel.classList.contains('closed')) {
             performRaycast();
         }
    }
});

closePanelBtn.addEventListener('click', () => {
    infoPanel.classList.add('closed');
    // Resume game immediately by locking pointer
    controls.lock();
});

// --- ANIMATION LOOP ---
const collisionDistance = 1.0; // Distance to keep from walls

function animate() {
    requestAnimationFrame(animate);

    const time = performance.now();

    // Run movement logic if on PC and locked, or if on Mobile (always active)
    if (controls.isLocked === true || (isTouchDevice && infoPanel.classList.contains('closed'))) {
        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // Ensure consistent movement in all directions

        const speed = 40.0;
        if (moveForward || moveBackward) velocity.z -= direction.z * speed * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * speed * delta;

        // Apply movement relative to camera orientation
        if (isTouchDevice) {
            // Manual movement relative to camera for mobile
            const euler = new THREE.Euler(0, camera.rotation.y, 0, 'YXZ');
            const vec = new THREE.Vector3(velocity.x * delta, 0, velocity.z * delta);
            vec.applyEuler(euler);
            camera.position.add(vec);
        } else {
            // Use PointerLock Controls native methods for PC
            controls.moveRight(-velocity.x * delta);
            controls.moveForward(-velocity.z * delta);
        }

        // Check Wall Collision Bounds (constrain camera.position)
        const halfWidth = roomWidth / 2 - collisionDistance;
        const halfDepth = roomDepth / 2 - collisionDistance;

        if (camera.position.x < -halfWidth) camera.position.x = -halfWidth;
        if (camera.position.x > halfWidth) camera.position.x = halfWidth;
        if (camera.position.z < -halfDepth) camera.position.z = -halfDepth;
        if (camera.position.z > halfDepth) camera.position.z = halfDepth;
        
        // Bench collision (rough bounding box for the 3 central benches)
        if (camera.position.x > -1.8 && camera.position.x < 1.8) {
            benchPositions.forEach(zPos => {
                if (camera.position.z > zPos - 1.0 && camera.position.z < zPos + 1.0) {
                     // Block movement by pushing back
                     camera.position.z += Math.sign(velocity.z) * Math.abs(velocity.z) * delta;
                     camera.position.x += Math.sign(velocity.x) * Math.abs(velocity.x) * delta;
                }
            });
        }
    }

    prevTime = time;
    renderer.render(scene, camera);
}

// Window resize handling
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start
animate();
