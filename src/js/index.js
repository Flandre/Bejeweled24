// 定义常量
var COLUMN = 6,
  ROW = COLUMN,
  MARGIN = 7,
  BORDER = 3,
  MAIN_WIDTH = 500,
  WIDTH = (MAIN_WIDTH - MARGIN) / COLUMN - MARGIN;

// 定义游戏等级
var level=20;

// 初始化
function init() {
  for (var i = 0; i < ROW * COLUMN; i++) {
    $('.main').append('<div class="block" data-in="' + i + '">' + Math.ceil(Math.random() * level) + '</div>')
  }
  $('.block').each(function (index) {
    $(this)
      .css({
        'top': Math.floor(index / COLUMN) * (WIDTH + MARGIN) + MARGIN + 'px',
        'left': index % COLUMN * (WIDTH + MARGIN) + MARGIN + 'px',
        'width': WIDTH + 'px',
        'height': WIDTH + 'px',
        'line-height': WIDTH - BORDER * 2 + 'px',
        'font-size': WIDTH * .7 + 'px'
      });
  });

  // 鼠标滑过事件，取4个数字
  var listHash = {},
    count = 0;
  $(document)
    .on('mousedown', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $('.block')
        .removeClass('active press')
        .removeAttr('data-toggle');
      listHash = {};
      count = 0;
      $('.main')
        .on('mousemove', function (e) {
          e.preventDefault();
          e.stopPropagation();
          // console.log(e.pageX + ',' + e.pageY)
          var index = Math.floor((e.pageX - $('.main').offset().left) / (MAIN_WIDTH / COLUMN)) + COLUMN * Math.floor((e.pageY - $('.main').offset().top) / (MAIN_WIDTH / ROW));
          if (!listHash[index] && count < 4) {
            listHash[index] = $('.block[data-in="' + index + '"]')
              .attr('data-toggle', count)
              .addClass('active press')
              .html();
            count++;
          }
        })
    })
    .on('mouseup', function () {
      $('.main').off('mousemove');
      var listArr = [];
      for (x in listHash) {
        listArr.push(listHash[x]);
      }
      if (listArr.length < 4) {
        console.log('未取满4个数字');
        $('.block').removeClass('active press')
      } else {
        // 显示的数字
        console.log(listArr.sort());
        /*
         * 传入判断函数foo(), 如果返回为true, 执行销毁, false不销毁(暂定)
         */
        if (foo(listArr)) {
          //if (1) {
          var delay = 0;
          for (var i = 0; i < 4; i++) {
            setTimeout("remove_block($('.block[data-toggle=\"" + i + "\"]'))", delay);
            delay += 500;
          }
        } else {
          $('.block')
            .removeClass('active press')
            .removeAttr('data-toggle');
          console.log("+1s");
          // 执行+1s操作
        }
      }
    })
}
// 处理消除方块
function remove_block(ele) {
  var index = ele.attr('data-in');
  ele
    .css('z-index', '999')
    .addClass('rotateOut animated')
    .one('webkitAnimationEnd animationEnd', function () {
      $(this).remove();
    });
  var hideBlockColumn = index % COLUMN;
  var hideBlockRow = Math.ceil(index / ROW);
  $('.block').each(function () {
    if ($(this).attr('data-in') % COLUMN == hideBlockColumn && Math.ceil($(this).attr('data-in') / COLUMN) <= hideBlockRow) {
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
  var newBlock = '<div class="block" data-in="' + col + '" style="top:' + MARGIN + 'px;left:' + parseInt(col % ROW * (WIDTH + MARGIN) + MARGIN) + 'px;display:none;width:' + WIDTH + 'px;height:' + WIDTH + 'px;font-size:' + WIDTH * 0.7 + 'px;line-height:' + (WIDTH - BORDER * 2) + 'px">' + Math.ceil(Math.random() * level) + '</div>';
  $('.main').append(newBlock);
  $('.block:hidden')
    .show()
    .addClass('zoomIn animated')
    .one('webkitAnimationEnd animationEnd', function () {
      $(this).removeClass('zoomIn animated')
    });
}


// 为方块添加数字
function addNumber(ele){

}
init();

