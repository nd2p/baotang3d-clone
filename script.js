import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const artifactInteractables = [];
const videoInteractables = [];

const artifactData = {
    'painting-1': {
        year: '1911',
        title: 'Bến Nhà Rồng (địa điểm lịch sử)',
        desc: 'Hình ảnh tư liệu về Bến Nhà Rồng, địa điểm gắn với ngày 5/6/1911 khi Nguyễn Tất Thành lên tàu bắt đầu hành trình tìm đường cứu nước.'
    },
    'painting-2': {
        year: '1920',
        title: 'Nguyễn Ái Quốc tại Đại hội Tours',
        desc: 'Tại Đại hội Đảng Xã hội Pháp ở Tours tháng 12/1920, Nguyễn Ái Quốc tham gia quyết định lịch sử và trở thành một trong những người sáng lập Đảng Cộng sản Pháp.'
    },
    'painting-3': {
        year: '02/09/1945',
        title: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập',
        desc: 'Ngày 2/9/1945 tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.'
    },
    'painting-4': {
        year: '02/09/1945',
        title: 'Quảng trường Ba Đình ngày Quốc khánh',
        desc: 'Quảng trường Ba Đình ngày 2/9/1945, nơi hàng vạn đồng bào chứng kiến Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập.'
    },
    'painting-9': {
        year: '02/09/1945',
        title: 'Hồ Chí Minh và Võ Nguyên Giáp trong ngày độc lập',
        desc: 'Ảnh tư liệu Chủ tịch Hồ Chí Minh và Đại tướng Võ Nguyên Giáp tại Quảng trường Ba Đình ngày 2/9/1945, gợi nhắc thời khắc nền độc lập được công bố.'
    },
    'painting-10': {
        year: '02/09/1945',
        title: 'Lễ đài độc lập tại Sài Gòn',
        desc: 'Ảnh tư liệu lễ đài độc lập ngày 2/9/1945 tại Sài Gòn, phản ánh không khí mừng độc lập và sự lan tỏa của thời khắc lịch sử trên cả nước.'
    },
    'painting-5': {
        year: '03/1946',
        title: 'Chính phủ Liên hiệp Kháng chiến ra mắt',
        desc: 'Hình ảnh Chính phủ Liên hiệp Kháng chiến của nước Việt Nam Dân chủ Cộng hòa tháng 3/1946, gắn với quá trình xây dựng chính quyền và Quốc hội khóa I sau Tổng tuyển cử.'
    },
    'painting-6': {
        year: '05/07/1955',
        title: 'Hồ Chí Minh và Tống Khánh Linh tại Bắc Kinh',
        desc: 'Hình ảnh Chủ tịch Hồ Chí Minh gặp Tống Khánh Linh tại Bắc Kinh năm 1955, thể hiện quan hệ hữu nghị và tinh thần đoàn kết quốc tế.'
    },
    'room4-national-unity-1': {
        year: 'Thập niên 1950',
        title: 'Hồ Chí Minh giao lưu với thiếu nhi Việt Nam',
        desc: 'Hình ảnh Chủ tịch Hồ Chí Minh giao lưu với thiếu nhi Việt Nam, gợi nhắc sự gắn kết giữa các thế hệ trong cộng đồng dân tộc.'
    },
    'room4-national-unity-2': {
        year: 'Trước 1969',
        title: 'Chủ tịch Hồ Chí Minh và đồng chí Đỗ Mười',
        desc: 'Hình ảnh Chủ tịch Hồ Chí Minh và đồng chí Đỗ Mười, phản ánh sự phối hợp của đội ngũ lãnh đạo trong sự nghiệp xây dựng đất nước.'
    },
    'room4-international-solidarity-2': {
        year: '1955',
        title: 'Chủ tịch Hồ Chí Minh thăm Mông Cổ',
        desc: 'Chuyến thăm Mông Cổ năm 1955, minh họa quan hệ hữu nghị và tinh thần đoàn kết quốc tế.'
    },
    'room4-national-unity-people': {
        year: 'Thế kỷ XX',
        title: 'Sức mạnh của đại đoàn kết toàn dân tộc',
        desc: 'Cụm mô hình con người được sử dụng để biểu trưng cho sức mạnh của khối đại đoàn kết toàn dân tộc trong tư tưởng Hồ Chí Minh. Đây là mô hình minh họa, không đại diện cho một nhóm nhân vật lịch sử cụ thể.'
    },
    'room4-dove': {
        year: 'Thế kỷ XX',
        title: 'Hòa bình và hữu nghị giữa các dân tộc',
        desc: 'Hình tượng chim bồ câu được sử dụng như biểu tượng minh họa cho hòa bình, hữu nghị và tinh thần đoàn kết quốc tế trong tư tưởng Hồ Chí Minh.'
    },
    'room4-letter': {
        year: 'Thế kỷ XX',
        title: 'Thông điệp hữu nghị và đoàn kết quốc tế',
        desc: 'Mô hình lá thư được sử dụng để gợi nhắc hoạt động trao đổi, liên hệ và tình đoàn kết giữa Việt Nam với bạn bè quốc tế. Đây là hiện vật minh họa, không khẳng định là một bức thư lịch sử cụ thể của Chủ tịch Hồ Chí Minh.'
    },
    'room5-chair': {
        year: 'Thế kỷ XX',
        title: 'Chiếc ghế gỗ mộc mạc',
        desc: 'Mô hình hiện vật gợi nhắc nếp sống giản dị, gần gũi, thanh bạch trong đời sống thường ngày.'
    },
    'room5-tea-cup': {
        year: 'Thế kỷ XX',
        title: 'Tách trà',
        desc: 'Hình ảnh đời sống thanh đạm, bình dị và nền nếp, gắn với phong cách sống nhẹ nhàng, tiết chế.'
    },
    'room5-ha-noi-specialities': {
        year: 'Thế kỷ XX',
        title: 'Vật dụng sinh hoạt truyền thống',
        desc: 'Pack mô hình minh họa cho không gian sinh hoạt và đời sống văn hóa truyền thống Hà Nội; các vật thể trong pack không được nhận định là hiện vật lịch sử cụ thể.'
    },
    'room5-rubber-sandals': {
        year: 'Thế kỷ XX',
        title: 'Dép cao su - biểu tượng lối sống giản dị',
        desc: 'Hình ảnh minh họa kiểu dép cao su gắn với phong cách sống giản dị, tiết kiệm và gần gũi; không khẳng định đây là đôi dép thật của Chủ tịch Hồ Chí Minh.'
    },
    'room5-humanism-2': {
        year: '1950',
        title: 'Hồ Chí Minh giao lưu với thiếu nhi',
        desc: 'Hình ảnh tư liệu về sự gần gũi, yêu thương của Chủ tịch Hồ Chí Minh với thiếu nhi, gợi nhắc chiều sâu nhân văn trong văn hóa và con người.'
    },
    'painting-7': {
        year: '2009',
        title: 'Không gian làm việc tại Nhà sàn Hồ Chí Minh',
        desc: 'Ảnh chụp không gian làm việc tại Nhà sàn Hồ Chí Minh ở Hà Nội, giúp hình dung nếp sống giản dị và tinh thần lao động, học tập của Người. Đây là ảnh tư liệu về không gian bảo tồn, không phải hiện vật gốc đang trưng bày.'
    },
    'painting-8': {
        year: 'Thập niên 1950',
        title: 'Chân dung Chủ tịch Hồ Chí Minh',
        desc: 'Chân dung tư liệu Chủ tịch Hồ Chí Minh, phù hợp làm hình ảnh mở đầu cho không gian phim và tư liệu về cuộc đời, sự nghiệp của Người.'
    },
    'room1-steam-ship': {
        year: '1911',
        title: 'Hành trình ra đi tìm đường cứu nước',
        desc: 'Mô hình tàu hơi nước minh họa phương tiện đường biển gắn với bối cảnh Nguyễn Tất Thành rời Tổ quốc năm 1911, bắt đầu hành trình tìm con đường giải phóng dân tộc.'
    },
    'room1-antique-globe': {
        year: '1911–1941',
        title: 'Hành trình qua nhiều quốc gia',
        desc: 'Quả địa cầu tượng trưng cho hành trình hoạt động thực tiễn của Nguyễn Ái Quốc – Hồ Chí Minh qua nhiều quốc gia và quá trình tìm ra con đường cứu nước phù hợp cho dân tộc Việt Nam.'
    },
    'room2-vintage-microphone': {
        year: '1945',
        title: 'Tiếng nói của độc lập',
        desc: 'Mô hình microphone cổ được sử dụng như một hiện vật minh họa cho không gian lịch sử gắn với việc công bố nền độc lập của Việt Nam. Đây là mô hình minh họa, không khẳng định là chiếc microphone thực tế được sử dụng ngày 2/9/1945.'
    },
    'room2-vintage-radio': {
        year: '1945',
        title: 'Thông tin và tiếng nói cách mạng',
        desc: 'Mô hình radio cổ minh họa phương tiện truyền thông trong bối cảnh lịch sử giữa thế kỷ XX, gợi nhắc vai trò của thông tin và tiếng nói cách mạng trong thời kỳ giành và bảo vệ nền độc lập.'
    },
    'room2-vintage-telephone': {
        year: 'Thế kỷ XX',
        title: 'Điện thoại cổ',
        desc: 'Mô hình điện thoại cổ minh họa phương tiện liên lạc trong bối cảnh lịch sử thế kỷ XX. Hiện vật được sử dụng nhằm tái hiện không khí của thời kỳ, không khẳng định đây là thiết bị cụ thể từng được Chủ tịch Hồ Chí Minh sử dụng.'
    },
    'room2-old-newspaper': {
        year: '1945',
        title: 'Báo chí và thông tin trong ngày độc lập',
        desc: 'Mô hình tờ báo cũ được sử dụng để gợi lại vai trò của báo chí và thông tin trong bối cảnh lịch sử năm 1945. Đây là hiện vật minh họa, không khẳng định là một số báo cụ thể của ngày 2/9/1945.'
    },
    'room3-ballot-box': {
        year: '1946',
        title: 'Quyền làm chủ của nhân dân',
        desc: 'Mô hình hòm phiếu được sử dụng để minh họa quyền tham gia quản lý Nhà nước và thực hiện quyền làm chủ của nhân dân. Hiện vật mang tính minh họa, không khẳng định đây là hòm phiếu cụ thể của cuộc Tổng tuyển cử năm 1946.'
    },
    'room3-typewriter': {
        year: 'Thế kỷ XX',
        title: 'Công tác văn thư và xây dựng Nhà nước',
        desc: 'Mô hình máy đánh chữ cổ minh họa hoạt động văn thư, soạn thảo và xử lý văn bản trong bộ máy hành chính. Đây là hiện vật minh họa, không khẳng định là thiết bị cụ thể từng được Chủ tịch Hồ Chí Minh sử dụng.'
    },
    'room3-old-book': {
        year: '1945–1946',
        title: 'Pháp luật và nền Nhà nước mới',
        desc: 'Mô hình sách cổ được sử dụng để tượng trưng cho văn kiện, Hiến pháp và vai trò của pháp luật trong xây dựng Nhà nước mới. Đây là hiện vật minh họa, không phải một bản Hiến pháp lịch sử cụ thể.'
    },
    'room3-election-1946': {
        year: '1946',
        title: 'Chuẩn bị Tổng tuyển cử Quốc hội khóa I',
        desc: 'Ảnh tư liệu cảnh chuẩn bị bầu cử Quốc hội khóa I tại ngõ Phất Lộc năm 1946, gợi lại quá trình tổ chức cuộc Tổng tuyển cử đầu tiên của nước Việt Nam Dân chủ Cộng hòa.'
    },
    'room3-national-assembly': {
        year: '02/03/1946',
        title: 'Phiên họp đầu tiên của Quốc hội khóa I',
        desc: 'Quang cảnh phiên họp đầu tiên của Quốc hội Việt Nam Dân chủ Cộng hòa khóa I ngày 2/3/1946, một dấu mốc trong quá trình xây dựng Nhà nước mới.'
    },
    'painting-11': {
        year: '1946',
        title: 'Chuẩn bị Tổng tuyển cử Quốc hội khóa I',
        desc: 'Ảnh tư liệu cảnh chuẩn bị bầu cử Quốc hội khóa I tại ngõ Phất Lộc năm 1946, gợi lại quá trình tổ chức cuộc Tổng tuyển cử đầu tiên của nước Việt Nam Dân chủ Cộng hòa.'
    },
    'painting-12': {
        year: '02/03/1946',
        title: 'Phiên họp đầu tiên của Quốc hội khóa I',
        desc: 'Quang cảnh phiên họp đầu tiên của Quốc hội Việt Nam Dân chủ Cộng hòa khóa I ngày 2/3/1946, một dấu mốc trong quá trình xây dựng Nhà nước mới.'
    }
};

let discoveredArtifacts = new Set();
const totalArtifacts = Object.keys(artifactData).length;

// --- DOM ELEMENTS ---
const blocker = document.getElementById('blocker');
const instructions = document.getElementById('instructions');
const infoPanel = document.getElementById('info-panel');
const counterDisplay = document.getElementById('found-count');
const closePanelBtn = document.getElementById('close-panel');
const victoryPopup = document.getElementById('victory-popup');
const continueTourBtn = document.getElementById('continue-tour-btn');
const restartTourBtn = document.getElementById('restart-tour-btn');
const entrancePopup = document.getElementById('entrance-popup');
const enterMuseumBtn = document.getElementById('enter-museum-btn');
const leaveMuseumBtn = document.getElementById('leave-museum-btn');
const currentRoomName = document.getElementById('current-room-name');
const progressFill = document.getElementById('progress-fill');
const progressTrack = document.querySelector('.progress-track');
const discoveredBadge = document.getElementById('discovered-badge');
const victoryFoundCount = document.getElementById('victory-found-count');
const victoryTotalCount = document.getElementById('victory-total-count');
const crosshair = document.getElementById('crosshair');
const room6ContinueBtn = document.getElementById('room6-continue-btn');
const room6AudioFallback = document.getElementById('room6-audio-fallback');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
document.getElementById('total-count').textContent = totalArtifacts;
document.getElementById('counter-total').textContent = totalArtifacts;

function updateProgressUI() {
    const found = discoveredArtifacts.size;
    const percentage = totalArtifacts ? (found / totalArtifacts) * 100 : 0;
    counterDisplay.textContent = found;
    progressFill.style.width = `${percentage}%`;
    progressTrack.setAttribute('aria-valuemax', totalArtifacts);
    progressTrack.setAttribute('aria-valuenow', found);
    victoryFoundCount.textContent = found;
    victoryTotalCount.textContent = totalArtifacts;
}

updateProgressUI();

// --- THREE.JS SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5); // Light fog for realistic indoor look
scene.fog = new THREE.Fog(0xf5f5f5, 10, 40);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Visitor eye height, slightly above an average standing eye level.
const EYE_HEIGHT = 1.8;
camera.position.set(0, EYE_HEIGHT, 35); // Start outside, facing the museum entrance

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// The Room 06 YouTube iframe is a flat, fixed element projected onto the 3D
// screen with a single perspective matrix (see updateYouTubeScreenProjection).
// It deliberately avoids CSS3DRenderer: Chrome does not deliver mouse events to
// iframes nested in a preserve-3d context, so the player could not be clicked.
const videoLayer = document.createElement('div');
videoLayer.style.cssText = 'position:absolute;inset:0;z-index:2;overflow:hidden;pointer-events:none;';
document.getElementById('canvas-container').appendChild(videoLayer);

// --- CONTROLS ---
const controls = new PointerLockControls(camera, document.body);

function enterGameMode() {
    if (isTouchDevice) {
        blocker.style.display = 'none';
        return;
    }

    try {
        controls.lock();
    } catch (error) {
        console.error('Không thể kích hoạt Pointer Lock:', error);
        blocker.style.display = 'grid';
    }
}

blocker.addEventListener('click', function () {
    enterGameMode();
    startMedia();
});

const startTourBtn = document.getElementById('start-tour-btn');
if (startTourBtn) {
    startTourBtn.addEventListener('click', () => {
        enterGameMode();
        startMedia();
    });
}

const mediaToggleBtn = document.getElementById('media-toggle-btn');
const mediaPopover = document.getElementById('media-popover');
const helpBtn = document.getElementById('help-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');

mediaToggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = mediaPopover.hidden;
    mediaPopover.hidden = !willOpen;
    mediaToggleBtn.setAttribute('aria-expanded', String(willOpen));
});

mediaPopover.addEventListener('click', event => event.stopPropagation());

helpBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!isTouchDevice && document.pointerLockElement) document.exitPointerLock();
    else blocker.style.display = 'grid';
});

fullscreenBtn.addEventListener('click', async (event) => {
    event.stopPropagation();
    try {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
        else await document.exitFullscreen();
    } catch (error) {
        console.warn('Không thể chuyển chế độ toàn màn hình:', error);
    }
});

document.addEventListener('fullscreenchange', () => {
    fullscreenBtn.setAttribute('aria-label', document.fullscreenElement ? 'Thoát toàn màn hình' : 'Toàn màn hình');
});

controls.addEventListener('lock', function () {
    blocker.style.display = 'none';
    startTourBtn.querySelector('span:last-child').textContent = 'Đang tham quan';
});

controls.addEventListener('unlock', function () {
    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    velocity.set(0, 0, 0);

    // Only show blocker if we didn't open the info panel, and not while the
    // Room 06 video is being used with the mouse (the blocker would cover it).
    if (!css3dInteractionEnabled && infoPanel.classList.contains('closed') && entrancePopup.classList.contains('hidden') && victoryPopup.classList.contains('hidden')) {
        blocker.style.display = 'grid';
    }
    startTourBtn.querySelector('span:last-child').textContent = 'Tiếp tục';
});

document.addEventListener('pointerlockerror', () => {
    console.error('Pointer Lock thất bại');
    blocker.style.display = 'grid';
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
    if (event.code === 'KeyN' && !event.repeat) {
        const activeTag = document.activeElement?.tagName;
        if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
        toggleDayNight();
        return;
    }

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
const ambientLight = new THREE.AmbientLight(0xffdcb0, 0.6); // Warm global soft light
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
const pointLight1 = new THREE.PointLight(0xffc98f, 0.5, 20);
pointLight1.position.set(-8, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffc98f, 0.5, 20);
pointLight2.position.set(8, 5, 5);
scene.add(pointLight2);

// Room Dimensions
const roomWidth = 32;
const roomDepth = 42;
const wallHeight = 8;

// 1. Floor (Darker Museum Floor)
const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x34383d, roughness: 0.42, metalness: 0.08 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// 2. Red Carpet
const carpetGeo = new THREE.PlaneGeometry(4, roomDepth - 4);
const carpetMat = new THREE.MeshStandardMaterial({ color: 0x8f171b, roughness: 0.88 });
const carpet = new THREE.Mesh(carpetGeo, carpetMat);
carpet.rotation.x = -Math.PI / 2;
carpet.position.y = 0.01; // Slightly above floor to prevent z-fighting
carpet.receiveShadow = true;
scene.add(carpet);

// 3. Walls (Warm Cornsilk color)
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf2e4cc, roughness: 0.92, side: THREE.DoubleSide });

// Back Wall
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, wallHeight), wallMaterial);
backWall.position.set(0, wallHeight / 2, -roomDepth / 2);
backWall.receiveShadow = true;
scene.add(backWall);

// Front wall is split around a real entrance.
const entranceWidth = 4.2;
const entranceHeight = 4.4;
// The entrance is an opening in the front wall, not a collidable door. Keep
// enough margin for the player while allowing the bounds to cross the facade.
const entrancePassageHalfWidth = entranceWidth / 2 - 0.5;
const entranceZ = roomDepth / 2;
const frontSideWidth = (roomWidth - entranceWidth) / 2;
[-1, 1].forEach(side => {
    const wallPart = new THREE.Mesh(new THREE.PlaneGeometry(frontSideWidth, wallHeight), wallMaterial);
    wallPart.name = `exterior-front-wall-${side < 0 ? 'left' : 'right'}`;
    wallPart.position.set(side * (entranceWidth / 2 + frontSideWidth / 2), wallHeight / 2, roomDepth / 2);
    wallPart.rotation.y = Math.PI;
    wallPart.receiveShadow = true;
    scene.add(wallPart);
});
const frontTopWall = new THREE.Mesh(new THREE.PlaneGeometry(entranceWidth, wallHeight - entranceHeight), wallMaterial);
frontTopWall.name = 'exterior-front-wall-above-entrance';
frontTopWall.position.set(0, entranceHeight + (wallHeight - entranceHeight) / 2, roomDepth / 2);
frontTopWall.rotation.y = Math.PI;
frontTopWall.receiveShadow = true;
scene.add(frontTopWall);

// Left Wall
const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(roomDepth, wallHeight), wallMaterial);
leftWall.position.set(-roomWidth / 2, wallHeight / 2, 0);
leftWall.rotation.y = Math.PI / 2;
leftWall.receiveShadow = true;
scene.add(leftWall);

// Right Wall
const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(roomDepth, wallHeight), wallMaterial);
rightWall.position.set(roomWidth / 2, wallHeight / 2, 0);
rightWall.rotation.y = -Math.PI / 2;
rightWall.receiveShadow = true;
scene.add(rightWall);

// 4. Ceiling
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomDepth), wallMaterial);
ceiling.position.set(0, wallHeight, 0);
ceiling.rotation.x = Math.PI / 2;
scene.add(ceiling);

// --- EXTERIOR & MUSEUM FACADE ---
const outdoorGround = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 28),
    new THREE.MeshStandardMaterial({ color: 0x81906f, roughness: 1 })
);
outdoorGround.rotation.x = -Math.PI / 2;
outdoorGround.position.set(0, -0.02, roomDepth / 2 + 13.5);
outdoorGround.receiveShadow = true;
scene.add(outdoorGround);

const entrancePath = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 17),
    new THREE.MeshStandardMaterial({ color: 0xc9c2b5, roughness: 0.9 })
);
entrancePath.rotation.x = -Math.PI / 2;
entrancePath.position.set(0, 0.015, roomDepth / 2 + 8.5);
entrancePath.receiveShadow = true;
scene.add(entrancePath);

const facadeStone = new THREE.MeshStandardMaterial({ color: 0xe8dfcb, roughness: 0.82 });

// Main entrance: two solid wooden leaves that close flush inside a gilded frame.
// The frame overlaps the wall edges on both faces and the leaves have real
// thickness, so no seam can be seen through from either side. The leaves swing
// inward automatically as the visitor approaches (see updateEntranceDoors).
const entranceGold = new THREE.MeshStandardMaterial({
    color: 0xe0b84a,
    emissive: 0x6a4510,
    emissiveIntensity: 0.45,
    roughness: 0.3,
    metalness: 0.5
});

function createEntranceLeafTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 536;
    const ctx = canvas.getContext('2d');
    const wood = ctx.createLinearGradient(0, 0, canvas.width, 0);
    wood.addColorStop(0, '#3f2215');
    wood.addColorStop(0.5, '#5a321e');
    wood.addColorStop(1, '#3f2215');
    ctx.fillStyle = wood;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Fine vertical grain.
    ctx.strokeStyle = 'rgba(30,14,6,0.25)';
    ctx.lineWidth = 1;
    for (let x = 4; x < canvas.width; x += 7) {
        ctx.beginPath();
        ctx.moveTo(x + Math.sin(x) * 2, 0);
        ctx.lineTo(x - Math.sin(x) * 2, canvas.height);
        ctx.stroke();
    }
    // Gilded inlay panels.
    const drawPanel = (y, h) => {
        ctx.strokeStyle = '#d9b04a';
        ctx.lineWidth = 6;
        ctx.strokeRect(30, y, canvas.width - 60, h);
        ctx.strokeStyle = 'rgba(217,176,74,0.55)';
        ctx.lineWidth = 2;
        ctx.strokeRect(44, y + 14, canvas.width - 88, h - 28);
    };
    drawPanel(36, 200);
    drawPanel(276, 224);
    // Small gold rosette between the panels.
    ctx.fillStyle = '#e6c25c';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 256, 9, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

