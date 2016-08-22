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
      });
      //  移除点击事件
      // .on('click', function () {
      //   drop_block($(ele).attr('data-in'));
      // })
  });
  // 鼠标滑过事件，取4个数字
  var listHash = {},
    count = 0;
  $('.main')
    .on('mousedown', function () {
      listHash = {};
      count = 0;
      $('.main')
        .on('mousemove', function (e) {
          var index = Math.floor((e.pageX - $('.main').offset().top) / 125) + COLUMN * Math.floor((e.pageY - $('.main').offset().left) / 125);
          if (!listHash[index] && count < 4) {
            listHash[index] = $('.block:eq(' + index + ')').html();
            count++;
          }
        })
    })
    .on('mouseup', function () {
      $('.main').off('mousemove');
      var listArr = [],
        listIndexArr = [];
      for (x in listHash) {
        listArr.push(listHash[x]);
        listIndexArr.push(x);
      }
      if (listArr.length < 4) {
        console.log('未取满4个数字')
      } else {
        // 显示的数字
        console.log(listArr.sort());
        // 划取的位置信息
        console.log(listIndexArr.sort());
        /*
         * 传入判断函数foo(), 如果返回为true, 执行销毁, false不销毁(暂定)
         */
        // if (foo(listArr)) {
        if (1) {
          var delay = 0;
          for (var i = 0; i < listIndexArr.length; i++) {
            setTimeout("drop_block(" + parseInt(listIndexArr[i]) + ")", delay);
            delay += 500;
          }
        } else {
          // 执行+1s操作
        }
      }
    })
}
// 处理下落
function drop_block(index) {
  console.log(index);
  $('.block[data-in="' + index + '"]')
    .css('z-index', '999')
    .addClass('rotateOut animated')
    .one('webkitAnimationEnd animationEnd', function () {
      $(this).remove();
    });
  var hideBlockColumn = index % COLUMN;
  var hideBlockRow = Math.ceil(index / ROW);
  $('.block').each(function (idx, ele) {
    if ($(this).attr('data-in') % COLUMN == hideBlockColumn && Math.ceil($(this).attr('data-in') / ROW) < hideBlockRow) {
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
    .one('webkitAnimationEnd animationEnd', function () {
      $(this).removeClass('zoomIn animated')
    });
    // 移除点击事件
    // .on('click', function () {
    //   drop_block($(this).attr('data-in'));
    // })
}
init();

