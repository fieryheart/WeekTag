// App类
function App() {
  this.years = []
  this.obsY = []
  var year = new Year()
  var month = new Month()
  var week = new Week()
  month.weeks.push(week)
  year.months.push(month)
  this.years.push(year)
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
var app = new App()

// data构造函数
function handleData(datas) {

  var obsY = app.obsY
  var years = app.years

  datas.forEach(function(data) {
    var date = data.mDate.split('-')
    var year = data[0]
    var month = data[1]
    var days = getDaysFromTheMonth( year, month )
    var day = parseInt(data[2], 0)
    var week = Math.round( day / Math.floor(month/4) ) === 5 ? 4 : Math.round( day / Math.floor(month/4) )

    if( obsY.indexOf(year) === -1 ) { // 添加新的年份

      years.push(new Year(year))
      obsY.push(year)

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

    }else {

      var nYear = years.indexOf(year)
      var iYear = years[nYear]
      var months = iYear.months

      if(iYear.indexOf(month) ) {}

    }
  })

}

console.log(app)

// 获取给定月份的天数
function getDaysFromTheMonth(year, month){
  var month = parseInt(month, 10)
  var d = new Date(year, month, 0)
  return d.getDate()
}


// 年的构造函数
function Year(year) {
  this.year = year
  this.months = []
  this.obsM = []
}

// 月的构造函数
function Month(month) {
  this.month = month
  this.weeks = []
  this.obsM = []
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


var years = ['2017', '2018']

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



years.forEach(function(year, index) {

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

    while(num !== 4){

      var b = $('<li />', {
        class: 'book',
        css: {
          width: book.width,
          height: book.height,
          marginLeft: num === 1 ? '0' : book.marginLeft + 'px',
          backgroundImage: 'url("./images/books/book_' + (bNum%12+1) + '.png")'
        }
      })

      b.on('touchstart', openBook)

      books.append(b)
      bNum++;
      num++;
    }



  })

}
setBooks()