const entranceDoors = [];
function createEntranceDoors() {
    const leafWidth = entranceWidth / 2;
    const leafHeight = entranceHeight - 0.02;
    const leafDepth = 0.14;
    const leafTexture = createEntranceLeafTexture();
    const faceMaterial = new THREE.MeshStandardMaterial({ map: leafTexture, roughness: 0.55 });
    const edgeMaterial = new THREE.MeshStandardMaterial({ color: 0x3f2215, roughness: 0.6 });
    // BoxGeometry face order: +x, -x, +y, -y, +z, -z.
    const leafMaterials = [edgeMaterial, edgeMaterial, edgeMaterial, edgeMaterial, faceMaterial, faceMaterial];

    [-1, 1].forEach(side => {
        const hinge = new THREE.Group();
        hinge.position.set(side * leafWidth, 0.01, entranceZ);
        const leaf = new THREE.Mesh(new THREE.BoxGeometry(leafWidth, leafHeight, leafDepth), leafMaterials);
        leaf.position.set(-side * leafWidth / 2, leafHeight / 2, 0);
        hinge.add(leaf);

        // Brass pull handles on both faces near the meeting edge.
        [-1, 1].forEach(face => {
            const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.9, 12), entranceGold);
            handle.position.set(-side * (leafWidth - 0.22), 2.0, face * (leafDepth / 2 + 0.07));
            hinge.add(handle);
            [-0.4, 0.4].forEach(dy => {
                const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.08), entranceGold);
                post.position.set(handle.position.x, 2.0 + dy, face * (leafDepth / 2 + 0.035));
                hinge.add(post);
            });
        });

        // Thin gold astragal on the meeting edge hides the centre seam.
        const astragal = new THREE.Mesh(new THREE.BoxGeometry(0.05, leafHeight, leafDepth + 0.04), entranceGold);
        astragal.position.set(-side * (leafWidth - 0.025), leafHeight / 2, 0);
        hinge.add(astragal);

        hinge.userData.side = side;
        scene.add(hinge);
        entranceDoors.push(hinge);
    });

    // Gilded frame: jambs and head overlap the wall edges on both faces.
    const frameDepth = 0.5;
    const jambWidth = 0.42;
    [-1, 1].forEach(side => {
        const jamb = new THREE.Mesh(new THREE.BoxGeometry(jambWidth, entranceHeight + 0.4, frameDepth), entranceGold);
        jamb.position.set(side * (entranceWidth / 2 + jambWidth / 2 - 0.02), (entranceHeight + 0.4) / 2, entranceZ);
        scene.add(jamb);
        // Outer moulding and plinth block for a richer profile.
        const moulding = new THREE.Mesh(new THREE.BoxGeometry(0.12, entranceHeight + 0.75, frameDepth + 0.12), entranceGold);
        moulding.position.set(side * (entranceWidth / 2 + jambWidth + 0.04), (entranceHeight + 0.75) / 2, entranceZ);
        scene.add(moulding);
        const plinth = new THREE.Mesh(new THREE.BoxGeometry(jambWidth + 0.2, 0.5, frameDepth + 0.16), entranceGold);
        plinth.position.set(jamb.position.x + side * 0.08, 0.25, entranceZ);
        scene.add(plinth);
    });
    const headWidth = entranceWidth + jambWidth * 2 + 0.3;
    const head = new THREE.Mesh(new THREE.BoxGeometry(headWidth, 0.42, frameDepth), entranceGold);
    head.position.set(0, entranceHeight + 0.19, entranceZ);
    scene.add(head);
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(headWidth + 0.35, 0.16, frameDepth + 0.2), entranceGold);
    cornice.position.set(0, entranceHeight + 0.48, entranceZ);
    scene.add(cornice);
    // Gold threshold so the floor seam under the leaves is covered too.
    const threshold = new THREE.Mesh(new THREE.BoxGeometry(entranceWidth + 0.1, 0.04, frameDepth), entranceGold);
    threshold.position.set(0, 0.02, entranceZ);
    scene.add(threshold);
}
createEntranceDoors();

let entranceDoorOpen = 0;
function updateEntranceDoors(delta) {
    const nearDoor = Math.abs(camera.position.x) < 4.5 && Math.abs(camera.position.z - entranceZ) < 6;
    const target = nearDoor ? 1 : 0;
    entranceDoorOpen = THREE.MathUtils.damp(entranceDoorOpen, target, 3.5, delta);
    const angle = entranceDoorOpen * THREE.MathUtils.degToRad(100);
    // Both leaves swing into the lobby (-Z).
    entranceDoors.forEach(hinge => { hinge.rotation.y = -hinge.userData.side * angle; });
}

// Stairs and a clean modern canopy.

for (let step = 0; step < 3; step++) {
    const stair = new THREE.Mesh(new THREE.BoxGeometry(6.4 - step * 0.55, 0.16, 0.75), facadeStone);
    stair.position.set(0, 0.08 + step * 0.16, roomDepth / 2 + 2.15 - step * 0.55);
    stair.receiveShadow = true;
    scene.add(stair);
}

const canopy = new THREE.Mesh(new THREE.BoxGeometry(11.3, 0.5, 2.4), facadeStone);
canopy.position.set(0, 6.65, roomDepth / 2 + 1.1);
canopy.castShadow = true;
scene.add(canopy);

function createMuseumSign() {
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 220;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#7d1717';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 12;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
    ctx.fillStyle = '#ffe7a0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 82px Arial';
    ctx.fillText('BẢO TÀNG HỒ CHÍ MINH', canvas.width / 2, canvas.height / 2 + 4);
    const sign = new THREE.Mesh(
        new THREE.PlaneGeometry(9.5, 1.5),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas) })
    );
    sign.position.set(0, 7.35, roomDepth / 2 + 2.34);
    scene.add(sign);
}
createMuseumSign();

const exteriorLight = new THREE.DirectionalLight(0xfff3d6, 1.3);
exteriorLight.position.set(8, 14, 25);
exteriorLight.castShadow = true;
scene.add(exteriorLight);

const nightLightsGroup = new THREE.Group();
nightLightsGroup.name = 'night-lights';
nightLightsGroup.visible = false;
scene.add(nightLightsGroup);

// Day/night theme changes reuse the existing light rig. The values captured
// here are restored on every toggle, so lights are never duplicated.
let isNightMode = false;
const daySceneBackground = 0xf4e7d4;
const nightSceneBackground = 0x101722;
// Warm horizon haze; also the sky dome's horizon colour so distant fog blends in.
const dayFogColor = 0xf4e7d4;
const nightFogColor = 0x101722;
const lightingPresets = {
    day: {
        ambientScale: 1,
        exteriorScale: 1,
        pointScale: 1,
        spotScale: 1,
        nightLightsVisible: false
    },
    night: {
        ambientScale: 0.62,
        exteriorScale: 0.42,
        pointScale: 0.88,
        spotScale: 0.9,
        nightLightsVisible: true
    }
};

const activeFireworks = [];
const fireworkPalettes = [
    [0xffd166, 0xffffff],
    [0xff4d4d, 0xffffcc],
    [0xff9f43, 0xffffff],
    [0x70c1ff, 0xffffff]
];
const maxActiveFireworks = 5;
let fireworkSpawnTimer = 0;
const fireworkPatternNames = ['sphere', 'ring', 'chrysanthemum', 'willow', 'double'];

const fireworkSpawnZones = [
    { minX: -roomWidth * 0.44, maxX: -roomWidth * 0.28, minZ: entranceZ - 1.5, maxZ: entranceZ + 4 },
    { minX: -roomWidth * 0.14, maxX: roomWidth * 0.14, minZ: entranceZ - 3, maxZ: entranceZ - 1 },
    { minX: roomWidth * 0.28, maxX: roomWidth * 0.44, minZ: entranceZ - 1.5, maxZ: entranceZ + 4 }
];

function disposeFireworkPoints(points) {
    if (!points) return;
    points.parent?.remove(points);
    points.geometry.dispose();
    points.material.dispose();
}

function createExplosionLayer(firework, count, color, size, speedMin, speedMax, lifeMin, lifeMax, pattern, gravity) {
    const positions = new Float32Array(count * 3);
    const velocities = new Array(count);
    const ages = new Float32Array(count);
    const lives = new Float32Array(count);

    for (let index = 0; index < count; index++) {
        // Uniform random 3D direction, with a restrained pattern-specific
        // bias so every burst still has a strong volumetric silhouette.
        const direction = new THREE.Vector3(
            THREE.MathUtils.randFloatSpread(2),
            THREE.MathUtils.randFloatSpread(2),
            THREE.MathUtils.randFloatSpread(2)
        ).normalize();
        if (pattern === 'ring') direction.y *= 0.18;
        else if (pattern === 'chrysanthemum') direction.y *= 0.9;
        else if (pattern === 'willow') direction.y = Math.abs(direction.y) * 0.55 + 0.18;
        direction.normalize();
        velocities[index] = direction.multiplyScalar(THREE.MathUtils.randFloat(speedMin, speedMax));
        lives[index] = THREE.MathUtils.randFloat(lifeMin, lifeMax);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color,
        map: fireworkParticleTexture,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geometry, material);
    points.position.copy(firework.position);
    scene.add(points);
    return { points, positions, velocities, ages, lives, count, gravity };
}

function createFireworkExplosion(firework) {
    const [primaryColor, sparkColor] = firework.palette;
    const pattern = firework.pattern;
    firework.layers = [
        createExplosionLayer(firework, THREE.MathUtils.randInt(85, 115), 0xffffff, 0.18, 9.5, 13.5, 1.5, 2.3, pattern, 1.0),
        createExplosionLayer(firework, THREE.MathUtils.randInt(180, 250), primaryColor, 0.14, 7.5, 11.5, 2.0, 3.1, pattern, pattern === 'willow' ? 0.9 : 1.15),
        createExplosionLayer(firework, THREE.MathUtils.randInt(80, 125), sparkColor, 0.065, 9.5, 14.0, 2.4, 3.8, pattern, pattern === 'willow' ? 0.75 : 1.25)
    ];
    firework.secondaryTimer = pattern === 'double' ? THREE.MathUtils.randFloat(0.15, 0.3) : -1;
    firework.glowAge = 0;
    firework.phase = 'explosion';
    disposeFireworkPoints(firework.rocket);
    disposeFireworkPoints(firework.trail);
    firework.rocket = null;
    firework.trail = null;
}

function createExplosionGlow(firework) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
    const material = new THREE.PointsMaterial({
        map: fireworkParticleTexture,
        color: 0xffffff,
        size: 0.85,
        sizeAttenuation: true,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Points(geometry, material);
    glow.position.copy(firework.position);
    scene.add(glow);
    firework.glow = glow;
}

// Sprite-sheet fireworks replace the legacy point-burst renderer below. The
// sheet dimensions were verified from images/Firework.png: 1536x1280, with
// 256px square frames arranged as 6 columns by 5 rows.
let fireworkSheetReady = false;
let fireworkSheetColumns = 0;
let fireworkSheetRows = 0;
let fireworkSheetFrameCount = 0;
let spriteFireworkSpawnTimer = 0;
const pendingSpriteFireworks = [];
const fireworkTextureLoader = new THREE.TextureLoader();
const fireworkBaseTexture = fireworkTextureLoader.load(
    './images/Firework.png',
    texture => {
        const frameSize = 256;
        const width = texture.image.width;
        const height = texture.image.height;
        if (width % frameSize !== 0 || height % frameSize !== 0) {
            console.warn(`Firework.png dimensions ${width}x${height} are not a 256px frame grid`);
            return;
        }
        fireworkSheetColumns = width / frameSize;
        fireworkSheetRows = height / frameSize;
        fireworkSheetFrameCount = fireworkSheetColumns * fireworkSheetRows;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1 / fireworkSheetColumns, 1 / fireworkSheetRows);
        texture.needsUpdate = true;
        fireworkSheetReady = true;
    },
    undefined,
    error => console.error('Không thể tải images/Firework.png:', error)
);

function setFireworkSpriteFrame(texture, frame) {
    const frameX = frame % fireworkSheetColumns;
    const frameY = Math.floor(frame / fireworkSheetColumns);
    texture.offset.x = frameX / fireworkSheetColumns;
    texture.offset.y = 1 - (frameY + 1) / fireworkSheetRows;
}

function disposeSpriteFirework(firework) {
    if (!firework?.sprite) return;
    firework.sprite.parent?.remove(firework.sprite);
    const material = firework.sprite.material;
    const texture = material.map;
    material.dispose();
    texture?.dispose();
}

function spawnFireworkSprite() {
    if (!isNightMode || !fireworkSheetReady || activeFireworks.length >= maxActiveFireworks) return;
    const zone = fireworkSpawnZones[THREE.MathUtils.randInt(0, fireworkSpawnZones.length - 1)];
    const texture = fireworkBaseTexture.clone();
    texture.needsUpdate = true;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1 / fireworkSheetColumns, 1 / fireworkSheetRows);
    setFireworkSpriteFrame(texture, 0);

    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        rotation: THREE.MathUtils.randFloat(0, Math.PI * 2)
    });
    const sprite = new THREE.Sprite(material);
    const sizeVariant = THREE.MathUtils.randFloat(0.85, 1.25);
    const baseSize = THREE.MathUtils.randFloat(5.4, 7.2) * sizeVariant;
    const frameRate = THREE.MathUtils.randFloat(21, 25);
    sprite.scale.set(baseSize, baseSize, 1);
    sprite.position.set(
        THREE.MathUtils.randFloat(zone.minX, zone.maxX),
        THREE.MathUtils.randFloat(11.5, 16.5),
        THREE.MathUtils.randFloat(zone.minZ, zone.maxZ)
    );
    sprite.renderOrder = 3;
    scene.add(sprite);

    activeFireworks.push({
        sprite,
        age: 0,
        frame: 0,
        frameRate,
        baseSize,
        lifetime: fireworkSheetFrameCount / frameRate,
        position: sprite.position
    });
}

function scheduleSpriteFireworkSalvo() {
    spawnFireworkSprite();
    if (Math.random() >= 0.28) return;
    pendingSpriteFireworks.push({ delay: THREE.MathUtils.randFloat(0.2, 0.5) });
    if (Math.random() < 0.45) pendingSpriteFireworks.push({ delay: THREE.MathUtils.randFloat(0.2, 0.5) });
}

function clearSpriteFireworks() {
    activeFireworks.forEach(disposeSpriteFirework);
    activeFireworks.length = 0;
    pendingSpriteFireworks.length = 0;
}

function updateFireworkSprites(delta) {
    if (!isNightMode) {
        if (activeFireworks.length || pendingSpriteFireworks.length) clearSpriteFireworks();
        return;
    }

    spriteFireworkSpawnTimer -= delta;
    if (spriteFireworkSpawnTimer <= 0) {
        scheduleSpriteFireworkSalvo();
        spriteFireworkSpawnTimer = THREE.MathUtils.randFloat(0.8, 1.8);
    }

    for (let index = pendingSpriteFireworks.length - 1; index >= 0; index--) {
        const pending = pendingSpriteFireworks[index];
        pending.delay -= delta;
        if (pending.delay <= 0) {
            spawnFireworkSprite();
            pendingSpriteFireworks.splice(index, 1);
        }
    }

    for (let index = activeFireworks.length - 1; index >= 0; index--) {
        const firework = activeFireworks[index];
        firework.age += delta;
        const progress = firework.age / firework.lifetime;
        firework.frame = Math.min(
            fireworkSheetFrameCount - 1,
            Math.floor(firework.age * firework.frameRate)
        );
        setFireworkSpriteFrame(firework.sprite.material.map, firework.frame);

        const scaleProgress = Math.min(1, progress / 0.62);
        const easedScale = scaleProgress * scaleProgress * (3 - 2 * scaleProgress);
        const scale = firework.baseSize * (0.2 + easedScale * 0.9);
        firework.sprite.scale.set(scale, scale, 1);
        firework.sprite.material.opacity = progress > 0.72
            ? Math.max(0, 1 - (progress - 0.72) / 0.28)
            : 1;

        if (firework.age >= firework.lifetime) {
            disposeSpriteFirework(firework);
            activeFireworks.splice(index, 1);
        }
    }
}

