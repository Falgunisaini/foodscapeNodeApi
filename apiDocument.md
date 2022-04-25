https://foodscapee.herokuapp.com/

Page 1:
=> List of Cities: 
http://localhost:6800/location
https://foodscapee.herokuapp.com/location

=> List of Restaurants: 
http://localhost:6800/restaurants
https://foodscapee.herokuapp.com/restaurants

=> List of Restaurants w.r.t City: 
http://localhost:6800/restaurants?state_id=1
https://foodscapee.herokuapp.com/restaurants?state_id=1

=> Quick Search Data: 
http://localhost:6800/mealType
https://foodscapee.herokuapp.com/mealType

Page 2:
=> Restaurants w.r.t quicksearch: 
http://localhost:6800/restaurants?mealtype_id=1
https://foodscapee.herokuapp.com/restaurants?mealtype_id=1

=> Filter
=> Data w.r.t cuisine and quicksearch (Cuisine Filter): 
http://localhost:6800/filter/2?cuisine=4
https://foodscapee.herokuapp.com/filter/2?cuisine=4

=> Cost filter: 
http://localhost:6800/filter/2?lcost=200&hcost=700
https://foodscapee.herokuapp.com/filter/2?lcost=200&hcost=700

=> Data w.r.t cuisine filter and cost filter: 
http://localhost:6800/filter/1?cuisine=2&lcost=200&hcost=500
https://foodscapee.herokuapp.com/filter/1?cuisine=2&lcost=200&hcost=500

=> Sort
Low to high in quicksearch: 
http://localhost:6800/filter/2?lcost=200&hcost=500&sort=1
https://foodscapee.herokuapp.com/filter/2?lcost=200&hcost=500&sort=1

High to low in quicksearch: 
http://localhost:6800/filter/2?lcost=200&hcost=500&sort=-1
https://foodscapee.herokuapp.com/filter/2?lcost=200&hcost=500&sort=-1

=> Pagination: 
http://localhost:6800/filter/1?cuisine=1&skip=0&limit=2
https://foodscapee.herokuapp.com/filter/1?cuisine=1&skip=0&limit=2

=> Data w.r.t City & Mealtype(optional): 
http://localhost:6800/restaurants?state_id=1&mealtype_id=2
https://foodscapee.herokuapp.com/restaurants?state_id=1&mealtype_id=2

Page 3:
=> Restaurant Details: 
http://localhost:6800/details/1
https://foodscapee.herokuapp.com/details/1

=> Menu w.r.t Restaurants: 
http://localhost:6800/menu/1
https://foodscapee.herokuapp.com/menu/1

Page 4:
=> Api to place order: 
http://localhost:6800/placeOrder
https://foodscapee.herokuapp.com/placeOrder

=> Menu items based on user's selection: 
http://localhost:6800/menuItem
https://foodscapee.herokuapp.com/menuItem

Page 5:
=> List all orders: http://localhost:6800/orders
https://foodscapee.herokuapp.com/orders

http://localhost:6800/orders?email="falguni@gmail.com"
https://foodscapee.herokuapp.com/orders?email=falguni@gmail.com

(Optional)
=> To delete Order(s): 
http://localhost:6800/deleteOrder
https://foodscapee.herokuapp.com/deleteOrder

=> To update Order(s): 
http://localhost:6800/updateOrder/6203d1d514da18ef4bf7636c?status=Success
https://foodscapee.herokuapp.com/updateOrder/6203d1d514da18ef4bf7636c?status=Success