function getTotalBooksCount(books) {
  // use length property on the books array to return number of book objects
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // use length property on accounts array to reutnr number of account objects
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  /* check if borrows.returned is true and count++ on each one that
      is true for all books
  - ~ some() ~ operates on an array of items and returns a boolean value 
  immediately if it finds one true statement */
  let total = 0;
  for (let book in books) {
    const { borrows } = books[book];
    if (borrows.some(borrow => !borrow.returned)){
      total++;
    }
  }
  return total;
}

function getMostCommonGenres(books) {
  /*  1) should return an ordered list of most common genres
      2) should limit the list to the top five

      - takes in array of books
      - return most common genre, most common to least
      - limit to 5 genres

      - new array of most common to least genres, up to 5, with reduce()
      - get genre of current book
      - get object in accum that has
   */

    /* create new array of most common genres with reduce()   
    - get the genre of current book
    - get the object in accum that has "name === genre"
    - if an object was not found, create a new one and push it into accum
    - if object was found, then add 1 to count
    - sort the array by count from greatest to least
    - limit array to 5 */
    const result = books.reduce((accum, book) => {
    const genre = book.genre;
    const genreInfo = accum.find((element) => element.name === genre);
    if (!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      };
      accum.push(newGenreInfo);
    } else {
      genreInfo.count++;
    }
    return accum;
  }, []);

  result.sort((genreA, genreB) => genreB.count - genreA.count);
  result.splice(5);
  return result;
}

function getMostPopularBooks(books) {
  /*  1) should return an ordered list of most popular books
      2) should limit the list to the top five
    - ~ map() ~ creates new array. transform each value of
        an array into another value. same size as original array
    - for every book object, return the book title and how many times it has been checked out or not
    - sort the count from most to least, slice it to top 5
  */
    return books.map((book) => {
    return { name: book.title, count: book.borrows.length };
      }).sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1))
        .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
    // create array of authors by popularity with map
    const result = authors.map((author) => {
    const fullName = `${author.name.first} ${author.name.last}`;
    // helper function toget books by authorid
    const getBooksByAuthorId = (books, authorId) => {
      return books.filter((book) => book.authorId === authorId);
      };
    const booksByAuthor = getBooksByAuthorId(books, author.id);
    const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrows.length, 0);
    const newAuthorInfo = {
      name: fullName,
      count: totalBorrows,
    };
  
      return newAuthorInfo;
    });

    result.sort((authorA, authorB) => authorB.count - authorA.count);
    result.splice(5);
    return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