function spawnFirework() {
    if (!isNightMode || activeFireworks.length >= maxActiveFireworks) return;

    const zone = fireworkSpawnZones[THREE.MathUtils.randInt(0, fireworkSpawnZones.length - 1)];
    const start = new THREE.Vector3(
        THREE.MathUtils.randFloat(zone.minX, zone.maxX),
        0.35,
        THREE.MathUtils.randFloat(zone.minZ, zone.maxZ)
    );
    const targetY = THREE.MathUtils.randFloat(11.5, 16.5);
    const palette = fireworkPalettes[THREE.MathUtils.randInt(0, fireworkPalettes.length - 1)];
    const pattern = fireworkPatternNames[THREE.MathUtils.randInt(0, fireworkPatternNames.length - 1)];
    const trailCount = 16;
    const trailPositions = new Float32Array(trailCount * 3);
    for (let index = 0; index < trailCount; index++) {
        trailPositions[index * 3] = start.x;
        trailPositions[index * 3 + 1] = start.y;
        trailPositions[index * 3 + 2] = start.z;
    }
    const rocketGeometry = new THREE.BufferGeometry();
    rocketGeometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
    const rocketMaterial = new THREE.PointsMaterial({
        map: fireworkParticleTexture,
        color: 0xffffff,
        size: 0.22,
        sizeAttenuation: true,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const rocket = new THREE.Points(rocketGeometry, rocketMaterial);
    rocket.position.copy(start);
    scene.add(rocket);

    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3));
    const trailMaterial = new THREE.PointsMaterial({
        map: fireworkParticleTexture,
        color: palette[0],
        size: 0.09,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const trail = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trail);

    const firework = {
        phase: 'rocket',
        rocket,
        trail,
        trailPositions,
        trailCount,
        points: null,
        position: start,
        velocity: new THREE.Vector3(0, THREE.MathUtils.randFloat(11.5, 14.5), 0),
        targetY,
        age: 0,
        palette,
        pattern,
        layers: [],
        glow: null,
        glowAge: 0,
        secondaryTimer: -1
    };
    activeFireworks.push(firework);
}

function clearFireworks() {
    activeFireworks.forEach(firework => {
        disposeFireworkPoints(firework.rocket);
        disposeFireworkPoints(firework.trail);
        firework.layers?.forEach(layer => disposeFireworkPoints(layer.points));
        disposeFireworkPoints(firework.glow);
    });
    activeFireworks.length = 0;
}

function updateFireworks(delta) {
    if (!isNightMode) {
        if (activeFireworks.length) clearFireworks();
        return;
    }

    fireworkSpawnTimer -= delta;
    if (fireworkSpawnTimer <= 0) {
        if (activeFireworks.length < maxActiveFireworks) spawnFirework();
        fireworkSpawnTimer = THREE.MathUtils.randFloat(1.2, 2.5);
    }

    for (let index = activeFireworks.length - 1; index >= 0; index--) {
        const firework = activeFireworks[index];
        if (firework.phase === 'rocket') {
            firework.age += delta;
            firework.position.addScaledVector(firework.velocity, delta);
            firework.rocket.position.copy(firework.position);
            for (let trailIndex = firework.trailCount - 1; trailIndex > 0; trailIndex--) {
                const targetOffset = trailIndex * 3;
                const sourceOffset = (trailIndex - 1) * 3;
                firework.trailPositions[targetOffset] = firework.trailPositions[sourceOffset];
                firework.trailPositions[targetOffset + 1] = firework.trailPositions[sourceOffset + 1];
                firework.trailPositions[targetOffset + 2] = firework.trailPositions[sourceOffset + 2];
            }
            firework.trailPositions[0] = firework.position.x;
            firework.trailPositions[1] = firework.position.y;
            firework.trailPositions[2] = firework.position.z;
            firework.trail.geometry.attributes.position.needsUpdate = true;
            firework.trail.material.opacity = Math.max(0.08, 0.5 - firework.age * 0.08);
            firework.velocity.y -= 1.0 * delta;
            if (firework.position.y >= firework.targetY) {
                createFireworkExplosion(firework);
                createExplosionGlow(firework);
            }
            continue;
        }

        if (firework.secondaryTimer >= 0) {
            firework.secondaryTimer -= delta;
            if (firework.secondaryTimer <= 0) {
                const secondaryColor = firework.palette[1];
                firework.layers.push(
                    createExplosionLayer(firework, 90, secondaryColor, 0.105, 6.5, 10.0, 1.7, 2.7, 'sphere', 1.15)
                );
                firework.secondaryTimer = -1;
            }
        }

        const updateLayer = layer => {
            let alive = false;
            for (let particle = 0; particle < layer.count; particle++) {
                const age = layer.ages[particle] + delta;
                layer.ages[particle] = age;
                if (age >= layer.lives[particle]) continue;
                alive = true;
                const velocity = layer.velocities[particle];
                velocity.y -= layer.gravity * delta;
                velocity.multiplyScalar(Math.pow(0.985, delta * 60));
                const offset = particle * 3;
                layer.positions[offset] += velocity.x * delta;
                layer.positions[offset + 1] += velocity.y * delta;
                layer.positions[offset + 2] += velocity.z * delta;
            }
            layer.points.geometry.attributes.position.needsUpdate = true;
            const progress = layer.ages.reduce((maxAge, age, particle) => Math.max(maxAge, age / layer.lives[particle]), 0);
            layer.points.material.opacity = Math.max(0, 1 - progress);
            return alive;
        };
        let anyLayerAlive = false;
        firework.layers.forEach(layer => {
            if (updateLayer(layer)) anyLayerAlive = true;
        });
        firework.glowAge += delta;
        if (firework.glow) {
            firework.glow.material.opacity = Math.max(0, 1 - firework.glowAge / 0.2);
            firework.glow.material.size = 0.85 + firework.glowAge * 1.3;
        }
        if (!anyLayerAlive) {
            firework.layers.forEach(layer => disposeFireworkPoints(layer.points));
            disposeFireworkPoints(firework.glow);
            activeFireworks.splice(index, 1);
        }
    }
}

function applyLightingMode() {
    const night = isNightMode;
    const preset = night ? lightingPresets.night : lightingPresets.day;
    if (night && !nightLightsGroup.visible) spriteFireworkSpawnTimer = THREE.MathUtils.randFloat(0.4, 0.9);
    if (!night) {
        spriteFireworkSpawnTimer = 0;
        clearSpriteFireworks();
    }
    scene.background.setHex(night ? nightSceneBackground : daySceneBackground);
    scene.fog.color.setHex(night ? nightFogColor : dayFogColor);
    updateSkyMode(night);
    nightLightsGroup.visible = preset.nightLightsVisible;

    scene.traverse(object => {
        if (!object.isLight) return;
        if (object.userData.dayIntensity === undefined) {
            object.userData.dayIntensity = object.intensity;
            object.userData.dayColor = object.color.getHex();
        }

        let intensityScale = 1;
        if (object === ambientLight) intensityScale = preset.ambientScale;
        else if (object === exteriorLight) intensityScale = preset.exteriorScale;
        else if (object.isPointLight) intensityScale = preset.pointScale;
        else if (object.isSpotLight) intensityScale = preset.spotScale;

        object.intensity = object.userData.dayIntensity * intensityScale;
        if (object === ambientLight) {
            object.color.setHex(night ? 0xb5c7df : object.userData.dayColor);
        } else if (object === exteriorLight) {
            object.color.setHex(night ? 0xb8c9e8 : object.userData.dayColor);
        }
    });

    themeToggleBtn.setAttribute('aria-pressed', String(night));
    themeToggleBtn.title = night ? 'Chuyển sang chế độ ngày' : 'Chuyển sang chế độ đêm';
    themeToggleBtn.innerHTML = `<span class="button-symbol" aria-hidden="true">${night ? '☾' : '☀'}</span><span>${night ? 'Đêm' : 'Ngày'}</span>`;
}

function toggleDayNight() {
    isNightMode = !isNightMode;
    applyLightingMode();
}

themeToggleBtn.addEventListener('click', toggleDayNight);

// --- SKY: sun, clouds, moon and stars ---
// Everything lives in skyGroup, which follows the camera so the sky reads as
// infinitely far away. Sky materials ignore fog; the building occludes them.
const SKY_RADIUS = 450;
const skyGroup = new THREE.Group();
skyGroup.name = 'sky';
scene.add(skyGroup);

const sunDirection = new THREE.Vector3(-0.43, 0.5, -0.75).normalize();
const moonDirection = new THREE.Vector3(0.42, 0.55, -0.72).normalize();

const skyUniforms = {
    topColor: { value: new THREE.Color(0x3f86d8) },
    horizonColor: { value: new THREE.Color(0xf4e7d4) },
    glowColor: { value: new THREE.Color(0xffd79a) },
    glowDirection: { value: sunDirection.clone() },
    glowStrength: { value: 0.75 }
};
const skyDome = new THREE.Mesh(
    new THREE.SphereGeometry(SKY_RADIUS, 48, 24),
    new THREE.ShaderMaterial({
        uniforms: skyUniforms,
        vertexShader: `
            varying vec3 vDirection;
            void main() {
                vDirection = normalize(position);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 horizonColor;
            uniform vec3 glowColor;
            uniform vec3 glowDirection;
            uniform float glowStrength;
            varying vec3 vDirection;
            void main() {
                float h = max(vDirection.y, 0.0);
                vec3 color = mix(horizonColor, topColor, pow(h, 0.55));
                float glow = max(dot(normalize(vDirection), glowDirection), 0.0);
                color += glowColor * (pow(glow, 6.0) * 0.45 + pow(glow, 60.0) * 0.8) * glowStrength;
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        side: THREE.BackSide,
        depthWrite: false
    })
);
skyDome.renderOrder = -10;
skyGroup.add(skyDome);

function createCanvasTexture(width, height, draw) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    draw(canvas.getContext('2d'), width, height);
    return new THREE.CanvasTexture(canvas);
}

function createSkySprite(texture, scale, direction, distance, opacity = 1, blending = THREE.AdditiveBlending) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity,
        blending,
        depthWrite: false,
        fog: false
    }));
    sprite.position.copy(direction).multiplyScalar(distance);
    sprite.scale.set(scale, scale, 1);
    sprite.renderOrder = -5;
    return sprite;
}

// Day: sun disc, warm halo and slowly turning sun rays.
const dayGroup = new THREE.Group();
skyGroup.add(dayGroup);

const sunDiscTexture = createCanvasTexture(256, 256, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,240,1)');
    g.addColorStop(0.35, 'rgba(255,244,200,1)');
    g.addColorStop(0.45, 'rgba(255,214,130,0.85)');
    g.addColorStop(0.7, 'rgba(255,180,80,0.2)');
    g.addColorStop(1, 'rgba(255,160,60,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
});
const sunHaloTexture = createCanvasTexture(256, 256, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,230,170,0.75)');
    g.addColorStop(0.3, 'rgba(255,205,120,0.3)');
    g.addColorStop(1, 'rgba(255,180,90,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
});
const sunRaysTexture = createCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.translate(w / 2, h / 2);
    const rays = 18;
    for (let i = 0; i < rays; i++) {
        const length = (i % 2 === 0 ? 0.5 : 0.36) * w;
        const spread = i % 2 === 0 ? 0.075 : 0.05;
        const g = ctx.createLinearGradient(0, 0, length, 0);
        g.addColorStop(0, 'rgba(255,236,180,0.55)');
        g.addColorStop(1, 'rgba(255,200,110,0)');
        ctx.save();
        ctx.rotate((i / rays) * Math.PI * 2);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(length, -length * spread);
        ctx.lineTo(length, length * spread);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
});
const sunRays = createSkySprite(sunRaysTexture, 230, sunDirection, 400, 0.75);
const sunHalo = createSkySprite(sunHaloTexture, 170, sunDirection, 401, 0.9);
const sunDisc = createSkySprite(sunDiscTexture, 46, sunDirection, 399, 1);
dayGroup.add(sunRays, sunHalo, sunDisc);

// Soft cumulus clouds drawn from overlapping puffs.
function createCloudTexture(seed) {
    let state = seed;
    const random = () => {
        state = (state * 16807) % 2147483647;
        return (state - 1) / 2147483646;
    };
    return createCanvasTexture(512, 256, (ctx, w, h) => {
        for (let i = 0; i < 28; i++) {
            const x = w * (0.18 + random() * 0.64);
            const y = h * (0.45 + (random() - 0.5) * 0.35);
            const r = h * (0.16 + random() * 0.2);
            const g = ctx.createRadialGradient(x, y - r * 0.25, 0, x, y, r);
            g.addColorStop(0, 'rgba(255,255,255,0.95)');
            g.addColorStop(0.6, 'rgba(250,246,240,0.7)');
            g.addColorStop(1, 'rgba(235,228,220,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}
const cloudTextures = [createCloudTexture(11), createCloudTexture(29), createCloudTexture(47)];
const cloudGroup = new THREE.Group();
dayGroup.add(cloudGroup);
for (let i = 0; i < 16; i++) {
    const azimuth = (i / 16) * Math.PI * 2 + Math.random() * 0.3;
    const elevation = THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(9, 32));
    const direction = new THREE.Vector3(
        Math.cos(elevation) * Math.sin(azimuth),
        Math.sin(elevation),
        -Math.cos(elevation) * Math.cos(azimuth)
    );
    const cloud = createSkySprite(cloudTextures[i % 3], 1, direction, THREE.MathUtils.randFloat(300, 380), 0.92, THREE.NormalBlending);
    const width = THREE.MathUtils.randFloat(90, 150);
    cloud.scale.set(width, width * 0.5, 1);
    cloudGroup.add(cloud);
}

// Night: moon with craters and halo, twinkling stars and shooting stars.
const nightSkyGroup = new THREE.Group();
nightSkyGroup.visible = false;
skyGroup.add(nightSkyGroup);

const moonTexture = createCanvasTexture(256, 256, (ctx, w, h) => {
    const r = w * 0.42;
    const g = ctx.createRadialGradient(w * 0.44, h * 0.42, r * 0.1, w / 2, h / 2, r);
    g.addColorStop(0, '#fffdf2');
    g.addColorStop(0.75, '#efe8d2');
    g.addColorStop(1, '#d8d0b8');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(160,150,128,0.35)';
    [[0.38, 0.4, 0.09], [0.6, 0.35, 0.06], [0.55, 0.6, 0.11], [0.35, 0.65, 0.05], [0.68, 0.55, 0.04], [0.47, 0.5, 0.035]]
        .forEach(([x, y, cr]) => {
            ctx.beginPath();
            ctx.arc(w * x, h * y, w * cr, 0, Math.PI * 2);
            ctx.fill();
        });
});
const moonHaloTexture = createCanvasTexture(256, 256, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(220,230,255,0.6)');
    g.addColorStop(0.35, 'rgba(180,200,255,0.18)');
    g.addColorStop(1, 'rgba(150,170,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
});
const moonHalo = createSkySprite(moonHaloTexture, 150, moonDirection, 401, 0.9);
const moon = createSkySprite(moonTexture, 34, moonDirection, 399, 1, THREE.NormalBlending);
nightSkyGroup.add(moonHalo, moon);

const starCount = 2600;
const starPositions = new Float32Array(starCount * 3);
const starColors = new Float32Array(starCount * 3);
const starSizes = new Float32Array(starCount);
const starPhases = new Float32Array(starCount);
const starPalette = [new THREE.Color(0xffffff), new THREE.Color(0xcfe0ff), new THREE.Color(0xfff0c8), new THREE.Color(0xffd6a8)];
// A tilted band concentrates part of the stars into a faint Milky Way.
const bandNormal = new THREE.Vector3(0.35, 0.55, 0.75).normalize();
const starDirection = new THREE.Vector3();
for (let i = 0; i < starCount; i++) {
    do {
        starDirection.set(Math.random() * 2 - 1, Math.random(), Math.random() * 2 - 1);
        if (i % 3 === 0) starDirection.addScaledVector(bandNormal, -starDirection.dot(bandNormal) * 0.88);
        starDirection.normalize();
    } while (starDirection.y < 0.04);
    starDirection.multiplyScalar(SKY_RADIUS - 20);
    starPositions.set([starDirection.x, starDirection.y, starDirection.z], i * 3);
    const color = starPalette[Math.floor(Math.random() * starPalette.length)];
    starColors.set([color.r, color.g, color.b], i * 3);
    starSizes[i] = Math.random() < 0.06 ? THREE.MathUtils.randFloat(3.2, 4.6) : THREE.MathUtils.randFloat(1.2, 2.4);
    starPhases[i] = Math.random() * Math.PI * 2;
}
const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeometry.setAttribute('starColor', new THREE.BufferAttribute(starColors, 3));
starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
starGeometry.setAttribute('phase', new THREE.BufferAttribute(starPhases, 1));
const starMaterial = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, pixelRatio: { value: renderer.getPixelRatio() } },
    vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        attribute vec3 starColor;
        attribute float size;
        attribute float phase;
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
            vColor = starColor;
            vTwinkle = 0.55 + 0.45 * sin(time * (1.5 + fract(phase) * 2.5) + phase * 9.0);
            gl_PointSize = size * pixelRatio * (0.8 + 0.5 * vTwinkle);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float core = smoothstep(0.5, 0.0, d);
            float cross = max(0.0, 1.0 - abs(uv.x) * 12.0) * max(0.0, 1.0 - abs(uv.y) * 2.0)
                        + max(0.0, 1.0 - abs(uv.y) * 12.0) * max(0.0, 1.0 - abs(uv.x) * 2.0);
            gl_FragColor = vec4(vColor, (core * core + cross * 0.35) * vTwinkle);
        }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});
const stars = new THREE.Points(starGeometry, starMaterial);
stars.renderOrder = -6;
stars.frustumCulled = false;
nightSkyGroup.add(stars);

const shootingStarGeometry = new THREE.BufferGeometry();
shootingStarGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
shootingStarGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array([1, 1, 1, 0, 0, 0]), 3));
const shootingStar = new THREE.Line(shootingStarGeometry, new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: false
}));
shootingStar.frustumCulled = false;
shootingStar.visible = false;
nightSkyGroup.add(shootingStar);
const shootingStarState = { timer: 2, age: 0, duration: 0.9, start: new THREE.Vector3(), velocity: new THREE.Vector3() };

function updateSky(time, delta) {
    skyGroup.position.copy(camera.position);
    if (!isNightMode) {
        sunRays.material.rotation += delta * 0.04;
        const pulse = 1 + Math.sin(time * 1.3) * 0.04;
        sunRays.scale.set(230 * pulse, 230 * pulse, 1);
        cloudGroup.rotation.y += delta * 0.004;
        return;
    }
    starMaterial.uniforms.time.value = time;
    const state = shootingStarState;
    if (!shootingStar.visible) {
        state.timer -= delta;
        if (state.timer <= 0) {
            const azimuth = Math.random() * Math.PI * 2;
            const elevation = THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(35, 65));
            state.start.set(Math.cos(elevation) * Math.sin(azimuth), Math.sin(elevation), -Math.cos(elevation) * Math.cos(azimuth)).multiplyScalar(SKY_RADIUS - 40);
            state.velocity.set(Math.random() - 0.5, -0.35, Math.random() - 0.5).normalize().multiplyScalar(220);
            state.age = 0;
            shootingStar.visible = true;
        }
        return;
    }
    state.age += delta;
    const progress = state.age / state.duration;
    if (progress >= 1) {
        shootingStar.visible = false;
        state.timer = THREE.MathUtils.randFloat(3, 7);
        return;
    }
    const head = state.start.clone().addScaledVector(state.velocity, state.age);
    const tail = head.clone().addScaledVector(state.velocity, -Math.min(state.age, 0.25));
    const positions = shootingStarGeometry.attributes.position;
    positions.setXYZ(0, head.x, head.y, head.z);
    positions.setXYZ(1, tail.x, tail.y, tail.z);
    positions.needsUpdate = true;
    const fade = Math.sin(progress * Math.PI);
    shootingStarGeometry.attributes.color.setXYZ(0, fade, fade, fade * 0.9);
    shootingStarGeometry.attributes.color.needsUpdate = true;
}

function updateSkyMode(night) {
    dayGroup.visible = !night;
    nightSkyGroup.visible = night;
    shootingStar.visible = false;
    skyUniforms.topColor.value.setHex(night ? 0x040817 : 0x3f86d8);
    skyUniforms.horizonColor.value.setHex(night ? nightFogColor : dayFogColor);
    skyUniforms.glowColor.value.setHex(night ? 0x8fa6d8 : 0xffd79a);
    skyUniforms.glowDirection.value.copy(night ? moonDirection : sunDirection);
    skyUniforms.glowStrength.value = night ? 0.35 : 0.75;
}

// --- WARM INCANDESCENT ATMOSPHERE ---
// Glow, beams and sparkles are additive meshes rather than real lights, so the
// warm look does not add to the WebGL light budget.
const GLOW_COLOR = 0xffc27a;

function createRadialGlowTexture(stops) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
}

const glowTexture = createRadialGlowTexture([
    [0, 'rgba(255,236,190,1)'],
    [0.18, 'rgba(255,196,110,0.75)'],
    [0.5, 'rgba(255,150,60,0.22)'],
    [1, 'rgba(255,120,40,0)']
]);
const poolTexture = createRadialGlowTexture([
    [0, 'rgba(255,214,150,0.9)'],
    [0.45, 'rgba(255,170,80,0.35)'],
    [1, 'rgba(255,140,50,0)']
]);

// Glowing filament-coloured lamp surface used by every ceiling fixture.
const incandescentLampMaterial = new THREE.MeshBasicMaterial({ color: 0xffd08a });

function addCeilingGlow(x, y, z, size = 3.2) {
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture,
        color: GLOW_COLOR,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    }));
    halo.position.set(x, y - 0.12, z);
    halo.scale.set(size, size, 1);
    halo.renderOrder = 2;
    scene.add(halo);
    return halo;
}

function createBeamMaterial(length) {
    return new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(0xffc57d) },
            opacity: { value: 0.16 },
            beamLength: { value: length }
        },
        vertexShader: `
            uniform float beamLength;
            varying float vT;
            varying vec3 vNormalView;
            varying vec3 vViewDir;
            void main() {
                vT = clamp(-position.y / beamLength, 0.0, 1.0);
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vNormalView = normalize(normalMatrix * normal);
                vViewDir = normalize(-mvPosition.xyz);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            uniform float opacity;
            varying float vT;
            varying vec3 vNormalView;
            varying vec3 vViewDir;
            void main() {
                float edge = pow(abs(dot(normalize(vNormalView), normalize(vViewDir))), 1.6);
                float along = smoothstep(0.0, 0.06, vT) * pow(1.0 - vT, 1.3);
                gl_FragColor = vec4(color, opacity * edge * along);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });
}

const spotFixtureMaterial = new THREE.MeshStandardMaterial({ color: 0x2a201b, roughness: 0.5, metalness: 0.6 });

// Visible spotlight: ceiling can, soft light cone and a warm pool where it lands.
function addSpotlightEffect(target, { from = null, pool = 'floor', poolSize = 2.2, poolNormal = null } = {}) {
    const source = from || new THREE.Vector3(target.x, wallHeight - 0.18, target.z);
    const direction = new THREE.Vector3().subVectors(target, source);
    const length = direction.length();
    direction.normalize();
    const down = new THREE.Vector3(0, -1, 0);

    const fixture = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.16, 0.3, 16), spotFixtureMaterial);
    fixture.position.copy(source);
    fixture.quaternion.setFromUnitVectors(down, direction);
    scene.add(fixture);

    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), incandescentLampMaterial);
    lens.position.copy(source).addScaledVector(direction, 0.16);
    lens.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
    scene.add(lens);
    addCeilingGlow(lens.position.x, lens.position.y + 0.12, lens.position.z, 0.9);

    const beamGeometry = new THREE.CylinderGeometry(0.1, poolSize * 0.5, length, 28, 1, true);
    beamGeometry.translate(0, -length / 2, 0);
    const beam = new THREE.Mesh(beamGeometry, createBeamMaterial(length));
    beam.position.copy(source);
    beam.quaternion.setFromUnitVectors(down, direction);
    beam.renderOrder = 3;
    scene.add(beam);

    const poolMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(poolSize, poolSize * (pool === 'wall' ? 0.85 : 1)),
        new THREE.MeshBasicMaterial({
            map: poolTexture,
            color: 0xffb877,
            transparent: true,
            opacity: pool === 'wall' ? 0.5 : 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -2
        })
    );
    if (pool === 'wall' && poolNormal) {
        poolMesh.position.copy(target);
        poolMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), poolNormal);
    } else {
        poolMesh.rotation.x = -Math.PI / 2;
        poolMesh.position.set(target.x, 0.06, target.z);
    }
    poolMesh.renderOrder = 1;
    scene.add(poolMesh);
}

// Floating warm sparkles drifting through the whole interior.
const sparkleCount = 650;
const sparklePositions = new Float32Array(sparkleCount * 3);
const sparklePhases = new Float32Array(sparkleCount);
const sparkleSizes = new Float32Array(sparkleCount);
for (let i = 0; i < sparkleCount; i++) {
    sparklePositions[i * 3] = THREE.MathUtils.randFloat(-roomWidth / 2 + 0.5, roomWidth / 2 - 0.5);
    sparklePositions[i * 3 + 1] = THREE.MathUtils.randFloat(0.6, wallHeight - 0.6);
    sparklePositions[i * 3 + 2] = THREE.MathUtils.randFloat(-roomDepth / 2 + 0.5, roomDepth / 2 - 0.5);
    sparklePhases[i] = Math.random() * Math.PI * 2;
    sparkleSizes[i] = THREE.MathUtils.randFloat(0.6, 1.6);
}
const sparkleGeometry = new THREE.BufferGeometry();
sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
sparkleGeometry.setAttribute('phase', new THREE.BufferAttribute(sparklePhases, 1));
sparkleGeometry.setAttribute('size', new THREE.BufferAttribute(sparkleSizes, 1));
const sparkleMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() }
    },
    vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        attribute float phase;
        attribute float size;
        varying float vTwinkle;
        void main() {
            vec3 p = position;
            p.y += mod(time * 0.08 + phase * 0.6, 1.2) - 0.6;
            p.x += sin(time * 0.35 + phase * 3.0) * 0.25;
            p.z += cos(time * 0.3 + phase * 2.0) * 0.25;
            vTwinkle = pow(0.5 + 0.5 * sin(time * 2.2 + phase * 7.0), 3.0);
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = size * (4.0 + 6.0 * vTwinkle) * pixelRatio * (6.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        varying float vTwinkle;
        void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float core = smoothstep(0.5, 0.0, d);
            float star = max(0.0, 1.0 - abs(uv.x) * 14.0) * max(0.0, 1.0 - abs(uv.y) * 2.2)
                       + max(0.0, 1.0 - abs(uv.y) * 14.0) * max(0.0, 1.0 - abs(uv.x) * 2.2);
            float alpha = (core * core + star * 0.6) * (0.25 + 0.75 * vTwinkle);
            vec3 color = mix(vec3(1.0, 0.62, 0.25), vec3(1.0, 0.9, 0.65), vTwinkle);
            gl_FragColor = vec4(color, alpha);
        }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});
const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
sparkles.name = 'interior-sparkles';
sparkles.frustumCulled = false;
scene.add(sparkles);

// One spotlight per exhibit spot (models sharing a plinth share a light).
const litExhibitSpots = new Set();
function addExhibitSpotlight(position) {
    const key = `${position.x.toFixed(2)}:${position.z.toFixed(2)}`;
    if (litExhibitSpots.has(key)) return;
    litExhibitSpots.add(key);
    addSpotlightEffect(new THREE.Vector3(position.x, 0, position.z), { poolSize: 2.0 });
}

// --- SIX MUSEUM ROOMS ---
const museumLayout = {
    lobby: { minX: -7.2, maxX: 7.2, minZ: 10.5, maxZ: roomDepth / 2 },
    corridor: { minX: -3.4, maxX: 3.4, minZ: -roomDepth / 2, maxZ: 11.8 },
    transition: { minX: -7.2, maxX: 7.2, minZ: 9.5, maxZ: 13.5 }
};
const corridorHalfWidth = Math.abs(museumLayout.corridor.maxX);
const partitionMaterial = new THREE.MeshStandardMaterial({ color: 0xf0dfc4, roughness: 0.95 });

function addPartition(width, height, depth, x, z) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), partitionMaterial);
    wall.position.set(x, height / 2, z);
    wall.castShadow = true;
    wall.receiveShadow = true;
    scene.add(wall);
}

// Room partitions are generated from museumRooms after its bounds are calculated.

const museumRooms = [
    { id: 'room1', number: '01', name: 'Hành trình tìm đường cứu nước và hình thành tư tưởng', shortName: 'Hành trình cứu nước', side: -1, centerX: -9.6, centerZ: 6.8, width: 12.4, depth: 8.4, accent: 0x875b3b, artifacts: ['painting-1', 'painting-2'], bench: { x: -8.4, z: 9.0, rotation: Math.PI / 2 } },
    { id: 'room2', number: '02', name: 'Độc lập dân tộc và chủ nghĩa xã hội', shortName: 'Độc lập dân tộc', side: 1, centerX: 9.6, centerZ: 1.4, width: 12.4, depth: 10.0, accent: 0x315f78, artifacts: ['painting-3', 'painting-4', 'painting-9', 'painting-10'], bench: { x: 8.2, z: 3.8, rotation: Math.PI / 2 } },
    { id: 'room3', number: '03', name: 'Đảng Cộng sản và Nhà nước của nhân dân', shortName: 'Đảng và Nhà nước', side: -1, centerX: -9.6, centerZ: -3.8, width: 12.4, depth: 11.0, accent: 0x5b6f3c, artifacts: ['painting-5', 'painting-11', 'painting-12', 'room3-ballot-box', 'room3-typewriter', 'room3-old-book'], bench: { x: -8.1, z: -1.0, rotation: Math.PI / 2 } },
    { id: 'room4', number: '04', name: 'Đại đoàn kết dân tộc và đoàn kết quốc tế', shortName: 'Đại đoàn kết', side: 1, centerX: 9.6, centerZ: -8.0, width: 12.4, depth: 8.0, accent: 0x7a3034, artifacts: ['painting-6'], bench: { x: 8.0, z: -6.0, rotation: Math.PI / 2 } },
    { id: 'room5', number: '05', name: 'Văn hóa, đạo đức và con người', shortName: 'Văn hóa và con người', side: -1, centerX: -9.6, centerZ: -16.0, width: 12.4, depth: 10.0, accent: 0xa06d18, artifacts: ['painting-7'], bench: { x: -8.0, z: -13.2, rotation: Math.PI / 2 } },
    { id: 'room6', number: '06', name: 'Không gian tư liệu và phim · Hồ Chí Minh – Cuộc đời và di sản tư tưởng', shortName: 'Không gian tư liệu và phim', side: 1, centerX: 9.6, centerZ: -16.5, width: 12.4, depth: 9.0, accent: 0x4a302b, artifacts: ['painting-8'], screeningRoom: true }
];

