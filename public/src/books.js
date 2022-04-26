function findAuthorById(authors, id) {
  // return author object when author id matches inputted author id
  return authors.find(author => author.id == id);
}

function findBookById(books, id) {
  // return book object when book id matches the inputted book id
  return books.find(book => book.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  /* should return an array with two arrays: borrowed books and returned books
  - filter two times:
    - returned books, for every single borrow that is true/returned, add to returnedBooks variable
    - borrowed books, for one borrow element, if it is false/checked out, add to borrowedBooks
  - create new array with both the returned books and borrowed books array and return */
  let returnedBooks = books.filter((book) => 
    book.borrows.every((borrow) => borrow.returned === true));

  let borrowedBooks = books.filter((book) => 
    book.borrows.some((borrow) => borrow.returned === false));

  let partedBooksArray = [[...borrowedBooks], [...returnedBooks]];
  return partedBooksArray;
}

function getBorrowersForBook(book, accounts) {
  /* 1) should return an array for a book of all borrowers with their information and return status
  - 2) should limit the list to ten borrowers
  - ~ map() ~ creates new array. transform each value of an array into another value. same size as original array
  - ~ find() ~ will print out the FIRST match it finds. undefined if none
  - pass in anonymouse function as callback function, every account > finds if account id matches borrow id
  - return with spread operator that contains output values of map as borrow and account variable
  - use slice to limit array up to 10 account (0 - 10) */
  return book.borrows
  .map((borrow) => {
   let account = accounts.find((account) => account.id === borrow.id);
   return { ...borrow, ...account };
  })
  .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
