const isDebug = false

const gameSpeed = 6000
const minWidht = 500
const minHeight = 500
const offset = 300
const focusOffset = 10
const maxWidth = window.parent.screen.width - offset
const maxHeight = window.parent.screen.height - offset
 
const wrapperEl = document.querySelector('#wrapper')
const gameEl = document.querySelector('#game')
const focusEl = document.querySelector('#focus')

let targetWidth
let targetHeight

/**
 * デバッグ準備
 */
const setDebugInfo = () => {
  const debugEl = document.createElement('div')
  debugEl.setAttribute('id', 'debug')

  const screenWidthEl = document.createElement('div')
  const screenHeightEl = document.createElement('div')
  const widthEl = document.createElement('div')
  const heightEl = document.createElement('div')

  const setParameter = () => {
    screenWidthEl.textContent = `画面の幅 - offset: ${maxWidth}`
    screenHeightEl.textContent = `画面の高さ - offset: ${maxHeight}`
    widthEl.textContent = `フォーカスの幅: ${focusEl.clientWidth}`
    heightEl.textContent = `フォーカスの高さ: ${focusEl.clientHeight}`
  }

  debugEl.append(screenWidthEl)
  debugEl.append(screenHeightEl)
  debugEl.append(widthEl)
  debugEl.append(heightEl)

  document.body.append(debugEl)

  window.addEventListener('resize', setParameter)
  setParameter()
}

/**
 * ゲーム開始
 */
const game = () => {
  targetWidth = random(minWidht, maxWidth)
  targetHeight = random(minHeight, maxHeight)　
  setInstructions(targetWidth, targetHeight)
  setGuide(targetWidth, targetHeight)
  // setTimeout(game, gameSpeed)
}

/**
 * フォーカスが正解しているかチェック
 */
const checkSize = () => {
  const widthDiff = Math.abs(targetWidth - Math.floor(focusEl.clientWidth))
  const heightDiff = Math.abs(targetHeight - Math.floor(focusEl.clientHeight))
  if ((widthDiff <= focusOffset && widthDiff >= -focusOffset)
  && (heightDiff <= focusOffset && heightDiff >= -focusOffset)) {
    const alertEl = document.createElement('div')
    alertEl.textContent = 'SUCCSESS!!'
    alertEl.classList.add('succsecc-alert')
    wrapperEl.append(alertEl)
    setTimeout(() => {
      alertEl.remove()
    }, 600)
    game()
  }
  requestAnimationFrame(checkSize)
}

/**
 * お題をセット
 * @param {number} width 
 * @param {number} height 
 */
const setInstructions = (width, height) => {
  gameEl.childNodes.forEach((item) => item.remove())
  
  const widthEl = document.createElement('div')
  widthEl.textContent = `幅: ${width}`

  const heightEl = document.createElement('div')
  heightEl.textContent = `高さ: ${height}`

  const wrapEl = document.createElement('div')
  wrapEl.append(widthEl)
  wrapEl.append(heightEl)
  
  gameEl.append(wrapEl)
}

/**
 * ガイドラインをセット
 * @param {number} width 
 * @param {number} height 
 */
const setGuide = (width, height) => {
  let guideEl = document.querySelector('#guide')
  
  if (!guideEl) {
    guideEl = document.createElement('div')
    guideEl.setAttribute('id', 'guide')
    guideEl.classList.add('guide')
    wrapperEl.append(guideEl)
  }

  guideEl.style.width = `${width}px`
  guideEl.style.height = `${height}px`
}

/**
 * 閾値の範囲で乱数をつくる
 * @param {number} min 
 * @param {number} max 
 */
const random = (min, max) => Math.floor(Math.random() * (max - min) + min)

/**
 * メイン処理
 */
const main = () => {
  if (isDebug) setDebugInfo()
  game()
  checkSize()
}

main()