// Room 04 stays intentionally open: no bench in the sightline to the statement wall.
museumRooms.find(room => room.id === 'room4').bench = null;
museumRooms.find(room => room.id === 'room4').artifacts = [
    'room4-national-unity-1', 'room4-national-unity-2', 'room4-national-unity-people',
    'room4-international-solidarity-2', 'painting-6', 'room4-dove', 'room4-letter'
];
// Room 05 is intentionally kept open around its living-culture vignette.
museumRooms.find(room => room.id === 'room5').bench = null;
museumRooms.find(room => room.id === 'room5').artifacts = [
    'painting-7', 'room5-humanism-2', 'room5-chair', 'room5-tea-cup', 'room5-ha-noi-specialities', 'room5-rubber-sandals'
];

museumRooms.forEach(room => {
    room.bounds = {
        minX: room.centerX - room.width / 2,
        maxX: room.centerX + room.width / 2,
        minZ: room.centerZ - room.depth / 2,
        maxZ: room.centerZ + room.depth / 2
    };
});

museumRooms.forEach(room => {
    const doorWidth = 3.2;
    const wallX = room.side * corridorHalfWidth;
    const segmentDepth = (room.depth - doorWidth) / 2;
    [-1, 1].forEach(direction => {
        addPartition(0.18, wallHeight, segmentDepth, wallX, room.centerZ + direction * (doorWidth / 2 + segmentDepth / 2));
    });
    addPartition(room.width, wallHeight, 0.18, room.centerX, room.bounds.minZ);
    addPartition(room.width, wallHeight, 0.18, room.centerX, room.bounds.maxZ);
});

// Warm room floors, feature walls and soft ceiling panels.
museumRooms.forEach(room => {
    const roomCenterX = room.centerX;
    const roomFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(room.width - 0.2, room.depth - 0.2),
        new THREE.MeshStandardMaterial({ color: room.screeningRoom ? 0x292b31 : 0xc9c2b5, roughness: 0.72 })
    );
    roomFloor.rotation.x = -Math.PI / 2;
    roomFloor.position.set(roomCenterX, 0.025, room.centerZ);
    scene.add(roomFloor);

    const featureWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 4.8, room.depth - 0.8),
        new THREE.MeshStandardMaterial({ color: room.id === 'room4' ? 0x34251f : (room.id === 'room5' ? 0x4b3025 : (room.id === 'room2' || room.id === 'room3' ? 0x6f171b : room.accent)), roughness: 0.84 })
    );
    featureWall.position.set(room.side < 0 ? room.bounds.minX + 0.08 : room.bounds.maxX - 0.08, 3.15, room.centerZ);
    scene.add(featureWall);

    const lightPanel = new THREE.Mesh(
        new THREE.BoxGeometry(4.8, 0.06, 2.4),
        incandescentLampMaterial
    );
    lightPanel.position.set(roomCenterX, wallHeight - 0.07, room.centerZ);
    scene.add(lightPanel);
    addCeilingGlow(roomCenterX, wallHeight - 0.07, room.centerZ, room.screeningRoom ? 3.2 : 5.6);

    const roomLight = new THREE.PointLight(room.screeningRoom ? 0xffa45a : 0xffbf78, room.screeningRoom ? 0.38 : 1.05, 11);
    roomLight.position.set(roomCenterX, 6.7, room.centerZ);
    scene.add(roomLight);
});

// Refined central corridor: pale runner, brass edging and ceiling lights.
const corridorRunner = new THREE.Mesh(
    new THREE.PlaneGeometry(corridorHalfWidth * 2 - 0.5, roomDepth - 1),
    new THREE.MeshStandardMaterial({ color: 0x731a1d, roughness: 0.82 })
);
corridorRunner.rotation.x = -Math.PI / 2;
corridorRunner.position.y = 0.035;
scene.add(corridorRunner);

[-corridorHalfWidth + 0.13, corridorHalfWidth - 0.13].forEach(x => {
    const edge = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.025, roomDepth - 1),
        new THREE.MeshBasicMaterial({ color: 0xc8a84e })
    );
    edge.position.set(x, 0.055, 0);
    scene.add(edge);
});

[-18, -12, -6, 0, 6, 12, 17].forEach(z => {
    const panel = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.05, 1.05),
        incandescentLampMaterial
    );
    panel.position.set(0, wallHeight - 0.06, z);
    scene.add(panel);
    addCeilingGlow(0, wallHeight - 0.06, z, 3.4);
});

// Main lobby creates a deliberate pause between the entrance and gallery corridor.
const lobbyFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(museumLayout.lobby.maxX - museumLayout.lobby.minX, museumLayout.lobby.maxZ - museumLayout.lobby.minZ),
    new THREE.MeshStandardMaterial({ color: 0xbeb5a6, roughness: 0.68 })
);
lobbyFloor.rotation.x = -Math.PI / 2;
lobbyFloor.position.set(0, 0.045, (museumLayout.lobby.minZ + museumLayout.lobby.maxZ) / 2);
scene.add(lobbyFloor);

const lobbyLight = new THREE.PointLight(0xffc27e, 1.2, 15);
lobbyLight.position.set(0, 6.6, 15.8);
scene.add(lobbyLight);

function createLobbyDirectory() {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 620;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#201b19'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#c7a448'; ctx.lineWidth = 12; ctx.strokeRect(8, 8, 884, 604);
    ctx.fillStyle = '#f6e7bd'; ctx.textAlign = 'center';
    ctx.font = 'bold 48px Arial'; ctx.fillText('HÀNH TRÌNH TƯ TƯỞNG', 450, 78);
    ctx.font = 'bold 58px Arial'; ctx.fillText('HỒ CHÍ MINH', 450, 145);
    const leftX = 78;
    const rightX = 492;
    const rowY = [255, 370, 485];
    const itemFontSize = 27;
    const lineHeight = 34;
    const columnWidth = 330;
    ctx.font = `bold ${itemFontSize}px Arial`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    function drawRoomItem(room, x, y, color) {
        const prefix = `${room.number}  `;
        const label = room.shortName.toUpperCase();
        const words = label.split(' ');
        const lines = [];
        let line = '';
        words.forEach(word => {
            const candidate = `${line}${word} `;
            if (ctx.measureText(`${prefix}${candidate}`).width > columnWidth && line) {
                lines.push(line.trimEnd());
                line = `${word} `;
            } else {
                line = candidate;
            }
        });
        lines.push(line.trimEnd());
        ctx.fillStyle = color;
        const continuationX = x + ctx.measureText(prefix).width;
        lines.forEach((text, lineIndex) => {
            ctx.fillText(lineIndex === 0 ? `${prefix}${text}` : text, lineIndex === 0 ? x : continuationX, y + lineIndex * lineHeight);
        });
    }

    museumRooms.forEach((room, index) => {
        const x = index % 2 === 0 ? leftX : rightX;
        const y = rowY[Math.floor(index / 2)];
        drawRoomItem(room, x, y, index === 5 ? '#9fb5dc' : '#f4d98f');
    });
    const directory = new THREE.Mesh(
        new THREE.PlaneGeometry(6.4, 4.4),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas) })
    );
    directory.position.set(museumLayout.lobby.minX + 0.08, 3.3, 15.8);
    directory.rotation.y = Math.PI / 2;
    scene.add(directory);
}
createLobbyDirectory();

// Minimal welcome/hero area on the otherwise empty right side of the lobby.
// It is decorative only: no artifact registration, triggers, or new lights.
function createLobbyHeroArea() {
    const heroX = museumLayout.lobby.maxX - 0.1;
    const heroZ = 15.8;
    const panelWidth = 7.8;
    const panelHeight = 5.2;
    const heroMaterial = new THREE.MeshStandardMaterial({ color: 0x33251f, roughness: 0.86 });
    const heroBacking = new THREE.Mesh(new THREE.BoxGeometry(0.06, panelHeight, panelWidth), heroMaterial);
    heroBacking.name = 'lobby-hero-wall-backing';
    heroBacking.position.set(heroX, 3.35, heroZ);
    scene.add(heroBacking);

    const createHeroCanvas = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 800;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#2a201c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#c7a448';
        ctx.lineWidth = 5;
        ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
        ctx.fillStyle = '#d8b765';
        ctx.textAlign = 'center';
        ctx.font = '700 30px Arial, sans-serif';
        ctx.fillText('WELCOME · BẢO TÀNG HỒ CHÍ MINH', canvas.width / 2, 96);
        ctx.fillStyle = '#fff4d8';
        ctx.font = '600 72px Georgia, serif';
        ctx.fillText('HỒ CHÍ MINH', canvas.width / 2, 245);
        ctx.fillStyle = '#e7d39a';
        ctx.font = '600 30px Arial, sans-serif';
        ctx.fillText('TƯ TƯỞNG · ĐẠO ĐỨC · PHONG CÁCH', canvas.width / 2, 320);
        ctx.strokeStyle = 'rgba(199,164,72,.65)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(180, 365);
        ctx.lineTo(820, 365);
        ctx.stroke();
        ctx.fillStyle = '#fff4d8';
        ctx.font = 'italic 34px Georgia, serif';
        ctx.fillText('“Không có gì quý hơn độc lập, tự do”', canvas.width / 2, 470);
        ctx.fillStyle = '#d8b765';
        ctx.font = '700 24px Arial, sans-serif';
        ctx.fillText('MỘT DI SẢN VẪN SOI ĐƯỜNG', canvas.width / 2, 650);
        return canvas;
    };

    const heroText = new THREE.Mesh(
        new THREE.PlaneGeometry(3.65, 3.7),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(createHeroCanvas()) })
    );
    heroText.name = 'lobby-hero-text-panel';
    heroText.position.set(heroX - 0.045, 3.45, heroZ - 1.75);
    heroText.rotation.y = -Math.PI / 2;
    scene.add(heroText);

    // Keep the portrait in a dedicated vertical slot on the right. The image
    // is contained inside this frame after its real aspect ratio is known.
    const portraitWidth = 2.85;
    const portraitHeight = 3.45;
    const portraitFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x4a2a18, roughness: 0.68, metalness: 0.08 });
    const portraitFrameX = heroX - 0.055;
    const portraitFrameZ = heroZ + 1.95;
    const frameDepth = 0.035;
    const frameRail = (name, width, height, z, y) => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, height, width), portraitFrameMaterial);
        rail.name = name;
        rail.position.set(portraitFrameX, y, z);
        scene.add(rail);
    };
    // Four open rails replace the old solid box: no opaque panel can sit over
    // the portrait while the dark wood outline remains visible.
    frameRail('lobby-hero-portrait-frame-left', 0.10, portraitHeight + 0.18, portraitFrameZ - (portraitWidth + 0.18) / 2, 3.5);
    frameRail('lobby-hero-portrait-frame-right', 0.10, portraitHeight + 0.18, portraitFrameZ + (portraitWidth + 0.18) / 2, 3.5);
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, 0.10, portraitWidth + 0.18), portraitFrameMaterial);
    frameTop.name = 'lobby-hero-portrait-frame-top';
    frameTop.position.set(portraitFrameX, 3.5 + (portraitHeight + 0.18) / 2, portraitFrameZ);
    scene.add(frameTop);
    const frameBottom = frameTop.clone();
    frameBottom.name = 'lobby-hero-portrait-frame-bottom';
    frameBottom.position.y = 3.5 - (portraitHeight + 0.18) / 2;
    scene.add(frameBottom);

    const portraitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const portrait = new THREE.Mesh(
        new THREE.PlaneGeometry(portraitWidth, portraitHeight),
        portraitMaterial
    );
    portrait.name = 'lobby-hero-portrait';
    portrait.position.set(heroX - 0.09, 3.5, heroZ + 1.95);
    portrait.rotation.y = -Math.PI / 2;
    scene.add(portrait);

    const portraitTexture = new THREE.TextureLoader().load('./images/exhibits/room6-ho-chi-minh-portrait-1950s.jpg', texture => {
        const imageRatio = texture.image.width / texture.image.height;
        const frameRatio = portraitWidth / portraitHeight;
        // Contain: never crop the head or shoulders to fill the frame.
        if (imageRatio > frameRatio) portrait.scale.y = frameRatio / imageRatio;
        else portrait.scale.x = imageRatio / frameRatio;
    });
    portraitTexture.colorSpace = THREE.SRGBColorSpace;
    portraitMaterial.map = portraitTexture;
    portraitMaterial.needsUpdate = true;

    const pedestal = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 0.22, 3.5),
        new THREE.MeshStandardMaterial({ color: 0x5a3928, roughness: 0.78 })
    );
    pedestal.name = 'lobby-hero-low-pedestal';
    pedestal.position.set(heroX - 0.62, 0.11, heroZ);
    scene.add(pedestal);

    const lotusCanvas = document.createElement('canvas');
    lotusCanvas.width = 700;
    lotusCanvas.height = 180;
    const lotusCtx = lotusCanvas.getContext('2d');
    lotusCtx.strokeStyle = '#d8b765';
    lotusCtx.lineWidth = 5;
    lotusCtx.lineCap = 'round';
    lotusCtx.beginPath();
    lotusCtx.moveTo(150, 126); lotusCtx.quadraticCurveTo(350, 164, 550, 126);
    lotusCtx.moveTo(350, 142); lotusCtx.quadraticCurveTo(270, 75, 235, 120);
    lotusCtx.moveTo(350, 142); lotusCtx.quadraticCurveTo(430, 75, 465, 120);
    lotusCtx.moveTo(350, 142); lotusCtx.quadraticCurveTo(350, 55, 350, 28);
    lotusCtx.stroke();
    const lotus = new THREE.Mesh(
        new THREE.PlaneGeometry(2.7, 0.7),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(lotusCanvas), transparent: true })
    );
    lotus.name = 'lobby-hero-lotus-motif';
    lotus.rotation.x = -Math.PI / 2;
    lotus.position.set(heroX - 0.65, 0.235, heroZ);
    scene.add(lotus);
}
createLobbyHeroArea();

function createWayfindingSign(leftLabel, rightLabel, z) {
    const canvas = document.createElement('canvas');
    canvas.width = 900; canvas.height = 150;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(28,24,22,0.96)'; ctx.fillRect(0, 0, 900, 150);
    ctx.strokeStyle = '#c7a448'; ctx.lineWidth = 8; ctx.strokeRect(5, 5, 890, 140);
    ctx.fillStyle = '#f6e7bd'; ctx.font = 'bold 38px Arial'; ctx.textBaseline = 'middle';
    ctx.textAlign = 'left'; ctx.fillText(`← ${leftLabel}`, 55, 76);
    ctx.textAlign = 'right'; ctx.fillText(`${rightLabel} →`, 845, 76);
    const sign = new THREE.Mesh(
        new THREE.PlaneGeometry(4.8, 0.8),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), side: THREE.DoubleSide })
    );
    sign.position.set(0, 5.3, z);
    scene.add(sign);
}
createWayfindingSign('PHÒNG 01', 'PHÒNG 02', 5.0);
createWayfindingSign('PHÒNG 03', 'PHÒNG 04', -5.2);
createWayfindingSign('PHÒNG 05', 'PHIM 06', -13.5);

function createJourneyEndFeature() {
    const canvas = document.createElement('canvas');
    canvas.width = 1000; canvas.height = 360;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#6f171b'; ctx.fillRect(0, 0, 1000, 360);
    ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 12; ctx.strokeRect(8, 8, 984, 344);
    ctx.fillStyle = '#f8e6ad'; ctx.textAlign = 'center';
    ctx.font = 'bold 38px Arial'; ctx.fillText('KHÔNG GIAN TỔNG KẾT', 500, 120);
    ctx.font = 'bold 62px Arial'; ctx.fillText('KẾT THÚC HÀNH TRÌNH', 500, 220);
    const feature = new THREE.Mesh(
        new THREE.PlaneGeometry(7.2, 2.6),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas) })
    );
    feature.position.set(0, 3.6, -roomDepth / 2 + 0.08);
    scene.add(feature);
    const endLight = new THREE.SpotLight(0xffd88b, 1.2, 12, Math.PI / 5, 0.6);
    endLight.position.set(0, 7, -16);
    endLight.target = feature;
    scene.add(endLight);
}
createJourneyEndFeature();

function createRoomSign(room) {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 190;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#7d1717';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 10;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
    ctx.fillStyle = '#ffe9a8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 30px Arial';
    ctx.fillText(`PHÒNG ${room.number}`, canvas.width / 2, 42);
    ctx.font = 'bold 34px Arial';
    const words = room.name.toUpperCase().split(' ');
    const lines = [];
    let line = '';
    words.forEach(word => {
        if (ctx.measureText(`${line} ${word}`).width > 820 && line) { lines.push(line); line = word; }
        else line = `${line} ${word}`.trim();
    });
    lines.push(line);
    lines.slice(0, 3).forEach((text, index) => ctx.fillText(text, canvas.width / 2, 88 + index * 38));
    const sign = new THREE.Mesh(
        new THREE.PlaneGeometry(4.3, 0.92),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas) })
    );
    sign.position.set(room.side * (corridorHalfWidth - 0.13), 4.75, room.centerZ);
    sign.rotation.y = room.side < 0 ? Math.PI / 2 : -Math.PI / 2;
    scene.add(sign);

    // Open doorway: only the frame remains, visitors walk straight through.
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.18, wallHeight - 4.14, 3.2), partitionMaterial);
    lintel.position.set(room.side * corridorHalfWidth, (wallHeight + 4.14) / 2, room.centerZ);
    scene.add(lintel);

    const trimMaterial = new THREE.MeshStandardMaterial({ color: 0xb89543, roughness: 0.35, metalness: 0.45 });
    [-1.72, 1.72].forEach(zOffset => {
        const trim = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.15, 0.12), trimMaterial);
        trim.position.set(room.side * (corridorHalfWidth - 0.02), 2.05, room.centerZ + zOffset);
        scene.add(trim);
    });
    const topTrim = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 3.55), trimMaterial);
    topTrim.position.set(room.side * (corridorHalfWidth - 0.02), 4.08, room.centerZ);
    scene.add(topTrim);
}
museumRooms.forEach(createRoomSign);

// Long upholstered benches in every gallery, placed away from the doors.
const galleryBenchMaterial = new THREE.MeshStandardMaterial({ color: 0x5b2528, roughness: 0.8 });
const galleryBenchLegMaterial = new THREE.MeshStandardMaterial({ color: 0xb89543, roughness: 0.38, metalness: 0.5 });
museumRooms.forEach(room => {
    if (!room.bench || room.id === 'room1' || room.id === 'room2' || room.id === 'room3') return;
    const bench = new THREE.Group();
    const seat = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.28, 1.05), galleryBenchMaterial);
    seat.position.y = 0.72;
    bench.add(seat);
    [-1.45, 1.45].forEach(x => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.65, 0.8), galleryBenchLegMaterial);
        leg.position.set(x, 0.34, 0);
        bench.add(leg);
    });
    bench.position.set(room.bench.x, 0, room.bench.z);
    bench.rotation.y = room.bench.rotation;
    scene.add(bench);
});

// Lightweight thematic 3D exhibits for the five galleries.
const exhibitWood = new THREE.MeshStandardMaterial({ color: 0x70452c, roughness: 0.82 });
const exhibitMetal = new THREE.MeshStandardMaterial({ color: 0x72787d, roughness: 0.42, metalness: 0.58 });
const exhibitPaper = new THREE.MeshStandardMaterial({ color: 0xe8dcc0, roughness: 0.95 });
const exhibitRed = new THREE.MeshStandardMaterial({ color: 0xb51f28, roughness: 0.78 });
const exhibitGold = new THREE.MeshStandardMaterial({ color: 0xe2c04f, roughness: 0.38, metalness: 0.35 });

function exhibitPart(group, geometry, material, x, y, z, rx = 0, ry = 0, rz = 0) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    group.add(mesh);
    return mesh;
}

function createThemeLabel(text, x, z, color = '#f6e7bd', width = 5.6) {
    // Room 1 uses a dedicated centered title on its end wall.
    if (x < -15) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1000; canvas.height = 180;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(22,25,29,0.94)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#c7a448'; ctx.lineWidth = 8; ctx.strokeRect(5, 5, 990, 170);
    ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `bold ${text.length > 28 ? 38 : 52}px Arial`; ctx.fillText(text.toUpperCase(), 500, 92);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(width, width * 0.18), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas) }));
    // Sit clearly in front of the feature wall (its face is 0.14 from the room
    // bound); a label inside the wall z-fights and flickers as the camera moves.
    label.position.set(x + (x < 0 ? 0.1 : -0.1), 5.7, z);
    label.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
    scene.add(label);
}

// Room 1 feature wall: keep the main sightline open by mounting the statement
// on the wall opposite the entrance. The room centre remains reserved for the ship display.
function createRoom1FeaturePanel() {
    const room = museumRooms[0];
    const panelX = room.bounds.minX + 0.16;
    const panelZ = room.centerZ;
    const panelY = 3.15;
    const panelWidth = 6.9;
    const panelHeight = 3.7;

    const backing = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, panelHeight, panelWidth),
        new THREE.MeshStandardMaterial({ color: 0x5a2522, roughness: 0.78, metalness: 0.08 })
    );
    backing.name = 'room1-feature-panel-backing';
    backing.position.set(panelX - 0.025, panelY, panelZ);
    scene.add(backing);

    const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 3.36, 6.58),
        new THREE.MeshStandardMaterial({ color: 0xe7dcc2, roughness: 0.82 })
    );
    panel.name = 'room1-feature-panel-surface';
    panel.position.set(panelX + 0.045, panelY, panelZ);
    scene.add(panel);

    const trimMaterial = new THREE.MeshStandardMaterial({ color: 0xc7a448, roughness: 0.38, metalness: 0.35 });
    [
        new THREE.BoxGeometry(0.12, 0.08, 7.05),
        new THREE.BoxGeometry(0.12, 0.08, 7.05),
        new THREE.BoxGeometry(0.12, 3.8, 0.08),
        new THREE.BoxGeometry(0.12, 3.8, 0.08),
        new THREE.BoxGeometry(0.13, 0.045, 6.7),
        new THREE.BoxGeometry(0.13, 3.48, 0.045),
        new THREE.BoxGeometry(0.13, 3.48, 0.045)
    ].forEach((geometry, index) => {
        const trim = new THREE.Mesh(geometry, trimMaterial);
        const isHorizontal = index === 0 || index === 1 || index === 4;
        trim.position.set(
            panelX + 0.105,
            isHorizontal ? (index === 0 ? 5.05 : (index === 1 ? 1.25 : 4.72)) : panelY,
            isHorizontal ? panelZ : panelZ + (index === 2 || index === 5 ? -3.37 : 3.37)
        );
        scene.add(trim);
    });

    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#e7dcc2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#6f171b';
    ctx.font = 'bold 64px Arial, sans-serif';
    ctx.fillText('HÀNH TRÌNH CỨU NƯỚC', canvas.width / 2, 112);
    ctx.fillStyle = '#9b702b';
    ctx.font = 'bold 34px Arial, sans-serif';
    ctx.fillText('1911 – 1941', canvas.width / 2, 180);

    ctx.strokeStyle = 'rgba(155,112,43,.62)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(220, 235);
    ctx.lineTo(1180, 235);
    ctx.stroke();

    ctx.fillStyle = '#6f171b';
    ctx.font = '30px Arial, sans-serif';
    ctx.fillText('Rời Bến Nhà Rồng năm 1911, Nguyễn Tất Thành bắt đầu hành trình', canvas.width / 2, 326);
    ctx.fillText('tìm đường cứu nước, từng bước tiếp cận chủ nghĩa Mác – Lênin', canvas.width / 2, 386);
    ctx.fillText('và xác định con đường giải phóng dân tộc cho Việt Nam.', canvas.width / 2, 446);

    ctx.fillStyle = '#795b3a';
    ctx.font = '25px Arial, sans-serif';
    ctx.fillText('Nguyễn Tất Thành trước lúc ra đi tìm đường cứu nước · 1911', canvas.width / 2, 535);

    ctx.strokeStyle = 'rgba(155,112,43,.48)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(145, 610);
    ctx.lineTo(1255, 610);
    ctx.stroke();

    ctx.fillStyle = '#6f171b';
    ctx.font = 'bold 23px Arial, sans-serif';
    const milestones = [
        { year: '1911', lines: ['Rời Bến', 'Nhà Rồng'] },
        { year: '1919', lines: ['Gửi Yêu sách của', 'nhân dân An Nam'] },
        { year: '1920', lines: ['Tìm thấy con đường', 'cách mạng vô sản'] },
        { year: '1941', lines: ['Trở về', 'Tổ quốc'] }
    ];
    const milestoneX = [185, 515, 875, 1200];
    milestones.forEach((milestone, index) => {
        ctx.fillText(milestone.year, milestoneX[index], 665);
        ctx.font = '20px Arial, sans-serif';
        milestone.lines.forEach((line, lineIndex) => ctx.fillText(line, milestoneX[index], 710 + lineIndex * 30));
        ctx.font = 'bold 23px Arial, sans-serif';
    });

    const textSurface = new THREE.Mesh(
        new THREE.PlaneGeometry(6.4, 3.12),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas) })
    );
    textSurface.name = 'room1-feature-panel-content';
    textSurface.position.set(panelX + 0.115, panelY, panelZ);
    textSurface.rotation.y = Math.PI / 2;
    scene.add(textSurface);
}
createRoom1FeaturePanel();

