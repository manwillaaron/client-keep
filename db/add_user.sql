insert into users (email, hash, first_name)
values ($1, $2, $3)
RETURNING *;