// directly draw video on canvas
function canvasPLay(videoElement, canvasElement) {
  var context = canvasElement.getContext('2d');
  var cw = Math.floor(videoElement.clientWidth * 2);
  var ch = Math.floor(videoElement.clientHeight * 2);
  
  canvasElement.width = cw;
  canvasElement.height = ch;

  videoElement.addEventListener('play', function(){
    draw(this, context, cw,ch);
  },false);

  function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,20,v,c,w,h);
  }
}

module.exports = canvasPLay;