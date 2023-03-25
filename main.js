// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
const errorModal = document.querySelector('#modal');
const hearts = document.querySelectorAll('.like-glyph');
errorModal.classList.add('hidden');

hearts.forEach((heart) => {
  heart.addEventListener('click', () => {
    likeCallback(heart);
  });
});

function likeCallback(heart) {
  mimicServerCall('testURL')
    .then((res) => {
      // alert(res);
      if (heart.innerText === EMPTY_HEART) {
        heart.innerText = FULL_HEART;
        heart.classList.add('activated-heart');
      } else if (heart.innerText === FULL_HEART) {
        heart.innerText = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      }
    })
    .catch((err) => {
      errorModal.classList.remove('hidden');
      errorModal.querySelector('#modal-message').innerText = err;
      setTimeout(() => {
        errorModal.classList.add('hidden');
      }, 3000);
    });
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = 'http://mimicServer.example.com', config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject('Random server error. Try again.');
      } else {
        resolve('Pretend remote server notified of action!');
      }
    }, 300);
  });
}