// Room 1's physical exhibits use the supplied GLB assets. Their source
// materials/textures are intentionally left untouched; only transform and
// interaction metadata are added here.
const room1GLTFLoader = new GLTFLoader();
const room1ExhibitMaterials = {
    wood: new THREE.MeshStandardMaterial({ color: 0x3d2921, roughness: 0.62, metalness: 0.08 }),
    stone: new THREE.MeshStandardMaterial({ color: 0x77736b, roughness: 0.74, metalness: 0.08 })
};

function addRoom1GLBExhibit({ path, id, targetSize, fitAxis = 'max', position, rotationY, pedestalHeight, pedestalPadding, pedestalMaterial }) {
    addExhibitSpotlight(position);
    room1GLTFLoader.load(path, (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.rotation.set(0, rotationY, 0);
        model.updateMatrixWorld(true);

        const sourceBox = new THREE.Box3().setFromObject(model);
        const sourceSize = sourceBox.getSize(new THREE.Vector3());
        const sourceDimension = fitAxis === 'y'
            ? sourceSize.y
            : Math.max(sourceSize.x, sourceSize.y, sourceSize.z);
        const uniformScale = targetSize / sourceDimension;
        model.scale.setScalar(uniformScale);
        model.updateMatrixWorld(true);

        let modelBox = new THREE.Box3().setFromObject(model);
        const modelSize = modelBox.getSize(new THREE.Vector3());
        const pedestalWidth = modelSize.x + pedestalPadding * 2;
        const pedestalDepth = modelSize.z + pedestalPadding * 2;
        const pedestal = new THREE.Mesh(
            new THREE.BoxGeometry(pedestalWidth, pedestalHeight, pedestalDepth),
            pedestalMaterial
        );
        pedestal.position.set(position.x, pedestalHeight / 2, position.z);
        pedestal.castShadow = true;
        pedestal.receiveShadow = true;
        scene.add(pedestal);

        const modelCenter = modelBox.getCenter(new THREE.Vector3());
        model.position.x += position.x - modelCenter.x;
        model.position.z += position.z - modelCenter.z;
        model.updateMatrixWorld(true);
        modelBox = new THREE.Box3().setFromObject(model);
        model.position.y += pedestalHeight - modelBox.min.y;
        model.updateMatrixWorld(true);

        model.userData.type = 'artifact';
        model.userData.id = id;
        model.traverse((child) => {
            if (!child.isMesh) return;
            child.castShadow = true;
            child.receiveShadow = true;
            child.userData.type = 'artifact';
            child.userData.id = id;
            artifactInteractables.push(child);
        });
        scene.add(model);
    }, undefined, (error) => {
        console.error(`Room 1 GLB failed to load: ${path}`, error);
    });
}

// The ship is the main focal point, kept low and slightly off the entry axis
// so visitors can see through the room before turning toward the exhibit.
addRoom1GLBExhibit({
    path: './images/room1/steam-ship.glb',
    id: 'room1-steam-ship',
    targetSize: 2.55,
    position: new THREE.Vector3(-10.15, 0, 8.25),
    rotationY: Math.PI / 2 + Math.PI / 8,
    pedestalHeight: 0.32,
    pedestalPadding: 0.16,
    pedestalMaterial: room1ExhibitMaterials.wood
});

addRoom1GLBExhibit({
    path: './images/room1/antique-globe.glb',
    id: 'room1-antique-globe',
    targetSize: 0.92,
    fitAxis: 'y',
    position: new THREE.Vector3(-7.25, 0, 5.15),
    rotationY: Math.PI / 12,
    pedestalHeight: 0.58,
    pedestalPadding: 0.16,
    pedestalMaterial: room1ExhibitMaterials.stone
});

// Room 2: the supplied microphone and radio replace the old flag/microphone/
// radio/podium placeholder group. The title remains on the end wall.
const room2GLTFLoader = new GLTFLoader();
const room2PedestalMaterials = {
    wood: new THREE.MeshStandardMaterial({ color: 0x3b2924, roughness: 0.64, metalness: 0.08 }),
    stone: new THREE.MeshStandardMaterial({ color: 0x77756f, roughness: 0.75, metalness: 0.06 })
};

const room2Models = {};

function loadRoom2Model({ path, id, targetSize, fitAxis, position, rotationY = 0, rotationX = 0, rotationZ = 0, pedestalHeight = 0, pedestalPadding = 0, pedestalMaterial = null, registerArtifact = false, onPlaced = null }) {
    addExhibitSpotlight(position);
    room2GLTFLoader.load(path, (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.rotation.set(rotationX, rotationY, rotationZ);
        model.updateMatrixWorld(true);

        const sourceBox = new THREE.Box3().setFromObject(model);
        const sourceSize = sourceBox.getSize(new THREE.Vector3());
        const sourceDimension = fitAxis === 'y'
            ? sourceSize.y
            : fitAxis === 'z'
                ? sourceSize.z
                : fitAxis === 'max'
                    ? Math.max(sourceSize.x, sourceSize.y, sourceSize.z)
                    : sourceSize.x;
        const uniformScale = targetSize / sourceDimension;
        model.scale.setScalar(uniformScale);
        model.updateMatrixWorld(true);

        let modelBox = new THREE.Box3().setFromObject(model);
        const modelSize = modelBox.getSize(new THREE.Vector3());
        const pedestalWidth = modelSize.x + pedestalPadding * 2;
        const pedestalDepth = modelSize.z + pedestalPadding * 2;
        if (pedestalHeight > 0 && pedestalMaterial) {
            const pedestal = new THREE.Mesh(
                new THREE.BoxGeometry(pedestalWidth, pedestalHeight, pedestalDepth),
                pedestalMaterial
            );
            pedestal.position.set(position.x, pedestalHeight / 2, position.z);
            pedestal.castShadow = true;
            pedestal.receiveShadow = true;
            pedestal.userData.room = 'room2';
            scene.add(pedestal);
        }

        const modelCenter = modelBox.getCenter(new THREE.Vector3());
        model.position.x += position.x - modelCenter.x;
        model.position.z += position.z - modelCenter.z;
        model.updateMatrixWorld(true);
        modelBox = new THREE.Box3().setFromObject(model);
        model.position.y += (pedestalHeight > 0 ? pedestalHeight : 0) - modelBox.min.y;
        model.updateMatrixWorld(true);

        if (registerArtifact) {
            model.userData.type = 'artifact';
            model.userData.id = id;
        }
        model.traverse((child) => {
            if (!child.isMesh) return;
            if (registerArtifact) {
                child.userData.type = 'artifact';
                child.userData.id = id;
                artifactInteractables.push(child);
            }
            child.castShadow = true;
            child.receiveShadow = true;
        });
        scene.add(model);
        const finalBox = new THREE.Box3().setFromObject(model);
        const placement = { model, box: finalBox, size: finalBox.getSize(new THREE.Vector3()), scale: model.scale.x };
        if (id) room2Models[id] = placement;
        if (onPlaced) onPlaced(placement);
    }, undefined, (error) => {
        console.error(`Room 2 GLB failed to load: ${path}`, error);
    });
}

loadRoom2Model({
    path: './images/room2/vintage-microphone.glb',
    id: 'room2-vintage-microphone',
    targetSize: 0.62,
    fitAxis: 'y',
    position: new THREE.Vector3(10.0, 0, 1.2),
    rotationY: -Math.PI / 2,
    registerArtifact: true,
    onPlaced: tryMountRoom2Microphone
});

loadRoom2Model({
    path: './images/room2/vintage-radio.glb',
    id: 'room2-vintage-radio',
    targetSize: 0.82,
    fitAxis: 'x',
    position: new THREE.Vector3(7.35, 0, -1.75),
    rotationY: Math.PI / 12,
    pedestalHeight: 0.58,
    pedestalPadding: 0.15,
    pedestalMaterial: room2PedestalMaterials.stone,
    registerArtifact: true
});

loadRoom2Model({
    path: './images/room2/vintage_telephone.glb',
    id: 'room2-vintage-telephone',
    targetSize: 0.82,
    fitAxis: 'x',
    position: new THREE.Vector3(7.35, 0, 4.35),
    rotationY: -Math.PI / 10,
    pedestalHeight: 0.58,
    pedestalPadding: 0.15,
    pedestalMaterial: room2PedestalMaterials.wood,
    registerArtifact: true
});

loadRoom2Model({
    path: './images/room2/old_newspaper.glb',
    id: 'room2-old-newspaper',
    targetSize: 1.15,
    fitAxis: 'x',
    position: new THREE.Vector3(12.45, 0, 1.4),
    rotationY: Math.PI / 2,
    rotationX: -Math.PI / 18,
    pedestalHeight: 0.78,
    pedestalPadding: 0.16,
    pedestalMaterial: room2PedestalMaterials.stone,
    registerArtifact: true
});

loadRoom2Model({
    path: './images/room2/lectern.glb',
    id: 'room2-lectern',
    targetSize: 1.18,
    fitAxis: 'y',
    position: new THREE.Vector3(10.0, 0, 1.2),
    rotationY: 0,
    registerArtifact: false,
    onPlaced: tryMountRoom2Microphone
});

function tryMountRoom2Microphone() {
    const microphone = room2Models['room2-vintage-microphone'];
    const lectern = room2Models['room2-lectern'];
    if (!microphone || !lectern || microphone.model.userData.mountedOnLectern) return;

    const microphoneCenter = microphone.box.getCenter(new THREE.Vector3());
    const lecternCenter = lectern.box.getCenter(new THREE.Vector3());
    microphone.model.position.x += lecternCenter.x - microphoneCenter.x;
    microphone.model.position.z += lecternCenter.z - microphoneCenter.z;
    microphone.model.updateMatrixWorld(true);

    const microphoneBox = new THREE.Box3().setFromObject(microphone.model);
    microphone.model.position.y += lectern.box.max.y - microphoneBox.min.y + 0.025;
    microphone.model.updateMatrixWorld(true);
    microphone.box = new THREE.Box3().setFromObject(microphone.model);
    microphone.size = microphone.box.getSize(new THREE.Vector3());
    microphone.model.userData.mountedOnLectern = true;
}

createThemeLabel('Độc lập · Tự do · Hạnh phúc', museumRooms[1].bounds.maxX - 0.1, museumRooms[1].centerZ);

// Room 2 feature wall: retain the physical wall but turn its blue accent into
// a restrained ivory-and-burgundy independence display panel.
const room2Panel = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 3.65, 7.5),
    new THREE.MeshStandardMaterial({ color: 0xe7dcc2, roughness: 0.82 })
);
room2Panel.position.set(museumRooms[1].bounds.maxX - 0.15, 3.25, museumRooms[1].centerZ);
scene.add(room2Panel);

const room2PanelTrimMaterial = new THREE.MeshStandardMaterial({ color: 0xc7a448, roughness: 0.38, metalness: 0.35 });
[
    new THREE.BoxGeometry(0.1, 0.08, 7.65),
    new THREE.BoxGeometry(0.1, 0.08, 7.65),
    new THREE.BoxGeometry(0.1, 3.75, 0.08),
    new THREE.BoxGeometry(0.1, 3.75, 0.08)
].forEach((geometry, index) => {
    const trim = new THREE.Mesh(geometry, room2PanelTrimMaterial);
    const isHorizontal = index < 2;
    trim.position.set(
        museumRooms[1].bounds.maxX - 0.21,
        isHorizontal ? (index === 0 ? 5.1 : 1.4) : 3.25,
        isHorizontal ? museumRooms[1].centerZ : museumRooms[1].centerZ + (index === 2 ? -3.8 : 3.8)
    );
    scene.add(trim);
});

const room2QuoteCanvas = document.createElement('canvas');
room2QuoteCanvas.width = 1000;
room2QuoteCanvas.height = 520;
const room2QuoteContext = room2QuoteCanvas.getContext('2d');
room2QuoteContext.fillStyle = '#e7dcc2';
room2QuoteContext.fillRect(0, 0, room2QuoteCanvas.width, room2QuoteCanvas.height);
room2QuoteContext.fillStyle = '#6f171b';
room2QuoteContext.textAlign = 'center';
room2QuoteContext.textBaseline = 'middle';
room2QuoteContext.font = 'bold 38px Georgia';
room2QuoteContext.fillText('“Nước Việt Nam có quyền hưởng', 500, 190);
room2QuoteContext.fillText('tự do và độc lập…”', 500, 255);
room2QuoteContext.font = '24px Arial';
room2QuoteContext.fillText('Tuyên ngôn Độc lập · 2/9/1945', 500, 355);
const room2Quote = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 2.7),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(room2QuoteCanvas) })
);
room2Quote.position.set(museumRooms[1].bounds.maxX - 0.23, 3.15, museumRooms[1].centerZ);
room2Quote.rotation.y = -Math.PI / 2;
scene.add(room2Quote);

// Room 3: administrative-history gallery using the supplied ballot box,
// typewriter and old book models instead of the former placeholder group.
const room3GLTFLoader = new GLTFLoader();
const room3Models = {};
const room3DisplayMaterials = {
    wood: new THREE.MeshStandardMaterial({ color: 0x3b2924, roughness: 0.68, metalness: 0.08 }),
    stone: new THREE.MeshStandardMaterial({ color: 0x77736b, roughness: 0.76, metalness: 0.06 })
};

function loadRoom3Model({ path, id, targetSize, fitAxis, position, rotationY = 0, rotationX = 0, rotationZ = 0, pedestalHeight = 0, pedestalPadding = 0.16, pedestalMaterial = null, registerArtifact = false, onPlaced = null }) {
    addExhibitSpotlight(position);
    room3GLTFLoader.load(path, (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.rotation.set(rotationX, rotationY, rotationZ);
        model.updateMatrixWorld(true);

        const sourceBox = new THREE.Box3().setFromObject(model);
        const sourceSize = sourceBox.getSize(new THREE.Vector3());
        const sourceDimension = fitAxis === 'y'
            ? sourceSize.y
            : fitAxis === 'z'
                ? sourceSize.z
                : fitAxis === 'max'
                    ? Math.max(sourceSize.x, sourceSize.y, sourceSize.z)
                    : sourceSize.x;
        model.scale.setScalar(targetSize / sourceDimension);
        model.updateMatrixWorld(true);

        let modelBox = new THREE.Box3().setFromObject(model);
        const modelSize = modelBox.getSize(new THREE.Vector3());
        if (pedestalHeight > 0 && pedestalMaterial) {
            const pedestal = new THREE.Mesh(
                new THREE.BoxGeometry(modelSize.x + pedestalPadding * 2, pedestalHeight, modelSize.z + pedestalPadding * 2),
                pedestalMaterial
            );
            pedestal.position.set(position.x, pedestalHeight / 2, position.z);
            pedestal.castShadow = true;
            pedestal.receiveShadow = true;
            pedestal.userData.room = 'room3';
            scene.add(pedestal);
        }

        const modelCenter = modelBox.getCenter(new THREE.Vector3());
        model.position.x += position.x - modelCenter.x;
        model.position.z += position.z - modelCenter.z;
        model.updateMatrixWorld(true);
        modelBox = new THREE.Box3().setFromObject(model);
        model.position.y += (pedestalHeight > 0 ? pedestalHeight : 0) - modelBox.min.y;
        model.updateMatrixWorld(true);

        if (registerArtifact) {
            model.userData.type = 'artifact';
            model.userData.id = id;
        }
        model.traverse((child) => {
            if (!child.isMesh) return;
            if (registerArtifact) {
                child.userData.type = 'artifact';
                child.userData.id = id;
                artifactInteractables.push(child);
            }
            child.castShadow = true;
            child.receiveShadow = true;
        });
        scene.add(model);
        const finalBox = new THREE.Box3().setFromObject(model);
        const placement = { model, box: finalBox, size: finalBox.getSize(new THREE.Vector3()), scale: model.scale.x };
        if (id) room3Models[id] = placement;
        if (onPlaced) onPlaced(placement);
    }, undefined, (error) => {
        console.error(`Room 3 GLB failed to load: ${path}`, error);
    });
}

loadRoom3Model({
    path: './images/room3/snapshot_ballot_box.glb',
    id: 'room3-ballot-box',
    targetSize: 0.92,
    fitAxis: 'y',
    position: new THREE.Vector3(-10.25, 0, -3.0),
    rotationY: Math.PI / 2,
    pedestalHeight: 0.52,
    pedestalMaterial: room3DisplayMaterials.wood,
    registerArtifact: true
});

const room3TypewriterDesk = new THREE.Group();
const room3DeskTop = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.16, 1.2), room3DisplayMaterials.wood);
room3DeskTop.position.y = 0.84;
room3TypewriterDesk.add(room3DeskTop);
[-0.82, 0.82].forEach(x => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.84, 0.85), room3DisplayMaterials.wood);
    leg.position.set(x, 0.42, 0);
    room3TypewriterDesk.add(leg);
});
room3TypewriterDesk.position.set(-8.15, 0, -6.45);
room3TypewriterDesk.userData.room = 'room3';
room3TypewriterDesk.traverse(child => { child.castShadow = true; child.receiveShadow = true; });
scene.add(room3TypewriterDesk);

loadRoom3Model({
    path: './images/room3/typewriter.glb',
    id: 'room3-typewriter',
    targetSize: 0.78,
    fitAxis: 'x',
    position: new THREE.Vector3(-8.15, 0, -6.45),
    rotationY: Math.PI / 12,
    registerArtifact: true,
    onPlaced: ({ model, box }) => {
        const deskTopBox = new THREE.Box3().setFromObject(room3DeskTop);
        const typewriterBox = new THREE.Box3().setFromObject(model);
        const typewriterCenter = typewriterBox.getCenter(new THREE.Vector3());
        const deskCenter = deskTopBox.getCenter(new THREE.Vector3());
        model.position.x += deskCenter.x - typewriterCenter.x;
        model.position.z += deskCenter.z - typewriterCenter.z;
        model.updateMatrixWorld(true);
        const alignedBox = new THREE.Box3().setFromObject(model);
        model.position.y += deskTopBox.max.y - alignedBox.min.y + 0.025;
        model.updateMatrixWorld(true);
        room3Models['room3-typewriter'].box = new THREE.Box3().setFromObject(model);
        room3Models['room3-typewriter'].size = room3Models['room3-typewriter'].box.getSize(new THREE.Vector3());
    }
});

loadRoom3Model({
    path: './images/room3/old_book.glb',
    id: 'room3-old-book',
    targetSize: 0.68,
    fitAxis: 'x',
    position: new THREE.Vector3(-8.15, 0, -1.15),
    rotationY: -Math.PI / 12,
    rotationX: -Math.PI / 18,
    pedestalHeight: 0.84,
    pedestalMaterial: room3DisplayMaterials.stone,
    registerArtifact: true
});

function createRoom3ThemePanel() {
    const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 3.65, 7.5),
        new THREE.MeshStandardMaterial({ color: 0xe7dcc2, roughness: 0.82 })
    );
    // Room 03 interior is toward +X; keep every decorative layer in front of
    // the feature wall instead of burying the text behind it.
    panel.position.set(museumRooms[2].bounds.minX + 0.18, 3.25, museumRooms[2].centerZ);
    scene.add(panel);

    const trimMaterial = new THREE.MeshStandardMaterial({ color: 0xc7a448, roughness: 0.38, metalness: 0.35 });
    [
        [0.08, 7.65, 5.1], [0.08, 7.65, 1.4],
        [3.75, 0.08, 3.25], [3.75, 0.08, 3.25]
    ].forEach(([height, depth, y], index) => {
        const geometry = index < 2
            ? new THREE.BoxGeometry(0.1, height, depth)
            : new THREE.BoxGeometry(0.1, height, 0.08);
        const trim = new THREE.Mesh(geometry, trimMaterial);
        trim.position.set(
            museumRooms[2].bounds.minX + 0.25,
            y,
            index < 2 ? museumRooms[2].centerZ : museumRooms[2].centerZ + (index === 2 ? -3.8 : 3.8)
        );
        scene.add(trim);
    });

    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 520;
    const context = canvas.getContext('2d');
    context.fillStyle = '#e7dcc2';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#6f171b';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = 'bold 38px Georgia';
    context.fillText('CỦA NHÂN DÂN · DO NHÂN DÂN', 500, 190);
    context.fillText('VÌ NHÂN DÂN', 500, 255);
    context.font = '24px Arial';
    context.fillText('Dân là chủ và dân làm chủ', 500, 355);
    context.font = 'bold 20px Arial';
    context.fillText('WALL OF IDEAS · 1945–1946', 500, 430);
    const textMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(5.2, 2.7),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas) })
    );
    textMesh.position.set(museumRooms[2].bounds.minX + 0.30, 3.15, museumRooms[2].centerZ);
    textMesh.rotation.y = Math.PI / 2;
    scene.add(textMesh);
}

createRoom3ThemePanel();

// Room 4: two halves with national unity and international solidarity.
// Two labels share this wall: keep them narrow enough not to overlap (overlapping
// coplanar labels z-fight and flicker).
createThemeLabel('Đại đoàn kết dân tộc', museumRooms[3].bounds.maxX - 0.1, museumRooms[3].centerZ - 1.95, '#f6e7bd', 3.6);
createThemeLabel('Đoàn kết quốc tế', museumRooms[3].bounds.maxX - 0.1, museumRooms[3].centerZ + 1.95, '#f6e7bd', 3.6);
// The old Room 04 divider and blue SphereGeometry globe were placeholders.

