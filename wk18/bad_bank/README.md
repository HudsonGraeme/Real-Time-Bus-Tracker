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

| Location |                 Tech                 |
| :------: | :----------------------------------: |
| Frontend |   [![React]](https://reactjs.org/)   |
| Backend  | [![Express]](https://expressjs.com/) |
| Database |    [![redis]](https://redis.io/)     |

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
[express]: https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png 'Express Logo'
[react]: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png 'React Logo'
[redis]: https://cdn.iconscout.com/icon/free/png-256/redis-4-1175103.png 'Redis Logo'
