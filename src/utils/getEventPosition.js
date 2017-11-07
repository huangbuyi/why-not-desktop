export default function (e) {
  return {
    left: typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX,
    top: typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
  }
}