// Room 04 statement wall: thin panel, dark wood, fine brass and restrained text.
const room4 = museumRooms[3];
const room4PanelMaterial = new THREE.MeshStandardMaterial({ color: 0xe8dfcc, roughness: 0.86 });
const room4TrimMaterial = new THREE.MeshStandardMaterial({ color: 0xb89543, roughness: 0.4, metalness: 0.42 });
const room4StatementPanel = new THREE.Mesh(new THREE.BoxGeometry(0.06, 4.35, 7.15), room4PanelMaterial);
room4StatementPanel.position.set(room4.bounds.maxX - 0.16, 3.15, room4.centerZ);
scene.add(room4StatementPanel);
[
    new THREE.BoxGeometry(0.07, 0.07, 7.28), new THREE.BoxGeometry(0.07, 0.07, 7.28),
    new THREE.BoxGeometry(0.07, 4.42, 0.07), new THREE.BoxGeometry(0.07, 4.42, 0.07)
].forEach((geometry, index) => {
    const trim = new THREE.Mesh(geometry, room4TrimMaterial);
    trim.position.set(room4.bounds.maxX - 0.22, index < 2 ? (index === 0 ? 5.34 : 0.96) : 3.15, index < 2 ? room4.centerZ : room4.centerZ + (index === 2 ? -3.64 : 3.64));
    scene.add(trim);
});

function createRoom4Canvas(textLines, background, ink, accent, fontSize = 42) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 520;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = background; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = accent; ctx.lineWidth = 8; ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
    ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    textLines.forEach((line, index) => {
        ctx.font = `${index === 0 ? 'bold ' : ''}${index === 0 ? fontSize : Math.round(fontSize * 0.58)}px Arial`;
        ctx.fillText(line, canvas.width / 2, index === 0 ? 205 : 330);
    });
    return new THREE.CanvasTexture(canvas);
}

const room4Statement = new THREE.Mesh(
    new THREE.PlaneGeometry(6.35, 2.75),
    new THREE.MeshBasicMaterial({ map: createRoom4Canvas(['ĐOÀN KẾT · ĐOÀN KẾT · ĐẠI ĐOÀN KẾT', 'THÀNH CÔNG · THÀNH CÔNG · ĐẠI THÀNH CÔNG'], '#e8dfcc', '#6f171b', '#b89543', 48) })
);
room4Statement.position.set(room4.bounds.maxX - 0.24, 3.15, room4.centerZ);
room4Statement.rotation.y = -Math.PI / 2;
scene.add(room4Statement);

const room4CornerLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(2.1, 0.86),
    new THREE.MeshBasicMaterial({ map: createRoom4Canvas(['ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC', 'VÀ ĐOÀN KẾT QUỐC TẾ'], '#34251f', '#f1e6ce', '#b89543', 29) })
);
room4CornerLabel.position.set(room4.bounds.maxX - 0.25, 1.02, room4.bounds.minZ + 0.82);
room4CornerLabel.rotation.y = -Math.PI / 2;
room4CornerLabel.scale.set(0.78, 0.78, 0.78);
scene.add(room4CornerLabel);

