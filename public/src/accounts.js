
/*
You can view all of the accounts data inside of the public/data/
directory. Each account is an object with the following shape:

const accounts = [
{
  "id": "5f446f2ecfaf0310387c9603",
  "name": {
    "first": "Esther",
    "last": "Tucker"
  },
  "picture": "https://api.adorable.io/avatars/75/esther.tucker@zillacon.me",
  "age": 25,
  "company": "ZILLACON",
  "email": "esther.tucker@zillacon.me",
  "registered": "Thursday, May 28, 2015 2:51 PM"
}

An account represents a person who is registered with the
library. Accounts can take out and return books.
*/

const { findAuthorById } = require("./books");


function findAccountById(accounts, id) {
  // use find() method to return the first account object that matches inputted id
  return accounts.find(account => account.id == id);
}

function sortAccountsByLastName(accounts) {
  // use sort() method to list account last names alphabetically
  return accounts.sort((accountA, accountB) =>
      (accountA.name.last > accountB.name.last ? 1 : -1)); 
  }

function getTotalNumberOfBorrows(account, books) {
  /* getting id of account and initializing total to 0
  - checking each book object in books
  - for (let property in object), property = full book object, books[bookId]
  - destructing all borrows from each object in books
  - console.log(books[book]);
  - for each record in borrows, if the record id == the account id, add total */

  const accountId = account.id;
  let total = 0;
  for (let book in books) {
    const { borrows } = books[book];
    borrows.forEach((record) => {
      if (record.id == accountId) {
        total++;
      }
    });
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  /* should return all of the books taken out by an account with the author embedded
  - declare final result to an empty array if none
  - declare borrowMatch array for matching borrow object
  - loop through each book record
  - loop through each borrows object of each book
  - if the borrow id matches the accound id and the account has it checked out,
     push the book object in result array
  - push the borrow in borrowMatch
  - filter through authors array and return matching author id */

    let result = [];
    let borrowMatch = [];
    books.forEach((record) => {
     const borrowed = record.borrows;
     const book = {
      id: record.id,
      title: record.title,
      genre: record.genre,
      authorId: record.authorId,
      author: {},
      borrows: {}
     };
     const { id, title, genre, authorId, author, borrows } = book;
   
     borrowed.forEach((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) {
       result.push(book);
       borrowMatch.push(borrow);
       book.borrows = borrowMatch;
       book.author = authors.filter((auth) => auth.id === book.authorId)[0];
      }
     });
    });
    return result;
  }



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
