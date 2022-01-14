# Week 18 & 27 - Bad Bank

## Description

The Bad Bank project consists of a backend and a frontend which provide a basic bank application interface that users are able to interact with. It supports withdrawals and deposits, and allows the ability to create and remove user accounts. Transaction histories are also available for each user.

## Installation

1. Clone this repo using `git clone git@github.com:HudsonGraeme/xPro-Portfolio.git`
2. Navigate into the `wk18/bad_bank` folder using `cd xPro-Portfolio/wk18/bad_bank/`
3. Install required packages for the frontend and the backend using `yarn & cd ./backend && yarn && cd ..`

## Screenshots

|      Page      |    Screenshot     |
| :------------: | :---------------: |
|      Home      |      ![Home]      |
|    Withdraw    |    ![Withdraw]    |
|    Deposit     |    ![Deposit]     |
| Create Account | ![Create Account] |
|    All Data    |    ![All Data]    |

## Stack

| Location |      Tech      |
| :------: | :------------: |
| Frontend | ![React] React |
| Backend  |    Express     |
| Database |    ![Redis]    |

## Features

- [x] Create new user accounts
- [x] View transaction lists on a user by user basis
- [x] Support for withdrawals and deposits
- [x] Ability to delete user accounts
- [x] Overdraft limit of $100
- [ ] Authentication and user scopes via backend
- [ ] Transaction processing in the backend
- [ ] Fees
- [ ] Credit card applications and functionality

## License

This project is under the MIT license.

[home]: https://user-images.githubusercontent.com/25019680/149451325-b12128ca-dd67-4ee4-8b6e-786ffc2ceb71.png 'Home Page'
[withdraw]: https://user-images.githubusercontent.com/25019680/149451482-6473a6da-beca-4ed0-8b65-cea5abe0494f.png 'Withdraw Page'
[deposit]: https://user-images.githubusercontent.com/25019680/149451614-9f762594-d1f3-4d9d-8dc4-cc7792c5cd19.png 'Deposit Page'
[create account]: https://user-images.githubusercontent.com/25019680/149451686-a6ef6a30-4d41-4c07-ab90-5dedec09aa06.png 'Create Account Page'
[all data]: https://user-images.githubusercontent.com/25019680/149451734-4bed38c5-8d28-4c4a-a12f-5fbe02233628.png 'All Data Page'
[react]: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K 'React Logo'
[redis]: data:image/png;base64,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 'Redis Logo'
