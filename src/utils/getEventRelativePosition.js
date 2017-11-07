export default function (e, c) {
  const cWidth = c.clientWidth
  const cHeigh = c.clientHeight
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
  let left = x - c.getBoundingClientRect().left - window.pageXOffset
  let top = y - c.getBoundingClientRect().top - window.pageYOffset

  return {
    left, top
  }
}