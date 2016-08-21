// 定义常量
var ROW = 4,
  COLUMN = 4,
  MARGIN = 7,
  WIDTH = 115;
// 初始化
function init() {
  for (var i = 0; i < ROW * COLUMN; i++) {
    $('.main').append('<div class="block" data-in="' + i + '">' + Math.ceil(Math.random() * 9) + '</div>')
  }
  $('.block').each(function (index, ele) {
    $(this)
      .css({
        'top': Math.floor(index / COLUMN) * (WIDTH + MARGIN) + MARGIN + 'px',
        'left': index % ROW * (WIDTH + MARGIN) + MARGIN + 'px'
      })
      .on('click', function () {
        drop_block($(ele).attr('data-in'), $(this));
      })
  })
}
// 处理下落
function drop_block(index, remove) {
  remove
    .css('z-index', '999')
    .addClass('rotateOut animated')
    .one('webkitAnimationEnd animationEnd', function(){
      remove.remove();
    });
  var hideBlockColumn = index % COLUMN;
  var hideBlockRow = Math.ceil(index / ROW);
  $('.block').each(function (idx, ele) {
    if ($(this).attr('data-in') % COLUMN == hideBlockColumn && Math.ceil($(this).attr('data-in') / ROW) < hideBlockRow) {
      console.log($(this).css('top'));
      $(this)
        .css({
          'top': parseInt($(this).css('top').split('px')[0]) + WIDTH + MARGIN + 'px'
        })
        .attr('data-in', parseInt($(this).attr('data-in')) + COLUMN)
    }
  });
  add_block(hideBlockColumn)
}
function add_block(col) {
  var newBlock = '<div class="block" data-in="' + col + '" style="top:' + MARGIN + 'px;left:' + parseInt(col % ROW * (WIDTH + MARGIN) + MARGIN) + 'px;display:none;">' + Math.ceil(Math.random() * 9) + '</div>';
  $('.main').append(newBlock);
  $('.block:hidden')
    .show()
    .addClass('zoomIn animated')
    .on('click', function () {
      drop_block($(this).attr('data-in'), $(this));
    })
}
init();

