
function Coordinate(x, y) {
  this.x = x
  this.y = y
}


function stdDate(date) {
  var arr = data.split('-')

}

// 处理数据
function stdData(data) {

}


function bookBindEvent(e) {

  book.on('pointerdown', openBook)

  animate = requestAnimationFrame(showBooksAnimate)
}

// 停止动画
function stop() {

}


// 展示动画
function showBooksAnimate() {

}

// 打开书
function openBook(e) {
  var target = e.target
  e.stopPropagation()
  // 打开书动画
  openBookAnimate()

  // 打开
  openBookAction(target)

}

function openBookAnimate() {


  // elasticOut函数
  // Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1
}

function openBookAction(target) {

  var bg = $('<div />', {
    css: {
      width: wall.width + 'px',
      height: wall.height + 'px',
      backgroundColor: '#aaaaaa',
      opacity: 0.7
    }
  })
  $('#content').append(bg)

  var pages = $('<ul />', {
    id: 'pages',
    css: {
      top: '2em',
      right: '1.5em',
      bottom: '2em',
      left: '0',
      position: 'absolute',
      boxShadow: '2px 0 1px 1px #000',
      backgroundImage: 'url("./images/book_page.png")'
    }
  })
  $('#content').append(pages)
  monthData(target) // 显示当月数据


  var del = $('<span />', {
    class: 'del',
    css: {
      position: 'absolute',
      top: '2em',
      right: '1.5em',
      padding: '0.5em',
      margin: '0.1em 0.6em 0 0',
      backgroundImage: 'url("./images/delete.png")'
    }
  })
  $('#content').append(del)

  del.on('click', function(e) {
    bg.remove()
    pages.remove()
    del.remove()
  })
}

function monthData(target) {

  var data = [
    [{
      name: '学习',
      time: 20.4
    },
    {
      name: '工作',
      time: 20
    },
    {
      name: '睡觉',
      time: 50
    },
    {
      name: '吃饭',
      time: 10.1
    },
    {
      name: '娱乐',
      time: 5
    },
    {
      name: '其他',
      time: 15
    }],
    [{
        name: '学习',
        time: 20
      },
      {
        name: '工作',
        time: 30
      },
      {
        name: '睡觉',
        time: 40.4
      },
      {
        name: '吃饭',
        time: 5
      },
      {
        name: '娱乐',
        time: 15
      },
      {
        name: '其他',
        time: 15.7
      }],
      [{
          name: '学习',
          time: 5
        },
        {
          name: '工作',
          time: 10
        },
        {
          name: '睡觉',
          time: 60.9
        },
        {
          name: '吃饭',
          time: 15
        },
        {
          name: '娱乐',
          time: 30
        }]
  ]

  var page = $('<li />', {
    'data-page': '1',
    'data-date':  target.year + target.month
  })
  $('#pages').append(page)

  var pageCanvas = new PIXI.Application(
    parseInt($('#pages').css('width')),
    parseInt($('#pages').css('height')),
    {
      antialias: true,
      transparent: true,
      resolution: 1
    }
  )
  $("#pages").append(pageCanvas.view)

  var startX, moveEndX, X
  var index = 0
  $('#pages').on('touchstart', function(e){
    startX = e.touches[0].pageX
  })
  $('#pages').on('touchend', function(e) {
    moveEndX = e.changedTouches[0].pageX
    X = moveEndX - startX

    if( X < 0 && data[index+1] ) { // 向右
      pageCanvas.stage.removeChildren()
      drawNRegularPolygon(origin, -Math.PI/2, 20, data[++index], pageCanvas)
    }else if( X > 0 && data[index-1]){ // 向左
      pageCanvas.stage.removeChildren()
      drawNRegularPolygon(origin, -Math.PI/2, 20, data[--index], pageCanvas)
    }
  })

  var origin = {
    x: pageCanvas.renderer.width * 3/5,
    y: pageCanvas.renderer.height / 4,
  }

  drawNRegularPolygon(origin, -Math.PI/2, 20, data[0], pageCanvas)

}

// 构建正n边形；origin->多边形原点位置；start->开始角度；l->原点到外点的长度；n->n边形
function nRegularPolygon(origin, start, l, n) {

  var coordinates = []
  var coordinateX, coordinateY
  var coordinate
  for(var i = 0; i < n; i++) {
    coordinateX = origin.x + Math.cos( Math.PI*2/n * i + start) * l
    coordinateY = origin.y + Math.sin( Math.PI*2/n * i + start) * l
    coordinate = new Coordinate(coordinateX, coordinateY)
    coordinates.push(coordinate)
  }
  return coordinates
}

// 绘制多边形
function drawNRegularPolygon(origin, start, l, data, app) {

  var polygons = []
  for(var i = 1; i < 6; i++) {
    polygons.push(nRegularPolygon(origin, start, i*l, data.length))
  }

  // 每个事件名字的位置
  var names = polygons.pop()
  var eCoordinates = [] // 每个事件坐标集合

  // 画多边形
  polygons.forEach(function(polygon, index) {

    var pointSet = []
    polygon.forEach(function(i) {
      pointSet.push(i.x)
      pointSet.push(i.y)
    })
    pointSet.push(pointSet[0])
    pointSet.push(pointSet[1])

    var triangle = new PIXI.Graphics();
    triangle.beginFill(0xffffff, 0)
    triangle.lineStyle(1, 0x000000)
    triangle.drawPolygon(pointSet)
    triangle.endFill()
    app.stage.addChild(triangle)

  })
  // 画线
  polygons[polygons.length-1].forEach(function(i) {

    var pointSet = [origin.x, origin.y]
    pointSet.push(i.x)
    pointSet.push(i.y)

    var line = new PIXI.Graphics()
    line.beginFill(0xffffff, 0)
    line.lineStyle(1, 0x000000)
    line.drawPolygon(pointSet)
    line.endFill()
    app.stage.addChild(line)

  })

  data.forEach(function(event, i) {
    var style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 14,
      fontWeight: 'bold'
    })
    var text = new PIXI.Text(event.name, style)
    text.anchor.set(0.5)
    text.x = names[i].x
    text.y = names[i].y

    app.stage.addChild(text)
    var lastPolygon = polygons[polygons.length-1]
    // 得到每个事件用时点的坐标
    eCoordinates.push( getPointCoordinate(origin, lastPolygon[i], event) )

    showData(event, i, app)

  })

  // 画数据图
  if(eCoordinates.length) {

    var coorSet = [];
    eCoordinates.forEach(function(coor){
      var x = coor.x
      var y = coor.y

      coorSet.push(x)
      coorSet.push(y)
    })

    coorSet.push(eCoordinates[0].x)
    coorSet.push(eCoordinates[0].y)



    var triangle = new PIXI.Graphics()
    triangle.beginFill(0x3d9885, 0.8)
    triangle.drawPolygon(coorSet)
    triangle.endFill()
    app.stage.addChild(triangle)

  }
}

// 显示数据
function showData(event, i, app) {
  var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold'
  })
  var text = new PIXI.Text(event.name + " : " + event.time + 'h', style)

  text.x = app.renderer.width / 2 - 10
  text.y = app.renderer.height / 2 + i*30

  app.stage.addChild(text)

}


// 计算数据点的坐标
function getPointCoordinate(start, end, event) {

  var disX = end.x - start.x
  var disY = end.y - start.y
  var point = {}
  var k = event.name === "睡觉" ? event.time/56 : event.time/28

  // 向量计算s
  var coorX = start.x + disX * k
  var coorY = start.y + disY * k

  point = new Coordinate(coorX, coorY)


  return point

}
