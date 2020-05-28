UPDATE product
SET 
image_url = $2,
name = $3,
price = $4,
description = $5
WHERE product_id = $1;