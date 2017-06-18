$(document).ready(function(){

  var userData = [];

  // 获取用户数据
  if(window.JScallback){

    userData = window.JScallback.userData()

  } else { // 测试，即默认值

    userData = [
       {
         "mCategory":"学习",
         "mDate":"2017-06-08",
         "mLastingTime":4.5
       },
       {
         "mCategory":"睡觉",
         "mDate":"2017-06-08",
         "mLastingTime":8
       },
       {
         "mCategory":"吃饭",
         "mDate":"2017-06-08",
         "mLastingTime":0.5
       },
       {
         "mCategory":"娱乐",
         "mDate":"2017-06-08",
         "mLastingTime":2
       },
       {
         "mCategory":"其他",
         "mDate":"2017-06-08",
         "mLastingTime":9
       },
       {
         "mCategory":"学习",
         "mDate":"2017-06-09",
         "mLastingTime":10
       },
       {
         "mCategory":"睡觉",
         "mDate":"2017-06-09",
         "mLastingTime":6
       },
       {
         "mCategory":"吃饭",
         "mDate":"2017-06-09",
         "mLastingTime":1
       },
       {
         "mCategory":"娱乐",
         "mDate":"2017-06-09",
         "mLastingTime":0
       },
       {
         "mCategory":"其他",
         "mDate":"2017-06-09",
         "mLastingTime":7
       }
    ]

  }

  // App类
  function App(data) {
    this.userData = data
    this.years = []
    this.obsY = []
  }

  App.prototype.getBoxModel = function(model) {
    this.width = parseInt( $(model).css('width') )
    this.height = parseInt( $(model).css('height') )
    this.padding = [
      parseInt( $(model).css('padding-top') ),
      parseInt( $(model).css('padding-right') ),
      parseInt( $(model).css('padding-bottom') ),
      parseInt( $(model).css('padding-left') )
    ]
    this.margin = [
      parseInt( $(model).css('margin-top') ),
      parseInt( $(model).css('margin-right') ),
      parseInt( $(model).css('margin-bottom') ),
      parseInt( $(model).css('margin-left') )
    ]
  }
  var app = new App(userData)

  // data构造函数
  function handleData(app) {

    var obsY = app.obsY
    var years = app.years
    app.userData.forEach(function(data) {
      var date = data.mDate.split('-')
      var category = data.mCategory
      var lastingTime = data.mLastingTime

      var dYear = date[0]
      var dMonth = date[1]
      var dDays = getDaysFromTheMonth( dYear, dMonth )
      var dDay = parseInt(date[2], 0)
      var week = Math.round( dDay / Math.floor(dDays/4) ) === 5 ? 4 : Math.round( dDay / Math.floor(dDays/4) )

      if( obsY.indexOf(dYear) === -1 ) { // 没有此年份，添加新的年份

        years.push(new Year(dYear))
        obsY.push(dYear)

        obsY.sort(function(x, y) {
          var xI = obsY.indexOf(x)
          var yI = obsY.indexOf(y)

          if(x > y) {
              var t = new Object(years[xI])
              years[xI] = years[yI]
              years[yI] = t
          }

          return x > y
        })

      }

      var iYear = obsY.indexOf(dYear)
      var nYear = years[iYear]
      var month = parseInt(dMonth)

      var page = nYear.months[month-1].weeks[week-1]

      if(page.obsT.indexOf(category) === -1) { // 如果没有此项事件
        var tag = new Tag(category, lastingTime)
        page.obsT.push(category)
        page.tags.push(tag)
      }else {
        var i = page.obsT.indexOf(category)
        page.tags[i].time += lastingTime
      }

    })

  }
  handleData(app)

  // console.log(app)

  // 获取给定月份的天数
  function getDaysFromTheMonth(year, month){
    var month = parseInt(month, 10)
    var d = new Date(year, month, 0)
    return d.getDate()
  }


  // 年的构造函数
  function Year(year) {

    var ms = [1,2,3,4,5,6,7,8,9,10,11,12]
    var months = []

    ms.forEach(function(m) {
      months.push(new Month(m))
    })

    this.year = year
    this.months = months
  }

  // 月的构造函数
  function Month(month) {
    this.month = month

    var ws = [1,2,3,4]
    var weeks = []


    ws.forEach(function(w) {
      weeks.push(new Week(w))
    })

    this.weeks = weeks
  }

  // 周的构造函数
  function Week(week){
    this.week = week
    this.tags = []
    this.obsT = []

  }

  // 时间的构造函数
  function Tag(name, time) {
    this.name = name
    this.time = time
  }


  var bookshelfPaddingRadio = [2/15, 1/25, 3/10, 1/25] // top right bottom left


  // wall类
  function Wall() {}
  Wall.prototype = app
  var wall = new Wall()
  wall.getBoxModel('#wall')


  $('#bookcase').css({
      width: wall.width - 3*13 + 'px',
      height: wall.height - 2.5*13 + 'px',
      margin: '13px 19.5px 0 19.5px'
  })


  // bookcase类
  function Bookcase(){}
  Bookcase.prototype = app
  var bookcase = new Bookcase()
  bookcase.getBoxModel('#bookcase')

  app.obsY.forEach(function(year, index) {

    var slide = $('<div />', {
      class: 'swiper-slide'
    })

    var head = $("<h1 />", {
      text: year,
      class: 'year'
    })

    var bookshelves = $("<ul />", {
      class: 'bookshelves',
      "data-year": year,
      css: {
        width: bookcase.width + 'px',
        height: bookcase.height - bookcase.padding[2]+ 'px'
      }
    })


    slide.append(head)
    slide.append(bookshelves)

    $("[data-bookcase]").append(slide)
  })

  // bookshelves类
  function Bookshelves(){}
  Bookshelves.prototype = app
  var bookshelves = new Bookshelves()
  bookshelves.getBoxModel(".bookshelves")


  // bookshelf类
  function Bookshelf(){
    this.width = bookshelves.width
    this.height = bookshelves.height / 4
    this.padding = [
      bookshelfPaddingRadio[0]*this.height,
      bookshelfPaddingRadio[1]*this.width,
      bookshelfPaddingRadio[2]*this.height,
      bookshelfPaddingRadio[3]*this.width
    ]
  }
  Bookshelf.prototype = Bookshelves
  var bookshelf = new Bookshelf()



  // 书的构造函数
  function Book(){
    this.radio = 117/146
    this.height = Math.floor(bookshelf.height - bookshelf.padding[0] - bookshelf.padding[2])
    this.width = this.radio*this.height
    this.marginLeft = (bookshelf.width - bookshelf.padding[1] - bookshelf.padding[3] - this.width*3) / 2
  }
  var book = new Book()

  // 排布每层书柜
  function setBookshelves() {
    var h = 0
    var padding = []
    bookshelf.padding.forEach(function(item, i){
      padding.push( bookshelf.padding[i] + 'px' )
    })
    while( h < bookshelves.height ) {
      var bs = $('<li />', {
        class: 'bookshelf',
        css: {
          width: bookshelf.width + 'px',
          height: bookshelf.height + 'px',
          padding: padding.join(' '),
          backgroundImage: 'url("./images/bookshelf.png")'
        }
      })
      $(".bookshelves").append(bs)
      h += bookshelf.height
    }

  }
  setBookshelves()


  function setBooks() {

    var bNum = 0

    $('.bookshelf').each(function(index, item) {
      var num = 1
      var books = $('<ul />')
      $(item).append(books)

      var year = app.obsY[Math.floor(index/12)]

      while(num !== 4){
        var month = (index*3 + num) % 12 === 0 ? 12 : (index*3 + num) % 12
        var b = $('<li />', {
          class: 'book',
          css: {
            width: book.width,
            height: book.height,
            marginLeft: num === 1 ? '0' : book.marginLeft + 'px',
            backgroundImage: 'url("./images/books/book_' + (bNum%12+1) + '.png")'
          },
          "data-date": year + '-' + month
        })

        b.on('touchstart', openBook)

        books.append(b)
        bNum++;
        num++;
      }



    })

  }
  setBooks()

})
