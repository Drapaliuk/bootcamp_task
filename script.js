const images = [
    'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260',
    'https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400',
    'https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500',
    'https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200',
    'https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560',
    'https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060'
];

const image = document.getElementById('image');

const getRandomNumber = (min = 0, max) => () => {
    return Math.floor(min + Math.random() * (max + 1 - min));
}
const randomImagesIndex = getRandomNumber(0, (images.length - 1));


image.addEventListener('load', (event) => {
    const elementWidth = image.offsetWidth;
    const elementHeight = image.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const maxWidth = elementWidth < windowWidth ? (windowWidth - elementWidth) : 0;
    const maxHeight = elementHeight < windowHeight ? (windowHeight - elementHeight) : 0;
    const left = getRandomNumber(0, maxWidth)();
    const top = getRandomNumber(0, maxHeight)();

    image.style.top = `${top}px`;
    image.style.left = `${left}px`;
    image.style.visibility = 'visible';

    // image.style.opacity = 0

})

const state = {
    timestamps: {
        lastActivity: Date.now(),
        lastChangeImage: null,
    },

    flags: {
        isActive: true,
        firstMountElement: false,
        mountElement: false,
        unMountElement: false
    }
}


// const fadeInAnimatedId = setInterval(() => {
//     const increment = 1 / 2500;
//     const currentOpacity = +image.style.opacity;

//     if(currentOpacity < 1 && state.timestamps.lastChangeImage) {
//         image.style.opacity = `${currentOpacity + increment}`
//     }

// }, 1)


// const fadeOutAnimationId = setInterval(() => {
//     const decrement = 1 / 2500;
//     const currentOpacity = +image.style.opacity;
//     if(currentOpacity >= 1) {
//         image.style.opacity = `${currentOpacity - decrement}`
//     }
    
// }, 1)


const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const {flags, timestamps} = state;

    const isInactivityTenSec = (currentTime - state.timestamps.lastActivity) >= 10000;
    const isInactivityFiveSec = (currentTime - state.timestamps.lastChangeImage) >= 5000;

    if(isInactivityFiveSec && !state.flags.isActive) {
        state.timestamps.lastChangeImage = Date.now();
        image.setAttribute('src', images[randomImagesIndex()]);
        image.style.visibility = 'hidden';
    } 

    if(isInactivityTenSec && state.flags.isActive) {
        flags.isActive = false;
        timestamps.lastChangeImage = Date.now();    
        image.setAttribute('src', images[randomImagesIndex()]);
        image.style.visibility = 'hidden';
    }
    
}, 1000)


const eventsHandler = function(event) {
    const {flags, timestamps} = state;
    image.setAttribute('src', '');
    timestamps.lastActivity = Date.now();
    flags.isActive = true;
}

window.addEventListener('mousemove', eventsHandler);
window.addEventListener('click', eventsHandler);
window.addEventListener('contextmenu', eventsHandler);
window.addEventListener('scroll', eventsHandler);
window.addEventListener('keypress', eventsHandler);
window.addEventListener('keyup', eventsHandler);
window.addEventListener('keydown', eventsHandler);
window.addEventListener('resize', eventsHandler);
window.addEventListener('wheel', eventsHandler);