// Single-line wall label whose canvas matches the plane's aspect ratio, so the
// text is not squashed.
function createZoneLabelTexture(text, width, height, background, ink, accent) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = Math.round(1024 * height / width);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
    ctx.fillStyle = ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let fontSize = Math.round(canvas.height * 0.5);
    ctx.font = `bold ${fontSize}px Arial`;
    while (ctx.measureText(text).width > canvas.width * 0.88 && fontSize > 12) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px Arial`;
    }
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return texture;
}

function createRoom4SectionLabel(text, z, color) {
    const label = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 0.48), new THREE.MeshBasicMaterial({
        map: createZoneLabelTexture(text, 4.2, 0.48, '#34251f', '#f1e6ce', color)
    }));
    label.position.set(room4.centerX, 5.25, z);
    label.rotation.y = z < room4.centerZ ? 0 : Math.PI;
    scene.add(label);
}
createRoom4SectionLabel('ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC', room4.bounds.minZ + 0.12, '#9e5545');
createRoom4SectionLabel('ĐOÀN KẾT QUỐC TẾ', room4.bounds.maxZ - 0.12, '#9aa9ad');

// Room 04 objects: one people group for national unity, plus a dove and letter
// for the international section. Source materials are deliberately preserved.
const room4GLTFLoader = new GLTFLoader();
const room4DisplayMaterials = {
    wood: new THREE.MeshStandardMaterial({ color: 0x3b2924, roughness: 0.72, metalness: 0.08 }),
    stone: new THREE.MeshStandardMaterial({ color: 0x77736b, roughness: 0.78, metalness: 0.06 })
};
const room4Models = {};

function isFiniteVector3(vector) {
    return vector && Number.isFinite(vector.x) && Number.isFinite(vector.y) && Number.isFinite(vector.z);
}

function loadRoom4Artifact({ path, id, position, targetSize, fitAxis = 'max', rotationY = 0, rotationX = 0, rotationZ = 0, pedestalHeight = 0, pedestalPadding = 0.18, pedestalMaterial = null, prepare = null }) {
    addExhibitSpotlight(position);
    room4GLTFLoader.load(path, (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.rotation.set(rotationX, rotationY, rotationZ);
        model.updateMatrixWorld(true);

        if (prepare) prepare(model);
        model.updateMatrixWorld(true);
        const sourceBox = new THREE.Box3().setFromObject(model);
        const sourceSize = sourceBox.getSize(new THREE.Vector3());
        if (!isFiniteVector3(sourceSize) || sourceSize.x <= 0 || sourceSize.y <= 0 || sourceSize.z <= 0) {
            console.error(`Room 04 invalid source bounds for ${id}`, sourceSize);
            return;
        }
        const sourceDimension = fitAxis === 'y' ? sourceSize.y : Math.max(sourceSize.x, sourceSize.y, sourceSize.z);
        if (!Number.isFinite(sourceDimension) || sourceDimension <= 0 || !Number.isFinite(targetSize) || targetSize <= 0) {
            console.error(`Room 04 invalid scale input for ${id}`, { sourceDimension, targetSize });
            return;
        }
        model.scale.setScalar(targetSize / sourceDimension);
        model.updateMatrixWorld(true);

        let modelBox = new THREE.Box3().setFromObject(model);
        const modelSize = modelBox.getSize(new THREE.Vector3());
        if (!isFiniteVector3(modelSize)) {
            console.error(`Room 04 invalid scaled bounds for ${id}`, modelSize);
            return;
        }
        if (pedestalHeight > 0 && pedestalMaterial) {
            const pedestal = new THREE.Mesh(
                new THREE.BoxGeometry(modelSize.x + pedestalPadding * 2, pedestalHeight, modelSize.z + pedestalPadding * 2),
                pedestalMaterial
            );
            pedestal.position.set(position.x, pedestalHeight / 2, position.z);
            pedestal.userData.room = 'room4';
            pedestal.userData.decorative = true;
            pedestal.castShadow = true;
            pedestal.receiveShadow = true;
            scene.add(pedestal);
        }

        const modelCenter = modelBox.getCenter(new THREE.Vector3());
        model.position.x += position.x - modelCenter.x;
        model.position.z += position.z - modelCenter.z;
        model.updateMatrixWorld(true);
        modelBox = new THREE.Box3().setFromObject(model);
        model.position.y += (pedestalHeight > 0 ? pedestalHeight : 0) - modelBox.min.y;
        model.updateMatrixWorld(true);

        const finalBox = new THREE.Box3().setFromObject(model);
        const finalSize = finalBox.getSize(new THREE.Vector3());
        if (!isFiniteVector3(finalSize)) {
            console.error(`Room 04 invalid final bounds for ${id}`, finalSize);
            return;
        }
        model.userData.type = 'artifact';
        model.userData.id = id;
        model.userData.room = 'room4';
        model.traverse((child) => {
            if (!child.isMesh) return;
            child.userData.type = 'artifact';
            child.userData.id = id;
            child.userData.room = 'room4';
            child.castShadow = true;
            child.receiveShadow = true;
            artifactInteractables.push(child);
        });
        scene.add(model);
        room4Models[id] = { model, box: finalBox, size: finalSize, scale: model.scale.x };
    }, undefined, (error) => {
        console.error(`Room 04 GLB failed to load: ${path}`, error);
    });
}

loadRoom4Artifact({
    path: './images/room4/free_pack_-_lowpoly_people.glb',
    id: 'room4-national-unity-people',
    targetSize: 1.45,
    fitAxis: 'y',
    position: new THREE.Vector3(8.15, 0, -8.85),
    rotationY: -Math.PI / 2,
    pedestalHeight: 0.28,
    pedestalPadding: 0.2,
    pedestalMaterial: room4DisplayMaterials.wood,
    prepare: (model) => {
        const peopleRoot = model.getObjectByName('SM_People_Lowpoly');
        if (!peopleRoot || !peopleRoot.children.length) {
            console.warn('Room 04 people hierarchy not found; keeping loaded group intact.');
            return;
        }
        peopleRoot.children.slice(5).forEach((person) => peopleRoot.remove(person));
    }
});

loadRoom4Artifact({
    path: './images/room4/dove_from_poly_by_google.glb',
    id: 'room4-dove',
    targetSize: 0.72,
    position: new THREE.Vector3(12.25, 0, -6.45),
    rotationY: Math.PI / 2,
    pedestalHeight: 0.3,
    pedestalPadding: 0.12,
    pedestalMaterial: room4DisplayMaterials.stone
});

loadRoom4Artifact({
    path: './images/room4/letter%20.glb',
    id: 'room4-letter',
    targetSize: 0.5,
    position: new THREE.Vector3(10.25, 0, -6.55),
    rotationX: -Math.PI / 12,
    rotationY: Math.PI / 14,
    pedestalHeight: 0.22,
    pedestalPadding: 0.12,
    pedestalMaterial: room4DisplayMaterials.wood
});

// Room 05: warm, restrained gallery for everyday culture and human values.
const room5 = museumRooms[4];
const room5PanelMaterial = new THREE.MeshStandardMaterial({ color: 0xe8dfcc, roughness: 0.88 });
const room5TrimMaterial = new THREE.MeshStandardMaterial({ color: 0xb89543, roughness: 0.42, metalness: 0.38 });
const room5StatementPanel = new THREE.Mesh(new THREE.BoxGeometry(0.06, 4.35, 9.15), room5PanelMaterial);
room5StatementPanel.position.set(room5.bounds.minX + 0.16, 3.15, room5.centerZ);
scene.add(room5StatementPanel);
[
    new THREE.BoxGeometry(0.07, 0.07, 9.28), new THREE.BoxGeometry(0.07, 0.07, 9.28),
    new THREE.BoxGeometry(0.07, 4.42, 0.07), new THREE.BoxGeometry(0.07, 4.42, 0.07)
].forEach((geometry, index) => {
    const trim = new THREE.Mesh(geometry, room5TrimMaterial);
    trim.position.set(room5.bounds.minX + 0.22, index < 2 ? (index === 0 ? 5.34 : 0.96) : 3.15, index < 2 ? room5.centerZ : room5.centerZ + (index === 2 ? -4.64 : 4.64));
    scene.add(trim);
});

function createRoom5Canvas(lines, background, ink, accent, titleSize = 46) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 520;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = background; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = accent; ctx.lineWidth = 8; ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
    ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    lines.forEach((line, index) => {
        ctx.font = `${index === 0 ? 'bold ' : ''}${index === 0 ? titleSize : Math.round(titleSize * 0.56)}px Arial`;
        ctx.fillText(line, canvas.width / 2, index === 0 ? 175 : 305 + index * 70);
    });
    return new THREE.CanvasTexture(canvas);
}

const room5Statement = new THREE.Mesh(
    new THREE.PlaneGeometry(8.0, 3.45),
    new THREE.MeshBasicMaterial({ map: createRoom5Canvas(['VĂN HÓA VÀ CON NGƯỜI', 'Văn hóa soi đường cho quốc dân đi', 'Giản dị · Thanh cao · Vì con người'], '#e8dfcc', '#6f171b', '#b89543', 54) })
);
room5Statement.position.set(room5.bounds.minX + 0.24, 3.15, room5.centerZ);
room5Statement.rotation.y = Math.PI / 2;
scene.add(room5Statement);

function createRoom5ZoneLabel(text, z, accent) {
    const label = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 0.48), new THREE.MeshBasicMaterial({
        map: createZoneLabelTexture(text, 3.7, 0.48, '#3b2924', '#f1e6ce', accent)
    }));
    label.position.set(room5.centerX, 5.25, z);
    label.rotation.y = z < room5.centerZ ? 0 : Math.PI;
    scene.add(label);
}
createRoom5ZoneLabel('GÓC ĐỜI SỐNG GIẢN DỊ', room5.bounds.minZ + 0.06, '#b8874a');
createRoom5ZoneLabel('GẦN GŨI VỚI CON NGƯỜI', room5.bounds.maxZ - 0.06, '#a6ad88');

// Replace the legacy mojibake labels in Room 05 with Unicode-safe canvas text.
room5Statement.visible = false;
scene.children.filter((object) => object.position.y === 5.25 && object.position.x === room5.centerX).forEach((object) => { object.visible = false; });
const room5ReadableStatement = new THREE.Mesh(
    new THREE.PlaneGeometry(8.0, 3.45),
    new THREE.MeshBasicMaterial({ map: createRoom5Canvas(['V\u0102N H\u00D3A V\u00C0 CON NG\u01AF\u1EDCI', 'V\u0103n h\u00F3a soi \u0111\u01B0\u1EDDng cho qu\u1ED1c d\u00E2n \u0111i', 'Gi\u1EA3n d\u1ECB \u00B7 Thanh cao \u00B7 V\u00EC con ng\u01B0\u1EDDi'], '#e8dfcc', '#6f171b', '#b89543', 54) })
);
room5ReadableStatement.position.copy(room5Statement.position);
room5ReadableStatement.rotation.copy(room5Statement.rotation);
scene.add(room5ReadableStatement);
createRoom5ZoneLabel('G\u00D3C \u0110\u1EDCI S\u1ED0NG GI\u1EA2N D\u1E8A', room5.bounds.minZ + 0.12, '#b8874a');
createRoom5ZoneLabel('G\u1EA6N G\u0168I V\u1EDAI CON NG\u01AF\u1EDCI', room5.bounds.maxZ - 0.12, '#a6ad88');

// Room 05 GLB loader: bounds-driven scaling, source materials untouched.
const room5GLTFLoader = new GLTFLoader();
const room5DisplayMaterials = {
    wood: new THREE.MeshStandardMaterial({ color: 0x3b2924, roughness: 0.72, metalness: 0.08 }),
    stone: new THREE.MeshStandardMaterial({ color: 0x77736b, roughness: 0.78, metalness: 0.06 })
};
const room5Models = {};

function room5FiniteSize(size) {
    return size && Number.isFinite(size.x) && Number.isFinite(size.y) && Number.isFinite(size.z) && size.x > 0 && size.y > 0 && size.z > 0;
}

function loadRoom5Artifact({ path, id, position, targetSize, fitAxis = 'max', rotationY = 0, rotationX = 0, rotationZ = 0, pedestalHeight = 0, pedestalPadding = 0.16, pedestalMaterial = null }) {
    addExhibitSpotlight(position);
    room5GLTFLoader.load(path, (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.rotation.set(rotationX, rotationY, rotationZ);
        model.updateMatrixWorld(true);
        const sourceBox = new THREE.Box3().setFromObject(model);
        const sourceSize = sourceBox.getSize(new THREE.Vector3());
        if (!room5FiniteSize(sourceSize)) { console.error(`Room 05 invalid source bounds for ${id}`, sourceSize); return; }
        const sourceDimension = fitAxis === 'y' ? sourceSize.y : Math.max(sourceSize.x, sourceSize.y, sourceSize.z);
        if (!Number.isFinite(sourceDimension) || sourceDimension <= 0 || !Number.isFinite(targetSize) || targetSize <= 0) { console.error(`Room 05 invalid scale for ${id}`); return; }
        model.scale.setScalar(targetSize / sourceDimension);
        model.updateMatrixWorld(true);
        let modelBox = new THREE.Box3().setFromObject(model);
        const modelSize = modelBox.getSize(new THREE.Vector3());
        if (!room5FiniteSize(modelSize)) { console.error(`Room 05 invalid scaled bounds for ${id}`, modelSize); return; }
        if (pedestalHeight > 0 && pedestalMaterial) {
            const pedestal = new THREE.Mesh(new THREE.BoxGeometry(modelSize.x + pedestalPadding * 2, pedestalHeight, modelSize.z + pedestalPadding * 2), pedestalMaterial);
            pedestal.position.set(position.x, pedestalHeight / 2, position.z);
            pedestal.userData.room = 'room5'; pedestal.userData.decorative = true;
            pedestal.castShadow = true; pedestal.receiveShadow = true; scene.add(pedestal);
        }
        const modelCenter = modelBox.getCenter(new THREE.Vector3());
        model.position.x += position.x - modelCenter.x;
        model.position.z += position.z - modelCenter.z;
        model.updateMatrixWorld(true);
        modelBox = new THREE.Box3().setFromObject(model);
        model.position.y += (pedestalHeight > 0 ? pedestalHeight : 0) - modelBox.min.y;
        model.updateMatrixWorld(true);
        const finalBox = new THREE.Box3().setFromObject(model);
        const finalSize = finalBox.getSize(new THREE.Vector3());
        if (!room5FiniteSize(finalSize)) { console.error(`Room 05 invalid final bounds for ${id}`, finalSize); return; }
        model.userData.type = 'artifact'; model.userData.id = id; model.userData.room = 'room5';
        model.traverse((child) => {
            if (!child.isMesh) return;
            child.userData.type = 'artifact'; child.userData.id = id; child.userData.room = 'room5';
            child.castShadow = true; child.receiveShadow = true; artifactInteractables.push(child);
        });
        scene.add(model); room5Models[id] = { model, box: finalBox, size: finalSize, scale: model.scale.x };
    }, undefined, (error) => console.error(`Room 05 GLB failed to load: ${path}`, error));
}

loadRoom5Artifact({ path: './images/room5/old_wooden_chair_low-poly.glb', id: 'room5-chair', targetSize: 1.65, fitAxis: 'y', position: new THREE.Vector3(-8.15, 0, -17.55), rotationY: -Math.PI / 10, pedestalHeight: 0.22, pedestalPadding: 0.22, pedestalMaterial: room5DisplayMaterials.wood });
loadRoom5Artifact({ path: './images/room5/tea_cup_low_poly.glb', id: 'room5-tea-cup', targetSize: 0.34, fitAxis: 'max', position: new THREE.Vector3(-7.05, 0, -17.15), rotationY: Math.PI / 8, pedestalHeight: 0.18, pedestalPadding: 0.12, pedestalMaterial: room5DisplayMaterials.stone });
loadRoom5Artifact({ path: './images/room5/ha_noi_specialities.glb', id: 'room5-ha-noi-specialities', targetSize: 0.92, fitAxis: 'max', position: new THREE.Vector3(-9.35, 0, -17.2), rotationY: Math.PI / 8, pedestalHeight: 0.28, pedestalPadding: 0.16, pedestalMaterial: room5DisplayMaterials.wood });

// 2D sandal image as a framed, interactive interpretive display.
const room5SandalFrame = new THREE.Mesh(new THREE.BoxGeometry(2.55, 3.2, 0.1), room5DisplayMaterials.wood);
room5SandalFrame.position.set(room5.centerX + 2.35, 3.45, room5.bounds.maxZ - 0.14);
scene.add(room5SandalFrame);
const room5Sandal = new THREE.Mesh(new THREE.PlaneGeometry(2.35, 3.0), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./images/room5/dep-tong.png') }));
room5Sandal.position.set(room5.centerX + 2.35, 3.45, room5.bounds.maxZ - 0.2);
room5Sandal.rotation.y = Math.PI;
room5Sandal.userData.type = 'artifact'; room5Sandal.userData.id = 'room5-rubber-sandals'; room5Sandal.userData.room = 'room5';
scene.add(room5Sandal); artifactInteractables.push(room5Sandal);
addSpotlightEffect(new THREE.Vector3(room5.centerX + 2.35, 3.45, room5.bounds.maxZ - 0.11), {
    from: new THREE.Vector3(room5.centerX + 2.35, wallHeight - 0.18, room5.bounds.maxZ - 1.8),
    pool: 'wall',
    poolSize: 4.6,
    poolNormal: new THREE.Vector3(0, 0, -1)
});
createPlacard('Dép cao su - biểu tượng lối sống giản dị', 'Thế kỷ XX', 'Hình ảnh minh họa kiểu dép cao su gắn với phong cách sống giản dị, tiết kiệm và gần gũi.', new THREE.Vector3(room5.centerX + 2.35, 1.35, room5.bounds.maxZ - 0.2), Math.PI, 1.35, 0.62);

// Room 6 follows below; no Room 05 light or painting spotlight is added here.

// Lightweight statue of President Ho Chi Minh in the exterior courtyard.
const statue = new THREE.Group();
const bronzeMaterial = new THREE.MeshStandardMaterial({ color: 0x80613b, roughness: 0.62, metalness: 0.45 });
const statueStone = new THREE.MeshStandardMaterial({ color: 0xbab2a4, roughness: 0.88 });
const statueBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.05, 2.6), statueStone);
statueBase.position.y = 0.525;
statue.add(statueBase);
const statuePlinth = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.5, 1.8), bronzeMaterial);
statuePlinth.position.y = 1.3;
statue.add(statuePlinth);
const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 2.15, 12), bronzeMaterial);
torso.position.y = 2.6;
statue.add(torso);
const head = new THREE.Mesh(new THREE.SphereGeometry(0.43, 16, 12), bronzeMaterial);
head.scale.set(0.82, 1.08, 0.86);
head.position.y = 4.05;
statue.add(head);
[-0.72, 0.72].forEach((x, index) => {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 1.75, 10), bronzeMaterial);
    arm.position.set(x, 2.65, 0);
    arm.rotation.z = index === 0 ? -0.14 : 0.14;
    statue.add(arm);
});
statue.position.set(-8.5, 0, roomDepth / 2 + 9.5);
statue.rotation.y = 0.25;
scene.add(statue);

const statueLight = new THREE.SpotLight(0xffdfaa, 1.5, 16, Math.PI / 5, 0.55);
statueLight.position.set(-5, 8, roomDepth / 2 + 12);
statueLight.target = statue;
scene.add(statueLight);

// --- EXTERIOR LANDSCAPE: trees and ceremonial flags ---
// Lightweight procedural fallback: the courtyard remains local/offline and
// avoids adding heavy GLB dependencies while preserving a restrained museum
// character.
const exteriorTreeMaterials = {
    trunk: new THREE.MeshStandardMaterial({ color: 0x5a3825, roughness: 0.94 }),
    foliage: new THREE.MeshStandardMaterial({ color: 0x536b45, roughness: 0.92 }),
    foliageLight: new THREE.MeshStandardMaterial({ color: 0x6f8255, roughness: 0.92 }),
    planter: new THREE.MeshStandardMaterial({ color: 0x857568, roughness: 0.9 })
};

function createExteriorTree(name, x, z, scale = 1) {
    const tree = new THREE.Group();
    tree.name = name;
    const planter = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 0.48, 10), exteriorTreeMaterials.planter);
    planter.position.y = 0.24;
    tree.add(planter);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.19, 1.75, 8), exteriorTreeMaterials.trunk);
    trunk.position.y = 1.35;
    tree.add(trunk);
    const lowerCanopy = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.55, 8), exteriorTreeMaterials.foliage);
    lowerCanopy.position.y = 2.45;
    tree.add(lowerCanopy);
    const upperCanopy = new THREE.Mesh(new THREE.ConeGeometry(0.67, 1.25, 8), exteriorTreeMaterials.foliageLight);
    upperCanopy.position.y = 3.42;
    tree.add(upperCanopy);
    tree.position.set(x, 0, z);
    tree.scale.setScalar(scale);
    tree.traverse(object => { object.castShadow = true; object.receiveShadow = true; });
    scene.add(tree);
    return tree;
}

[
    [-12.2, roomDepth / 2 + 3.8, 0.9], [12.2, roomDepth / 2 + 3.8, 0.9],
    [-13.5, roomDepth / 2 + 10.2, 1.05], [13.5, roomDepth / 2 + 10.2, 1.05],
    [-12.0, roomDepth / 2 + 16.0, 0.92], [12.0, roomDepth / 2 + 16.0, 0.92]
].forEach(([x, z, scale], index) => createExteriorTree(`exterior-tree-${index + 1}`, x, z, scale));

function createFlagTexture(kind) {
    const canvas = document.createElement('canvas');
    canvas.width = 480;
    canvas.height = 320; // Tỷ lệ cờ chuẩn 2:3
    const ctx = canvas.getContext('2d');

    // Nền đỏ cờ
    ctx.fillStyle = '#da251d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Màu vàng biểu tượng
    ctx.fillStyle = '#ffde00';

    if (kind === 'national') {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const outer = canvas.height * 0.25;
        const inner = outer * 0.382;
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
            const radius = i % 2 === 0 ? outer : inner;
            const angle = -Math.PI / 2 + (i * Math.PI) / 5;
            const px = cx + Math.cos(angle) * radius;
            const py = cy + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
    } else {
        // Cờ Đảng: Búa - Liềm chuẩn quy cách
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Tỷ lệ Búa - Liềm so với lá cờ
        const scale = 0.95;
        ctx.scale(scale, scale);

        // --- 1. VẼ LƯỠI LIỀM & CÁN LIỀM ---
        ctx.beginPath();
        // Vòng cung ngoài lưỡi liềm
        ctx.arc(0, 0, 60, -Math.PI * 0.55, Math.PI * 0.72, false);
        // Cán liềm (phần đuôi chéo phía dưới bên trái - dài gấp đôi hiện tại)
        ctx.lineTo(-130, 135);
        ctx.lineTo(-115, 145);
        ctx.lineTo(-75, 105);
        // Vòng cung trong lưỡi liềm (tạo độ dày và mũi nhọn)
        ctx.arc(0, 0, 42, Math.PI * 0.62, -Math.PI * 0.48, true);
        ctx.closePath();
        ctx.fill();

        // --- 2. VẼ BÚA (ĐẶT ĐÈ LÊN LIỀM, NGHIÊNG 45 ĐỘ) ---
        ctx.save();
        // Dịch chuyển toàn bộ búa (0: dịch ngang, 10: dịch xuống dưới 10px. Hãy chỉnh số 10 này)
        ctx.translate(0, 20);
        ctx.rotate(-Math.PI / 4); // Xoay búa góc 45 độ chuẩn

        ctx.beginPath();
        // Đầu búa (lùi xuống 8px)
        ctx.rect(-22, -54, 44, 26);
        // Cán búa dài (lùi xuống 8px)
        ctx.rect(-7, -28, 14, 105);
        ctx.fill();
        ctx.restore();

        ctx.restore();
    }
    return new THREE.CanvasTexture(canvas);
}

function createExteriorFlag(name, x, kind, direction = 1) {
    const group = new THREE.Group();
    group.name = name;
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x857a6a, roughness: 0.45, metalness: 0.55 });
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x6a6258, roughness: 0.82 });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.68, 0.24, 12), baseMaterial);
    base.position.y = 0.12;
    group.add(base);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.08, 7.1, 10), poleMaterial);
    pole.position.y = 3.68;
    group.add(pole);
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), poleMaterial);
    finial.position.y = 7.3;
    group.add(finial);
    let flagTexture;
    if (kind === 'party') {
        flagTexture = new THREE.TextureLoader().load('./images/Co_Dang.png');
        flagTexture.colorSpace = THREE.SRGBColorSpace;
    } else if (kind === 'national') {
        flagTexture = new THREE.TextureLoader().load('./images/Co_VN.png');
        flagTexture.colorSpace = THREE.SRGBColorSpace;
    } else {
        flagTexture = createFlagTexture(kind);
    }
    const flagMaterial = new THREE.MeshBasicMaterial({
        map: flagTexture,
        // The public approach is +Z and PlaneGeometry's front face is +Z.
        // FrontSide prevents the browser from showing a mirrored backside.
        side: kind === 'party' ? THREE.FrontSide : THREE.DoubleSide
    });
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.35, 1.32), flagMaterial);
    flag.name = `${name}-cloth`;
    flag.position.set(direction * 0.95, 6.55, 0);
    // Both flags face the public approach (+Z). The old party-flag branch
    // rotated its plane by PI, so the DoubleSide backside mirrored the
    // hammer-and-sickle from the front courtyard view. Direction still only
    // controls which side of the pole the flag extends toward.
    flag.rotation.y = 0;
    flag.scale.set(1, 1, 1);
    flag.userData.flagKind = kind;
    flag.userData.texture = flagTexture;
    group.add(flag);
    group.position.set(x, 0, roomDepth / 2 + 4.1);
    group.traverse(object => { object.castShadow = true; object.receiveShadow = true; });
    scene.add(group);
    return group;
}

createExteriorFlag('exterior-national-flag', 5.3, 'national', 1);
createExteriorFlag('exterior-party-flag', -5.3, 'party', -1);

// Small, fixed night-light rig for the courtyard. It is created once and
// only its group visibility changes with the day/night theme.
function createNightLighting() {
    const warmLight = 0xffd3a0;
    const fixtureMaterial = new THREE.MeshStandardMaterial({
        color: 0x241c18,
        emissive: 0xffd08a,
        emissiveIntensity: 0.45,
        roughness: 0.72,
        metalness: 0.28
    });
    const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffe0a6 });

    const addPointLight = (name, position, intensity, distance) => {
        const light = new THREE.PointLight(warmLight, intensity, distance, 2);
        light.name = name;
        light.position.copy(position);
        light.castShadow = false;
        nightLightsGroup.add(light);
    };

    // Two warm sources wash the entrance and the two flags without shadows.
    addPointLight('night-facade-left', new THREE.Vector3(-3.2, 3.25, 20.4), 0.95, 11);
    addPointLight('night-facade-right', new THREE.Vector3(3.2, 3.25, 20.4), 0.95, 11);
    // One restrained fill gives the exterior statue readable form.
    addPointLight('night-statue-fill', new THREE.Vector3(-5.0, 4.8, 27.0), 0.8, 12);

    // Four low fixtures define the path; only the three lights above are real
    // lights, keeping the night rig within the scene light budget.
    [[-3.2, 27.0], [3.2, 27.0], [-3.2, 33.0], [3.2, 33.0]].forEach(([x, z]) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.08, 0.72, 8), fixtureMaterial);
        post.position.set(x, 0.36, z);
        nightLightsGroup.add(post);

        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), bulbMaterial);
        bulb.position.set(x, 0.78, z);
        nightLightsGroup.add(bulb);
    });
}

createNightLighting();

// --- EXHIBITION: Paintings on the Walls ---
const textureLoader = new THREE.TextureLoader();

// Helper function to create a text placard
function createPlacard(title, year, desc, position, rotationY, width = 1.6, height = 1.6) {
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

    const placardGeo = new THREE.PlaneGeometry(width, height);
    const placardMat = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 });
    const placard = new THREE.Mesh(placardGeo, placardMat);

    placard.position.copy(position);
    placard.rotation.y = rotationY;
    scene.add(placard);
}

// Helper function to create and place a framed painting
function createPainting(id, imagePath, position, rotationY, {
    placardSide = 'right',
    placardDistance = 3.0,
    placardPlacement = 'side',
    placardWidth = 1.6,
    placardHeight = 1.6,
    addSpotlight = true
} = {}) {
    const frameWidth = 4;
    const frameHeight = 3;

    // Frame mesh
    const frameGeo = new THREE.BoxGeometry(frameWidth + 0.4, frameHeight + 0.4, 0.1);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x4a2511, roughness: 0.7 }); // Dark wood
    const frame = new THREE.Mesh(frameGeo, frameMat);
    if (id === 'painting-8') frame.name = 'room6-portrait-frame';
    frame.position.copy(position);
    frame.rotation.y = rotationY;
    scene.add(frame);

    // Painting canvas
    const paintingMap = textureLoader.load(imagePath, texture => {
        // Fit every source image inside the fixed frame without stretching or cropping.
        const imageRatio = texture.image.width / texture.image.height;
        const frameRatio = frameWidth / frameHeight;
        if (imageRatio > frameRatio) painting.scale.y = frameRatio / imageRatio;
        else painting.scale.x = imageRatio / frameRatio;
    });
    const paintingGeo = new THREE.PlaneGeometry(frameWidth, frameHeight);
    const paintingMat = new THREE.MeshStandardMaterial({ map: paintingMap, roughness: 0.5 });
    const painting = new THREE.Mesh(paintingGeo, paintingMat);
    if (id === 'painting-8') painting.name = 'room6-portrait';

    // Position slightly in front of frame based on rotation
    const canvasOffset = 0.06;
    painting.position.copy(position);
    painting.position.x += Math.sin(rotationY) * canvasOffset;
    painting.position.z += Math.cos(rotationY) * canvasOffset;
    painting.rotation.y = rotationY;

    painting.userData = { type: 'artifact', id };
    scene.add(painting);
    artifactInteractables.push(painting);

    // The room lights already cover the gallery. Limit per-painting
    // spotlights so adding exhibits cannot exceed the WebGL light budget.
    if (addSpotlight) {
        const paintingLight = new THREE.SpotLight(0xffd29a, 1.2);
        paintingLight.position.copy(position);
        paintingLight.position.y += 2.5;
        paintingLight.position.x += Math.sin(rotationY) * 3;
        paintingLight.position.z += Math.cos(rotationY) * 3;
        paintingLight.target = painting;
        paintingLight.angle = Math.PI / 6;
        paintingLight.penumbra = 0.5;
        scene.add(paintingLight);
    }

    const wallNormal = new THREE.Vector3(Math.sin(rotationY), 0, Math.cos(rotationY));
    addSpotlightEffect(position.clone().addScaledVector(wallNormal, 0.03), {
        from: position.clone().addScaledVector(wallNormal, 1.7).setY(wallHeight - 0.18),
        pool: 'wall',
        poolSize: 5.6,
        poolNormal: wallNormal
    });

    const placardPos = position.clone();
    if (placardPlacement === 'below') {
        placardPos.y -= 2.12;
    } else {
        const placardOffset = (placardSide === 'left' ? -1 : 1) * placardDistance;
        placardPos.x += Math.cos(rotationY) * placardOffset;
        placardPos.z -= Math.sin(rotationY) * placardOffset;
        placardPos.y -= 0.7;
    }
    // Pull it slightly off the wall like the canvas
    placardPos.x += Math.sin(rotationY) * 0.06;
    placardPos.z += Math.cos(rotationY) * 0.06;

    createPlacard(artifactData[id].title, artifactData[id].year, artifactData[id].desc, placardPos, rotationY, placardWidth, placardHeight);
}

function getRoomPosition(room, localX, localY, localZ) {
    return new THREE.Vector3(room.centerX + localX, localY, room.centerZ + localZ);
}

function placePaintingInRoom({
    room,
    id,
    wall,
    offset = 0,
    height = 3,
    placardSide = 'right',
    placardDistance = 2.65,
    placardPlacement = 'side',
    placardWidth = 1.6,
    placardHeight = 1.6,
    addSpotlight = true
}) {
    const inset = 0.08;
    let position;
    let rotationY;

    if (wall === 'outer') {
        position = new THREE.Vector3(room.side < 0 ? room.bounds.minX + inset : room.bounds.maxX - inset, height, room.centerZ + offset);
        rotationY = room.side < 0 ? Math.PI / 2 : -Math.PI / 2;
    } else if (wall === 'back') {
        position = new THREE.Vector3(room.centerX + offset, height, room.bounds.minZ + inset);
        rotationY = 0;
    } else {
        position = new THREE.Vector3(room.centerX + offset, height, room.bounds.maxZ - inset);
        rotationY = Math.PI;
    }

    const imagePaths = {
        'painting-1': './images/exhibits/room1-ben-nha-rong-1911.jpg',
        'painting-2': './images/exhibits/room1-nguyen-ai-quoc-1920.jpg',
        'painting-3': './images/exhibits/room2-tuyen-ngon-doc-lap-1945.jpg',
        'painting-4': './images/exhibits/room2-ba-dinh-1945.jpg',
        'painting-9': './images/room2/independence-3.jpg',
        'painting-10': './images/room2/independence-4.jpg',
        'painting-5': './images/exhibits/room3-chinh-phu-1946.jpg',
        'painting-11': './images/room3/room3-election-1946.jpg',
        'painting-12': './images/room3/room3-national-assembly.jpg',
        'painting-6': './images/room4/room4-international-solidarity-01.jpg',
        'room4-national-unity-1': './images/room4/room4-national-unity-01.jpg',
        'room4-national-unity-2': './images/room4/room4-national-unity-2.jpg',
        'room4-international-solidarity-2': './images/room4/room4-international-solidarity-2.jpg',
        'painting-7': './images/room5/room5-culture-working-01.jpg',
        'room5-humanism-2': './images/room5/room5-humanism-2.jpg',
        'painting-8': './images/exhibits/room6-ho-chi-minh-portrait-1950s.jpg'
    };
    createPainting(id, imagePaths[id], position, rotationY, {
        placardSide,
        placardDistance,
        placardPlacement,
        placardWidth,
        placardHeight,
        addSpotlight
    });
}

// --- Museum Benches (To fill empty center space) ---
const benchSeatGeo = new THREE.BoxGeometry(3, 0.15, 1);
const benchSeatMat = new THREE.MeshStandardMaterial({ color: 0x3d1e0d, roughness: 0.9 }); // Leather/Dark Wood
const benchLegGeo = new THREE.BoxGeometry(0.2, 0.5, 0.8);
const benchLegMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 }); // Black metal

const benchPositions = []; // Keep the new central corridor clear between six rooms
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

// Artifacts now belong to galleries and use room-local placement.
// Room 1 keeps one historical painting on each side wall while the opposite
// wall remains a single, centered feature wall.
placePaintingInRoom({ room: museumRooms[0], id: 'painting-1', wall: 'back', offset: 0, height: 3.15, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82 });
placePaintingInRoom({ room: museumRooms[0], id: 'painting-2', wall: 'front', offset: 0, height: 3.15, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82 });
// Room 2 side walls: from the entrance (looking +X), -Z is left and +Z is right.
placePaintingInRoom({ room: museumRooms[1], id: 'painting-3', wall: 'back', offset: 1.55, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82 });
placePaintingInRoom({ room: museumRooms[1], id: 'painting-4', wall: 'front', offset: 1.55, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82 });
placePaintingInRoom({ room: museumRooms[1], id: 'painting-9', wall: 'back', offset: -2.15, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82 });
placePaintingInRoom({ room: museumRooms[1], id: 'painting-10', wall: 'front', offset: -2.15, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82 });
placePaintingInRoom({ room: museumRooms[2], id: 'painting-5', wall: 'back', offset: 0, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82 });
placePaintingInRoom({ room: museumRooms[2], id: 'painting-11', wall: 'front', offset: -2.4, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82, addSpotlight: false });
placePaintingInRoom({ room: museumRooms[2], id: 'painting-12', wall: 'front', offset: 2.4, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82, addSpotlight: false });
// Room 04: two works on each side wall, arranged along the visitor's depth axis.
// All four share the gallery light; per-painting spotlights stay disabled.
placePaintingInRoom({ room: museumRooms[3], id: 'room4-national-unity-1', wall: 'back', offset: -2.35, height: 3.0, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82, addSpotlight: false });
placePaintingInRoom({ room: museumRooms[3], id: 'room4-national-unity-2', wall: 'back', offset: 2.35, height: 3.0, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82, addSpotlight: false });
placePaintingInRoom({ room: museumRooms[3], id: 'room4-international-solidarity-2', wall: 'front', offset: -2.35, height: 3.0, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82, addSpotlight: false });
placePaintingInRoom({ room: museumRooms[3], id: 'painting-6', wall: 'front', offset: 2.35, height: 3.0, placardPlacement: 'below', placardWidth: 1.75, placardHeight: 0.82, addSpotlight: false });
placePaintingInRoom({ room: museumRooms[4], id: 'room5-humanism-2', wall: 'back', offset: -2.35, height: 3.0, placardPlacement: 'below', placardWidth: 1.55, placardHeight: 0.76, addSpotlight: false });
placePaintingInRoom({ room: museumRooms[4], id: 'painting-7', wall: 'back', offset: 2.35, height: 3.0, placardPlacement: 'below', placardWidth: 1.55, placardHeight: 0.76, addSpotlight: false });
placePaintingInRoom({ room: museumRooms[5], id: 'painting-8', wall: 'back', offset: 2.25, height: 3.0, placardPlacement: 'below', placardWidth: 1.55, placardHeight: 0.76, addSpotlight: false });

// --- ROOM 06 DOCUMENTARY SCREEN & AUDIO SYSTEM ---
const bgmElement = document.getElementById('bgm-source');

let mediaStarted = false;
function startMedia() {
    if (!mediaStarted) {
        // Need to resume AudioContext in modern browsers
        if (listener.context.state === 'suspended') {
            listener.context.resume();
        }
        bgmElement.play().catch(e => console.warn('Autoplay prevented', e));
        mediaStarted = true;
    }
}

// Audio Listener attached to camera
const listener = new THREE.AudioListener();
camera.add(listener);
// Global Volume Control: listener is kept at 1.0 (master)
listener.setMasterVolume(1.0);

// Master volume (0..1) from the toolbar slider drives both the background music
// and the Room 06 YouTube film. BGM keeps its quieter mix relative to the film.
const bgmSlider = document.getElementById('bgm-slider');
const volumeIcon = document.getElementById('volume-icon');
const volumeValue = document.getElementById('volume-value');
const BGM_MIX = 0.4;
let masterVolume = parseFloat(bgmSlider.value);

const getBgmVolume = () => masterVolume * BGM_MIX;
const getVideoVolume = () => Math.round(masterVolume * 100);

function updateVolumeIcon() {
    const level = masterVolume === 0 ? 0 : masterVolume < 0.34 ? 1 : masterVolume < 0.67 ? 2 : 3;
    volumeIcon.dataset.level = String(level);
    const percent = Math.round(masterVolume * 100);
    volumeValue.textContent = `${percent}%`;
    mediaToggleBtn.setAttribute('aria-label', `Âm lượng ${percent}%`);
    bgmSlider.setAttribute('aria-valuetext', `${percent}%`);
}

function applyMasterVolume() {
    updateVolumeIcon();
    // Inside Room 06 the film replaces the music, so BGM stays silent there.
    if (!room6PlaybackActive) bgmAudio.setVolume(getBgmVolume());
    if (youtubePlayer?.setVolume && !room6AudioMuted) {
        youtubePlayer.setVolume(getVideoVolume());
        if (masterVolume === 0) youtubePlayer.mute();
        else youtubePlayer.unMute();
    }
}

bgmSlider.addEventListener('input', (e) => {
    masterVolume = parseFloat(e.target.value);
    applyMasterVolume();
});

// 1. Room 06 wide projection screen: the YouTube API is loaded only on room entry.
const screenWidth = 8.8;
const screenHeight = 4.95;
const documentaryRoom = museumRooms.find(room => room.screeningRoom);
function createRoom6PosterTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#2e1c18');
    gradient.addColorStop(0.55, '#171313');
    gradient.addColorStop(1, '#4a2b27');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(215,180,91,.1)';
    context.fillRect(48, 48, canvas.width - 96, canvas.height - 96);
    context.strokeStyle = '#d7b45b';
    context.lineWidth = 3;
    context.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);
    context.textAlign = 'center';
    context.fillStyle = '#f2dc9c';
    context.font = '700 32px Arial, sans-serif';
    context.fillText('PHIM TƯ LIỆU', canvas.width / 2, 148);
    context.font = '600 76px Georgia, serif';
    context.fillText('HỒ CHÍ MINH', canvas.width / 2, 286);
    context.font = '600 38px Georgia, serif';
    context.fillStyle = '#fff8e8';
    context.fillText('CUỘC ĐỜI VÀ DI SẢN TƯ TƯỞNG', canvas.width / 2, 350);
    context.fillStyle = '#bd2932';
    context.beginPath();
    context.arc(canvas.width / 2, 500, 58, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#fff8e8';
    context.font = '42px Arial, sans-serif';
    context.fillText('▶', canvas.width / 2 + 4, 515);
    context.font = '700 26px Arial, sans-serif';
    context.fillStyle = '#f2dc9c';
    context.fillText('XEM PHIM', canvas.width / 2, 620);
    return new THREE.CanvasTexture(canvas);
}

const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(screenWidth, screenHeight), new THREE.MeshBasicMaterial({ map: createRoom6PosterTexture() }));
screenMesh.name = 'room6-documentary-screen';
screenMesh.position.set(documentaryRoom.bounds.maxX - 0.22, 4.05, documentaryRoom.centerZ);
screenMesh.rotation.y = -Math.PI / 2;
screenMesh.userData = { type: 'video', id: 'room6-documentary-screen', roomId: 'room6' };
scene.add(screenMesh);
videoInteractables.push(screenMesh);

const screenFrame = new THREE.Mesh(
    new THREE.BoxGeometry(screenWidth + 0.34, screenHeight + 0.34, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x171312, roughness: 0.42, metalness: 0.12 })
);
screenFrame.name = 'room6-screen-frame';
screenFrame.position.set(documentaryRoom.bounds.maxX - 0.1, 4.05, documentaryRoom.centerZ);
screenFrame.rotation.y = -Math.PI / 2;
scene.add(screenFrame);

// Ceiling-mounted projector aimed at the wide screen.
const projector = new THREE.Group();
const projectorBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.25, 0.48, 0.82),
    new THREE.MeshStandardMaterial({ color: 0x24211f, roughness: 0.5, metalness: 0.18 })
);
projectorBody.position.set(0, 0, 0);
projector.add(projectorBody);
const projectorLens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.2, 0.18, 20),
    new THREE.MeshStandardMaterial({ color: 0x0b0b0b, roughness: 0.18, metalness: 0.4 })
);
projectorLens.rotation.z = Math.PI / 2;
projectorLens.position.x = 0.7;
projector.add(projectorLens);
projector.position.set(documentaryRoom.centerX + 0.8, 6.25, documentaryRoom.centerZ);
projector.name = 'room6-ceiling-projector';
scene.add(projector);

function addRoom6WallPanel(texture, width, height, position, rotationY) {
    // These panels live on the two side walls (constant Z). Keep the wall
    // backing thin on Z; using width as the Z dimension would create a large
    // freestanding slab in the visitor path.
    const backing = new THREE.Mesh(new THREE.BoxGeometry(width + 0.18, height + 0.18, 0.06), new THREE.MeshStandardMaterial({ color: 0x261a17, roughness: 0.88 }));
    backing.name = 'room6-wall-panel-backing';
    backing.position.copy(position);
    backing.rotation.y = rotationY;
    scene.add(backing);
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ map: texture }));
    panel.name = 'room6-wall-panel-surface';
    panel.position.copy(position);
    panel.position.z += rotationY === 0 ? 0.04 : -0.04;
    panel.rotation.y = rotationY;
    scene.add(panel);
}

function createRoom6ContentTexture(title, lines) {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 700;
    const context = canvas.getContext('2d');
    context.fillStyle = '#201614';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#d7b45b';
    context.lineWidth = 4;
    context.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
    context.fillStyle = '#d7b45b';
    context.font = '700 28px Arial, sans-serif';
    context.fillText(title, 72, 92);
    context.strokeStyle = 'rgba(215,180,91,.55)';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(72, 122);
    context.lineTo(828, 122);
    context.stroke();
    let y = 190;
    lines.forEach((line, index) => {
        const parts = line.split('|');
        context.fillStyle = index % 2 === 0 ? '#f2dc9c' : '#fff8e8';
        context.font = index % 2 === 0 ? '700 34px Georgia, serif' : '400 25px Arial, sans-serif';
        parts.forEach(part => {
            context.fillText(part, 72, y);
            y += index % 2 === 0 ? 44 : 34;
        });
        if (index % 2 !== 0) y += 48;
    });
    return new THREE.CanvasTexture(canvas);
}

addRoom6WallPanel(createRoom6ContentTexture('DÒNG THỜI GIAN', [
    '1890', 'Ra đời tại Nghệ An',
    '1911', 'Ra đi tìm đường cứu nước',
    '1945', 'Đọc Tuyên ngôn Độc lập',
    '1969', 'Để lại di sản tư tưởng,|đạo đức và phong cách'
]), 3.8, 3.35, new THREE.Vector3(6.1, 3.05, documentaryRoom.bounds.minZ + 0.1), 0);

addRoom6WallPanel(createRoom6ContentTexture('DI SẢN', [
    'HỒ CHÍ MINH',
    'CUỘC ĐỜI · TƯ TƯỞNG · DI SẢN',
    'Độc lập dân tộc',
    'Đại đoàn kết',
    'Đạo đức · Văn hóa · Con người'
]), 4.1, 3.05, new THREE.Vector3(9.3, 3.05, documentaryRoom.bounds.maxZ - 0.1), Math.PI);

// Two compact seating rows keep the entry axis and side aisles open.
[8.05, 11.0].forEach((x, rowIndex) => {
    const row = new THREE.Group();
    row.name = `room6-bench-row-${rowIndex + 1}`;
    const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.92, 0.28, 4.6),
        new THREE.MeshStandardMaterial({ color: rowIndex ? 0x3e2025 : 0x4d272d, roughness: 0.86 })
    );
    seat.position.y = 0.72;
    row.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.9, 4.6), seat.material);
    back.position.set(-0.36, 1.12, 0);
    row.add(back);
    row.position.set(x, 0, documentaryRoom.centerZ);
    row.traverse(object => { object.castShadow = true; object.receiveShadow = true; });
    scene.add(row);
});

const aisleLight = new THREE.Mesh(
    new THREE.PlaneGeometry(4.6, 0.12),
    new THREE.MeshBasicMaterial({ color: 0x9d7436 })
);
aisleLight.rotation.x = -Math.PI / 2;
aisleLight.position.set(5.9, 0.055, documentaryRoom.centerZ);
scene.add(aisleLight);

// Room 06 layout audit: keep the diagnostic focused on newly added display
// geometry so future changes cannot silently grow into the visitor path.
function logRoom6GeometryAudit() {
    const names = [
        'room6-documentary-screen', 'room6-screen-frame',
        'room6-wall-panel-backing', 'room6-wall-panel-surface',
        'room6-portrait-frame', 'room6-portrait',
        'room6-bench-row-1', 'room6-bench-row-2'
    ];
    const rows = [];
    names.forEach(name => {
        scene.traverse(object => {
            if (object.name !== name) return;
            const box = new THREE.Box3().setFromObject(object);
            rows.push({ name, position: object.position.toArray(), rotation: object.rotation.toArray(), scale: object.scale.toArray(), min: box.min.toArray(), max: box.max.toArray() });
        });
    });
    console.table(rows);
}
logRoom6GeometryAudit();

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

const YOUTUBE_VIDEO_ID = 'dWAXQHot4ig';
let youtubeApiPromise = null;
let youtubePlayer = null;
let youtubePlayerReady = null;
let youtubeIframe = null;
let room6PlaybackActive = false;
let css3dInteractionEnabled = false;
let room6AudioMuted = true;
let room6AudioFallbackVisible = false;
let room6MusicWasPlaying = false;
let room6PreviousMusicPaused = true;

function loadYouTubeIframeAPI() {
    if (window.YT?.Player) return Promise.resolve();
    if (youtubeApiPromise) return youtubeApiPromise;

    youtubeApiPromise = new Promise((resolve, reject) => {
        const previousCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (typeof previousCallback === 'function') previousCallback();
            resolve();
        };
        const apiScript = document.createElement('script');
        apiScript.src = 'https://www.youtube.com/iframe_api';
        apiScript.async = true;
        apiScript.onerror = () => reject(new Error('Không thể tải YouTube IFrame Player API'));
        document.head.appendChild(apiScript);
    });
    return youtubeApiPromise;
}

// Subtitles are turned off: the URL asks for no captions and the caption
// modules are unloaded whenever playback (re)starts, which also overrides a
// viewer's saved "always show captions" YouTube preference.
function disableYouTubeCaptions(player) {
    try {
        player.unloadModule?.('captions');
        player.unloadModule?.('cc');
        player.setOption?.('captions', 'track', {});
    } catch (error) {
        console.warn('Không thể tắt phụ đề YouTube:', error);
    }
}

function onYouTubePlayerReady(event) {
    disableYouTubeCaptions(event.target);
    // The enter transition calls startRoom6YoutubeAudio once the API promise
    // resolves; keep the player muted until that controlled transition.
    event.target.mute();
    event.target.setVolume(0);
}

function showRoom6AudioFallback() {
    room6AudioFallbackVisible = true;
    room6AudioFallback.classList.remove('hidden');
}

function hideRoom6AudioFallback() {
    room6AudioFallbackVisible = false;
    room6AudioFallback.classList.add('hidden');
}

function startRoom6YoutubeAudio(player) {
    if (!player) return;
    player.playVideo();
    // Try the requested audible mode once on room entry. Browser policy may
    // reject it; the muted fallback below remains the supported path.
    try {
        player.setVolume(getVideoVolume());
        if (masterVolume > 0) player.unMute();
        room6AudioMuted = false;
        hideRoom6AudioFallback();
        bgmAudio.setVolume(0);
    } catch (error) {
        player.mute();
        player.playVideo();
        room6AudioMuted = true;
        showRoom6AudioFallback();
    }
}

function createYouTubePlayer() {
    if (youtubePlayer) return Promise.resolve(youtubePlayerReady);
    youtubePlayerReady = new Promise(resolve => {
        youtubePlayer = new window.YT.Player(youtubeIframe, {
            events: {
                onReady: event => { onYouTubePlayerReady(event); resolve(event.target); },
                onAutoplayBlocked: () => {
                    youtubePlayer?.mute();
                    youtubePlayer?.playVideo();
                    room6AudioMuted = true;
                    showRoom6AudioFallback();
                },
                onStateChange: event => {
                    if (event.data === window.YT.PlayerState.PLAYING) disableYouTubeCaptions(event.target);
                },
                onError: event => console.warn('YouTube Room 06 error:', event.data)
            }
        });
    });
    return youtubePlayerReady;
}

function createRoom6YoutubeScreen() {
    if (youtubeIframe) {
        youtubeIframe.style.display = 'block';
        screenMesh.material.opacity = 0;
        return;
    }
    youtubeIframe = document.createElement('iframe');
    youtubeIframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=1&rel=0&playsinline=1&enablejsapi=1&cc_load_policy=0&iv_load_policy=3`;
    youtubeIframe.title = 'Phim tư liệu Hồ Chí Minh – Cuộc đời và di sản tư tưởng';
    youtubeIframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    youtubeIframe.allowFullscreen = true;
    youtubeIframe.frameBorder = '0';
    youtubeIframe.style.width = '960px';
    youtubeIframe.style.height = '540px';
    youtubeIframe.style.border = '0';
    youtubeIframe.style.background = '#000';
    youtubeIframe.style.pointerEvents = 'none';
    youtubeIframe.style.position = 'absolute';
    youtubeIframe.style.left = '0';
    youtubeIframe.style.top = '0';
    youtubeIframe.style.transformOrigin = '0 0';
    videoLayer.appendChild(youtubeIframe);
    screenMesh.material.transparent = true;
    screenMesh.material.opacity = 0;
}

