export interface Page<T> {
  content: T[];
  last: true,
  totalElements: 10,
  totalPages: 1,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false
  },
  first: true,
  numberOfElements: 10,
  empty: false
}
