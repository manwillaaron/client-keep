select * from patients
where user_id = $1
limit 100;