// Map the iframe's rectangle onto the screen's four projected corners with a
// projective (homography) matrix3d. Hidden when any corner is behind the camera.
const YOUTUBE_FRAME_WIDTH = 960;
const YOUTUBE_FRAME_HEIGHT = 540;
const screenCornerLocal = [
    new THREE.Vector3(-screenWidth / 2, screenHeight / 2, 0.025),
    new THREE.Vector3(screenWidth / 2, screenHeight / 2, 0.025),
    new THREE.Vector3(screenWidth / 2, -screenHeight / 2, 0.025),
    new THREE.Vector3(-screenWidth / 2, -screenHeight / 2, 0.025)
];
const projectedCorner = new THREE.Vector3();
const cornerInCamera = new THREE.Vector3();

function updateYouTubeScreenProjection() {
    if (!youtubeIframe || youtubeIframe.style.display === 'none') return;
    screenMesh.updateMatrixWorld();
    const points = [];
    for (const local of screenCornerLocal) {
        projectedCorner.copy(local).applyMatrix4(screenMesh.matrixWorld);
        cornerInCamera.copy(projectedCorner).applyMatrix4(camera.matrixWorldInverse);
        if (cornerInCamera.z > -camera.near) {
            youtubeIframe.style.visibility = 'hidden';
            return;
        }
        projectedCorner.project(camera);
        points.push((projectedCorner.x + 1) / 2 * window.innerWidth, (1 - projectedCorner.y) / 2 * window.innerHeight);
    }
    const [x0, y0, x1, y1, x2, y2, x3, y3] = points;
    // Unit square (0,0),(1,0),(1,1),(0,1) -> quad p0..p3 (Heckbert).
    const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
    const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    let g = 0, h = 0;
    const det = dx1 * dy2 - dx2 * dy1;
    if (Math.abs(det) > 1e-9 && (Math.abs(dx3) > 1e-9 || Math.abs(dy3) > 1e-9)) {
        g = (dx3 * dy2 - dx2 * dy3) / det;
        h = (dx1 * dy3 - dx3 * dy1) / det;
    }
    const a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, c = x0;
    const d = y1 - y0 + g * y1, e = y3 - y0 + h * y3, f = y0;
    const w = YOUTUBE_FRAME_WIDTH, hgt = YOUTUBE_FRAME_HEIGHT;
    youtubeIframe.style.transform = `matrix3d(${a / w},${d / w},0,${g / w},${b / hgt},${e / hgt},0,${h / hgt},0,0,1,0,${c},${f},0,1)`;
    youtubeIframe.style.visibility = 'visible';
}

function enterRoom6Video() {
    room6PlaybackActive = true;
    room6PreviousMusicPaused = bgmElement.paused;
    room6MusicWasPlaying = !room6PreviousMusicPaused;
    bgmAudio.setVolume(0);
    if (room6MusicWasPlaying) bgmElement.pause();
    createRoom6YoutubeScreen();
    loadYouTubeIframeAPI()
        .then(createYouTubePlayer)
        .then(player => {
            if (!room6PlaybackActive) return;
            startRoom6YoutubeAudio(player);
        })
        .catch(error => {
            // The projected iframe still shows YouTube's own play button; the
            // visitor can click the screen to use it.
            console.warn('Room 06 YouTube autoplay unavailable:', error);
        });
}

function leaveRoom6Video() {
    room6PlaybackActive = false;
    if (youtubePlayer?.pauseVideo) youtubePlayer.pauseVideo();
    if (youtubePlayer?.mute) youtubePlayer.mute();
    room6AudioMuted = true;
    hideRoom6AudioFallback();
    bgmAudio.setVolume(getBgmVolume());
    if (room6MusicWasPlaying && room6PreviousMusicPaused === false) bgmElement.play().catch(() => { });
    if (youtubeIframe) youtubeIframe.style.display = 'none';
    screenMesh.material.opacity = 1;
    disableRoom6Css3dInteraction();
}

function enableRoom6Css3dInteraction() {
    if (!youtubeIframe) return;
    // Set the flag before unlocking so the unlock handler keeps the blocker hidden.
    css3dInteractionEnabled = true;
    blocker.style.display = 'none';
    if (!isTouchDevice && controls.isLocked) controls.unlock();
    youtubeIframe.style.pointerEvents = 'auto';
    room6ContinueBtn.classList.remove('hidden');
}

function disableRoom6Css3dInteraction() {
    css3dInteractionEnabled = false;
    if (youtubeIframe) youtubeIframe.style.pointerEvents = 'none';
    room6ContinueBtn.classList.add('hidden');
}

function activateRoom6VideoSurface() {
    enableRoom6Css3dInteraction();
}

room6ContinueBtn.addEventListener('click', event => {
    event.stopPropagation();
    disableRoom6Css3dInteraction();
    enterGameMode();
});

room6AudioFallback.addEventListener('click', event => {
    event.stopPropagation();
    if (!youtubePlayer) return;
    youtubePlayer.setVolume(getVideoVolume());
    if (masterVolume > 0) youtubePlayer.unMute();
    room6AudioMuted = false;
    hideRoom6AudioFallback();
    bgmAudio.setVolume(0);
});

// --- INTERACTION (RAYCASTING) ---
const raycaster = new THREE.Raycaster();
const centerPoint = new THREE.Vector2(0, 0); // Center of screen
let victoryPending = false;

function showVictory() {
    victoryPending = false;
    updateProgressUI();
    infoPanel.classList.add('closed');
    victoryPopup.classList.remove('hidden');
    if (!isTouchDevice && document.pointerLockElement) document.exitPointerLock();
}

function resumeTour() {
    victoryPopup.classList.add('hidden');
    enterGameMode();
}

function updateInteractionState() {
    const uiIsOpen = !infoPanel.classList.contains('closed') ||
        !entrancePopup.classList.contains('hidden') ||
        !victoryPopup.classList.contains('hidden');

    if (uiIsOpen || (!controls.isLocked && !isTouchDevice)) {
        crosshair.classList.remove('interactive');
        return;
    }

    raycaster.setFromCamera(centerPoint, camera);
    const artifactHits = raycaster.intersectObjects(artifactInteractables, true);
    const videoHits = raycaster.intersectObjects(videoInteractables, true);
    crosshair.classList.toggle('interactive', artifactHits.length > 0 || videoHits.length > 0);
}

function findArtifactId(object) {
    let current = object;
    while (current) {
        if (current.userData?.type === 'artifact' && current.userData.id) {
            return current.userData.id;
        }
        if (current.userData?.id && artifactData[current.userData.id]) {
            return current.userData.id;
        }
        current = current.parent;
    }
    return null;
}

function performRaycast() {
    raycaster.setFromCamera(centerPoint, camera);
    const videoHit = raycaster.intersectObjects(videoInteractables, true)[0]?.object;
    if (videoHit) {
        activateRoom6VideoSurface();
        return;
    }
    const artifactHits = raycaster.intersectObjects(artifactInteractables, true);
    const hitObject = artifactHits[0]?.object;
    const artifactId = hitObject ? findArtifactId(hitObject) : null;
    const data = artifactId ? artifactData[artifactId] : null;

    if (artifactId && data) {
        const isNewDiscovery = !discoveredArtifacts.has(artifactId);
        document.getElementById('panel-year').textContent = data.year;
        document.getElementById('panel-title').textContent = data.title;
        document.getElementById('panel-desc').textContent = data.desc;
        discoveredBadge.hidden = !isNewDiscovery;
        infoPanel.classList.remove('closed');
        if (!isTouchDevice) document.exitPointerLock();

        if (isNewDiscovery) {
            discoveredArtifacts.add(artifactId);
            updateProgressUI();
            const material = hitObject.material;
            if (material?.emissive) material.emissive.setHex(0x3a2f08);
            if (discoveredArtifacts.size === totalArtifacts) {
                victoryPending = true;
            }
        }
    }
}

// PC Click
document.addEventListener('click', (e) => {
    // Only trigger if locked (playing) and not clicking UI elements
    if (controls.isLocked && e.target !== closePanelBtn && !css3dInteractionEnabled) {
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
        if (infoPanel.classList.contains('closed') &&
            entrancePopup.classList.contains('hidden') &&
            victoryPopup.classList.contains('hidden')) {
            performRaycast();
        }
    }
});

closePanelBtn.addEventListener('click', () => {
    infoPanel.classList.add('closed');
    if (victoryPending) {
        showVictory();
    } else if (!isTouchDevice) {
        // Resume game immediately by locking pointer
        enterGameMode();
    }
});

continueTourBtn.addEventListener('click', resumeTour);
restartTourBtn.addEventListener('click', () => {
    discoveredArtifacts.clear();
    updateProgressUI();
    victoryPending = false;
    resumeTour();
});

// --- MUSEUM ENTRANCE FLOW ---
let entrancePromptArmed = true;

function showEntranceChoice() {
    entrancePromptArmed = false;
    velocity.set(0, 0, 0);
    entrancePopup.classList.remove('hidden');
    blocker.style.display = 'none';
    if (!isTouchDevice && document.pointerLockElement) document.exitPointerLock();
}

function closeEntranceChoice() {
    entrancePopup.classList.add('hidden');
    enterGameMode();
}

enterMuseumBtn.addEventListener('click', () => {
    camera.position.set(0, EYE_HEIGHT, museumLayout.lobby.maxZ - 2.0);
    currentRoomName.textContent = 'Sảnh chính';
    closeEntranceChoice();
});

leaveMuseumBtn.addEventListener('click', () => {
    camera.position.set(0, EYE_HEIGHT, roomDepth / 2 + 8);
    currentRoomName.textContent = 'Khuôn viên bảo tàng';
    closeEntranceChoice();
});

// --- ANIMATION LOOP ---
const collisionDistance = 1.0; // Distance to keep from walls
const previousPlayerPosition = new THREE.Vector3();
let previousActiveRoomId = null;

function isAtMainEntrance(position) {
    return Math.abs(position.x) <= entrancePassageHalfWidth;
}

function pointInBounds(position, bounds, padding = 0) {
    return position.x >= bounds.minX + padding && position.x <= bounds.maxX - padding &&
        position.z >= bounds.minZ + padding && position.z <= bounds.maxZ - padding;
}

function getCurrentAreaName(position) {
    if (position.z > roomDepth / 2) return 'Khuôn viên bảo tàng';
    const activeRoom = museumRooms.find(room => pointInBounds(position, room.bounds));
    if (activeRoom) return `Phòng ${activeRoom.number} · ${activeRoom.shortName}`;
    if (pointInBounds(position, museumLayout.lobby) || pointInBounds(position, museumLayout.transition)) return 'Sảnh chính';
    if (pointInBounds(position, museumLayout.corridor)) return 'Hành lang triển lãm';
    return 'Không gian chuyển tiếp';
}

function updateRoom6VideoTransition(activeRoomId) {
    if (activeRoomId === previousActiveRoomId) return;
    if (activeRoomId === 'room6') enterRoom6Video();
    else if (previousActiveRoomId === 'room6') leaveRoom6Video();
    previousActiveRoomId = activeRoomId;
}

function animate() {
    requestAnimationFrame(animate);

    const time = performance.now();
    sparkleMaterial.uniforms.time.value = time / 1000;
    updateEntranceDoors(Math.min((time - prevTime) / 1000, 0.05));
    updateSky(time / 1000, Math.min((time - prevTime) / 1000, 0.05));
    updateFireworkSprites(Math.min((time - prevTime) / 1000, 0.05));

    // Run movement logic if on PC and locked, or if on Mobile (always active)
    if (controls.isLocked === true || (
        isTouchDevice &&
        infoPanel.classList.contains('closed') &&
        entrancePopup.classList.contains('hidden') &&
        victoryPopup.classList.contains('hidden')
    )) {
        const delta = (time - prevTime) / 1000;
        previousPlayerPosition.copy(camera.position);

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

        // Keep the two facade side walls solid even when one movement step
        // crosses the front-wall plane. The doorway is the only passage
        // through that plane; without this crossing guard, x=+/-2 could
        // tunnel from the courtyard into the lobby before the bounds branch
        // had a chance to reject it.
        const crossedFrontWall =
            (previousPlayerPosition.z > entranceZ && camera.position.z <= entranceZ) ||
            (previousPlayerPosition.z <= entranceZ && camera.position.z > entranceZ);
        if (crossedFrontWall && !isAtMainEntrance(camera.position)) {
            camera.position.copy(previousPlayerPosition);
            velocity.set(0, 0, 0);
        }

        // Exterior and data-driven interior movement bounds.
        if (camera.position.z > roomDepth / 2) {
            camera.position.x = THREE.MathUtils.clamp(camera.position.x, -18, 18);
            // Match the interior doorway allowance so the passage is
            // traversable in both directions. Outside the opening, the
            // facade remains a hard boundary at the front wall.
            const exteriorMinZ = isAtMainEntrance(camera.position)
                ? entranceZ - 0.35
                : entranceZ + 0.25;
            camera.position.z = THREE.MathUtils.clamp(camera.position.z, exteriorMinZ, entranceZ + 22);
        } else {
            camera.position.x = THREE.MathUtils.clamp(camera.position.x, -roomWidth / 2 + collisionDistance, roomWidth / 2 - collisionDistance);
            // The old upper clamp (roomDepth / 2 - 0.2) made the front facade
            // an invisible wall: the player could stop at z=20.8 but never
            // reach the doorway at z=21. Allow passage only in the opening;
            // the front wall segments still remain protected by this bound.
            const interiorMaxZ = isAtMainEntrance(camera.position)
                ? entranceZ + 0.35
                : entranceZ - 0.2;
            camera.position.z = THREE.MathUtils.clamp(camera.position.z, -roomDepth / 2 + collisionDistance, interiorMaxZ);

            const inLobby = pointInBounds(camera.position, museumLayout.lobby, 0.35);
            const inTransition = pointInBounds(camera.position, museumLayout.transition, 0.25);
            const inCorridor = pointInBounds(camera.position, museumLayout.corridor, 0.45);
            const inMainEntranceCorridor = isAtMainEntrance(camera.position) &&
                camera.position.z >= entranceZ - 1.5 && camera.position.z <= entranceZ + 2.5;
            const inRoom = museumRooms.some(room => pointInBounds(camera.position, room.bounds, 0.65));
            // Each room opening is a permanent passage between corridor and room.
            const inDoorway = museumRooms.some(room => {
                const minX = Math.min(room.side * (corridorHalfWidth - 0.6), room.side * (corridorHalfWidth + 0.8));
                const maxX = Math.max(room.side * (corridorHalfWidth - 0.6), room.side * (corridorHalfWidth + 0.8));
                return camera.position.x >= minX && camera.position.x <= maxX &&
                    Math.abs(camera.position.z - room.centerZ) <= 1.35;
            });

            if (!inLobby && !inTransition && !inCorridor && !inMainEntranceCorridor && !inRoom && !inDoorway) {
                camera.position.copy(previousPlayerPosition);
                velocity.set(0, 0, 0);
            }
        }

        const detectedRoom = museumRooms.find(room => pointInBounds(camera.position, room.bounds, 0.1));
        updateRoom6VideoTransition(detectedRoom?.id || null);
        currentRoomName.textContent = getCurrentAreaName(camera.position);
        document.body.classList.toggle('outside-mode', camera.position.z > roomDepth / 2);

        // Re-arm the entrance prompt after the visitor walks away from the door.
        if (camera.position.z > roomDepth / 2 + 5) entrancePromptArmed = true;

        // The entrance is a walkable doorway. Do not open the entrance modal
        // from this threshold: it exits pointer lock and turns a normal WASD
        // crossing into a hard stop. The two-sided bounds above already keep
        // the facade walls solid outside the passage (|x| > passage half-width).

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
    updateInteractionState();
    renderer.render(scene, camera);
    updateYouTubeScreenProjection();
}

// Window resize handling
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start
applyMasterVolume();
applyLightingMode();
document.body.classList.add('outside-mode');
animate();
