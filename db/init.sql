drop table expenses;
drop table account_junc;
drop table expense_account;
drop table users;

create table users (
    id serial PRIMARY key,
    email text,
    hash text
);

create table expense_account(
    account_id serial primary key,
    monthly_budget int,
    monthly_income int
);

create table account_junc (
    account_junc_id serial PRIMARY key,
    account_id int REFERENCES expense_account(account_id),
    id int REFERENCES users(id)
);

create table expenses (
    expense_id serial PRIMARY key,
    store text,
    amount int,
    date text,
    catagory VARCHAR(100),
    account_id int REFERENCES expense_account(account_id)
);

create table patients (
 id serial primary key,
 firstname varchar(15),
 lastname varchar(20),
 number varchar(12),
 email varchar(100)
 )