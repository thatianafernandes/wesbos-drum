
  function removePlaying(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove(`playing`);

  }

  function getKeyClicked(key) {
    let keyPressed = key;
    if (!key.classList.contains("key")) {
      keyPressed = key.parentElement; //returns div
    }
    return keyPressed;
  } 

  function playByClickedOnKey(e) {
    if (isDrumOff()) return;
    let keyClicked = getDivClicked(e.target, "key");
    const audio = getAudio(keyClicked.dataset.key);
    if (!audio) return;

    playSound(keyClicked, audio);

  }

  function playSound(tecla, audio) {
    tecla.classList.add(`playing`);
    audio.currentTime = 0;
    audio.play();
  }

  function getAudio(keyCode) {
    return document.querySelector(`audio[data-key="${keyCode}"]`);
    
  }

  function isDrumOff() {
      return (document.querySelector(".drumStateOn") == null);
  }

  function playAudioByKeyCode(keyCode) {     
    if (isDrumOff()) return; 
    const audio = getAudio(keyCode);
    if (!audio) return;
    const tecla = document.querySelector(`div[data-key="${keyCode}"]`);

    playSound(tecla, audio);

  }

  function turnDrumOnOrOffByKeyCode(keyCode) {
    const divElement = document.querySelector(".buttonOnOff");          
    turnStateOfButton(divElement, "drumStateOn");
  }

  function playByKeyCode(e) {    
    if (isOnOffKey(e.keyCode)) {
        turnDrumOnOrOffByKeyCode(e.keyCode)
    } else {

        playAudioByKeyCode(e.keyCode);
    }
  }

  function getDivClicked(key, classClicked) {
    let keyPressed = key;
    if (!key.classList.contains(`${classClicked}`)) {
      keyPressed = key.parentElement; //returns div
    }
    return keyPressed;
  } 
  

  function isOnOffKey(keyCode) {
      return (keyCode == 111 || keyCode == 79);
  }

  function setTextOffOrOn(text) {
    return (text.toUpperCase() == "ON")? "OFF" : "ON";
  }

  function setLabelOnOff(t) {
    const spanElement = t.querySelector(".buttonText");    
    spanElement.textContent = setTextOffOrOn(spanElement.textContent);
  }

  function clickOnOff(e) {      
    const t = getDivClicked(e.target, "buttonOnOff");
    turnStateOfButton(t, "drumStateOn");
  }

  function turnStateOfButton(element, classToToggle) {      
    element.classList.toggle(`${classToToggle}`);
    setLabelOnOff(element);
  }

  function isAutoDrumOff(autoDrum) {
      return document.querySelector(".autoDrumOff") != null
  }

  function setImmediateInterval(functionToRun, intervalInMs) {
      functionToRun();
      return setInterval(functionToRun, intervalInMs);
  }

  function playDrum() {
    playAudioByKeyCode(65);
  }

  function enableDrum(autoDrum) {
    if (isAutoDrumOff(autoDrum)) {
        clearInterval(interval);
    } else {
        interval = setImmediateInterval(playDrum, 2000);
    }
  }

  function autoDrumClick(e) {
    const autoDrum = document.querySelector('.buttonAutoDrum');
    turnStateOfButton(autoDrum, "autoDrumOff");
    enableDrum(autoDrum);
  }

  //set event listeners
  window.addEventListener('keydown', playByKeyCode);
  const buttonOnOff = document.querySelector('.buttonOnOff');
  buttonOnOff.addEventListener('click', clickOnOff);
  const autoDrum = document.querySelector('.buttonAutoDrum');
  autoDrum.addEventListener('click', autoDrumClick);

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => {
    key.addEventListener('transitionend', removePlaying);
    key.addEventListener('click', playByClickedOnKey)
  });

  let interval = null;
  

