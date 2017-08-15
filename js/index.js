function getYear(){} // 得到年份
let years = ['2017', '2018']

let bookshelfPaddingRadio = [2/15, 1/25, 3/10, 1/25] // top right bottom left


// App类
class App {

  // 得到html标签盒子模型方法
  getBoxModel(model) {
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

}
let app = new App()
console.log(app)

// wall类
class Wall extends App {

}
let wall = new Wall()
wall.getBoxModel('#wall')
console.log(wall)

$('#bookcase').css({
    width: wall.width - 3*13 + 'px',
    height: wall.height - 2.5*13 + 'px',
    margin: '13px 19.5px 0 19.5px'
})

// bookcase类
class Bookcase extends App {

}
let bookcase = new Bookcase()
bookcase.getBoxModel('#bookcase')
console.log(bookcase)


years.forEach(function(year, index) {

  let slide = $('<div />', {
    class: 'swiper-slide'
  })

  let head = $("<h1 />", {
    text: year,
    class: 'year'
  })

  let bookshelves = $("<ul />", {
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
class Bookshelves extends App {
  constructor() {
    super()
  }
}
let bookshelves = new Bookshelves()
bookshelves.getBoxModel(".bookshelves")
console.log(bookshelves)

// bookshelf类
class Bookshelf extends Bookshelves {
  constructor() {
    super()
    this.width = bookshelves.width
    this.height = bookshelves.height / 4
    this.padding = [
      bookshelfPaddingRadio[0]*this.height,
      bookshelfPaddingRadio[1]*this.width,
      bookshelfPaddingRadio[2]*this.height,
      bookshelfPaddingRadio[3]*this.width
    ]
  }
}
let bookshelf = new Bookshelf()
console.log(bookshelf)


class Book{
  constructor(){
    this.radio = 117/146
    this.height = Math.floor(bookshelf.height - bookshelf.padding[0] - bookshelf.padding[2])
    this.width = this.radio*this.height
    this.marginLeft = (bookshelf.width - bookshelf.padding[1] - bookshelf.padding[3] - this.width*3) / 2
  }
}
let book = new Book()

// 排布每层书柜
function setBookshelves() {
  let h = 0
  while( h < bookshelves.height ) {
    let bs = $('<li />', {
      class: 'bookshelf',
      css: {
        width: bookshelf.width + 'px',
        height: bookshelf.height + 'px',
        padding: bookshelf.padding.map(item => item+'px').join(' ')
      }
    })
    $(".bookshelves").append(bs)
    h += bookshelf.height
  }
}
setBookshelves()

function setBooks() {

  let bNum = 0

  $('.bookshelf').each(function(index, item) {
    let num = 1
    let books = $('<ul />')
    $(item).append(books)

    while(num !== 4){

      let b = $('<li />', {
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
