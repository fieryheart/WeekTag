
function getYear(){} // 得到年份
var years = ['2017', '2018']

var bookshelfPaddingRadio = [2/15, 1/25, 3/10, 1/25] // top right bottom left


// App类
function App() {}
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